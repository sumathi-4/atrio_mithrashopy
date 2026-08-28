/**
 * Helper to resolve the active Seller Portal base URL with fallback to http://localhost:5176
 */
export function getSellerPortalUrl() {
  const envUrl = import.meta.env.VITE_SELLER_PORTAL_URL || ''
  if (!envUrl || envUrl.includes('[YOUR-SELLER-PORTAL-DOMAIN]')) {
    return (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
      ? 'http://localhost:5176'
      : 'https://mithrashopy-seller.netlify.app'
  }
  return envUrl.replace(/\/$/, '')
}

/**
 * Helper to resolve the active User Customer Storefront base URL with fallback to http://localhost:5173
 */
export function getUserStorefrontUrl() {
  const envUrl = import.meta.env.VITE_USER_STOREFRONT_URL || ''
  if (!envUrl || envUrl.includes('[YOUR-USER-STOREFRONT-DOMAIN]')) {
    return (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
      ? 'http://localhost:5173'
      : 'https://mithrashopy-website.netlify.app'
  }
  return envUrl.replace(/\/$/, '')
}

/**
 * Helper for smooth scrolling to anchor sections by ID
 */
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
