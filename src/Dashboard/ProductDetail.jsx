import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck, FaEdit, FaEye } from 'react-icons/fa';
import Aside from '../components/Aside';
import axios from 'axios';
import api from '../api';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('all');

 
  const [products,Setproducts] = useState( [
  ]);

  const tabs = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'sold', label: 'Sold', count: products.filter(p => p.status === 'sold').length },
    { id: 'unsold', label: 'Unsold', count: products.filter(p => p.status === 'unsold').length }
  ];

  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    return product.status === activeTab;
  });

  const handleDelete = (productId) => {
    console.log('Delete product:', productId);
    // Add delete logic here
  };

  const handleMarkAsSold = async(productId) => {
try {
      const responce=await api.put(`/api/user/updatestatus/${productId}`,{
        status:"sold"
      })

      if (responce.data.success) {
        toast.success(responce.data.message,{
            duration:3000
        })
       await getproducts()
      }
      else
      {
        toast.error(responce.data.message,{
            duration:3000
        })
      }

    
} catch (error) {
    console.log("error in updating status", error)
     toast.error("error in upading",{
            duration:3000
        })
}

};

  
  

const getproducts=async()=>
{
    try {
        const responce=await api.get("/api/user/getproductsdetail")
Setproducts(responce.data.Products)

    } catch (error) {
        console.log("error in getting products",error);
        
    }
}

useEffect(()=>
{
    getproducts()

},[])


  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0">
        <Aside />
      </div>

      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold text-[#07484A] mb-2"
              style={{ fontFamily: 'Winky Sans, sans-serif' }}
            >
              My Products
            </h1>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'K2D, sans-serif' }}
            >
              Manage your uploaded books and track their status
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-[#07484A] text-[#07484A]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    style={{ fontFamily: 'K2D, sans-serif' }}
                  >
                    {tab.label}
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id 
                        ? 'bg-[#07484A] text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.productid}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`http://localhost:3000/${product.image1}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        product.status === 'sold' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {product.status === 'sold' ? 'Sold' : 'Available'}
                      </span>
                    </div>
                    {product.saletype === 'donation' && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-purple-100 text-purple-800">
                          Donation
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 
                        className="text-lg font-semibold text-gray-900 line-clamp-1"
                        style={{ fontFamily: 'K2D, sans-serif' }}
                      >
                        {product.producname}
                      </h3>
                      <div className="text-right">
                        {product.saletype === 'donation' ? (
                          <span className="text-lg font-bold text-purple-600">Free</span>
                        ) : (
                          <span className="text-lg font-bold text-[#07484A]">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>

                    <p 
                      className="text-gray-600 text-sm mb-3 line-clamp-2"
                      style={{ fontFamily: 'K2D, sans-serif' }}
                    >
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span 
                        className="text-xs text-gray-500"
                        style={{ fontFamily: 'K2D, sans-serif' }}
                      >
                        {product.category}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 mb-4">
                      Uploaded: {new Date(product.created_at).toLocaleDateString()}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(product.productid)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                        style={{ fontFamily: 'K2D, sans-serif' }}
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                      
                      {product.status === 'unsold' && (
                        <button
                          onClick={() => handleMarkAsSold(product.productid)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
                          style={{ fontFamily: 'K2D, sans-serif' }}
                        >
                          <FaCheck className="text-xs" />
                          Mark Sold
                        </button>
                      )}
                      
                      {product.status === 'sold' && (
                        <button
                          disabled
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                          style={{ fontFamily: 'K2D, sans-serif' }}
                        >
                          <FaCheck className="text-xs" />
                          Sold
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 
                className="text-lg font-medium text-gray-900 mb-2"
                style={{ fontFamily: 'K2D, sans-serif' }}
              >
                No products found
              </h3>
              <p 
                className="text-gray-500 mb-6"
                style={{ fontFamily: 'K2D, sans-serif' }}
              >
                {activeTab === 'all' 
                  ? "You haven't uploaded any products yet." 
                  : `No ${activeTab} products found.`}
              </p>
              {activeTab === 'all' && (
                <button 
                  className="px-6 py-3 bg-[#07484A] text-white rounded-lg hover:bg-[#70908B] transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'K2D, sans-serif' }}
                  onClick={() => window.location.href = '/userdashboard/upload'}
                >
                  Upload Your First Product
                </button>
              )}
            </div>
          )}

          {/* Stats Summary */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
                    <p className="text-gray-600" style={{ fontFamily: 'K2D, sans-serif' }}>Total Products</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaCheck className="text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {products.filter(p => p.status === 'sold').length}
                    </h3>
                    <p className="text-gray-600" style={{ fontFamily: 'K2D, sans-serif' }}>Products Sold</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {products.reduce((sum, p) => sum + p.views, 0)}
                    </h3>
                    <p className="text-gray-600" style={{ fontFamily: 'K2D, sans-serif' }}>Total Views</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;