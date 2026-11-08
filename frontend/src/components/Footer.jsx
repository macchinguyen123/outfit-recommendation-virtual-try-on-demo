import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#EAEAEA] bg-white mt-24 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs tracking-widest uppercase text-black">AURAFIT</span>
          <span className="text-xs text-[#71717A]">/ Outfit Recommendation & CatVTON Studio</span>
        </div>
        <p className="text-xs text-[#71717A] font-mono">
          Polyvore Outfits Dataset • CatVTON Latent Diffusion • React & Spring Boot
        </p>
      </div>
    </footer>
  );
}
