import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaCamera, FaSave, FaEdit } from "react-icons/fa";
import Aside from "../components/Aside";
import api from "../api";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
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
      zipcode: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    mode: "onBlur",
  });

  // Fetch user data on component mount
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/user/getuserinfo");
      if (response.data.success) {
        const userData = response.data.data;
        reset({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          email: userData.email || "",
          phonenumber: userData.phonenumber || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zipcode: userData.zipcode || "",
        });
        if (userData.profilepic) {
          setImagePreview(userData.profilepic);
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  // Update profile information
  const updateProfile = async (data) => {
    setProfileLoading(true);
    try {
   console.log(data);
   

      const response = await api.put("/api/user/updateprofile",data);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };


  const tabs = [
    { id: "profile", label: "Profile Information", icon: <FaUser /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0">
        <Aside />
      </div>

      <main className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#07484A] mb-2"
              style={{ fontFamily: "Winky Sans, sans-serif" }}
            >
              Account Settings
            </h1>
            <p
              className="text-gray-600"
              style={{ fontFamily: "K2D, sans-serif" }}
            >
              Manage your account information and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "border-[#07484A] text-[#07484A]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    style={{ fontFamily: "K2D, sans-serif" }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

 
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2
                    className="text-xl font-semibold text-[#07484A]"
                    style={{ fontFamily: "K2D, sans-serif" }}
                  >
                    Profile Information
                  </h2>
                  <p
                    className="text-gray-600 text-sm mt-1"
                    style={{ fontFamily: "K2D, sans-serif" }}
                  >
                    Update your personal information and profile picture
                  </p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#07484A] text-white rounded-lg hover:bg-[#70908B] transition-colors duration-200"
                  style={{ fontFamily: "K2D, sans-serif" }}
                >
                  <FaEdit className="text-sm" />
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form onSubmit={handleSubmit(updateProfile)} className="p-6">
                {/* Profile Picture Section */}


                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <FaUser className="inline mr-2" />
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstname", {
                        required: editMode ? "First name is required" : false,
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2 characters",
                        },
                      })}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <FaUser className="inline mr-2" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastname", {
                        required: editMode ? "Last name is required" : false,
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2 characters",
                        },
                      })}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      disabled={true} // Email should not be editable
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <FaPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phonenumber", {
                        pattern: {
                          value: /^\d{11}$/,
                          message: "Phone number must be 11 digits",
                        },
                      })}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                    {errors.phonenumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phonenumber.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <FaMapMarkerAlt className="inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      City
                    </label>
                    <input
                      type="text"
                      {...register("city")}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      State/Province
                    </label>
                    <select
                      {...register("state")}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      <option value="">Select State/Province</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                      <option value="Islamabad">Islamabad Capital Territory</option>
                    </select>
                  </div>

                  {/* ZIP Code */}
                  <div className="md:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      {...register("zipcode", {
                        pattern: {
                          value: /^\d{5}$/,
                          message: "ZIP code must be 5 digits",
                        },
                      })}
                      disabled={!editMode}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07484A] focus:border-transparent transition-colors ${
                        !editMode ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      style={{ fontFamily: "K2D, sans-serif" }}
                    />
                    {errors.zipcode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {editMode && (
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#07484A] text-white rounded-lg hover:bg-[#70908B] transition-colors duration-200 disabled:opacity-50"
                      style={{ fontFamily: "K2D, sans-serif" }}
                    >
                      {profileLoading ? (
                        <Spinner />
                      ) : (
                        <>
                          <FaSave className="text-sm" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}


        </div>
      </main>
    </div>
  );
};

export default Settings;