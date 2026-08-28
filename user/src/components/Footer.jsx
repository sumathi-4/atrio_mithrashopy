import React, { useState, useEffect } from 'react';
import { ChevronRight, Shirt, BookOpen, Gift, Crown, Star, Tag, Users, ShoppingBag, UserCheck, Store } from 'lucide-react';
import { apiService } from '../services/apiService';
import newsletterGiftsImg from '../assets/newsletter_gifts.png';
import newsletterPerfumeImg from '../assets/newsletter_perfume.png';
import logoImg from '../assets/logo.png';

// --- Navigation helper (same pattern as Navbar) ---
const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
};

// --- Razorpay visible badge ---
const RazorpayBadge = () => (
  <span className="footer-razorpay-badge" aria-label="Razorpay">
    <svg viewBox="0 0 90 28" width="86" height="26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="90" height="28" rx="5" fill="#ffffff" />
      {/* Blue lightning bolt */}
      <polygon points="18,5 12,15 17,15 11,23 21,11 16,11" fill="#3395FF" />
      <text x="26" y="18" fill="#072654" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.5">Razorpay</text>
    </svg>
  </span>
);

// ─── Default Real Categories Fallback Group ─────────────
const DEFAULT_CLOUD_GROUPS = [
  {
    title: 'CLOTHING & ETHNIC WEAR',
    tags: [
      { name: 'All Clothing', path: '/shop/clothing' },
      { name: 'Sarees', path: '/shop?category=Clothing&search=Saree' },
      { name: 'Kurtas & Kurtis', path: '/shop?category=Clothing&search=Kurti' },
      { name: 'Ethnic Wear', path: '/shop?category=Clothing&search=Ethnic' },
      { name: "Men's Wear", path: '/shop?category=Clothing&search=Men' },
      { name: "Kids Clothing", path: '/shop?category=Clothing&search=Kids' },
      { name: 'Frocks & Gowns', path: '/shop?category=Clothing&search=Frock' },
      { name: 'T-Shirts & Tops', path: '/shop?category=Clothing&search=T-Shirt' },
      { name: 'Suits', path: '/shop?category=Clothing&search=Suit' }
    ]
  },
  {
    title: 'STATIONERY & OFFICE',
    tags: [
      { name: 'All Stationery', path: '/shop/stationery' },
      { name: 'Journals & Notebooks', path: '/shop?category=Stationery&search=Notebook' },
      { name: 'Diaries', path: '/shop?category=Stationery&search=Diary' },
      { name: 'Pens & Art Supplies', path: '/shop?category=Stationery&search=Pen' },
      { name: 'Desk Organizers', path: '/shop?category=Stationery&search=Organizer' },
      { name: 'Papercrafts', path: '/shop?category=Stationery&search=Papercraft' }
    ]
  },
  {
    title: 'GIFTS & CELEBRATIONS',
    tags: [
      { name: 'All Gifts', path: '/shop/gifts' },
      { name: 'Gift Hampers', path: '/shop?category=Gifts&search=Hamper' },
      { name: 'Personalized Gifts', path: '/shop?category=Gifts&search=Personalized' },
      { name: 'Festive Decor', path: '/shop?category=Gifts&search=Decor' },
      { name: 'Gift Sets', path: '/shop?category=Gifts&search=Gift' },
      { name: 'Voucher Offers', path: '/offers' }
    ]
  },
  {
    title: 'ACCESSORIES & JEWELLERY',
    tags: [
      { name: 'All Accessories', path: '/shop/accessories' },
      { name: 'Jewellery & Necklaces', path: '/shop?category=Accessories&search=Jewellery' },
      { name: 'Hair Accessories', path: '/shop?category=Accessories&search=Hair' },
      { name: 'Bags & Totes', path: '/shop?category=Accessories&search=Bag' },
      { name: 'Earrings & Jhumkas', path: '/shop?category=Accessories&search=Earring' }
    ]
  }
];

