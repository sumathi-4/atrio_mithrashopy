import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Heart, User, ShoppingBag, ShoppingCart, ChevronDown, Menu, X, Eye, EyeOff, Shield, LogOut, LayoutDashboard, Shirt, BookOpen, Crown, Gift } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { loginUser, registerUser, loginAdmin, logout as authLogout } from '../services/authService';
import { apiService } from '../services/apiService';
import Drawer from './ui/Drawer';
import Accordion from './ui/Accordion';
import imgClothing from '../assets/hero_clothing_banner.jpg';
import imgStationery from '../assets/hero_stationery.jpg';
import imgGifts from '../assets/hero_gifts.jpg';
import imgAccessories from '../assets/hero_accessories.jpg';
import celebCouple from '../assets/celeb_couple.jpg';

const PROMO_CARDS = {
  CLOTHING: {
    tag: 'NEW ARRIVAL',
    title: 'Premium Couple Sets',
    desc: 'Matching ethnic wear for celebrations.',
    image: celebCouple,
    href: '/shop/clothing/couples'
  },
  STATIONERY: {
    tag: 'TRENDING',
    title: 'Vegan Leather Planners',
    desc: 'Organize your days in luxury style.',
    image: imgStationery,
    href: '/shop/stationery'
  },
  GIFTS: {
    tag: 'EXCLUSIVE',
    title: 'Custom Keepsake Boxes',
    desc: 'Memorable gifts for loved ones.',
    image: imgGifts,
    href: '/shop/gifts'
  },
  ACCESSORIES: {
    tag: 'HOT DEALS',
    title: 'Handcrafted Jewellery Set',
    desc: 'Elevate your daily elegance.',
    image: imgAccessories,
    href: '/shop/accessories'
  }
};

