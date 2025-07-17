import React, { useCallback, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import Aside from "../components/Aside";
import { useForm } from "react-hook-form";
import api from "../api";
import toast from "react-hot-toast";
import axios from "axios";

const UploadProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
     setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      producttitle: "",
      productdescription: "",
      saletype: "",
      category: "",
      price: "",
      city:""
    },
  });

  const categories = [
    { name: "Primary Class", description: "Classes 1 to 5/6", id: 1 },
    { name: "Secondary Class", description: "Classes 6 to 10", id: 2 },
    { name: "Higher Secondary Class", description: "Classes 11 to 12", id: 3 },
    {
      name: "Higher Education",
      description: "Graduation and Post Graduation",
      id: 4,
    },
    {
      name: "Competitive Exams",
      description: "UPSC, SSC, Banking, etc.",
      id: 5,
    },
    {
      name: "Professional Courses",
      description: "Engineering, Medical, etc.",
      id: 6,
    },
  ];
  const ProductImage = watch("productImage");

  const selectedoption = watch("saletype");
  const [btnloading, setBtnLoading] = useState(false);

  const saveproduct = async (data) => {
    setBtnLoading(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("producttitle", data.producttitle);
      formData.append("productdescription", data.productdescription);
      formData.append("saletype", data.saletype);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("productImage", data.productImage[0]);
      formData.append("city",data.city)
      const responce = await api.post("/api/user/uploadproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(responce.data);
      if (responce.data.success) {
        setBtnLoading(false);
        toast.success(responce.data.message, {
          duration: 2000,
        });
        reset(); // Changed from resizeTo() to reset()
      } else {
        setBtnLoading(false);
        toast.error(responce.data.message, {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("error in saving product", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const [Thecity, SetCity] = useState();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
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
  }, []);




  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0">
        <Aside />
      </div>

      <main className="flex-1 p-8 ml-64">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-2xl font-bold text-[#07484A] mb-8"
            style={{ fontFamily: "Winky Sans, sans-serif" }}
          >
            Upload New Product
          </h1>

          <form
            onSubmit={handleSubmit(saveproduct)}
            className="bg-white rounded-lg p-6 shadow-sm space-y-6"
            style={{ fontFamily: "K2D, sans-serif" }}
          >
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                placeholder="Enter product title"
                {...register("producttitle", {
                  required: "Product Title is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length is 6 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9 ]+$/,
                    message: "Only letters, numbers and spaces are allowed",
                  },
                })}
              />
              {errors.producttitle && (
                <p className="text-red-500 text-sm">
                  {errors.producttitle.message}
                </p>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("productdescription", {
                  required: "Product Description is Required",
                  minLength: {
                    value: 10,
                    message: "Minimum length is 10 characters",
                  },
                })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                placeholder="Enter product description"
              />
              {errors.productdescription && (
                <p className="text-red-500 text-sm">
                  {errors.productdescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Type
              </label>
              <div className="flex gap-4">
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent bg-white appearance-none cursor-pointer"
                  {...register("saletype", {
                    required: "Select The Sale Type",
                  })}
                >
                  <option value="">Select sale type</option>
                  <option value="sell">Sell</option>
                  <option value="donation">Donation</option>
                </select>
              </div>
              {errors.saletype && (
                <p className="text-red-500 text-sm">
                  {errors.saletype.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex gap-4">
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent bg-white appearance-none cursor-pointer"
                  {...register("category", {
                    required: "Product Category",
                  })}
                >
                  <option value="">Product Category</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.saletype && (
                <p className="text-red-500 text-sm">
                  {errors.saletype.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                  placeholder="0.00"
                  {...register("price", {
                    validate: (value) => {
                      if (selectedoption === "sell" && (!value || value <= 0)) {
                        return "Price is required for selling items";
                      }
                      return true;
                    },
                  })}
                  disabled={selectedoption === "donation"}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

             <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={getValues("city") || ""}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
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
                        // Delay hiding dropdown to allow click events to register
                        setTimeout(() => setShowCityDropdown(false), 200);
                      }}
                      required
                    />
                    {showCityDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCities && filteredCities.length > 0 ? (
                          filteredCities.map((city, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setValue("city", city);
                                setShowCityDropdown(false);
                              }}
                            >
                              {city}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-500">
                            No cities found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>



            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#07484A] transition-colors cursor-pointer relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register(`productImage`, {
                      required: "Product image is required",
                    })}
                  />
                  <div className="flex flex-col items-center justify-center h-full pointer-events-none">
                    <FaUpload className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                </div>
              </div>
              {ProductImage && ProductImage[0] ? (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {ProductImage[0].name}
                </p>
              ) : null}
              {errors.productImage && (
                <p className="text-red-500 text-sm">
                  {errors.productImage.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#07484A] text-white py-3 rounded-lg hover:bg-[#70908B] transition-colors"
              disabled={btnloading}
            >
              {btnloading ? "Uploading..." : "Upload Product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadProduct;
