import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { BaseURL } from "../BaseURL"; 
import { useNavigate } from "react-router-dom";

const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null;

    const baseStyle =
        "p-3 rounded-lg text-sm font-medium transition duration-300 shadow-lg mb-4";
    const styleMap = {
        error: "bg-red-100 text-red-700 border border-red-300",
        success: "bg-green-100 text-green-700 border border-green-300",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${baseStyle} ${styleMap[type] || "bg-gray-100 text-gray-700"}`}
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-600 hover:text-gray-900 font-bold"
                >
                    &times;
                </button>
            </div>
        </motion.div>
    );
};

function App() {
    const [userCode, setUserCode] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("error");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()

    const clearMessage = () => setMessage(null);

    const HandleSignUp = () => {
        navigate('/UserRegister')
    };

    const HandleLoginClick = async () => {
        clearMessage();

        if (userCode.trim() === "" || password.trim() === "") {
            setMessage("Please fill in both User Code and Password.");
            setMessageType("error");
            return;
        }

        setIsLoading(true);
        try {
            const payload = { usercode: userCode, password };

            const response = await fetch(`${BaseURL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setUserData(data);
                setIsLoggedIn(true);
                console.log("✅ Login successful:", data);
            } else {
                setMessage(data.message || "Invalid User Code or Password.");
                setMessageType("error");
            }
        } catch (error) {
            console.error("❌ Network Error:", error);
            setMessage("A network error occurred. Please try again later.");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading) HandleLoginClick();
    };

    if (isLoggedIn) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center bg-green-50 p-6"
            >
                <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border border-green-200">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        Welcome, {userData?.user?.name || "User"}!
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        You have successfully logged in to the Real Estate Platform.
                    </p>

                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">User Code:</span>{" "}
                            {userData?.user?.usercode}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Organization:</span>{" "}
                            {userData?.organization?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Branch:</span>{" "}
                            {userData?.branch?.branch}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Privileges:</span>{" "}
                            {userData?.privileges?.join(", ")}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Secret Key:</span>{" "}
                            {userData?.secretKey?.substring(0, 30)}...
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Current Day:</span>{" "}
                            {userData?.currentDay}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                            setIsLoggedIn(false);
                            setUserData(null);
                            setUserCode("");
                            setPassword("");
                        }}
                        className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-red-600 transition duration-300 mt-6"
                    >
                        Logout and Return to Login
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-h-screen min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
            {/* LEFT SIDE IMAGE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden shadow-2xl"
            >
                <img
                    src="/login-RegisterPhoto.webp"
                    alt="Modern House Interior"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/1200x700/60A5FA/FFFFFF?text=REAL+ESTATE+IMAGE";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent flex flex-col justify-end p-12 text-white">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-5xl font-extrabold mb-4"
                    >
                        REAL ESTATE
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="text-xl font-light max-w-lg"
                    >
                        Your trusted platform for property management and rental discovery.
                    </motion.p>
                </div>
            </motion.div>

            {/* RIGHT SIDE LOGIN FORM */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 bg-white shadow-inner"
            >
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-6">
                        Log in to manage your properties or find your next home.
                    </p>

                    <MessageModal message={message} type={messageType} onClose={clearMessage} />

                    <form onSubmit={handleSubmit}>
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    value={userCode}
                                    onChange={(e) => setUserCode(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberLandlord"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="rememberLandlord" className="ml-2 text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot Password?
                                </a>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="24"
                                            visible={true}
                                        />
                                        <span className="ml-2">Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        Login{" "}
                                        <IoIosArrowForward
                                            size={16}
                                            className="mx-2 text-white inline-block"
                                        />
                                    </>
                                )}
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

                    <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
                            disabled={isLoading}
                        >
                            <FcGoogle size={19} className="mr-2" />
                            Google
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
                            disabled={isLoading}
                        >
                            <TiSocialFacebook size={23} className="text-blue-600 mr-2" />
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

export default App;
