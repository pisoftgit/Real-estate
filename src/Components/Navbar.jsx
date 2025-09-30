import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaChevronDown,
    FaUser,
    FaStar,
    FaHome,
    FaRupeeSign,
    FaShoppingCart,
    FaSignOutAlt,
    FaCheck,
    FaPhoneAlt,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

const PRIMARY_COLOR = '#426ff5';
const BADGE_COLOR = '#FFD700';

const dropdownItems = [
    { name: 'Buy', icon: FaShoppingCart, subItems: ['Residential Property', 'Commercial Spaces', 'New Launch Projects'] },
    { name: 'Rent', icon: FaHome, subItems: ['Flats for Rent', 'Houses/Villas', 'PG/Hostel'] },
    { name: 'Sell', icon: FaSignOutAlt, subItems: ['Post Property FREE', 'Advertise with us', 'Agent Services'] },
    { name: 'Home Loans', icon: FaRupeeSign, subItems: ['Eligibility Check', 'EMI Calculator', 'Transfer Loan'] },
    { name: 'Home Interiors', icon: FaHome, subItems: ['Modular Kitchen', 'Full Home Design', 'Design Gallery'] },
    { name: 'Help', icon: FaPhoneAlt, subItems: ['Support Center', 'FAQs', 'Live Chat'] },
];

const utilityItems = [
    { name: 'MB Prime', icon: FaStar, color: 'text-yellow-400' },
    { name: 'Login / Sign Up', icon: FaUser, color: 'text-gray-700' },
    { name: 'Call Us: 9874562145', icon: FaPhoneAlt, color: 'text-gray-700' },
];

