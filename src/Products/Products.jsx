import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const [products, SetProducts] = useState([]);

  const categories = [
    "All",
    "Primary Class",
    "Secondary Class",
    "Higher Secondary Class",
    "Higher Education",
    "Competitive Exams",
    "Professional Courses",
  ];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const getproducts = async () => {
    try {
      const responce = await axios.get("/api/user/allproducts");
      console.log(responce.data);
      SetProducts(responce.data.productdata);
    } catch (error) {
      console.log("error in getting products", errors);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"></div>

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="font-[var(--headingfonts)] text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Collection
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-500 max-w-lg mx-auto text-sm font-[var(--normalfont)]">
              Curated reading essentials designed with simplicity and
              functionality in mind
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-16 gap-1 md:gap-3 ">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16">
            {filteredProducts.map((product) => (
              <div
                key={product.productid}
                className="group bg-white overflow-hidden transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={`http://localhost:3000/${product.image1
                      .replace("public\\", "public/")
                      .replace(/\\/g, "/")}`}
                    alt={product.producname}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500"></div>

                  {product.isNew && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white text-gray-800 text-[10px] sm:text-xs py-1 px-2">
                      NEW
                    </div>
                  )}

                </div>

                <div className="p-3 sm:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[var(--normalfont)] text-sm sm:text-base text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                      {product.producname}
                    </h3>

                    <div className="text-right">
                      {product.discount ? (
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-medium text-gray-800">
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/product-detail`,{
                        state:{product},
                        replace:false
                      })

                    }
                    className=" cursor-pointer w-full py-1.5 sm:py-2 mt-3 bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center ${
                  page === 1
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
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
