import React from 'react'
import { getSellerPortalUrl } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'
import SectionReveal from './SectionReveal'

const defaultCategories = [
  { id: 'ethnic', name: 'Ethnic Wear & Sarees', buyersBrowsing: 14250, image: MEDIA.CATEGORY_ETHNIC, tag: 'High Margin' },
  { id: 'jewellery', name: 'Handcrafted Jewellery', buyersBrowsing: 18400, image: MEDIA.CATEGORY_JEWELLERY, tag: 'Top Trend' },
  { id: 'kids', name: 'Kids Clothing & Wear', buyersBrowsing: 9820, image: MEDIA.CATEGORY_KIDS, tag: 'Fast Growing' },
  { id: 'stationery', name: 'School & Office Stationery', buyersBrowsing: 7150, image: MEDIA.CATEGORY_STATIONERY, tag: 'High Volume' },
  { id: 'gifts', name: 'Luxury Gifts & Decor', buyersBrowsing: 12600, image: MEDIA.CATEGORY_GIFTS, tag: 'Festive Favorite' },
]

export default function CategoriesSection({ categoriesData = defaultCategories, sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  return (
    <SectionReveal
      id="categories"
      watermark="CATEGORIES"
      className="categories-section"
    >
      <div className="categories-container">
        
        {/* Section Header Block matching img2 & img3 100% */}
        <div className="categories-header-block">
          <span className="categories-tag">
            HIGH-DEMAND MARKETPLACE CATEGORIES
          </span>

          <h2 className="categories-heading">
            Explore Top Selling <span className="gold-gradient-text">Categories</span>
          </h2>

          <p className="categories-subtitle">
            Millions of active buyers across India search for authentic products in these key categories<br className="hidden md:inline" /> every single day.
          </p>
        </div>

        {/* 5-Column Grid Layout matching img2 & img3 */}
        <div className="categories-grid">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className="category-card group"
              tabIndex={0}
            >
              {/* Image Box */}
              <div className="category-image-wrap">
                <img
                  src={cat.image}
                  alt={`${cat.name} products category showcase on MithraShopy`}
                  loading="lazy"
                  className="category-image"
                />

                {/* Top Left Yellow Badge matching img2 & img3 */}
                <span className="category-badge-top">
                  {cat.tag || 'Trending'}
                </span>
              </div>

              {/* Card Body */}
              <div className="category-card-body">
                <div>
                  <h3 className="category-card-title">
                    {cat.name}
                  </h3>
                  <p className="category-card-desc">
                    High Demand & Premium Margins
                  </p>
                </div>

                <div>
                  <div className="category-card-divider" />
                  <a
                    href={registerUrl}
                    className="category-card-cta"
                    aria-label={`Start selling in ${cat.name} category`}
                  >
                    <span>Start Selling In Category</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