const MobileMenu = ({ isOpen, onClose, items, primaryColor }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    const toggleItem = (name) => {
        setExpandedItem((prev) => (prev === name ? null : name));
    };

    const mobileVariants = {
        closed: { opacity: 0, y: '100%' },
        open: { opacity: 1, y: '0%' },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={mobileVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    className="fixed inset-0 w-full h-full bg-white/5 backdrop-blur-xs z-[100] md:hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="absolute bottom-0 w-full bg-white shadow-2xl rounded-t-2xl max-h-[93vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-It font-bold" style={{ color: primaryColor }}>
                                <a href='/'>HOMELAND</a>
                            </h2>

                            <button onClick={onClose} className="text-2xl text-gray-800 p-2">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Utility Links */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-xs font-semibold font-ns uppercase text-gray-500 pt-2 border-t mt-5">
                                Account & Support
                            </h3>
                            {utilityItems.map((item, index) => (
                                <a
                                    key={`util-${index}`}
                                    href="#"
                                    className="py-2 px-3 flex items-center space-x-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={onClose}
                                >
                                    <item.icon className={`text-lg ${item.color}`} />
                                    <span className="font-semibold font-ns">{item.name}</span>
                                </a>
                            ))}
                        </div>

                        {/* Main Menu */}
                        <h3 className="text-xs font-semibold font-ns uppercase text-gray-500 pt-4 border-t mt-4">
                            Property Services
                        </h3>
                        <div className="flex flex-col divide-y">
                            {items.map((item, index) => {
                                const isExpanded = expandedItem === item.name;
                                const Icon = item.icon;

                                return (
                                    <div key={item.name} className="py-2">
                                        {/* Parent Item */}
                                        <button
                                            onClick={() => toggleItem(item.name)}
                                            className="w-full flex justify-between items-center px-3 py-2 text-left rounded-md hover:bg-sky-50 transition-colors"
                                        >
                                            <span className="font-bold font-ns text-gray-800 flex items-center space-x-2">
                                                <Icon className="text-base" style={{ color: primaryColor }} />
                                                <span>{item.name}</span>
                                            </span>
                                            <FaChevronDown
                                                className={`text-xs transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-90'} text-gray-500`}
                                            />
                                        </button>

                                        {/* Sub Items (animated) */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="pl-8 mt-1 flex flex-col space-y-1 overflow-hidden"
                                                >
                                                    {item.subItems.map((subItem, idx) => (
                                                        <a
                                                            key={idx}
                                                            href="#"
                                                            onClick={onClose}
                                                            className="text-gray-600 text-sm py-1 hover:text-green-700"
                                                        >
                                                            {subItem}
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function Navbar() {
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const [currentCity, setCurrentCity] = useState('Bangalore');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad'];

    const dropdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    const handleCityChange = (city) => {
        setCurrentCity(city);
        setHoveredDropdown(null);
    };

    return (
        <nav className="shadow-md shadow-[#426ff542] font-ns text-sm z-20 fixed top-0 w-full">
            <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white py-3">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-4 md:space-x-10">
                        <div className='flex flex-row justify-between items-center space-x-2'>
                            <div className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer"><a href='/'>HomeLand</a></div>

                        </div>
                        <div
                            className="relative cursor-pointer items-center space-x-1 hidden md:flex"
                            onMouseEnter={() => setHoveredDropdown('Location')}
                            onMouseLeave={() => setHoveredDropdown(null)}
                        >
                            <FaMapMarkerAlt className="text-base" />
                            <span>{currentCity}</span>
                            <FaChevronDown className="text-[10px] opacity-70" />

                            <AnimatePresence>
                                {hoveredDropdown === 'Location' && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute top-full left-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded border border-gray-300 z-50 overflow-hidden"
                                    >
                                        <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white px-4 py-2 text-xs font-bold">Select City</div>
                                        {cities.map((city) => (
                                            <div
                                                key={city}
                                                onClick={() => handleCityChange(city)}
                                                className={`px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer ${currentCity === city ? 'bg-blue-50 font-bold' : ''}`}
                                            >
                                                {city}
                                                {currentCity === city && <FaCheck className="text-xs" style={{ color: PRIMARY_COLOR }} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6 text-white font-medium">
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                                <FaStar className="text-yellow-400" />
                                <span>HL Prime</span>
                            </a>
                            <a href="#" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                                <FaUser />
                                <span>Login</span>
                            </a>
                        </div>

                        <button className="bg-white hidden text-black font-bold rounded-full px-3 py-1 md:px-4 md:py-1.5 md:flex items-center space-x-2 shadow hover:opacity-90">
                            <span style={{ color: PRIMARY_COLOR }}>Post Property</span>
                            <span style={{ backgroundColor: BADGE_COLOR }} className="text-xs font-bold text-gray-900 px-1 rounded-sm">FREE</span>
                        </button>

                        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-xl">
                            <FaBars />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow text-gray-800 py-3 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex justify-center items-center space-x-1 font-semibold">
                        {dropdownItems.map((item) => {
                            const isActive = hoveredDropdown === item.name;
                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => setHoveredDropdown(item.name)}
                                    onMouseLeave={() => setHoveredDropdown(null)}
                                >
                                    <div
                                        className={`flex items-center space-x-1 px-4 py-2 cursor-pointer rounded-md transition-all duration-200 ${isActive ? 'text-white shadow-md' : 'hover:shadow-sm hover:text-gray-900'}`}
                                        style={{
                                            backgroundColor: isActive ? PRIMARY_COLOR : 'transparent',
                                        }}
                                    >
                                        <span>{item.name}</span>
                                        <FaChevronDown className={`text-[10px] ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    </div>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                variants={dropdownVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-lg rounded w-56 z-50 overflow-hidden"
                                            >
                                                {item.subItems.map((sub, idx) => {
                                                    const SubIcon = item.icon;
                                                    return (
                                                        <a
                                                            key={idx}
                                                            href="#"
                                                            className="px-4 py-2 text-gray-700 flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                        >
                                                            <SubIcon className="text-sm" style={{ color: PRIMARY_COLOR }} />
                                                            <span>{sub}</span>
                                                        </a>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                items={dropdownItems}
                onClose={() => setMobileMenuOpen(false)}
                primaryColor={PRIMARY_COLOR}
            />
        </nav>
    );
}
