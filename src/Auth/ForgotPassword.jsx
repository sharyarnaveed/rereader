import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
const navigator= useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ""
    },
  });
  
  const resetmail=async(data)=>
  {
try {
  const responce=await axios.post("/api/user/resetmail",data)
  if (responce.data.success)
  {
    toast.success(responce.data.message,{
      duration:3000
    })

    const userdata=responce.data.data
    navigator("/otpverification",{
      state:{userdata},
      replace: true,
    })
  }


} catch (error) {
  console.log(error,"error in resetting mail");
  toast.error("error in resetting mail",{
    duration:3000,
  })
}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-sm">
        <div>
          <h2 className="mt-4 text-center text-3xl font-headingfonts text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-normalfont">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(resetmail)}>
          <div className="space-y-4">
            <input
              type="email"
              {
                ...register("email",{
                  required:"Email is Required",
                  pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message:"Invalid email adddress"
                  },
                })
              }
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
              placeholder="Email address"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normalfont rounded-lg text-white bg-[#70908B] hover:bg-[#07484A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-colors duration-300"
            >
              Send Reset Instructions
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/signin"
              className="text-sm text-[#70908B] hover:text-[#07484A] transition-colors"
            >
              ← Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;