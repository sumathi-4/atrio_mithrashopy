import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/apiService';
import imgAccessories from '../assets/cat_accessories.jpg';
import imgHandcrafts from '../assets/cat_handcrafts.jpg';
import imgStationery from '../assets/cat_stationery.jpg';
import imgWomenOfficewear from '../assets/cat_women_officewear.jpg';
import imgGirlsDress from '../assets/cat_girls_dress.jpg';
import imgEthnicWear from '../assets/cat_ethnic_wear.jpg';
import imgSarees from '../assets/cat_sarees.jpg';
import imgMenwear from '../assets/cat_menwear.jpg';

// Default images mapped to category names (case-insensitive)
const DEFAULT_IMAGES = {
  clothing: imgWomenOfficewear,
  'women officewear': imgWomenOfficewear,
  women: imgWomenOfficewear,
  stationery: imgStationery,
  gifts: imgHandcrafts,
  handcrafts: imgHandcrafts,
  accessories: imgAccessories,
  'accessories & fancy': imgAccessories,
  fancy: imgAccessories,
  'girls dress': imgGirlsDress,
  girls: imgGirlsDress,
  kids: imgGirlsDress,
  'ethnic wear': imgEthnicWear,
  ethnic: imgEthnicWear,
  sarees: imgSarees,
  saree: imgSarees,
  menwear: imgMenwear,
  men: imgMenwear,
  'mens wear': imgMenwear,
};

// Fallback category list containing all 8 top categories with identical 3D card design
const FALLBACK_CATEGORIES = [
  { name: 'Clothing', image: imgWomenOfficewear },
  { name: 'Stationery', image: imgStationery },
  { name: 'Gifts', image: imgHandcrafts },
  { name: 'Accessories', image: imgAccessories },
  { name: 'Girls Dress', image: imgGirlsDress },
  { name: 'Ethnic Wear', image: imgEthnicWear },
  { name: 'Sarees', image: imgSarees },
  { name: 'Menwear', image: imgMenwear },
];

const resolveCategoryImage = (imageVal, key) => {
  if (!imageVal) return DEFAULT_IMAGES[key] || imgWomenOfficewear;
  const str = String(imageVal).toLowerCase();
  const isReal = str.startsWith('http') || str.startsWith('/') || str.startsWith('data:') || /\.(jpg|jpeg|png|webp|gif|svg|avif)(\?|$)/.test(str);
  
  if (isReal) {
    if (str.startsWith('/uploads/') || str.startsWith('uploads/')) {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const cleanPath = imageVal.startsWith('/') ? imageVal : `/${imageVal}`;
      return `${BASE_URL}${cleanPath}`;
    }
    return imageVal;
  }
  return DEFAULT_IMAGES[key] || imgWomenOfficewear;
};

export default function CategoryCards() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    apiService
      .getCategories()
      .then((data) => {
        if (data && data.length > 0) {
          const roots = data.filter(
            (c) =>
              (!c.parent || c.parent === '—' || c.parent === '') &&
              c.status === 'Active' &&
              c.showInCategories !== false
          );
          
          const dbCategories = roots.map((c) => {
            const key = c.name.toLowerCase().trim();
            return {
              name: c.name,
              image: resolveCategoryImage(c.image, key),
            };
          });

          // Merge: Start with DB categories, then append missing FALLBACK_CATEGORIES
          const merged = [...dbCategories];
          FALLBACK_CATEGORIES.forEach((fallback) => {
            const exists = merged.some(
              (item) => item.name.toLowerCase().trim() === fallback.name.toLowerCase().trim()
            );
            if (!exists) {
              merged.push(fallback);
            }
          });

          setCategories(merged);
        }
      })
      .catch(() => {/* keep fallback */});
  }, []);

  useEffect(() => {
    if (stripRef.current) {
      stripRef.current.scrollLeft = 0;
    }
  }, [categories]);

  const handleClick = (catName) => {
    window.history.pushState({}, '', `/shop/${catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const scrollLeft = () => stripRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => stripRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  return (
    <section id="categories" className="sbc-section">
      {/* ── Scroll Strip ── */}
      <div className="sbc-strip-wrapper">
        <button className="sbc-arrow sbc-arrow-left" onClick={scrollLeft} aria-label="Scroll left">&#8249;</button>

        <div className="sbc-strip" ref={stripRef}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="sbc-card sbc-skeleton" />
              ))
            : categories.map((cat, i) => (
                <button
                  key={i}
                  className="sbc-card"
                  onClick={() => handleClick(cat.name)}
                  aria-label={`Shop ${cat.name}`}
                >
                  {/* 3‑D card face */}
                  <div className="sbc-card-face">
                    <img src={cat.image} alt={cat.name} className="sbc-card-img" />
                    {/* bottom label overlay */}
                    <div className="sbc-card-label-wrap">
                      <span className="sbc-card-label">{cat.name}</span>
                    </div>
                    {/* shine sweep on hover */}
                    <div className="sbc-card-shine" aria-hidden="true" />
                  </div>
                  {/* 3‑D edge / depth illusion */}
                  <div className="sbc-card-edge" aria-hidden="true" />
                  <div className="sbc-card-shadow" aria-hidden="true" />
                </button>
              ))}
        </div>

        <button className="sbc-arrow sbc-arrow-right" onClick={scrollRight} aria-label="Scroll right">&#8250;</button>
      </div>
    </section>
  );
}


