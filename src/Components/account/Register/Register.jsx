import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import UserRegisterForm from "./UserRegister";
import RealtorRegisterForm from "./AgentRegister";

function UserRegister() {
    const [activeTab, setActiveTab] = useState("User");

    const tabClass = (tabName) =>
        `flex-1 py-3 text-center text-sm font-semibold cursor-pointer relative transition-colors duration-300 
    ${activeTab === tabName ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`;

    return (
        <div className="min-h-screen max-h-full flex flex-col md:flex-row bg-white font-sans">
            {/* LEFT SIDE IMAGE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex md:w-1/2 lg:w-4/7 relative overflow-hidden"
            >
                <img
                    src="https://pimwp.s3-accelerate.amazonaws.com/2022/01/6-emerging-trends-in-residential-real-estate-in-the-post-COVID-19-era-FB-1200x700-compressed.jpg"
                    alt="Modern House Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent text-white p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: -100 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="max-w-lg"
                    >
                        <h1 className="text-5xl font-extrabold mb-4">REAL ESTATE</h1>
                        <p className="text-xl font-light">
                            Your trusted platform for property management and rental discovery.
                        </p>
                    </motion.div>
                </div>


            </motion.div>

            {/* RIGHT SIDE - Register Form */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 lg:w-3/7 flex flex-col justify-center p-8 sm:p-12 bg-white"
            >
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Register to manage your listings or find your next home.
                    </p>

                    {/* Tab Selection */}
                    <div className="flex bg-sky-100 rounded-lg p-1 mb-8 shadow-inner">
                        <div
                            className={tabClass("User")}
                            onClick={() => setActiveTab("User")}
                        >
                            User
                            {activeTab === "User" && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                                />
                            )}
                        </div>
                        <div
                            className={tabClass("Realtor")}
                            onClick={() => setActiveTab("Realtor")}
                        >
                            Realtor/Agent
                            {activeTab === "Realtor" && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                                />
                            )}
                        </div>
                    </div>

                    {/* Dynamic Form */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <AnimatePresence mode="wait">
                            {activeTab === "User" ? (
                                <UserRegisterForm />
                            ) : (
                                <RealtorRegisterForm />
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center py-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative bg-white px-4 text-sm text-gray-500">
                            Or continue with
                        </div>
                    </div>

                    {/* Social Buttons */}
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
                            <TiSocialFacebook size={23} className="text-blue-600 mx-2" />
                            Facebook
                        </motion.button>
                    </div>

                    {/* Already Registered */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default UserRegister;
