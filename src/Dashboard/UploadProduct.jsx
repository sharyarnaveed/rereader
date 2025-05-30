import React from "react";
import { FaUpload } from "react-icons/fa";
import Aside from "../components/Aside";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../api";

const UploadProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      producttitle: "",
      productdescription: "",
      saletype: "",
      category:"",
      price: "",
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

  const selectedoption = watch("saletype");

  const saveproduct = async (data) => {
    try {
      console.log(data);
const responce= await api.post("/api/user/uploadporduct",data)
console.log(responce);


    } catch (error) {
      console.log("error in saving product", error);
    }
  };

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
                  {
                  categories.map((item)=>
                  (
                  
                  <option key={item.id} value={item.name}>{item.name}</option>
                  
                  ))


                  }
                
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#07484A] transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <FaUpload className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Upload Image {index}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#07484A] text-white py-3 rounded-lg hover:bg-[#70908B] transition-colors"
            >
              Upload Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadProduct;
