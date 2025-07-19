import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../api";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Disbalebtn, SetDisableBtn] = useState(false);

  const product = location.state?.product;

  const checkauth = async () => {
    try {
      const responce = await api.get("/api/user/checklogin");
      if (responce.data.success) {
        SetDisableBtn(false);
      } else {
        SetDisableBtn(true);
      }
    } catch (error) {
      console.log("error in checking auth", error);
      SetDisableBtn(true);
    }
  };

  useEffect(() => {
    checkauth();
    window.scrollTo(0, 0);
  }, []);

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
                  src={`http://localhost:3000/${product.image1
                    .replace("public\\", "public/")
                    .replace(/\\/g, "/")}`}
                  alt={product.producname}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                {product.producname}
              </h1>

              <p className="text-gray-600 text-lg font-[var(--normalfont)] mb-6">
                {product.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-[var(--maintextcolor)] font-[var(--normalfont)]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate("/inforamtion", {
                      state: { product },
                      replace: false,
                    })
                  }
                  disabled={Disbalebtn}
                  className={
                    Disbalebtn
                      ? "cursor-not-allowed px-10 py-3  bg-[var(--btn-color)] text-white rounded-lg font-medium font-[var(--normalfont)] shadow-md transition-colors"
                      : "cursorpointer px-10 py-3 cursor-pointer bg-[var(--btn-color)] text-white rounded-lg font-medium font-[var(--normalfont)] shadow-md hover:bg-[var(--maintextcolor)] transition-colors"
                  }
                >
                  Show Information
                </button>


               
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
