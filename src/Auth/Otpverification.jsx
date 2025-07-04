import React from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const OtpVerification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const location = useLocation();
  const userId = location.state?.userdata;

  const otpverify = {
    userid: userId,
    otp: "",
  };

  const verifyotp = async (data) => {
    try {
      if (!otpverify.userid) {
        toast.error("Invalid", {
          autoClose: 5000,
        });
        return;
      }

      let JOinOtp = data.otp.join("");
      otpverify.otp = JOinOtp;
      console.log(JOinOtp);

      const responce = await axios.post("/api/user/verifyotp", otpverify);
      console.log(responce.data);
      if (responce.data.success) {
        toast.success(responce.data.message, {
          autoClose: 5000,
        });

        navigate("/");
      } else {
        toast.error(responce.data.message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 5000,
      });
    }
  };
  // {userId}
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form
        onSubmit={handleSubmit(verifyotp)}
        className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl animate-fadeIn"
      >
        <div className="text-center">
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "Winky Sans, sans-serif", color: "#07484A" }}
          >
            Verify Your Email
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: "K2D, sans-serif" }}
          >
            We've sent a code to your email
          </p>
        </div>

        <div className="flex justify-center space-x-4 my-8">
          {[1, 2, 3, 4].map((_, index) => (
            <input
              key={index}
              type="text"
              {...register(`otp[${index}]`, { required: "Otp is Required" })}
              maxLength="1"
              className="w-14 h-14 text-center text-2xl font-bold rounded-lg border-2 border-[#70908B] focus:border-[#07484A] focus:ring-2 focus:ring-[#07484A] focus:outline-none transition-all"
              style={{ fontFamily: "K2D, sans-serif" }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            className="w-full py-3 px-4 bg-[#07484A] hover:bg-[#70908B] text-white rounded-lg transition-colors duration-300 font-semibold"
            style={{ fontFamily: "K2D, sans-serif" }}
          >
            Verify Now
          </button>

          <div className="text-center">
            <p
              className="text-gray-600"
              style={{ fontFamily: "K2D, sans-serif" }}
            >
              Didn't receive code?
              <button className="ml-2 text-[#07484A] hover:text-[#70908B] font-semibold">
                Resend
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
