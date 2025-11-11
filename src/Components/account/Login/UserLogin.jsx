import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignUp = () => {
    navigate("/UserRegister");
  };

  const HandleLoginClick = () => {
    if (userCode.trim() !== "" && password.trim() !== "") {
      console.log("Login successful, navigating to Home");
      navigate("/");
    } else {
      alert("Please fill in both User Code and Password.");
      console.log("Login failed: fields are empty.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HandleLoginClick();
  };

  return (
    <div className="max-h-screen min-h-screen flex flex-col md:flex-row bg-white font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden"
      >
        <img
          src="https://pimwp.s3-accelerate.amazonaws.com/2022/01/6-emerging-trends-in-residential-real-estate-in-the-post-COVID-19-era-FB-1200x700-compressed.jpg"
          alt="Modern House Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent flex flex-col justify-end p-12 text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -150, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            REAL ESTATE
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -150, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl font-light max-w-lg"
          >
            Your trusted platform for property management and rental discovery.
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT SIDE - Login/Signup Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 bg-white"
      >
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Log in to manage your properties or find your next home.
          </p>

          {/* Form Content (Dynamic) */}
          {/* Changed onSubmit handler to call handleSubmit */}
          <form onSubmit={handleSubmit}>
            <motion.div
              key="landlord"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Code
                </label>
                <input
                  type="number"
                  placeholder="*********23456"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberLandlord"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="rememberLandlord"
                    className="ml-2 text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 mt-4"
              >
                Login <IoIosArrowForward size={16} className="mx-2 text-white inline-block" />
              </motion.button>
            </motion.div>
          </form>

          <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or continue with
            </div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
            >
              <FcGoogle size={19} className="mx-2" />
              Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
            >
              <TiSocialFacebook size={23} className="text-blue-600" mx-2 />
              Facebook
            </motion.button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <a
              onClick={HandleSignUp}
              className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign Up Now
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default UserLogin;