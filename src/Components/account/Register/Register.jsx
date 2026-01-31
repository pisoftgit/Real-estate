import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import {
    FaUser,
    FaBuilding,
    FaEnvelope,
    FaLock,
    FaPhoneAlt,
    FaExclamationCircle,
    FaCheckCircle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL2 } from "../../../../BaseURL"; // Using BaseURL2 as requested

// ---------------- Password Validation Helper ----------------
const validatePassword = (pwd) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    return {
        minLength: pwd.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isValid: pwd.length >= minLength, // Flexible for "000000" style passwords
    };
};

// ---------------- Input Field Component ----------------
const InputField = ({
    id,
    name,
    type,
    placeholder,
    icon,
    value,
    onChange,
    error,
    toggleVisibility,
}) => (
    <div className="space-y-1">
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {icon}
            </span>

            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className={`w-full pl-10 pr-10 py-3 border rounded-2xl focus:ring-4 transition duration-150 text-sm placeholder-gray-500 ${error
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
            />

            {toggleVisibility && (
                <button
                    type="button"
                    onClick={toggleVisibility.onClick}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                    {toggleVisibility.visible ? (
                        <FaEyeSlash size={16} />
                    ) : (
                        <FaEye size={16} />
                    )}
                </button>
            )}
        </div>

        {error && (
            <p className="flex items-center text-xs text-red-500 pt-1 ml-1 font-medium">
                <FaExclamationCircle className="mr-1 h-3 w-3" /> {error}
            </p>
        )}
    </div>
);

// ---------------- Password Strength Indicator ----------------
const PasswordStrengthIndicator = ({ password }) => {
    if (!password) return null;
    const checks = validatePassword(password);
    const { minLength, isValid } = checks;

    return (
        <div className={`p-3 text-sm rounded-lg mt-2 ${isValid ? "bg-green-50" : "bg-yellow-50"} border border-gray-200`}>
            <p className={`font-semibold mb-1 ${isValid ? "text-green-700" : "text-gray-700"}`}>
                Password Strength: {isValid ? "Strong" : "Improvement needed"}
            </p>
            <ul className="list-none pl-0">
                <li className={`flex items-center text-xs ${minLength ? "text-green-600" : "text-gray-500"}`}>
                    {minLength ? <FaCheckCircle className="mr-1 h-3 w-3" /> : <FaExclamationCircle className="mr-1 h-3 w-3" />}
                    Min 6 characters
                </li>
            </ul>
        </div>
    );
};

// ---------------- Notification Banner ----------------
const NotificationBanner = ({ message, type }) => (
    <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className={`p-4 rounded-xl shadow-lg mb-4 text-sm font-bold ${type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
    >
        <div className="flex items-center">
            {type === "success" ? (
                <FaCheckCircle className="mr-2 h-5 w-5" />
            ) : (
                <FaExclamationCircle className="mr-2 h-5 w-5" />
            )}
            {message}
        </div>
    </motion.div>
);

export default function App() {
    const [role, setRole] = useState("BUYER"); // Using Uppercase to match payload requirements
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [businessNaturesFromApi, setBusinessNaturesFromApi] = useState([]);
    const [selectedBusinessIds, setSelectedBusinessIds] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverMessage, setServerMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isRealtor = role === "REALTOR";
    const navigate = useNavigate();
    const HandleSignIn = () => navigate("/UserLogin");

    // Fetch Business Natures on component load
    useEffect(() => {
        const fetchBusinessNatures = async () => {
            try {
                const res = await axios.get(`${BaseURL2}/builders/getAllRealEstateUserCategories`);
                // Expected format from API: [{id: 362050, name: 'Builder'}, ...]
                setBusinessNaturesFromApi(res.data);
            } catch (err) {
                console.error("Error fetching business natures", err);
            }
        };
        fetchBusinessNatures();
    }, []);

    const handleBusinessNatureToggle = (id) => {
        setSelectedBusinessIds((prev) =>
            prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
        );
        if (errors.businessNature) {
            setErrors((prev) => ({ ...prev, businessNature: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmissionStatus(null);
        setServerMessage("");

        const newErrors = {};
        const passwordCheck = validatePassword(password);

        if (!name.trim()) newErrors.name = isRealtor ? "Agency Name is required." : "Full Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        if (!phone.trim()) newErrors.phone = "Phone number is required.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!passwordCheck.isValid) newErrors.password = "Password must be at least 6 characters.";
        if (isRealtor && selectedBusinessIds.length === 0) newErrors.businessNature = "Please select at least one nature.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            // --- Payload Construction ---
            const userData = {
                name,
                email,
                phone,
                password,
                userCategory: role, // "BUYER" or "REALTOR"
            };

            // Only send businessNatureIds if the user is a REALTOR
            if (isRealtor) {
                userData.businessNatureIds = selectedBusinessIds;
            }

            const response = await axios.post(`${BaseURL2}/user/add`, userData);

            if (response.status === 200 || response.status === 201) {
                setSubmissionStatus("success");
                setServerMessage("Registration successful! Redirecting...");
                
                // Reset Form
                setName(""); setEmail(""); setPhone("");
                setPassword(""); setConfirmPassword("");
                setSelectedBusinessIds([]);

                setTimeout(() => navigate("/UserLogin"), 2000);
            }
        } catch (error) {
            setSubmissionStatus("error");
            setServerMessage(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
            {/* LEFT IMAGE SIDE - Keep your original design */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden"
            >
                <img
                    src="/login-RegisterPhoto.webp"
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

            {/* RIGHT FORM SIDE - Keep your original design */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-white shadow-2xl overflow-y-auto"
            >
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Sign up as a <strong>{role}</strong> to access the platform.
                    </p>

                    {submissionStatus && (
                        <NotificationBanner
                            message={serverMessage}
                            type={submissionStatus}
                        />
                    )}

                    {/* Role toggle */}
                    <div className="flex w-full rounded-full bg-gray-200 p-1 mb-6 shadow-inner transition-all duration-300">
                        <button
                            type="button"
                            onClick={() => { setRole("BUYER"); setSelectedBusinessIds([]); setErrors({}); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-300 ${role === "BUYER"
                                ? "bg-white text-blue-700 shadow-xl ring-4 ring-blue-500/50"
                                : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                                }`}
                        >
                            <FaUser className="inline-block mr-2" /> Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => { setRole("REALTOR"); setSelectedBusinessIds([]); setErrors({}); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-300 ${role === "REALTOR"
                                ? "bg-white text-blue-700 shadow-xl ring-4 ring-blue-500/50"
                                : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                                }`}
                        >
                            <FaBuilding className="inline-block mr-2" /> Realtor/Agent
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            placeholder={isRealtor ? "Agency Name" : "Your Full Name"}
                            icon={isRealtor ? <FaBuilding /> : <FaUser />}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                        />

                        {isRealtor && (
                            <div className="pt-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center mb-3">
                                    <HiOutlineBriefcase className="mr-2 text-blue-600" /> Select
                                    your primary business nature(s):
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {businessNaturesFromApi.map((nature) => (
                                        <button
                                            key={nature.id}
                                            type="button"
                                            onClick={() => handleBusinessNatureToggle(nature.id)}
                                            className={`py-2 px-4 text-sm font-medium rounded-full transition duration-150 border ${selectedBusinessIds.includes(nature.id)
                                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {nature.name}
                                        </button>
                                    ))}
                                </div>
                                {errors.businessNature && (
                                    <p className="flex items-center text-xs text-red-500 pt-1 ml-1 font-medium mt-2">
                                        <FaExclamationCircle className="mr-1 h-3 w-3" />{" "}
                                        {errors.businessNature}
                                    </p>
                                )}
                            </div>
                        )}

                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            icon={<FaEnvelope />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <InputField
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            icon={<FaPhoneAlt size={14} />}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={errors.phone}
                        />

                        <InputField
                            id="password"
                            name="new-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            icon={<FaLock size={14} />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            toggleVisibility={{
                                visible: showPassword,
                                onClick: () => setShowPassword(!showPassword),
                            }}
                        />

                        <PasswordStrengthIndicator password={password} />

                        <InputField
                            id="confirmPassword"
                            name="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            icon={<FaLock size={14} />}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                            toggleVisibility={{
                                visible: showConfirmPassword,
                                onClick: () =>
                                    setShowConfirmPassword(!showConfirmPassword),
                            }}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 mt-6 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Saving..." : "Register and Create Account"}
                        </button>
                    </form>

                    <div className="relative flex items-center justify-center py-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative bg-white px-4 text-sm text-gray-500">
                            Or sign up with social
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium hover:bg-gray-50 transition duration-150">
                            <FcGoogle size={19} className="mx-2" /> Google
                        </button>
                        <button className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium hover:bg-gray-50 transition duration-150">
                            <TiSocialFacebook size={23} className="text-blue-600 mx-2" />{" "}
                            Facebook
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={HandleSignIn}
                            className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer transition duration-150"
                        >
                            Sign in now
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}