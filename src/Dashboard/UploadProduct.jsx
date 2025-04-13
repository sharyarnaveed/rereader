import React from 'react'
import { FaUpload } from 'react-icons/fa'
import Aside from '../components/Aside'

const UploadProduct = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Aside */}
      <div className="fixed inset-y-0 left-0">
        <Aside />
      </div>
      
      {/* Main Content with Left Margin */}
      <main className="flex-1 p-8 ml-64"> {/* ml-64 matches the width of aside */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[#07484A] mb-8" 
              style={{ fontFamily: 'Winky Sans, sans-serif' }}>
            Upload New Product
          </h1>

          <div className="bg-white rounded-lg p-6 shadow-sm space-y-6" 
               style={{ fontFamily: 'K2D, sans-serif' }}>
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>

            {/* Sale Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Donation
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 px-4 rounded-lg bg-[#07484A] text-white"
                >
                  Sell
                </button>
              </div>
            </div>

            {/* Price Input */}
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
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} 
                       className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#07484A] transition-colors cursor-pointer">
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

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-[#07484A] text-white py-3 rounded-lg hover:bg-[#70908B] transition-colors"
            >
              Upload Product
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UploadProduct