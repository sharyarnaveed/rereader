import React from 'react'

const StatsCard = ({ icon, title, value }) => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="text-[#07484A] text-lg">{icon}</span>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-medium text-[#07484A]">{value}</p>
          </div>
        </div>
      </div>
    )
  }

export default StatsCard