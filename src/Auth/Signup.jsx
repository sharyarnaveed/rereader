import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
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
            <Link to="/signin" className="text-[#70908B] hover:text-[#07484A] transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <button
              type="button"
              className=" cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70908B] transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="absolute bg-white px-4 text-sm text-gray-500">or</div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Last Name"
                />
              </div>

              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />

              <input
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Phone Number"
              />

              {/* Address Information */}
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Street Address"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="City"
                />
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="State/Province"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="ZIP/Postal Code"
                />
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Country"
                />
              </div>

              {/* Password Fields */}
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />

              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#70908B] focus:border-[#70908B] focus:z-10 sm:text-sm transition-colors"
                placeholder="Confirm Password"
              />

              {/* Optional Newsletter Subscription */}
              <div className="flex items-center">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-[#70908B] focus:ring-[#70908B] border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-600">
                  Subscribe to our newsletter for updates and exclusive offers
                </label>
              </div>
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
            <Link to={"/privacy"} className="text-[#70908B] hover:text-[#07484A] transition-colors underline">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;