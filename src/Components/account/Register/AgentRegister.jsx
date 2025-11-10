// components/RealtorStepForm.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY_BLUE = "#426ff5";
const LIGHT_BLUE = "#e9f0ff";

const RealtorStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessNature: [],
    address1: "",
    address2: "",
    country: "",
    state: "",
    district: "",
    city: "",
    logo: null,
    website: "",
    description: "",
  });

  const businessOptions = ["Builder", "Channel Partner", "Dealer"];

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessNature = (option) => {
    setFormData((prev) => {
      const exists = prev.businessNature.includes(option);
      return {
        ...prev,
        businessNature: exists
          ? prev.businessNature.filter((item) => item !== option)
          : [...prev.businessNature, option],
      };
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      logo: formData.logo ? formData.logo.name : null,
    };
    console.log("📦 Realtor Registration Payload:", payload);
    alert("Payload logged in console!");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 transition duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[--primary-blue]";
  const primaryButtonClass =
    "text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 hover:opacity-90";
  const secondaryButtonClass =
    "px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition";

  return (
    <div
      style={{ "--primary-blue": PRIMARY_BLUE, "--light-blue": LIGHT_BLUE }}
      className="w-full max-w-xl mx-auto p-5 bg-white shadow-2xl rounded-3xl"
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-gray-600 mb-2">
          Step {step} of 3
        </div>
        <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-200">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: PRIMARY_BLUE }}
          ></motion.div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* STEP 1 – Contact Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name / Agency Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name or Agency"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={nextStep}
                type="button"
                style={{ backgroundColor: PRIMARY_BLUE }}
                className={`w-full ${primaryButtonClass} mt-8`}
              >
                Next: Business Info →
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2 – Business Nature + Address */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Business Nature & Address
              </h2>

              {/* Business Nature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Nature
                </label>
                <div className="flex flex-wrap gap-3">
                  {businessOptions.map((option) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={option}
                      type="button"
                      onClick={() => handleBusinessNature(option)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 
                        ${
                          formData.businessNature.includes(option)
                            ? "text-white border-transparent shadow-md"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-[--light-blue]"
                        }`}
                      style={{
                        backgroundColor: formData.businessNature.includes(option)
                          ? PRIMARY_BLUE
                          : "white",
                        borderColor: formData.businessNature.includes(option)
                          ? PRIMARY_BLUE
                          : "#D1D5DB",
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Street, Building, etc."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Landmark, Apartment, etc."
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  type="button"
                  className={secondaryButtonClass}
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  type="button"
                  style={{ backgroundColor: PRIMARY_BLUE }}
                  className={`px-8 ${primaryButtonClass}`}
                >
                  Next: Branding →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 – Logo, Website, Description */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Branding & Description
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full border border-gray-300 rounded-xl p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[--light-blue] file:text-[--primary-blue] hover:file:bg-[#d0dbfb]"
                />
                {formData.logo && (
                  <p className="text-xs text-gray-500 mt-1">
                    File ready: {formData.logo.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.yourcompany.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write about your company..."
                  rows="3"
                  className={inputClass}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  type="button"
                  className={secondaryButtonClass}
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{ backgroundColor: PRIMARY_BLUE }}
                  className={`px-8 ${primaryButtonClass}`}
                >
                  Submit Registration →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default RealtorStepForm;
