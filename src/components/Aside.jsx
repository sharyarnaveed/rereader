import React from 'react'
import NavItem from './NavItem'
import {  FaTachometerAlt, FaUpload, FaSignOutAlt, FaInfo } from 'react-icons/fa'
import api from '../api'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
const Aside = () => {
const navigator=useNavigate()
const logout=async ()=>
{
try {
  const responce=await api.post("/api/user/logout")
  console.log(responce.data)
  if(responce.data.success)
  {
    toast.success(responce.data.message,{
      duration:3000,
    })
   navigator("/")
  }
  else
  {
    toast.error(responce.data.message,{
      duration:3000,
    })
  }
  
} catch (error) {
  toast.error(responce.data.message,{
      duration:3000,
    })
}
}


  return (
    <aside className="w-64 bg-white border-r border-gray-100" style={{ fontFamily: 'K2D, sans-serif' }}>
    <div className="p-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-[#07484A]" style={{ fontFamily: 'Winky Sans, sans-serif' }}>
        ReReader
      </h2>
    </div>
    <nav className="p-4 flex flex-col h-[calc(100vh-5rem)] justify-between">
      <div className="space-y-2">
        <NavItem icon={<FaTachometerAlt />} text="Dashboard" tolink="/userdashboard" />
        <NavItem icon={<FaUpload />} text="Upload Product" tolink="/userdashboard/upload" />
        <NavItem icon={<FaInfo />} text="Product Info" tolink="/userdashboard/productdetail" />

      </div>
      <button 
        className="w-full px-4 py-2 mt-4 text-white bg-red-500 hover:bg-red-600 
        transition-colors duration-200 rounded flex items-center justify-center gap-2 
        font-medium border border-red-600 shadow-sm"
        onClick={logout}
        style={{ fontFamily: 'K2D, sans-serif' }}
      >
        <FaSignOutAlt className="text-sm" />
        <span>Logout</span>
      </button>
    </nav>
  </aside>
  )
}

export default Aside