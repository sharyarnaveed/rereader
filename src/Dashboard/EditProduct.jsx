// ...existing code...
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../components/Aside";
import api from "../api";
import toast from "react-hot-toast";
import axios from "axios";

const EditProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();

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
      city: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState(null);

  // Cities (reuse pattern from Upload)
  const [Thecity, SetCity] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const ProductImage = watch("productImage");
  const selectedSaleType = watch("saletype");

  const categories = [
    { name: "Primary Class", id: 1 },
    { name: "Secondary Class", id: 2 },
    { name: "Higher Secondary Class", id: 3 },
    { name: "Higher Education", id: 4 },
    { name: "Competitive Exams", id: 5 },
    { name: "Professional Courses", id: 6 },
  ];

  // Fetch cities
  const getCitesapi = useCallback(async () => {
    try {
      const responce = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: "Pakistan" }
      );
      const sorted = responce.data.data.sort();
      SetCity(sorted);
    } catch (error) {
      console.log("error in getting cities", error);
    }
  }, []);

  // Fetch product detail
  const getProductDetail = useCallback(async () => {
    try {
      const responce = await api.get("/api/user/getproductdetails", {
        params: { productid },
      });
      const detail = responce.data.detail;
      if (!detail) {
        toast.error("Product not found");
        navigate(-1);
        return;
      }
      reset({
        producttitle: detail.producname || "",
        productdescription: detail.description || "",
        saletype: detail.saletype || "",
        category: detail.category || "",
        price: detail.price || "",
        city: detail.city || "",
      });
      if (detail.image1) {
        setProductImagePreview(
          `http://localhost:3000/${detail.image1
            .replace("public\\", "public/")
            .replace(/\\/g, "/")}`
        );
      }
    } catch (error) {
      console.log("error fetching product", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [productid, reset, navigate]);

  useEffect(() => {
    getCitesapi();
    getProductDetail();
  }, [getCitesapi, getProductDetail]);

  // Preview new image
  useEffect(() => {
    if (ProductImage && ProductImage[0]) {
      const file = ProductImage[0];
      const url = URL.createObjectURL(file);
      setProductImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [ProductImage]);

  const onSubmit = async (data) => {
    setBtnLoading(true);
    try {
      const formData = new FormData();
      formData.append("producttitle", data.producttitle);
      formData.append("productdescription", data.productdescription);
      formData.append("saletype", data.saletype);
      formData.append("category", data.category);
      formData.append("price", data.saletype === "donation" ? "" : data.price);
      formData.append("city", data.city);

      if (data.productImage && data.productImage[0]) {
        formData.append("productImage", data.productImage[0]);
      }

      // Expected backend endpoint (implement if missing)
      const responce = await api.put(
        `/api/user/updateproduct/${productid}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (responce.data.success) {
        toast.success(responce.data.message || "Product updated", {
          duration: 2500,
        });
        navigate("/userdashboard/productdetail");
      } else {
        toast.error(responce.data.message || "Update failed", {
          duration: 2500,
        });
      }
    } catch (error) {
      console.log("error updating product", error);
      toast.error("Error updating product");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0">
        <Aside />
      </div>
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1
              className="text-2xl font-bold text-[#07484A]"
              style={{ fontFamily: "Winky Sans, sans-serif" }}
            >
              Edit Product
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
              style={{ fontFamily: "K2D, sans-serif" }}
            >
              Back
            </button>
          </div>

            {loading ? (
              <div className="bg-white p-10 rounded-lg shadow-sm text-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#07484A] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600 text-sm">Loading product...</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg p-6 shadow-sm space-y-6"
                style={{ fontFamily: "K2D, sans-serif" }}
              >
                {/* Title */}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.producttitle.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                    placeholder="Enter product description"
                    {...register("productdescription", {
                      required: "Product Description is Required",
                      minLength: {
                        value: 10,
                        message: "Minimum length is 10 characters",
                      },
                    })}
                  />
                  {errors.productdescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productdescription.message}
                    </p>
                  )}
                </div>

                {/* Sale Type & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent bg-white cursor-pointer"
                      {...register("saletype", {
                        required: "Select The Sale Type",
                      })}
                    >
                      <option value="">Select sale type</option>
                      <option value="sell">Sell</option>
                      <option value="donation">Donation</option>
                    </select>
                    {errors.saletype && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.saletype.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent bg-white cursor-pointer"
                      {...register("category", { required: "Product Category" })}
                    >
                      <option value="">Product Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent disabled:bg-gray-100"
                      placeholder="0.00"
                      disabled={selectedSaleType === "donation"}
                      {...register("price", {
                        validate: (v) => {
                          if (selectedSaleType === "sell" && (!v || v <= 0)) {
                            return "Price is required for selling items";
                          }
                          return true;
                        },
                      })}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* City Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={getValues("city") || ""}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                      onClick={() => setShowCityDropdown(true)}
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        setValue("city", e.target.value);
                        const filtered = Thecity
                          ? Thecity.filter((c) =>
                              c.toLowerCase().includes(searchTerm)
                            )
                          : [];
                        setFilteredCities(filtered);
                        setShowCityDropdown(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowCityDropdown(false), 200);
                      }}
                    />
                    {showCityDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCities && filteredCities.length > 0 ? (
                          filteredCities.map((city, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                              onClick={() => {
                                setValue("city", city);
                                setShowCityDropdown(false);
                              }}
                            >
                              {city}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-sm">
                            No cities found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                      {productImagePreview ? (
                        <img
                          src={productImagePreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Image
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("productImage")}
                        className="block w-full text-sm text-gray-600"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to keep existing image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="px-6 py-3 bg-[#07484A] text-white rounded-lg hover:bg-[#70908B] transition-colors disabled:opacity-60"
                  >
                    {btnLoading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
        </div>
      </main>
    </div>
  );
};

export default EditProduct