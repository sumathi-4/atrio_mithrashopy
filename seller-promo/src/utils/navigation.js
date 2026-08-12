/**
 * Helper to resolve the active Seller Portal base URL with robust fallback to http://localhost:5176
 */
export function getSellerPortalUrl() {
  const envUrl = import.meta.env.VITE_SELLER_PORTAL_URL || ''
  if (!envUrl || envUrl.includes('[YOUR-SELLER-PORTAL-DOMAIN]')) {
    return 'http://localhost:5176'
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
