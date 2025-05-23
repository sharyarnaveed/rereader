import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleAuthBtn from "../components/GoogleAuthBtn";

const Signin = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/user/signin", data);
      console.log(res.data.success, "res");
      if (res.data.success) {
        toast.success("Login successful", {
          duration: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Inavlid credentials", {
        duration: 4000,
      });
    }
  };


const handlegoogleauth=async()=>
{
  try {

    window.location.href ="http://localhost:3000/api/user/auth/google/";
  } catch (error) {
    console.log(error, "error");
    toast.error("Google Auth Failed", {
      duration: 2000,
    });
    
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
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
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-normalfont">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#70908B] hover:text-[#07484A] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
          <GoogleAuthBtn onClick={handlegoogleauth} />

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="absolute bg-white px-4 text-sm text-gray-500">
                or
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />

              <div className="relative">
                <input
                  type="password"
                  required
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                    },
                  })}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#70908B] focus:ring-[#70908B] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgotpassword"
                  className="text-sm text-[#70908B] hover:text-[#07484A] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normalfont rounded-lg text-white bg-[#70908B] hover:bg-[#07484A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-colors duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
