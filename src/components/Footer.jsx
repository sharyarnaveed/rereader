import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/product" },
    { label: "Policy", url: "/about" },
    { label: "Contact", url: "/contact" },
  ];

  return (
    <footer className="bg-white pt-12 pb-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#07484A] via-[#70908B] to-white"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#70908B]/10"></div>
      <div className="absolute -top-8 right-12 w-16 h-16 rounded-full bg-[#07484A]/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo Section with subtle animation */}
          <div className="md:col-span-4 space-y-4">
            <div className="inline-block transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-[var(--headingfonts)] text-3xl font-bold text-[var(--maintextcolor)] tracking-wide">
                ReReader
              </h3>
              <div className="h-1 w-16 bg-[--btn-color] mt-2 rounded-full"></div>
            </div>
            <p className="text-[var(--btn-color)] font-[var(--normalfont)] mt-3">
              Your ultimate reading companion that transforms the way you experience books.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <a href="#" className="group p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-[var(--maintextcolor)] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                    className="text-[--btn-color] group-hover:text-white transition-colors" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="group p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-[var(--maintextcolor)] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                    className="text-[--btn-color] group-hover:text-white transition-colors" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links with hover effect */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {navLinks.map((link) => (
                <div key={link.label} className="text-center sm:text-left">
                  <Link 
                    to={link.url}
                    className="inline-block font-[var(--normalfont)] text-[var(--maintextcolor)] font-medium hover:text-[--btn-color] transition-all duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--btn-color] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-12 bg-gradient-to-r from-[#07484A]/10 to-transparent p-6 rounded-lg">
              <h4 className="text-[var(--maintextcolor)] font-[var(--headingfonts)] font-bold mb-3">Join our newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 border border-gray-200 rounded-md flex-grow focus:outline-none focus:ring-1 focus:ring-[var(--btn-color)] font-[var(--normalfont)]" 
                />
                <button className="px-5 py-2 bg-[var(--btn-color)] text-white rounded-md hover:bg-[var(--maintextcolor)] transition-colors font-[var(--normalfont)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar with copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-[var(--btn-color)] font-[var(--normalfont)] mb-4 sm:mb-0">
              © {new Date().getFullYear()} ReReader. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-[var(--btn-color)]">
              <a href="#" className="hover:text-[var(--maintextcolor)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--maintextcolor)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;