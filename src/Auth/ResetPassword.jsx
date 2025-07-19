import React from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import useSaveInfo from "../store/userInfo.store";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      password: "",
      repassword: "",
    },
  });

  const navigate = useNavigate();
  const userid = useSaveInfo((state) => state.userid);
  //   console.log(userid);

  const password = watch("password");

  const reset = async (data) => {
    try {
      const responce = await axios.post("/api/user/resetpassword", {
        data: data,
        userid: userid,
      });
      if (responce.data.success) {
        toast.success(responce.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error in reset password", error);
      toast.success("Cannot Reset Password");
    }
  };

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
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-normalfont">
            Enter your new password below to reset your account password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(reset)}>
          <div className="space-y-4">
            <input
              type="password"
              required
              {...register("password", {
                required: "password is required",
                minLength: 8,
              })}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
              placeholder="New Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input
              type="password"
              required
              {...register("repassword", {
                required: "Re Peassword Required",
                validate: (value) =>
                  value === password || "password Do not match",
              })}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
              placeholder="Confirm New Password"
            />
            {errors.repassword && <p>{errors.repassword.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normalfont rounded-lg text-white bg-[#70908B] hover:bg-[#07484A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-colors duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/signin"
            className="text-sm text-[#70908B] hover:text-[#07484A] transition-colors"
          >
            ← Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
