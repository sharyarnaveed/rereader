import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import GoogleAuthBtn from '../components/GoogleAuthBtn';
import axios from 'axios';
import usecityStore from '../store/citiesStore';
const Signup = () => {

const {
  register,
  handleSubmit,
  formState: { errors },
}=useForm({
  mode: "onBlur",
  defaultValues:{
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  },
})
const [Thecity,SetCity]=useState()
const getCitesapi=useCallback( async()=>{
  try {
    
    const responce=await axios.post("https://countriesnow.space/api/v0.1/countries/cities",{
      country:"Pakistan"
    });  

   const theSort=responce.data.data.sort()
   SetCity(theSort)
    
  } catch (error) {
    console.log("error in getting cities",error);
    
  }
  },[])

useEffect(()=>
{
  getCitesapi()
  
},[])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Add Home Icon Circle */}
      <Link
        to="/"
        className="absolute top-8 left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 group"
      >
        <svg
          className="w-6 h-6 text-[#70908B] group-hover:text-[#07484A] transition-colors duration-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-sm">
        <div>
          <h2 className="mt-4 text-center text-3xl font-headingfonts text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-normalfont">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#70908B] hover:text-[#07484A] transition-colors text-underline">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <GoogleAuthBtn/>
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="absolute bg-white px-4 text-sm text-gray-500">or</div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  
                  {...register("firstname",{required:true,minLength:2,pattern:/^[A-Za-z]+$/})}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  required
                  {...register("lastname",{required:true,minLength:2,pattern:/^[A-Za-z]+$/})}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Last Name"
                />
              </div>

              <input
                type="email"
                required
                {...register("email",{required:true,pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i})}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />

              <input
                type="tel"
                required
                {...register("phonenumber",{required:true,pattern:/^\d{11}$/,maxLength:11})}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Phone Number"
              />

              {/* Address Information */}
              <input
                type="text"
                required
                {...register("streetaddress",{required:true})}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Street Address"
              />

              <div className="grid grid-cols-2 gap-4">
              <select
  required
  {...register("city", {required: true})}
  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
>
  <option value="" disabled selected>Select City</option>
  {Thecity && Thecity.map((city, index) => (
    <option key={index} value={city}>{city}</option>
   
  ))}
</select>
<select
  required
  {...register("state", {required: true})}
  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
>
  <option value="" disabled selected>Select State/Province</option>
  <option value="Punjab">Punjab</option>
  <option value="Sindh">Sindh</option>
  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
  <option value="Balochistan">Balochistan</option>
  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
  <option value="Azad Kashmir">Azad Kashmir</option>
  <option value="Islamabad">Islamabad Capital Territory</option>
</select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  {...register("zip",{required:true,pattern:/^\d{5}$/,maxLength:5})}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="ZIP/Postal Code"
                />
            
              </div>

              {/* Password Fields */}
              <input
                type="password"
                required
                {...register("password",{required:true,minLength:8})}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />

              <input
                type="password"
                required
                {...register("confirmpassword",{required:true,validate:(value)=>value===getValues
("password")||"Passwords do not match"})}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Confirm Password"
              />


            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normalfont rounded-lg text-white bg-[#70908B] hover:bg-[#07484A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-colors duration-300"
            >
              Sign up
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{' '}
            <Link to={"/terms"} className="text-[#70908B] hover:text-[#07484A] transition-colors underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to={"/policy"} className="text-[#70908B] hover:text-[#07484A] transition-colors underline">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;