// ─── SHOP links — real routes only ───────────────────────
const SHOP_LINKS = [
  { label: 'All Products',  path: '/shop',              exact: true },
  { label: 'Clothing',      path: '/shop/clothing',     exact: false },
  { label: 'Stationery',    path: '/shop/stationery',   exact: false },
  { label: 'Gifts',         path: '/shop/gifts',        exact: false },
  { label: 'Accessories',   path: '/shop/accessories',  exact: false },
  { label: 'New Arrivals',  path: '/newarrivals',       exact: false },
  { label: 'Offers',        path: '/offers',            exact: false },
  { label: 'Celebrity',     path: '/celebrity',         exact: false },
];

// ─── MY ACCOUNT links — real routes only ─────────────────
const ACCOUNT_LINKS = [
  { label: 'My Account',    path: '/account',            tab: null,     exact: false },
  { label: 'My Orders',     path: '/account?tab=orders', tab: 'orders', exact: false },
  { label: 'My Wishlist',   path: '/account?tab=wishlist', tab: 'wishlist', exact: false },
  { label: 'Login / Register', path: null, openAuth: true },
];

// ─── Helper: is a path active? ───────────────────────────
const isActive = (linkPath, currentPath) => {
  if (!linkPath) return false;
  const clean = linkPath.split('?')[0].toLowerCase();
  const cur   = currentPath.split('?')[0].toLowerCase();
  if (clean === '/shop' && cur === '/shop') return true;
  if (clean !== '/shop' && cur.startsWith(clean)) return true;
  return false;
};

