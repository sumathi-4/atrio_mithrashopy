// ─── API Base URL ──────────────────────────────────────────────────────────────
// In development, Vite proxies /api → http://localhost:5000
// In production, set VITE_API_URL in your .env
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Token Management ──────────────────────────────────────────────────────────
const TOKEN_KEY = 'mithira_auth_token';
const USER_KEY  = 'mithira_auth_user';

export function normalizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    cart: Array.isArray(user.cart) ? user.cart : [],
    cartItems: Array.isArray(user.cartItems) ? user.cartItems : [],
    wishlist: Array.isArray(user.wishlist) ? user.wishlist : [],
    addresses: Array.isArray(user.addresses) ? user.addresses : []
  };
}

export function saveSession(token, user) {
  try {
    const normalized = normalizeUser(user);
    localStorage.setItem(TOKEN_KEY, token);
    const sanitizedUser = { ...normalized };
    if (sanitizedUser.profileImage && sanitizedUser.profileImage.length > 500) {
      delete sanitizedUser.profileImage;
    }
    localStorage.setItem(USER_KEY, JSON.stringify(sanitizedUser));
  } catch (err) {
    console.warn('localStorage quota warning in saveSession, cleaning cache:', err);
    try {
      localStorage.removeItem('mithira_cached_products');
      localStorage.removeItem('mithra_admin_products');
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(normalizeUser(user)));
    } catch (_) {}
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('mithra_auth_token');
    localStorage.removeItem('mithra_auth_user');
  } catch (_) {}
}

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem('mithra_auth_token');
  } catch {
    return null;
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY) || localStorage.getItem('mithra_auth_user');
    return raw ? normalizeUser(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

// ─── Base fetch wrapper ────────────────────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

// ─── Auth API Calls ────────────────────────────────────────────────────────────

/**
 * Register a new user account
 */
export async function registerUser({ name, email, phone, password }) {
  const { ok, data } = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, password }),
  });

  const user = normalizeUser(data.user);
  if (ok && data.token) {
    saveSession(data.token, user);
  }

  return { success: ok && data.success, message: data.message, user };
}

/**
 * Login as a regular user
 */
export async function loginUser({ email, password }) {
  const { ok, data } = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const user = normalizeUser(data.user);
  if (ok && data.token) {
    saveSession(data.token, user);
  }

  return { success: ok && data.success, message: data.message, user };
}

/**
 * Login as admin
 */
export async function loginAdmin({ email, password }) {
  const { ok, data } = await apiFetch('/api/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const user = normalizeUser(data.user);
  if (ok && data.token) {
    saveSession(data.token, user);
  }

  return { success: ok && data.success, message: data.message, user };
}

export async function verifySession() {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const { ok, status, data } = await apiFetch('/api/auth/me');
    if (ok && data && data.success) {
      const user = normalizeUser(data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }
    if (status === 401 || status === 403) {
      clearSession();
      return null;
    }
    return getStoredUser();
  } catch (err) {
    console.warn('verifySession network error, preserving local session:', err);
    return getStoredUser();
  }
}

/**
 * Logout — clear local session
 */
export function logout() {
  clearSession();
}
