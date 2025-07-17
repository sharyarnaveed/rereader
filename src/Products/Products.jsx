import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";

const Products = () => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      city: "",
    },
  });
  const [Thecity, SetCity] = useState();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [SubmitBtn, SetSubmitBtn] = useState(false);
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

  // Combine city and category filters
  const citywatch = watch("city");
  const filteredProducts = products.filter((product) => {
    const cityMatch =
      !citywatch || citywatch === "" || (product.city && product.city.includes(citywatch));
    const categoryMatch =
      activeCategory === "All" || product.category === activeCategory;
    return cityMatch && categoryMatch;
  });

  const getproducts = async () => {
    try {
      const responce = await axios.get("/api/user/allproducts");
      console.log(responce.data);

      SetProducts(responce.data.productdata);
    } catch (error) {
      console.log("error in getting products", error);
    }
  };
  const getCitesapi = useCallback(async () => {
    try {
      const responce = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: "Pakistan",
        }
      );

      const theSort = responce.data.data.sort();
      SetCity(theSort);
    } catch (error) {
      console.log("error in getting cities", error);
    }
  }, []);

  useEffect(() => {
    getCitesapi();
    getproducts();
  }, []);


  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-[var(--headingfonts)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Collection
            </h1>
            <div className="w-20 h-1 bg-[#70908B] mx-auto mb-6 rounded"></div>
            <p className="text-gray-500 max-w-lg mx-auto text-base font-[var(--normalfont)]">
              Curated reading essentials designed with simplicity and functionality in mind.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            {/* City Search */}
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="Search city..."
                value={getValues("city") || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#70908B] text-gray-900 transition"
                onClick={() => setShowCityDropdown(true)}
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  setValue("city", e.target.value);

                  const filteredCities = Thecity
                    ? Thecity.filter((city) =>
                        city.toLowerCase().includes(searchTerm)
                      )
                    : [];
                  setFilteredCities(filteredCities);
                  setShowCityDropdown(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowCityDropdown(false), 200);
                }}
                required
              />
              {showCityDropdown && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {filteredCities && filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setValue("city", city);
                          setShowCityDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No cities found</div>
                  )}
                </div>
              )}
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow ${
                    activeCategory === category
                      ? "bg-[#70908B] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.map((product) => (
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
                      navigate(`/product-detail`, {
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

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold transition ${
                  page === 1
                    ? "bg-[#70908B] text-white shadow"
                    : "bg-white text-gray-700 hover:bg-gray-100"
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
