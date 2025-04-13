import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavItem = ({ icon, text, active,tolink }) => {

  const navigate=useNavigate()
    return (
      <div onClick={()=>navigate(`${tolink}`)} className={`
        px-4 py-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-colors
        ${active 
          ? 'bg-[#07484A] bg-opacity-10 text-white hover:bg-[#07484A] hover:bg-opacity-20' 
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}>
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-sm">{text}</span>
      </div>
    )
  }

export default NavItem