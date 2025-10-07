import React, { useState } from 'react';
import { motion } from 'framer-motion';

function UserLogin() {
  const [form, setForm] = useState({
    usernameOrEmail: '',
    password: '',
    mobile: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.usernameOrEmail || !form.password || !form.mobile) {
      setError('All fields are required.');
      return;
    }
    setError('');
    alert('Login submitted!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white"
    >
      <motion.h2
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-bold mb-6 text-center text-blue-700"
      >
        User Login
      </motion.h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Username or Email:
            <input
              type="text"
              name="usernameOrEmail"
              value={form.usernameOrEmail}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Registered Mobile Number:
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit mobile number"
            />
          </label>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 mb-4 text-center"
          >
            {error}
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
}

export default UserLogin;