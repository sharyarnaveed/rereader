import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import bgimage from "../assets/img/bgimage.png";
import Footer from "../components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {


const [Allproduct,setAllproducts]=useState([])



  const navigate = useNavigate();

const gethomeproducts=async()=>{
  try {
    const responce=await axios.get("/api/user/gethomproducts")
    console.log(responce.data);
    setAllproducts(responce.data.products)
  } catch (error) {
    console.log("error in getting products",error);
    
  }
}
useEffect(()=>{
gethomeproducts()
},[])





  return (
    <>
      <Navbar />

      <main className="h-[90vh] flex items-center justify-center bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/90 before:to-transparent"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-center relative z-10">
          <div className="animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-8 font-headingfonts text-[#07484A] leading-tight relative">
              Books That Deserve
              <span className="block">a Second Chapter.</span>
              <div className="absolute -right-4 sm:-right-8 top-0 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 border-[#70908B] opacity-50" />
              <div className="absolute -left-4 sm:-left-8 bottom-0 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 border-[#70908B] opacity-50" />
            </h1>
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 font-normalfont text-[#07484A] max-w-2xl mx-auto leading-relaxed px-4">
              Rereader connects book lovers to a world of second chances, where
              old books find new homes. Buy, sell — and make reading accessible
              for everyone.
            </p>
            <button
              className="bg-[#70908B] hover:bg-[#07484A] transition-all duration-300 cursor-pointer
              text-white font-normalfont py-3 sm:py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg
              hover:shadow-[0_4px_20px_rgba(112,144,139,0.3)] transform hover:-translate-y-1"
              onClick={() => navigate("/product")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </main>

      <main className="py-12 sm:py-24 bg-gradient-to-b from-white to-[#70908B]/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headingfonts text-[#07484A] text-center mb-10 sm:mb-20 relative inline-block">
            Browse Products
            <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-[#70908B]/30" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {Allproduct.map((product) => (
              <div
                key={product.productid}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                    <div className="absolute top-3 left-3 bg-[#70908B] text-white text-xs py-1 px-3 rounded-full shadow">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[var(--normalfont)] text-base font-semibold text-gray-800 group-hover:text-[#70908B] transition-colors duration-300">
                      {product.producname}
                    </h3>
                    <div className="text-right">
                      {product.discount ? (
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-[#70908B]">
                            ${(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/product-detail/${product.productid}`, {
                        state: { product },
                        replace: false,
                      })
                    }
                    className="w-full py-2 mt-3 bg-[#70908B] text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-300"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
