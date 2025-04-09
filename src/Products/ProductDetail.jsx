import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const navigate = useNavigate();

  const product = {
    name: "Classic Reader Pro",
    price: 129.99,
    rating: 4.5,
    description:
      "Premium e-reader with extended battery life and paper-like display. Perfect for avid readers who want a seamless reading experience.",
    images: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    category: "E-Readers",
    stock: 12,
  };

  const id = useParams().id;
  console.log(id);

  return (
    <>

    <main className="bg-white min-h-screen py-16">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--btn-color)]/10 to-transparent rounded-full -z-10 blur-[120px]"></div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[var(--maintextcolor)]/5 rounded-full -z-10 blur-[100px]"></div>

      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-[var(--btn-color)]  rounded-lg font-medium font-[var(--normalfont)] cursor-pointer  hover:text-[var(--maintextcolor)] transition-colors"
        >
          ← Go Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md w-1/2 h-32"
                >
                  <img
                    src={image}
                    alt={`Product Image ${index + 2}`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm font-[var(--normalfont)]">
                {product.rating} / 5
              </span>
            </div>
            <p className="text-gray-600 text-lg font-[var(--normalfont)] mb-6">
              {product.description}
            </p>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-[var(--maintextcolor)] font-[var(--normalfont)]">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-4 text-sm text-gray-500 font-[var(--normalfont)]">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[var(--btn-color)] text-white rounded-lg font-medium font-[var(--normalfont)] shadow-md hover:bg-[var(--maintextcolor)] transition-colors">
                Buy Now
              </button>
              <button className="px-6 py-3 border border-[var(--btn-color)] text-[var(--btn-color)] rounded-lg font-medium font-[var(--normalfont)] hover:bg-[var(--btn-color)] hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default ProductDetail;
