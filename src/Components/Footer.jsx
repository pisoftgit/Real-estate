import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const socialLinks = [
  { href: "#", icon: <FaFacebookF size={20} />, color: "#1877F2" }, // Facebook blue
  { href: "#", icon: <BsTwitterX size={20} />, color: "#000" }, // X black
  { href: "#", icon: <FaLinkedin size={20} />, color: "#0A66C2" }, // LinkedIn blue
  { href: "#", icon: <FaYoutube size={20} />, color: "#FF0000" }, // YouTube red
  { href: "#", icon: <FaInstagram size={20} />, color: "#E1306C" }, // Instagram pink
];

const linkGroups = {
  properties: [
    'Property in New Delhi',
    'Property in Mumbai',
    'Property in Chennai',
    'Property in Pune',
    'Property in Noida',
    'Property in Gurgaon',
    'Property in Bangalore',
    'Property in Ahmedabad',
  ],
  projects: [
    'New Projects in New Delhi',
    'New Projects in Mumbai',
    'New Projects in Chennai',
    'New Projects in Pune',
    'New Projects in Noida',
    'New Projects in Gurgaon',
    'New Projects in Bangalore',
    'New Projects in Ahmedabad',
  ],
  services: ['Home Loan', 'Home Interior'],
  bottomLinks: [
    'Sitemap',
    'Terms & Conditions',
    'Privacy Policy',
    'Whistle Blower Policy',
    'Blog',
    'Careers',
    'Testimonials',
    'Help Center',
    'Sales Enquiry',
    'Buy Services',
    'News',
  ],
};

const brandblue = "#426ff5";
const brandGold = "#FFD700";

function AnimatedLink({ href, children }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1, color: brandblue }}
      transition={{ type: "spring", stiffness: 300 }}
      className="hover:underline cursor-pointer"
    >
      {children}
    </motion.a>
  );
}

function SectionTitle({ children }) {
  return (
    <h4
      style={{ color: brandblue }}
      className="font-semibold mb-4 text-lg tracking-wide"
    >
      {children}
    </h4>
  );
}
// pca
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm select-none">
      <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <SectionTitle>About HomeLand</SectionTitle>
          <p className="mb-4 leading-relaxed text-gray-600">
            As the largest platform connecting property buyers and sellers, …{" "}
            <AnimatedLink href="#">Read more</AnimatedLink>
          </p>

          <div className="flex space-x-4 mb-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="block"
              aria-label="Google Play Store"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="block"
              aria-label="Apple App Store"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10"
              />
            </motion.a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map(({ href, icon, color }, i) => (
              <motion.a
                key={i}
                href={href}
                aria-label="Social Link"
                whileHover={{ scale: 1.2, color: brandGold }}
                style={{ color }}
                className="transition-colors"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Properties in India */}
        <div>
          <SectionTitle>Properties in India</SectionTitle>
          <p className="leading-relaxed text-gray-600">
            {linkGroups.properties.map((item, idx) => (
              <React.Fragment key={idx}>
                <AnimatedLink href="#">{item}</AnimatedLink>
                {idx !== linkGroups.properties.length - 1 && (
                  <span className="mx-1 text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* New Projects in India */}
        <div>
          <SectionTitle>New Projects in India</SectionTitle>
          <p className="leading-relaxed text-gray-600">
            {linkGroups.projects.map((item, idx) => (
              <React.Fragment key={idx}>
                <AnimatedLink href="#">{item}</AnimatedLink>
                {idx !== linkGroups.projects.length - 1 && (
                  <span className="mx-1 text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Property Services */}
        <div>
          <SectionTitle>Property Services</SectionTitle>
          <div className="flex flex-wrap gap-4 text-gray-600">
            {linkGroups.services.map((item, idx) => (
              <AnimatedLink key={idx} href="#">
                {item}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-gray-200 text-gray-600 text-xs py-3 border-t border-gray-300">
        <div className="container mx-auto px-4 md:px-8 flex flex-wrap gap-4 justify-center">
          {linkGroups.bottomLinks.map((item, idx) => (
            <AnimatedLink key={idx} href="#" className="px-2 whitespace-nowrap">
              {item}
            </AnimatedLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
