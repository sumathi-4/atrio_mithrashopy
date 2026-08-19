import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CategoryCards from './components/CategoryCards';
import VideoShowcase from './components/VideoShowcase';
import ProductsSection from './components/ProductsSection';
import CelebrityCollection from './components/CelebrityCollection';
import Footer from './components/Footer';
import ShopView from './components/ShopView';
import ContactView from './components/ContactView';
import AboutView from './components/AboutView';
import OffersView from './components/OffersView';
import NewArrivalsView from './components/NewArrivalsView';
import CelebrityView from './components/CelebrityView';
import WhyChooseUs from './components/WhyChooseUs';
import UserAccount from './components/UserAccount';
import LuckyCharmModal from './components/LuckyCharmModal';
import LuckyCharmPage from './components/LuckyCharmPage';
import { ToastProvider } from './components/ToastProvider';
import { verifySession, getStoredUser, getStoredToken, logout } from './services/authService';
import CustomFeatureSection from './components/CustomFeatureSection';
import { apiService } from './services/apiService';

const SellerPromoPage = React.lazy(() => import('./features/seller-promo/SellerPromoPage'));

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [authUser, setAuthUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [features, setFeatures] = useState([]);

  // ── Load website functionalities/features ─────────────────────────
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await apiService.getFeatures();
        if (data) {
          setFeatures(data);
        }
      } catch (e) {
        console.error('Error fetching features:', e);
      }
    };
    fetchFeatures();
    // Background prefetch products for instant loading
    apiService.getProducts().catch(() => {});

    const handleUpdate = () => fetchFeatures();
    window.addEventListener('mithira_features_update', handleUpdate);
    return () => window.removeEventListener('mithira_features_update', handleUpdate);
  }, []);

  const renderFeature = (feature) => {
    if (feature.status !== 'Active') return null;

    switch (feature.key) {
      case 'hero':
        return <Hero key="hero" />;
      case 'trust_bar':
        return <TrustBar key="trust_bar" />;
      case 'categories':
        return <CategoryCards key="categories" />;
      case 'video_showcase':
        return <VideoShowcase key="video_showcase" />;
      case 'exclusive_products':
        return <ProductsSection key="exclusive_products" authUser={authUser} setAuthUser={setAuthUser} />;
      case 'celebrity_collection':
        return null;
      case 'why_choose_us':
        return null;
      default:
        return (
          <CustomFeatureSection
            key={feature.key}
            name={feature.name}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        );
    }
  };

  // ── Restore session on page load ──────────────────────────────────
  useEffect(() => {
    const storedUser = getStoredUser();
    const token = getStoredToken();
    if (storedUser && token) {
      setAuthUser(storedUser);
      verifySession().then((freshUser) => {
        if (freshUser) {
          setAuthUser(freshUser);
        } else if (!getStoredToken()) {
          setAuthUser(null);
        }
      }).finally(() => setSessionChecked(true));
    } else {
      setAuthUser(null);
      setSessionChecked(true);
    }
  }, []);

  // ── Path-based routing ────────────────────────────────────────────
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/account')) {
        setCurrentView('account');
      } else if (path.includes('/shop')) {
        setCurrentView('shop');
      } else if (path.includes('/offers')) {
        setCurrentView('offers');
      } else if (path.includes('/newarrivals') || path.includes('/new-arrivals')) {
        setCurrentView('new-arrivals');
      } else if (path.includes('/celebrity')) {
        setCurrentView('celebrity');
      } else if (path.includes('/lucky-charms')) {
        setCurrentView('lucky-charms');
      } else if (path.includes('/seller-portal') || path.includes('/seller-promo') || path.includes('/sell-with-us') || path.includes('/sell')) {
        setCurrentView('seller-promo');
      } else {
        setCurrentView('home');
      }
    };
    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  // ── Auto-popup Login Modal when visiting /account unauthenticated ──
  useEffect(() => {
    if (sessionChecked && !authUser && currentView === 'account') {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mithira_open_auth_modal', { detail: { type: 'user' } }));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [sessionChecked, authUser, currentView]);

  // ── 1-Minute Automated Login Reminder Popup for Guest Browsing ──
  useEffect(() => {
    if (sessionChecked && !authUser) {
      const hasShownReminder = sessionStorage.getItem('mithira_login_reminder_shown');
      if (!hasShownReminder) {
        const timer = setTimeout(() => {
          window.dispatchEvent(new CustomEvent('mithira_open_auth_modal', { detail: { type: 'user' } }));
          sessionStorage.setItem('mithira_login_reminder_shown', 'true');
        }, 60000); // 1 minute (60 seconds)
        return () => clearTimeout(timer);
      }
    }
  }, [sessionChecked, authUser]);

  // ── Scroll hash handling ──────────────────────────────────────────
  useEffect(() => {
    if (currentView === 'home') {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentView, window.location.hash]);

  // ── Back to Top visibility ────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path) => {
    if (path === '/admin') {
      setCurrentView('admin');
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <ToastProvider>
      {currentView !== 'admin' && currentView !== 'lucky-charms' && currentView !== 'seller-promo' && (
        <Navbar authUser={authUser} setAuthUser={setAuthUser} onNavigate={handleNavigate} />
      )}
      {currentView === 'home' && (
        <>
          {features && features.length > 0 ? (
            features.map(f => renderFeature(f))
          ) : (
            <>
              <Hero />
              <TrustBar />
              <CategoryCards />
              <VideoShowcase />
              <ProductsSection authUser={authUser} setAuthUser={setAuthUser} />
              <CelebrityCollection />
              <WhyChooseUs />
            </>
          )}
        </>
      )}
      {currentView === 'shop' && <ShopView authUser={authUser} setAuthUser={setAuthUser} />}
      {currentView === 'offers' && <OffersView />}
      {currentView === 'new-arrivals' && <NewArrivalsView />}
      {currentView === 'celebrity' && <CelebrityView />}
      {currentView === 'lucky-charms' && <LuckyCharmPage authUser={authUser} setAuthUser={setAuthUser} onNavigate={handleNavigate} />}
      {currentView === 'seller-promo' && (
        <Suspense fallback={<div>Loading...</div>}>
          <SellerPromoPage />
        </Suspense>
      )}
      {currentView === 'account' && (
        <UserAccount
          authUser={authUser}
          setAuthUser={setAuthUser}
          onNavigate={handleNavigate}
        />
      )}
      {currentView !== 'lucky-charms' && currentView !== 'seller-promo' && <Footer onNavigate={handleNavigate} />}
      <LuckyCharmModal />

      {/* ── Back to Top Button ───────────────────────────────────── */}
      {showBackTop && (
        <button
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </ToastProvider>
  );
}

export default App;