export default function Footer({ authUser, onNavigate }) {
  const [settings, setSettings] = useState({
    storeName: 'MithiraShopy',
  });
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);
  const [cloudGroups, setCloudGroups] = useState(DEFAULT_CLOUD_GROUPS);

  // Track current path for active link highlighting
  useEffect(() => {
    const onNav = () => setCurrentPath(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onNav);
    return () => window.removeEventListener('popstate', onNav);
  }, []);

  useEffect(() => {
    apiService.getSettings().then(data => {
      if (data) {
        setSettings({ storeName: data.storeName || 'MithiraShopy' });
      }
    }).catch(() => {});

    // Dynamically build category tag cloud strictly from real database subcategories (matching Navbar)
    apiService.getCategories().then(dbCategories => {
      if (Array.isArray(dbCategories) && dbCategories.length > 0) {
        const activeCats = dbCategories.filter(c => c.name && c.name !== '—' && c.status !== 'Inactive');

        // Helper to check if a category belongs to a root parent family
        const isUnderRoot = (cat, rootName) => {
          let curr = cat;
          const visited = new Set();
          while (curr && curr.parent && curr.parent !== '—' && !visited.has(curr.name)) {
            visited.add(curr.name);
            const pLower = curr.parent.toLowerCase().trim();
            const rLower = rootName.toLowerCase().trim();
            if (pLower === rLower || pLower.includes(rLower)) return true;
            curr = activeCats.find(c => c.name.toLowerCase().trim() === pLower);
          }
          return false;
        };

        // Extract ONLY real subcategories (categories that have a parent in db)
        const getSubTagsForRoot = (rootNames) => {
          const tags = [];
          activeCats.forEach(cat => {
            const hasParent = cat.parent && cat.parent !== '—';
            if (hasParent) {
              const belongs = rootNames.some(r => isUnderRoot(cat, r));
              if (belongs) {
                const name = cat.name.trim();
                if (!tags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
                  tags.push({
                    name: name,
                    path: `/shop?search=${encodeURIComponent(name)}`
                  });
                }
              }
            }
          });
          return tags;
        };

        const clothingTags = getSubTagsForRoot(['Clothing', 'Women', 'Men', 'Kids']);
        const stationeryTags = getSubTagsForRoot(['Stationery']);
        const giftsTags = getSubTagsForRoot(['Gifts']);
        const accessoriesTags = getSubTagsForRoot(['Accessories', 'Jewellery']);

        const dynamicGroups = [];
        if (clothingTags.length > 0) dynamicGroups.push({ title: 'CLOTHING & ETHNIC WEAR', tags: clothingTags });
        if (stationeryTags.length > 0) dynamicGroups.push({ title: 'STATIONERY & OFFICE', tags: stationeryTags });
        if (giftsTags.length > 0) dynamicGroups.push({ title: 'GIFTS & CELEBRATIONS', tags: giftsTags });
        if (accessoriesTags.length > 0) dynamicGroups.push({ title: 'ACCESSORIES & JEWELLERY', tags: accessoriesTags });

        setCloudGroups(dynamicGroups);
      }
    }).catch(console.error);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  const handleShopNav = (e, link) => {
    e.preventDefault();
    navigate(link.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountNav = (e, link) => {
    e.preventDefault();
    if (link.openAuth) {
      window.dispatchEvent(new CustomEvent('mithira_open_auth_modal', { detail: { type: 'user' } }));
      return;
    }
    navigate(link.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area">

      {/* ─── Main Footer Section (Tag Cloud INSIDE Footer Main) ─── */}
      <div className="footer-main">

        {/* AJIO-Style Category Keyword Tag Cloud Section */}
        <div className="footer-category-cloud-section">
          <div className="footer-category-cloud-inner">
            {cloudGroups.map((catGroup, idx) => (
              <div key={idx} className="footer-cloud-group">
                <h4 className="footer-cloud-group-title">{catGroup.title}</h4>
                <div className="footer-cloud-tags-row">
                  {catGroup.tags.map((tag, tagIdx) => (
                    <a
                      key={tagIdx}
                      href={tag.path}
                      className="footer-cloud-tag-pill"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(tag.path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {tag.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-main-inner">

          {/* Brand Column */}
          <div className="footer-brand-col">
            <a
              href="/"
              onClick={e => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="footer-logo-link"
            >
              <img src={logoImg} alt={settings.storeName} className="footer-logo-img" />
            </a>
            <p className="footer-brand-tagline">Style for Every Moment</p>
            <p className="footer-brand-desc">
              Premium ethnic wear, stationery, gifts &amp; accessories — curated for the moments that matter.
            </p>
          </div>

          {/* Shop Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">
              <span>SHOP</span>
            </h4>
            <ul className="footer-nav-list">
              {SHOP_LINKS.map(link => {
                const active = isActive(link.path, currentPath);
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className={`footer-nav-link${active ? ' footer-nav-link--active' : ''}`}
                      onClick={e => handleShopNav(e, link)}
                      aria-current={active ? 'page' : undefined}
                    >
                      <ChevronRight size={12} className="footer-nav-chevron" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* My Account Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">
              <span>MY ACCOUNT</span>
            </h4>
            <ul className="footer-nav-list">
              {ACCOUNT_LINKS.map(link => {
                const active = link.path ? isActive(link.path, currentPath) : false;
                return (
                  <li key={link.label}>
                    <a
                      href={link.path || '#'}
                      className={`footer-nav-link${active ? ' footer-nav-link--active' : ''}`}
                      onClick={e => handleAccountNav(e, link)}
                      aria-current={active ? 'page' : undefined}
                    >
                      <ChevronRight size={12} className="footer-nav-chevron" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sell With Us Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">
              <span>SELL WITH US</span>
            </h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/seller-portal"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('/seller-portal');
                    } else {
                      navigate('/seller-portal');
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="footer-nav-link"
                  style={{ color: '#DFB743', fontWeight: '700' }}
                >
                  <ChevronRight size={12} className="footer-nav-chevron" />
                  Become a Seller (0% Commission) 🚀
                </a>
              </li>
              <li>
                <a
                  href={
                    import.meta.env.VITE_SELLER_PORTAL_URL ||
                    (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                      ? 'http://localhost:5176'
                      : 'https://mithrashopy-seller.netlify.app')
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  <ChevronRight size={12} className="footer-nav-chevron" />
                  Seller Portal Login
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ─── Footer Bottom Bar ───────────────────────────── */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-left">
            <span className="footer-copyright">
              © {currentYear}{' '}
              <strong className="footer-copyright-brand">{settings.storeName}</strong>
              . All rights reserved. Designed &amp; Developed by{' '}
              <span className="footer-copyright-dev">Atriowings Technologies India Private Limited</span>
            </span>
          </div>
          <div className="footer-bottom-right">
            <span className="footer-payment-label">Secure payments via</span>
            <RazorpayBadge />
          </div>
        </div>
      </div>

    </footer>
  );
}
