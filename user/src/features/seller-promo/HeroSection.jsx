import React from 'react'

export default function HeroSection({ sellerPortalUrl }) {
  const registerUrl = `${sellerPortalUrl.replace(/\/$/, '')}/register`

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#06122E] m-0 p-0">
      <a href={registerUrl} className="block w-full relative cursor-pointer m-0 p-0">
        <img
          src="/seller-header-banner.png"
          alt="MithraShopy Seller Portal - Grow Your Heritage Business Online"
          className="w-full h-auto object-cover block m-0 p-0 shadow-2xl"
        />
      </a>
    </section>
  )
}
