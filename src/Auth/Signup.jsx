import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate=useNavigate()
  const [Thecity, SetCity] = useState();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [SubmitBtn, SetSubmitBtn] = useState(false);
  const getCitesapi = useCallback(async () => {
    try {
      const responce = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: "Pakistan",
        }
      );

      const theSort = responce.data.data.sort();
      SetCity(theSort);
    } catch (error) {
      console.log("error in getting cities", error);
    }
  }, []);

  useEffect(() => {
    getCitesapi();
  }, []);

  const handleSignup = async (data) => {
    console.log("Form Data:", data);
    SetSubmitBtn(true);

    try {
      const res = await axios.post("/api/user/signup", data);
      console.log("Signup successful", res.data);

      if (res.data.success === false) {
        toast.error(res.data.message || "Signup failed");
      } else {
        toast.success(
          res.data.message ||
            "Signup successful! Please check your email for verification."
        );

const userdata=res.data.data
console.log(userdata);

navigate("/otpverification", {
  state: { userdata },
  replace: true, // Replace the current entry in the history stack
  }
)

      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
        console.error("Signup error response:", error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected signup error:", error.message);
      }
    } finally {
      SetSubmitBtn(false);
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
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-normalfont">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#70908B] hover:text-[#07484A] transition-colors text-underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignup)}>
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <GoogleAuthBtn />
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="absolute bg-white px-4 text-sm text-gray-500">
                or
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  {...register("firstname", {
                    required: true,
                    minLength: 2,
                    pattern: /^[A-Za-z]+$/,
                  })}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
                <input
                  type="text"
                  required
                  {...register("lastname", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Minlength is 2 Characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only Alphabets allowed",
                    },
                  })}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Last Name"
                />
              </div>
              {errors.lastname && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
              <input
                type="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is not valid",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <input
                type="tel"
                required
                {...register("phonenumber", {
                  required: "PHone Number is required",
                  pattern: /^\d{11}$/,
                  maxLength: {
                    value: 11,
                    message: "Phone Should Be of 11 Characters",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Phone Number"
              />

              {errors.phonenumber && (
                <p className="text-red-500 text-sm">
                  {errors.phonenumber.message}
                </p>
              )}
              {/* Address Information */}
              <input
                type="text"
                required
                {...register("address", {
                  required: "Address is required",
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Street Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={getValues("city") || ""}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                      onClick={() => setShowCityDropdown(true)}
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        setValue("city", e.target.value);

                        const filteredCities = Thecity
                          ? Thecity.filter((city) =>
                              city.toLowerCase().includes(searchTerm)
                            )
                          : [];
                        setFilteredCities(filteredCities);
                        setShowCityDropdown(true);
                      }}
                      onBlur={() => {
                        // Delay hiding dropdown to allow click events to register
                        setTimeout(() => setShowCityDropdown(false), 200);
                      }}
                      required
                    />
                    {showCityDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCities && filteredCities.length > 0 ? (
                          filteredCities.map((city, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setValue("city", city);
                                setShowCityDropdown(false);
                              }}
                            >
                              {city}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-500">
                            No cities found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <select
                  required
                  {...register("state", { required: "State is required" })}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                >
                  <option value="" disabled selected>
                    Select State/Province
                  </option>
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
                  {...register("zip", {
                    required: true,
                    pattern: /^\d{5}$/,
                    maxLength: 5,
                  })}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="ZIP/Postal Code"
                />
              </div>
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip.message}</p>
              )}
              {/* Password Fields */}
              <input
                type="password"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <input
                type="password"
                required
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normalfont rounded-lg text-white bg-[#70908B] hover:bg-[#07484A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-colors duration-300"
              disabled={SubmitBtn}
            >
              {SubmitBtn ? (
                <div className="flex justify-center items-center">
                  <div
                    className="animate-spin rounded-full h-5 w-5 border-[#70908
B] border-4 border-t-transparent"
                  ></div>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <Link
              to={"/terms"}
              className="text-[#70908B] hover:text-[#07484A] transition-colors underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to={"/policy"}
              className="text-[#70908B] hover:text-[#07484A] transition-colors underline"
            >
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
