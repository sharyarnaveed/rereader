import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import toast from "react-hot-toast";
import axios from "axios";

const Information = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  const calluser = async (phoneno) => {
    window.location.href = `tel:${phoneno}`;
  };

  useEffect(() => {
    const fetchSellerInfo = async () => {
      console.log(product.userid);

      try {
        const response = await api.get(`/api/user/seller/${product.userid}`);
        console.log(response.data);

        if (response.data.success) {
          setSellerInfo(response.data.sellar);
        }
      } catch (error) {
        console.log("Error fetching seller info:", error);
        toast.error("Failed to load seller information");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerInfo();
  }, [product?.userid]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#07484A] text-white rounded-lg hover:bg-[#70908B] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

const reportProduct=async(productid)=>
{
  try {
    const responce=await api.post("/api/user/savereport",{productid:productid})
    console.log(responce.data);
    if (responce.data.success) {
      toast.success(responce.data.message,{
        duration:3000
      })
    }
    
  } catch (error) {
    console.log("error in reporting",error);
    toast.error("Error In reporting",{
        duration:3000
      })
  }
}



  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen py-16">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--btn-color)]/10 to-transparent rounded-full -z-10 blur-[120px]"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[var(--maintextcolor)]/5 rounded-full -z-10 blur-[100px]"></div>

        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 px-4 py-2 text-[var(--btn-color)] rounded-lg font-medium font-[var(--normalfont)] cursor-pointer hover:text-[var(--maintextcolor)] transition-colors flex items-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images Section */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100">
                <img
                  src={`http://localhost:3000/${productImages[mainImage]
                    ?.replace("public\\", "public/")
                    .replace(/\\/g, "/")}`}
                  alt={product.producname}
                  className="w-full h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                {product.saletype === "donation" && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Free - Donation
                  </div>
                )}
                {product.status === "sell" && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sold Out
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-4">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                        mainImage === index
                          ? "ring-2 ring-[var(--btn-color)]"
                          : "hover:opacity-80"
                      }`}
                      onClick={() => setMainImage(index)}
                    >
                      <img
                        src={`http://localhost:3000/${image
                          ?.replace("public\\", "public/")
                          .replace(/\\/g, "/")}`}
                        alt={`Product view ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                  {product.producname}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      product.status === "sold"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.status === "sold" ? "Sold" : "Available"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Price
                </h3>
                {product.saletype === "donation" ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-purple-600">
                      Free
                    </span>
                    <span className="text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded">
                      Donation
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-[var(--maintextcolor)]">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-[var(--normalfont)]">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Sale Type:</span>
                    <p className="font-medium capitalize">{product.saletype}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Listed:</span>
                    <p className="font-medium">
                      {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p className="font-medium capitalize">{product.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-8">
              Seller Information
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--btn-color)]"></div>
              </div>
            ) : sellerInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Seller Profile */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[var(--btn-color)] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {sellerInfo.profilepic ? (
                        <img
                          src={sellerInfo.profilepic}
                          alt="Seller"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {sellerInfo.firstname} {sellerInfo.lastname}
                      </h3>
                      <p className="text-gray-500">Verified Seller</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {sellerInfo.email && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaEnvelope className="text-[var(--btn-color)]" />
                        <span>{sellerInfo.email}</span>
                      </div>
                    )}

                    {sellerInfo.phonenumber && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaPhone className="text-[var(--btn-color)]" />
                        <span>{sellerInfo.phonenumber}</span>
                      </div>
                    )}

                    {sellerInfo.address && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <FaMapMarkerAlt className="text-[var(--btn-color)] mt-1" />
                        <div>
                          {sellerInfo.city && sellerInfo.state && (
                            <p>
                              {sellerInfo.city}, {sellerInfo.state}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Seller */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Seller
                  </h4>

                  <div className="space-y-4">
                    <button className="w-full px-6 py-3 bg-[var(--btn-color)] text-white rounded-lg font-medium hover:bg-[var(--maintextcolor)] transition-colors">
                      Send Message
                    </button>

                    {sellerInfo.phonenumber && (
                      <button
                        onClick={() => calluser(sellerInfo.phonenumber)}
                        className="w-full px-6 py-3 border border-[var(--btn-color)] text-[var(--btn-color)] rounded-lg font-medium hover:bg-[var(--btn-color)] hover:text-white transition-colors"
                      >
                        Call Seller
                      </button>
                    )}
                   
                    {/* Report Button */}
                    <button
                      className="w-full px-6 py-3 border border-red-400 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
                      onClick={()=> reportProduct(product.productid)}
                    >
                      Report Product
                    </button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Member since{" "}
                        {new Date(sellerInfo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Unable to load seller information
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Information;
