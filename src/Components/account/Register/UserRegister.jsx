import React from "react";
import { motion } from "framer-motion";

const UserRegisterForm = () => (
  <motion.div
    key="UserRegister"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        placeholder="Enter your username"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <input
        type="email"
        placeholder="your.email@example.com"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        placeholder="+1 234 567 890"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        placeholder="Create a password"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mt-4"
    >
      Register as User →
    </motion.button>
  </motion.div>
);

export default UserRegisterForm;