export default function Navbar({ authUser: propAuthUser, setAuthUser: propSetAuthUser, onNavigate }) {
  const [authUser, setAuthUserLocal] = useState(() => {
    if (propAuthUser) return propAuthUser;
    try {
      const stored = localStorage.getItem('mithira_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (propAuthUser !== undefined) {
      setAuthUserLocal(propAuthUser);
    }
  }, [propAuthUser]);

  const updateAuthUser = (user) => {
    setAuthUserLocal(user);
    if (propSetAuthUser) {
      propSetAuthUser(user);
    }
  };

  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname + window.location.hash + window.location.search
  );

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname + window.location.hash + window.location.search);
    };
    window.addEventListener('popstate', updatePath);
    window.addEventListener('hashchange', updatePath);
    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('hashchange', updatePath);
    };
  }, []);

  const isHomeActive = () => {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (pathname === '/' || pathname === '/index.html') && (hash === '' || hash === '#home');
  };

  const isShopActive = () => {
    const pathname = window.location.pathname.toLowerCase();
    const segments = pathname.split('/').filter(Boolean);
    return segments.length === 1 && segments[0] === 'shop';
  };

  const isCategoryActive = (groupKey) => {
    const pathname = window.location.pathname.toLowerCase();
    return pathname.includes(`/shop/${groupKey.toLowerCase()}`);
  };

  const isNewArrivalsActive = () => {
    const pathname = window.location.pathname.toLowerCase();
    return pathname.includes('/newarrivals') || pathname.includes('/new-arrivals');
  };

  const isOffersActive = () => {
    const pathname = window.location.pathname.toLowerCase();
    return pathname.includes('/offers');
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // null | 'user' | 'admin'
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User login form state
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showUserPwd, setShowUserPwd] = useState(false);
  const [userLoginError, setUserLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [regError, setRegError] = useState('');

  const [announcements, setAnnouncements] = useState([]);

  // ── Search state ──────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProductsSearch] = useState([]);
  const searchRef = useRef(null);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenAuth = (e) => {
      openModal(e.detail?.type || 'user');
    };
    window.addEventListener('mithira_open_auth_modal', handleOpenAuth);
    return () => window.removeEventListener('mithira_open_auth_modal', handleOpenAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (authModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [authModal]);

  // Load active announcements from the backend
  useEffect(() => {
    apiService.getAnnouncements().then(data => {
      if (data && data.length > 0) {
        const active = data.filter(a => a.status === 'Active');
        if (active.length > 0) {
          setAnnouncements(active);
        }
      }
    }).catch(console.error);
  }, []);

  const [categoriesList, setCategoriesList] = useState([]);
  const [hoveredSubKeys, setHoveredSubKeys] = useState({});
  
  // Load categories from backend
  useEffect(() => {
    apiService.getCategories().then(data => {
      if (data && data.length > 0) setCategoriesList(data);
    }).catch(console.error);
  }, []);

  // Load all products for search
  useEffect(() => {
    apiService.getProducts().then(data => {
      if (data && data.length > 0) setAllProductsSearch(data);
    }).catch(console.error);
  }, []);

  // Dynamic Popular Searches derived from MithraShoppy database
  const popularSearchTags = useMemo(() => {
    const tagsSet = new Set();

    // 1. Extract categories and subcategories from categoriesList
    if (Array.isArray(categoriesList) && categoriesList.length > 0) {
      categoriesList.forEach(cat => {
        if (cat.name && typeof cat.name === 'string') tagsSet.add(cat.name.trim());
        if (Array.isArray(cat.subCategories)) {
          cat.subCategories.forEach(sub => {
            const subName = typeof sub === 'string' ? sub : sub?.name;
            if (subName && typeof subName === 'string') tagsSet.add(subName.trim());
          });
        }
      });
    }

    // 2. Extract subcategories, tags, keywords from allProducts
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      allProducts.forEach(prod => {
        if (prod.subCategory && typeof prod.subCategory === 'string') {
          tagsSet.add(prod.subCategory.trim());
        }
        if (prod.category && typeof prod.category === 'string') {
          const mainCat = prod.category.split('>')[0].trim();
          if (mainCat) tagsSet.add(mainCat);
        }

        // Process product tags
        if (Array.isArray(prod.tags)) {
          prod.tags.forEach(t => {
            if (typeof t === 'string' && t.trim()) tagsSet.add(t.trim());
          });
        } else if (typeof prod.tags === 'string' && prod.tags.trim()) {
          prod.tags.split(',').forEach(t => {
            if (t.trim()) tagsSet.add(t.trim());
          });
        }

        // Process product keywords
        if (Array.isArray(prod.keywords)) {
          prod.keywords.forEach(k => {
            if (typeof k === 'string' && k.trim()) tagsSet.add(k.trim());
          });
        }
      });
    }

    // Filter out very short or numeric-only strings
    let tagsList = Array.from(tagsSet).filter(t => t && t.length >= 3 && isNaN(t));

    // Fallback if database hasn't finished loading or returns empty
    if (tagsList.length === 0) {
      tagsList = [
        'Sarees',
        'Kurtis',
        'Silk Saree',
        'Jewellery',
        'Toys',
        'Stationery',
        'Gifts',
        'Anarkali',
        'Watches',
        'Handbags',
        'Churidar',
        'Bangles'
      ];
    }

    // Return top 14 unique items
    return tagsList.slice(0, 14);
  }, [allProducts, categoriesList]);

  // Close search on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Sync search query from URL parameter
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get('search');
      if (searchParam) {
        setSearchQuery(decodeURIComponent(searchParam));
      } else {
        setSearchQuery('');
      }
    };
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const getUnifiedCategories = () => {
    const defaultGroups = [
      { name: 'Clothing', key: 'CLOTHING' },
      { name: 'Stationery', key: 'STATIONERY' },
      { name: 'Gifts', key: 'GIFTS' },
      { name: 'Accessories', key: 'ACCESSORIES' }
    ];

    const buildTree = (parentName, parentKey) => {
      if (!categoriesList || categoriesList.length === 0) return [];
      const dbChildren = categoriesList.filter(cat => cat.parent && cat.parent.toLowerCase() === parentName.toLowerCase());
      return dbChildren.map(cat => {
        const uniqueKey = `${parentKey}_${cat.name.toUpperCase().replace(/\s+/g, '_')}`;
        return {
          key: uniqueKey,
          dbName: cat.name,
          label: cat.name,
          children: buildTree(cat.name, uniqueKey)
        };
      });
    };

    const structure = [];

    // Only root categories where showInNavbar !== false
    const dbRoots = categoriesList.filter(
      cat =>
        (!cat.parent || cat.parent === '—') &&
        cat.name !== '—' &&
        cat.showInNavbar !== false
    );

    defaultGroups.forEach(def => {
      const dbRoot = dbRoots.find(r => r.name.toLowerCase() === def.name.toLowerCase());
      // If backend has this category with showInNavbar=false, skip it
      const allRoots = categoriesList.filter(c => (!c.parent || c.parent === '—') && c.name !== '—');
      const dbRootAny = allRoots.find(r => r.name.toLowerCase() === def.name.toLowerCase());
      if (dbRootAny && dbRootAny.showInNavbar === false) return; // explicitly hidden

      const subcategories = dbRoot ? buildTree(dbRoot.name, def.key) : [];
      structure.push({
        name: def.name,
        key: def.key,
        subcategories
      });
    });

    dbRoots.forEach(dbRoot => {
      const alreadyAdded = structure.some(s => s.name.toLowerCase() === dbRoot.name.toLowerCase());
      if (!alreadyAdded) {
        const key = dbRoot.name.toUpperCase().replace(/\s+/g, '_');
        structure.push({
          name: dbRoot.name,
          key,
          subcategories: buildTree(dbRoot.name, key)
        });
      }
    });

    return structure;
  };


  const [guestCartCount, setGuestCartCount] = useState(0);
  const [guestWishlistCount, setGuestWishlistCount] = useState(0);

  const updateGuestCounts = () => {
    try {
      const localCart = localStorage.getItem('mithira_guest_cart');
      const localWish = localStorage.getItem('mithira_guest_wishlist');
      setGuestCartCount(localCart ? JSON.parse(localCart).length : 0);
      setGuestWishlistCount(localWish ? JSON.parse(localWish).length : 0);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateGuestCounts();
    window.addEventListener('storage', updateGuestCounts);
    window.addEventListener('mithira_cart_update', updateGuestCounts);
    return () => {
      window.removeEventListener('storage', updateGuestCounts);
      window.removeEventListener('mithira_cart_update', updateGuestCounts);
    };
  }, []);

  // Live search handler
  const handleSearchInput = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase().trim();
    const filtered = allProducts
      .filter(p => {
        const name = (p.name || p.title || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const subCat = (p.subCategory || '').toLowerCase();
        const brand = (p.brand || p.attributes?.brand || '').toLowerCase();
        const tags = Array.isArray(p.tags) 
          ? p.tags.join(' ').toLowerCase() 
          : (typeof p.tags === 'string' ? p.tags.toLowerCase() : '');
        const keywords = Array.isArray(p.keywords) 
          ? p.keywords.join(' ').toLowerCase() 
          : (typeof p.keywords === 'string' ? p.keywords.toLowerCase() : '');

        return name.includes(lower) || 
               cat.includes(lower) || 
               subCat.includes(lower) || 
               brand.includes(lower) || 
               tags.includes(lower) || 
               keywords.includes(lower);
      })
      .slice(0, 8);
    setSearchResults(filtered);
  };

  const handlePopularSearchTagClick = (tag) => {
    setSearchQuery(tag);
    setIsSearchFocused(false);
    setSearchOpen(false);
    window.history.pushState({}, '', `/Shop?search=${encodeURIComponent(tag)}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleSearchSelect = (prod) => {
    setSearchOpen(false);
    setIsSearchFocused(false);
    setSearchQuery('');
    setSearchResults([]);
    const cat = (prod.category || '').split('>')[0].trim().toUpperCase();
    window.history.pushState({}, '', `/Shop?category=${cat.toLowerCase()}&search=${encodeURIComponent(prod.name || prod.title || '')}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleSearchSubmit = (e) => {
    const isEnter = e && e.key === 'Enter';
    const isClick = e && e.type === 'click';
    if ((isEnter || isClick || !e) && searchQuery.trim()) {
      setSearchOpen(false);
      setIsSearchFocused(false);
      window.history.pushState({}, '', `/Shop?search=${encodeURIComponent(searchQuery.trim())}`);
      window.dispatchEvent(new Event('popstate'));
      setSearchResults([]);
    }
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
  };

  const openModal = (type) => {
    setAuthModal(type);
    setProfileDropdownOpen(false);
    setActiveTab('login');
    setUserEmail(''); setUserPassword(''); setUserLoginError('');
    setRegName(''); setRegEmail(''); setRegPhone(''); setRegPassword(''); setRegError('');
  };

  const closeModal = () => setAuthModal(null);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUserLoginError('');
    try {
      const result = await loginUser({ email: userEmail, password: userPassword });
      if (result.success && result.user) {
        const userToSet = result.user;
        updateAuthUser(userToSet);
        localStorage.setItem('mithira_auth_user', JSON.stringify(userToSet));
        
        try {
          const guestCartIds = JSON.parse(localStorage.getItem('mithira_guest_cart') || '[]');
          const guestCartItems = JSON.parse(localStorage.getItem('mithira_guest_cart_items') || '[]');
          if (guestCartIds.length > 0) {
            apiService.syncCart(guestCartIds, guestCartItems).then(res => {
              if (res) {
                updateAuthUser({ ...userToSet, cart: res.cart, cartItems: res.cartItems });
                localStorage.removeItem('mithira_guest_cart');
                localStorage.removeItem('mithira_guest_cart_items');
              }
            }).catch(() => {});
          }
        } catch (_) {}

        closeModal();
        if (onNavigate) onNavigate('/');
      } else {
        setUserLoginError(result.message || 'Invalid email or password.');
      }
    } catch {
      setUserLoginError('Cannot connect to server. Please ensure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setRegError('Please fill all required fields.');
      return;
    }
    setIsSubmitting(true);
    setRegError('');
    try {
      const result = await registerUser({ name: regName, email: regEmail, phone: regPhone, password: regPassword });
      if (result.success && result.user) {
        const userToSet = result.user;
        updateAuthUser(userToSet);
        localStorage.setItem('mithira_auth_user', JSON.stringify(userToSet));

        try {
          const guestCartIds = JSON.parse(localStorage.getItem('mithira_guest_cart') || '[]');
          const guestCartItems = JSON.parse(localStorage.getItem('mithira_guest_cart_items') || '[]');
          if (guestCartIds.length > 0) {
            apiService.syncCart(guestCartIds, guestCartItems).then(res => {
              if (res) {
                updateAuthUser({ ...userToSet, cart: res.cart, cartItems: res.cartItems });
                localStorage.removeItem('mithira_guest_cart');
                localStorage.removeItem('mithira_guest_cart_items');
              }
            }).catch(() => {});
          }
        } catch (_) {}

        closeModal();
        if (onNavigate) onNavigate('/');
      } else {
        setRegError(result.message || 'Registration failed. Please try again.');
      }
    } catch {
      setRegError('Cannot connect to server. Please ensure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    authLogout();
    updateAuthUser(null);
    setProfileDropdownOpen(false);
    openModal('user');
    if (onNavigate) onNavigate('/');
  };

  const getInitials = (name) =>
    name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Main Navbar */}
      <div className="navbar-container">
        {/* ROW 1: Logo, Persistent Search, Right Actions */}
        <div className="navbar-row-one">
          {/* Mobile Menu Toggle Button */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="logo-link">
            <div className="logo-wrapper">
              <img src={`${logoImg}?v=2`} alt="Mithra Shopy Logo" className="logo-img" />
            </div>
          </a>

          {/* Persistent Search Bar */}
          <div className="nav-search-wrapper persistent-search" ref={searchRef}>
            <div className={`nav-search-bar-meesho ${isSearchFocused ? 'focused' : ''}`}>
              <Search size={18} className="nav-search-left-icon" onClick={handleSearchSubmit} />
              <input
                type="text"
                className="nav-search-input"
                placeholder="Try Saree, Kurti or Search by Product Code"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setIsSearchFocused(true);
                  handleSearchInput(e);
                }}
                onKeyDown={handleSearchSubmit}
              />
              {searchQuery && (
                <button
                  className="nav-search-close"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Live Search & Popular Searches Dropdown */}
            {isSearchFocused && (
              <div className="nav-search-dropdown-meesho">
                {!searchQuery.trim() && (
                  <div className="popular-searches-container">
                    <h4 className="popular-searches-title">Popular Searches</h4>
                    <div className="popular-searches-tags-grid">
                      {popularSearchTags.map((tag, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="popular-search-tag-pill"
                          onClick={() => handlePopularSearchTagClick(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery.trim() && searchResults.length > 0 && (
                  <div className="search-results-list">
                    {searchResults.map((prod, i) => (
                      <div
                        key={prod._id || prod.id || i}
                        className="nav-search-result-item"
                        onClick={() => handleSearchSelect(prod)}
                      >
                        <Search size={13} className="result-icon" />
                        <div className="result-text">
                          <span className="result-name">{prod.name || prod.title}</span>
                          <span className="result-cat">{prod.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                  <div className="nav-search-no-result">No products found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Stacked Row 1 Right Actions */}
          <div className="nav-actions-meesho">
            <a
              href={
                import.meta.env.VITE_SELLER_PORTAL_URL ||
                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                  ? 'http://localhost:5176'
                  : 'https://seller.mithrashopy.com')
              }
              target="_blank"
              rel="noopener noreferrer"
              className="action-text-link"
            >
              Become a Supplier
            </a>
            <span className="action-divider">|</span>

            <a href="/lucky-charms" className="action-text-link" onClick={(e) => handleLinkClick(e, '/lucky-charms')}>
              Lucky Charms
            </a>
            <span className="action-divider">|</span>

            {/* Profile / Login Stacked Button */}
            <div className="profile-dropdown-wrapper" ref={profileRef}>
              <button
                className={`action-btn-stacked ${authUser ? 'logged-in' : ''}`}
                aria-label={authUser ? "Account" : "Login"}
                onClick={() => {
                  if (!authUser) {
                    openModal('user');
                  } else {
                    setProfileDropdownOpen(!profileDropdownOpen);
                  }
                }}
              >
                {authUser ? (
                  <div className="nav-user-avatar-meesho">{getInitials(authUser.name)}</div>
                ) : (
                  <User size={24} className="action-icon-meesho" />
                )}
                <span className="action-label-meesho">
                  {authUser ? (authUser.name?.split(' ')[0] || 'Profile') : 'Login'}
                </span>
              </button>

              {authUser && profileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="pdm-user-header">
                    <div className="pdm-user-avatar">{getInitials(authUser.name)}</div>
                    <div className="pdm-user-info">
                      <div className="pdm-user-name">{authUser.name}</div>
                      <div className="pdm-user-email">{authUser.email}</div>
                    </div>
                  </div>
                  <div className="pdm-divider" />
                  <button
                    className="pdm-item"
                    onClick={() => { if (onNavigate) onNavigate('/account'); setProfileDropdownOpen(false); }}
                  >
                    <User size={15} />
                    <span>My Account</span>
                  </button>
                  <button className="pdm-item pdm-logout" onClick={handleLogout}>
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Stacked Button */}
            <button
              className="action-btn-stacked"
              aria-label="Wishlist"
              onClick={(e) => {
                if (!authUser) {
                  openModal('user');
                } else {
                  handleLinkClick(e, '/account?tab=wishlist');
                }
              }}
            >
              <div className="action-icon-wrapper-meesho">
                <Heart size={24} className="action-icon-meesho" />
                {authUser && (authUser.wishlist?.length || 0) > 0 && (
                  <span className="action-badge-meesho">
                    {authUser.wishlist.length}
                  </span>
                )}
              </div>
              <span className="action-label-meesho">Wishlist</span>
            </button>

            {/* Cart Stacked Button */}
            <button
              className="action-btn-stacked"
              aria-label="Cart"
              onClick={(e) => {
                if (!authUser) {
                  openModal('user');
                } else {
                  handleLinkClick(e, '/account?tab=cart');
                }
              }}
            >
              <div className="action-icon-wrapper-meesho">
                <ShoppingCart size={24} className="action-icon-meesho" />
                {authUser && (authUser.cart?.length || 0) > 0 && (
                  <span className="action-badge-meesho cart-badge-pink">
                    {authUser.cart.length}
                  </span>
                )}
              </div>
              <span className="action-label-meesho">Cart</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Horizontal Categories & Hover Mega Menu */}
        <div className="navbar-row-two">
          <ul className="nav-menu-meesho">
            <li className={`nav-item-meesho ${isHomeActive() ? 'active' : ''}`}>
              <a href="/#home" onClick={(e) => handleLinkClick(e, '/#home')}>Home</a>
            </li>
            <li className={`nav-item-meesho ${isShopActive() ? 'active' : ''}`}>
              <a href="/shop" onClick={(e) => handleLinkClick(e, '/shop')}>Shop</a>
            </li>
            {getUnifiedCategories().map((group) => {
              return (
                <li
                  key={group.key}
                  className={`nav-item-meesho has-mega-menu ${isCategoryActive(group.key) ? 'active' : ''}`}
                >
                  <a
                    href={`/shop/${group.key.toLowerCase()}`}
                    className={`category-link-meesho ${isCategoryActive(group.key) ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}`)}
                  >
                    {group.name}
                  </a>

                  {/* Mega Menu container */}
                  {group.subcategories && group.subcategories.length > 0 && (
                    <div className="mega-menu-overlay">
                      <div className="mega-menu-split-container" style={{ padding: '28px 36px', width: '100%' }}>
                        <div className="mega-menu-links-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px 40px', width: '100%' }}>
                          {group.subcategories.map((sub) => (
                            <div className="mega-menu-column" key={sub.key}>
                              <a
                                href={`/shop/${group.key.toLowerCase()}/${sub.dbName.toLowerCase().replace(/\s+/g, '-')}`}
                                className="mega-menu-column-heading"
                                onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}/${sub.dbName.toLowerCase().replace(/\s+/g, '-')}`)}
                              >
                                {sub.label ? sub.label.toUpperCase() : ''}
                              </a>
                              {sub.children && sub.children.length > 0 && (
                                <ul className="mega-menu-column-list">
                                  {sub.children.map((child) => {
                                    const rawLabel = child.label || '';
                                    let formattedLabel = rawLabel.trim();
                                    if (formattedLabel.toLowerCase() === 'duppata') formattedLabel = 'Dupatta';
                                    else if (formattedLabel.toLowerCase() === 'formal suites') formattedLabel = 'Formal Suits';
                                    else formattedLabel = formattedLabel.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

                                    return (
                                      <li key={child.key} className="mega-menu-item">
                                        <a
                                          href={`/shop/${group.key.toLowerCase()}/${child.dbName.toLowerCase().replace(/\s+/g, '-')}`}
                                          onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}/${child.dbName.toLowerCase().replace(/\s+/g, '-')}`)}
                                        >
                                          {formattedLabel}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            <li className={`nav-item-meesho ${isNewArrivalsActive() ? 'active' : ''}`}>
              <a href="/NewArrivals" onClick={(e) => handleLinkClick(e, '/NewArrivals')}>New Arrivals</a>
            </li>
            <li className={`nav-item-meesho ${isOffersActive() ? 'active' : ''}`}>
              <a href="/Offers" onClick={(e) => handleLinkClick(e, '/Offers')}>Offers</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          AUTH MODAL OVERLAY
      ──────────────────────────────────────────── */}
      {/* Mobile navigation slide-out Drawer */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="MithraShopy Menu"
        position="left"
        width="290px"
      >
        <div className="mobile-nav-container">
          <ul className="mobile-nav-menu">
            <li className={`mobile-nav-item ${isHomeActive() ? 'active' : ''}`}>
              <a href="/#home" onClick={(e) => handleLinkClick(e, '/#home')}>Home</a>
            </li>
            <li className={`mobile-nav-item ${isShopActive() ? 'active' : ''}`}>
              <a href="/shop" onClick={(e) => handleLinkClick(e, '/shop')}>Shop</a>
            </li>
          </ul>
          
          <Accordion
            items={getUnifiedCategories().map(group => {
              const icon = group.key === 'CLOTHING' ? <Shirt size={16} />
                         : group.key === 'STATIONERY' ? <BookOpen size={16} />
                         : group.key === 'GIFTS' ? <Gift size={16} />
                         : group.key === 'ACCESSORIES' ? <Crown size={16} />
                         : <Shirt size={16} />;
              return {
                id: group.key,
                title: group.name,
                icon: icon,
                content: (
                  <div className="mobile-nav-sub-list">
                    <a
                      href={`/shop/${group.key.toLowerCase()}`}
                      className={`mobile-nav-sub-link heading ${isCategoryActive(group.key) ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}`)}
                    >
                      All {group.name}
                    </a>
                    {group.subcategories.map(sub => {
                      const isSubActive = window.location.pathname.toLowerCase() === `/shop/${group.key.toLowerCase()}/${sub.dbName.toLowerCase().replace(/\s+/g, '-')}`;
                      return (
                        <div key={sub.key} className="mobile-nav-sub-group">
                          <a
                            href={`/shop/${group.key.toLowerCase()}/${sub.dbName.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`mobile-nav-sub-link title ${isSubActive ? 'active' : ''}`}
                            onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}/${sub.dbName.toLowerCase().replace(/\s+/g, '-')}`)}
                          >
                            {sub.label}
                          </a>
                          {sub.children && sub.children.length > 0 && (
                            <div className="mobile-nav-child-list">
                              {sub.children.map(child => {
                                const isChildActive = window.location.pathname.toLowerCase() === `/shop/${group.key.toLowerCase()}/${child.dbName.toLowerCase().replace(/\s+/g, '-')}`;
                                return (
                                  <a
                                    key={child.key}
                                    href={`/shop/${group.key.toLowerCase()}/${child.dbName.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`mobile-nav-sub-link child ${isChildActive ? 'active' : ''}`}
                                    onClick={(e) => handleLinkClick(e, `/shop/${group.key.toLowerCase()}/${child.dbName.toLowerCase().replace(/\s+/g, '-')}`)}
                                  >
                                    {child.label}
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              };
            })}
          />

          <ul className="mobile-nav-menu">
            <li className={`mobile-nav-item ${isNewArrivalsActive() ? 'active' : ''}`}>
              <a href="/NewArrivals" onClick={(e) => handleLinkClick(e, '/NewArrivals')}>New Arrivals</a>
            </li>
            <li className={`mobile-nav-item ${isOffersActive() ? 'active' : ''}`}>
              <a href="/Offers" onClick={(e) => handleLinkClick(e, '/Offers')}>Offers</a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href={
                  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                    ? 'http://localhost:5176'
                    : 'https://seller.mithrashopy.com'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Become a Supplier
              </a>
            </li>
            <li className={`mobile-nav-item ${window.location.pathname.toLowerCase().includes('/lucky-charms') ? 'active' : ''}`}>
              <a href="/lucky-charms" onClick={(e) => handleLinkClick(e, '/lucky-charms')}>Lucky Charms</a>
            </li>
          </ul>
        </div>
      </Drawer>
      
      {authModal && (
        <div className="auth-overlay" onClick={closeModal}>
          <div
            className={`auth-modal-card ${authModal === 'admin' ? 'auth-modal-admin' : 'auth-modal-user'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="auth-close-btn" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>
            
            {/* ── USER MODAL ── */}
            {authModal === 'user' && (
              <div className="auth-user-content">
                <div className="auth-user-header">
                  <div className="auth-user-header-glow" />
                  <img src={`${logoImg}?v=2`} alt="Logo" className="auth-user-logo" />
                  <div className="auth-user-brand">
                    <span className="auth-brand-mithira">Mithra</span>
                    <span className="auth-brand-shopy">Shopy</span>
                  </div>
                  <p className="auth-user-tagline">Your style. Your story.</p>
                </div>
                
                <div className="auth-user-tabs">
                  <button
                    className={`auth-user-tab ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('login'); setUserLoginError(''); setRegError(''); }}
                    type="button"
                  >Sign In</button>
                  <button
                    className={`auth-user-tab ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('register'); setUserLoginError(''); setRegError(''); }}
                    type="button"
                  >New Account</button>
                </div>
                
                <div className="auth-user-body">
                  {activeTab === 'login' && (
                    <form className="auth-form" onSubmit={handleUserLogin} noValidate>
                      {userLoginError && <div className="auth-error-msg">{userLoginError}</div>}
                      <div className="auth-field-group">
                        <label className="auth-label">Email Address</label>
                        <input
                          className="auth-input"
                          type="email"
                          placeholder="Enter your email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="auth-field-group">
                        <label className="auth-label">Password</label>
                        <div className="auth-pwd-wrap">
                          <input
                            className="auth-input"
                            type={showUserPwd ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                          />
                          <button type="button" className="auth-eye-btn" onClick={() => setShowUserPwd(!showUserPwd)}>
                            {showUserPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="auth-forgot-row">
                        <a href="#" className="auth-forgot-link">Forgot Password?</a>
                      </div>
                      <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in…' : 'Login to Account'}
                      </button>
                      <p className="auth-switch-text">
                        New here?{' '}
                        <button
                          type="button"
                          className="auth-switch-link"
                          onClick={() => { setActiveTab('register'); setUserLoginError(''); }}
                        >
                          Create Account
                        </button>
                      </p>
                    </form>
                  )}
                  {activeTab === 'register' && (
                    <form className="auth-form" onSubmit={handleRegister} noValidate>
                      {regError && <div className="auth-error-msg">{regError}</div>}
                      <div className="auth-field-group">
                        <label className="auth-label">Full Name <span className="auth-required">*</span></label>
                        <input
                          className="auth-input"
                          type="text"
                          placeholder="Enter your full name"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="auth-field-group">
                        <label className="auth-label">Email Address <span className="auth-required">*</span></label>
                        <input
                          className="auth-input"
                          type="email"
                          placeholder="Enter your email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="auth-reg-two-col">
                        <div className="auth-field-group">
                          <label className="auth-label">Mobile Number</label>
                          <input
                            className="auth-input"
                            type="tel"
                            placeholder="Mobile number"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                          />
                        </div>
                        <div className="auth-field-group">
                          <label className="auth-label">Password <span className="auth-required">*</span></label>
                          <div className="auth-pwd-wrap">
                            <input
                              className="auth-input"
                              type={showRegPwd ? 'text' : 'password'}
                              placeholder="Min 6 characters"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              required
                            />
                            <button type="button" className="auth-eye-btn" onClick={() => setShowRegPwd(!showRegPwd)}>
                              {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account…' : 'Create Account'}
                      </button>
                      <p className="auth-switch-text">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="auth-switch-link"
                          onClick={() => { setActiveTab('login'); setRegError(''); }}
                        >
                          Sign In
                        </button>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
