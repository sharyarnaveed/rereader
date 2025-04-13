import React from 'react'
import NavItem from './NavItem'
import {  FaTachometerAlt, FaUpload, FaSignOutAlt } from 'react-icons/fa'

const Aside = () => {
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
      </div>
      <NavItem icon={<FaSignOutAlt />} text="Logout"  />
    </nav>
  </aside>
  )
}

export default Aside