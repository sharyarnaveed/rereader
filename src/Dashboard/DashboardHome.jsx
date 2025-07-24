import React, { useCallback, useEffect } from "react";
import api from "../api";
import {
  FaBox,
  FaChartLine,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useState } from "react";
import NavItem from "../components/NavItem";
import StatsCard from "../components/StatsCard";
import Aside from "../components/Aside";
import { useNavigate } from "react-router-dom";
const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalProducts, setTotalproducts] = useState("");
  const [totalSold, setTotalSold] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
const [lastestProducts,SetLatestProducts]=useState([])
  const checkaccountlogin = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/user/checklogin");
      if (response.data.success === true) {
        console.log("user is logged in");
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      navigate("/");
    }
  });

  const getdashboardcount = async () => {
    try {
      const responce = await api.get("/api/user/dasboardcount");
      setTotalAmount(responce.data.totalmade);
      setTotalSold(responce.data.totalsold);
      setTotalproducts(responce.data.totalproducts);
      SetLatestProducts(responce.data.lastestProducts)
      console.log(responce.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkaccountlogin();
    getdashboardcount();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            Error loading page
          </h1>
        </div>
      ) : (
        <>
          <div className="flex min-h-screen bg-gray-50">
            <Aside />

            <main className="flex-1 p-8">
              <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                  <h1 className="text-2xl font-medium text-[#07484A]">
                    Welcome back, John
                  </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatsCard title="Products" value={totalProducts} icon={<FaBox />} />
                  <StatsCard
                    title="Sales"
                    value={totalSold}
                    icon={<FaShoppingCart />}
                  />
                  <StatsCard
                    title="Revenue"
                    value={`Rs ${totalAmount}`}
                    icon={<FaDollarSign />}
                  />
                 
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-lg border border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-[#07484A]">
                      Recent Products
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                          <th className="px-6 py-3 text-left">Product</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-left">Price</th>
                          <th className="px-6 py-3 text-left">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {lastestProducts.map((item) => (
                          <tr
                            onClick={() => navigate(`/userdashboard/dashboard-productdetail/${item.productid}`)}
                            key={item.productid}
                            className="text-sm cursor-pointer"
                          >
                            <td className="px-6 py-4">{item.producname}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700">
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                             Rs {item.price}
                            </td>
                            <td className="px-6 py-4">
                              {item.category}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardHome;
