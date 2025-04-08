import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const products = [
    {
      id: 1,
      name: "Classic Reader Pro",
      category: "E-Readers",
      price: 129.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Premium e-reader with extended battery life and paper-like display.",
      isNew: true,
      discount: null
    },
    {
      id: 2,
      name: "BookMate Mini",
      category: "Accessories",
      price: 49.99,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Compact reading stand with adjustable angles for maximum comfort.",
      isNew: false,
      discount: 10
    },
    {
      id: 3,
      name: "LiteLamp Reading Light",
      category: "Accessories",
      price: 24.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Clip-on book light with adjustable brightness levels.",
      isNew: true,
      discount: null
    },
    {
      id: 4,
      name: "PageKeeper Deluxe",
      category: "Bookmarks",
      price: 12.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Set of premium magnetic bookmarks that never fall out.",
      isNew: false,
      discount: 15
    },
    {
      id: 5,
      name: "BookShelf Elite",
      category: "Storage",
      price: 199.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Elegant bookshelf with adjustable compartments and integrated lighting.",
      isNew: false,
      discount: null
    },
    {
      id: 6,
      name: "ReadTogether Bundle",
      category: "Gift Sets",
      price: 79.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Perfect gift set for book lovers with multiple reading accessories.",
      isNew: true,
      discount: 20
    }
  ];

  const categories = ["All", "E-Readers", "Accessories", "Bookmarks", "Storage", "Gift Sets"];
 

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };


const filteredProducts=activeCategory==="All" ? products : products.filter(product=>product.category===activeCategory)

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-20">
        {/* Minimal subtle background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Minimal elegant header */}
          <div className="mb-16 text-center">
            <h1 className="font-[var(--headingfonts)] text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Collection
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-500 max-w-lg mx-auto text-sm font-[var(--normalfont)]">
              Curated reading essentials designed with simplicity and functionality in mind
            </p>
          </div>

          {/* Minimal categories */}
          <div className="flex flex-wrap justify-center mb-16 gap-1 md:gap-3">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Minimalist product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="group bg-white overflow-hidden transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Minimal overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500"></div>
                  
                  {/* Minimal badges */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-white text-gray-800 text-xs py-1 px-2">
                      NEW
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute bottom-4 left-4 bg-gray-800 text-white text-xs py-1 px-2">
                      {product.discount}% OFF
                    </div>
                  )}
                  
                  {/* Hidden action button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/product-detail/${product.id}`} className="bg-white/90 text-gray-800 py-2 px-4 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
                
                {/* Product info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[var(--normalfont)] text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    {/* Minimal price display */}
                    <div className="text-right">
                      {product.discount ? (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-800">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Minimal category and rating */}
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{product.category}</span>
                    <div className="flex items-center">
                      <span className="mr-1">{product.rating}</span>
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Minimal add to cart button */}
                  <button className="w-full py-2 mt-3 bg-white border border-gray-200 text-gray-800 text-sm hover:bg-gray-800 hover:text-white transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Minimal pagination */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map(page => (
              <button 
                key={page} 
                className={`w-8 h-8 flex items-center justify-center ${
                  page === 1 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;