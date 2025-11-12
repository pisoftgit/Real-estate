// import { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import {
//     FaMapMarkerAlt,
//     FaChevronDown,
//     FaUser,
//     FaStar,
//     FaHome,
//     FaRupeeSign,
//     FaShoppingCart,
//     FaSignOutAlt,
//     FaCheck,
//     FaPhoneAlt,
//     FaBars,
//     FaTimes,
// } from 'react-icons/fa';

// const PRIMARY_COLOR = '#426ff5';
// const BADGE_COLOR = '#FFD700';

// const dropdownItems = [
//     { name: 'Buy', icon: FaShoppingCart, subItems: ['Residential Property', 'Commercial Spaces', 'New Launch Projects'] },
//     { name: 'Rent', icon: FaHome, subItems: ['Flats for Rent', 'Houses/Villas', 'PG/Hostel'] },
//     { name: 'Sell', icon: FaSignOutAlt, subItems: ['Post Property FREE', 'Advertise with us', 'Agent Services'] },
//     { name: 'Home Loans', icon: FaRupeeSign, subItems: ['Eligibility Check', 'EMI Calculator', 'Transfer Loan'] },
//     { name: 'Home Interiors', icon: FaHome, subItems: ['Modular Kitchen', 'Full Home Design', 'Design Gallery'] },
//     { name: 'Help', icon: FaPhoneAlt, subItems: ['Support Center', 'FAQs', 'Live Chat'] },
// ];

// const utilityItems = [
//     { name: 'MB Prime', icon: FaStar, color: 'text-yellow-400' },
//     { name: 'Login / Sign Up', icon: FaUser, color: 'text-gray-700' },
//     { name: 'Call Us: 9874562145', icon: FaPhoneAlt, color: 'text-gray-700' },
// ];

// const MobileMenu = ({ isOpen, onClose, items, primaryColor }) => {
//     const [expandedItem, setExpandedItem] = useState(null);
//     useEffect(() => {
//         if (isOpen) {
//             document.body.classList.add('overflow-hidden');
//         } else {
//             document.body.classList.remove('overflow-hidden');
//         }
//         return () => {
//             document.body.classList.remove('overflow-hidden');
//         };
//     }, [isOpen]);

//     const toggleItem = (name) => {
//         setExpandedItem((prev) => (prev === name ? null : name));
//     };

//     const mobileVariants = {
//         closed: { opacity: 0, y: '100%' },
//         open: { opacity: 1, y: '0%' },
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial="closed"
//                     animate="open"
//                     exit="closed"
//                     variants={mobileVariants}
//                     transition={{ type: 'spring', stiffness: 400, damping: 40 }}
//                     className="fixed inset-0 w-full h-full bg-white/5 backdrop-blur-xs z-[100] md:hidden"
//                     onClick={onClose}
//                 >
//                     <motion.div
//                         className="absolute bottom-0 w-full bg-white shadow-2xl rounded-t-2xl max-h-[93vh] overflow-y-auto p-6"
//                         onClick={(e) => e.stopPropagation()}
//                         initial={{ y: '100%' }}
//                         animate={{ y: '0%' }}
//                         exit={{ y: '100%' }}
//                         transition={{ type: 'spring', stiffness: 400, damping: 40 }}
//                     >
//                         {/* Header */}
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-It font-bold" style={{ color: primaryColor }}>
//                                 <a href='/'>RealEstate</a>
//                             </h2>
//                             <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0">
//                                 <FaTimes className="text-base text-gray-600" />
//                             </button>
//                         </div>

//                         {/* Utility Links */}
//                         <div className="flex flex-col space-y-2">
//                             <h3 className="text-xs font-semibold font-ns uppercase text-gray-500 pt-2 border-t mt-5">
//                                 Account & Support
//                             </h3>
//                             {utilityItems.map((item, index) => (
//                                 <a
//                                     key={`util-${index}`}
//                                     href="#"
//                                     className="py-2 px-3 flex items-center space-x-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//                                     onClick={onClose}
//                                 >
//                                     <item.icon className={`text-lg ${item.color}`} />
//                                     <span className="font-semibold font-ns">{item.name}</span>
//                                 </a>
//                             ))}
//                         </div>

//                         {/* Main Menu */}
//                         <h3 className="text-xs font-semibold font-ns uppercase text-gray-500 pt-4 border-t mt-4">
//                             Property Services
//                         </h3>
//                         <div className="flex flex-col divide-y">
//                             {items.map((item, index) => {
//                                 const isExpanded = expandedItem === item.name;
//                                 const Icon = item.icon;

//                                 return (
//                                     <div key={item.name} className="py-2">
//                                         {/* Parent Item */}
//                                         <button
//                                             onClick={() => toggleItem(item.name)}
//                                             className="w-full flex justify-between items-center px-3 py-2 text-left rounded-md hover:bg-blue-50 transition-colors"
//                                         >
//                                             <span className="font-bold font-ns text-gray-800 flex items-center space-x-2">
//                                                 <Icon className="text-base" style={{ color: primaryColor }} />
//                                                 <span>{item.name}</span>
//                                             </span>
//                                             <FaChevronDown
//                                                 className={`text-xs transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-90'} text-gray-500`}
//                                             />
//                                         </button>

//                                         {/* Sub Items (animated) */}
//                                         <AnimatePresence>
//                                             {isExpanded && (
//                                                 <motion.div
//                                                     initial={{ height: 0, opacity: 0 }}
//                                                     animate={{ height: 'auto', opacity: 1 }}
//                                                     exit={{ height: 0, opacity: 0 }}
//                                                     transition={{ duration: 0.3 }}
//                                                     className="pl-8 mt-1 flex flex-col space-y-1 overflow-hidden"
//                                                 >
//                                                     {item.subItems.map((subItem, idx) => (
//                                                         <a
//                                                             key={idx}
//                                                             href="#"
//                                                             onClick={onClose}
//                                                             className="text-gray-600 text-sm py-1 hover:text-blue-700"
//                                                         >
//                                                             {subItem}
//                                                         </a>
//                                                     ))}
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default function Navbar() {
//     const [hoveredDropdown, setHoveredDropdown] = useState(null);
//     const [currentCity, setCurrentCity] = useState('Bangalore');
//     const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//     const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad'];

//     const dropdownVariants = {
//         initial: { opacity: 0, y: -10 },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
//         exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
//     };

//     const handleCityChange = (city) => {
//         setCurrentCity(city);
//         setHoveredDropdown(null);
//     };

//     return (
//         <nav className="shadow-md shadow-[#426ff55b] font-ns text-sm z-20 fixed top-0 w-full">
//             <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white py-3">
//                 <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
//                     <div className="flex items-center space-x-4 md:space-x-10">
//                         <div className='flex flex-row justify-between items-center space-x-2'>
//                             <div className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer"><a href='/'>RealEstate</a></div>

//                         </div>
//                         {/* <div
//                             className="relative cursor-pointer items-center space-x-1 hidden md:flex"
//                             onMouseEnter={() => setHoveredDropdown('Location')}
//                             onMouseLeave={() => setHoveredDropdown(null)}
//                         >
//                             <FaMapMarkerAlt className="text-base" />
//                             <span>{currentCity}</span>
//                             <FaChevronDown className="text-[10px] opacity-70" />

//                             <AnimatePresence>
//                                 {hoveredDropdown === 'Location' && (
//                                     <motion.div
//                                         variants={dropdownVariants}
//                                         initial="initial"
//                                         animate="animate"
//                                         exit="exit"
//                                         className="absolute top-full left-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded border border-gray-300 z-50 overflow-hidden"
//                                     >
//                                         <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white px-4 py-2 text-xs font-bold">Select City</div>
//                                         {cities.map((city) => (
//                                             <div
//                                                 key={city}
//                                                 onClick={() => handleCityChange(city)}
//                                                 className={`px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer ${currentCity === city ? 'bg-blue-50 font-bold' : ''}`}
//                                             >
//                                                 {city}
//                                                 {currentCity === city && <FaCheck className="text-xs" style={{ color: PRIMARY_COLOR }} />}
//                                             </div>
//                                         ))}
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div> */}
//                     </div>

//                     <div className="flex items-center space-x-4 md:space-x-6 text-white font-medium">
//                         <div className="hidden md:flex items-center space-x-6">
//                             <a href="#" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
//                                 <FaStar className="text-yellow-400" />
//                                 <span>HL Prime</span>
//                             </a>
//                             <a href="#" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
//                                 <FaUser />
//                                 <span>Login</span>
//                             </a>
//                         </div>

//                         <button className="bg-white hidden text-black font-bold rounded-full px-3 py-1 md:px-4 md:py-1.5 md:flex items-center space-x-2 shadow hover:opacity-90">
//                             <span style={{ color: PRIMARY_COLOR }}>Post Property</span>
//                             <span style={{ backgroundColor: BADGE_COLOR }} className="text-xs font-bold text-gray-900 px-1 rounded-sm">FREE</span>
//                         </button>

//                         <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-xl">
//                             <FaBars />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="bg-white shadow text-gray-800 py-3 hidden md:block">
//                 <div className="max-w-7xl mx-auto px-4 md:px-8">
//                     <div className="flex justify-center items-center space-x-1 font-semibold">
//                         {dropdownItems.map((item) => {
//                             const isActive = hoveredDropdown === item.name;
//                             return (
//                                 <div
//                                     key={item.name}
//                                     className="relative"
//                                     onMouseEnter={() => setHoveredDropdown(item.name)}
//                                     onMouseLeave={() => setHoveredDropdown(null)}
//                                 >
//                                     <div
//                                         className={`flex items-center space-x-1 px-4 py-2 cursor-pointer rounded-md transition-all duration-200 ${isActive ? 'text-white shadow-md' : 'hover:shadow-sm hover:text-gray-900'}`}
//                                         style={{
//                                             backgroundColor: isActive ? PRIMARY_COLOR : 'transparent',
//                                         }}
//                                     >
//                                         <span>{item.name}</span>
//                                         <FaChevronDown className={`text-[10px] ${isActive ? 'text-white' : 'text-gray-400'}`} />
//                                     </div>

//                                     <AnimatePresence>
//                                         {isActive && (
//                                             <motion.div
//                                                 variants={dropdownVariants}
//                                                 initial="initial"
//                                                 animate="animate"
//                                                 exit="exit"
//                                                 className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-blue-50 border border-gray-100 shadow-lg rounded w-56 z-50 overflow-hidden"
//                                             >
//                                                 {item.subItems.map((sub, idx) => {
//                                                     const SubIcon = item.icon;
//                                                     return (
//                                                         <a
//                                                             key={idx}
//                                                             href="#"
//                                                             className="px-4 py-2 text-gray-700 flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
//                                                         >
//                                                             <SubIcon className="text-sm" style={{ color: PRIMARY_COLOR }} />
//                                                             <span>{sub}</span>
//                                                         </a>
//                                                     );
//                                                 })}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div> */}

//             <MobileMenu
//                 isOpen={isMobileMenuOpen}
//                 items={dropdownItems}
//                 onClose={() => setMobileMenuOpen(false)}
//                 primaryColor={PRIMARY_COLOR}
//             />
//         </nav>
//     );
// }

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaChevronDown,
    FaUser,
    FaHome,
    FaRupeeSign,
    FaShoppingCart,
    FaSignOutAlt,
    FaCheck,
    FaPhoneAlt,
    FaBars,
    FaTimes,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PRIMARY_COLOR = '#426ff5';
const BADGE_COLOR = '#FFD700';

const dropdownItems = [
    {
        name: 'Buy', icon: FaShoppingCart, path: '/buy', subItems: [
            { name: 'Residential Property', path: '/buy/residential' },
            { name: 'Commercial Spaces', path: '/buy/commercial' },
            { name: 'New Launch Projects', path: '/buy/new-launch' }
        ]
    },
    {
        name: 'Rent', icon: FaHome, path: '/rent', subItems: [
            { name: 'Flats for Rent', path: '/rent/flats' },
            { name: 'Houses/Villas', path: '/rent/houses' },
            { name: 'PG/Hostel', path: '/rent/pg' }
        ]
    },
    {
        name: 'Sell', icon: FaSignOutAlt, path: '/sell', subItems: [
            { name: 'Post Property FREE', path: '/sell/post' },
            { name: 'Advertise with us', path: '/sell/advertise' },
            { name: 'Agent Services', path: '/sell/agents' }
        ]
    },
    {
        name: 'Home Loans', icon: FaRupeeSign, path: '/home-loans', subItems: [
            { name: 'Eligibility Check', path: '/home-loans/eligibility' },
            { name: 'EMI Calculator', path: '/home-loans/emi' },
            { name: 'Transfer Loan', path: '/home-loans/transfer' }
        ]
    },
    {
        name: 'Home Interiors', icon: FaHome, path: '/interiors', subItems: [
            { name: 'Modular Kitchen', path: '/interiors/kitchen' },
            { name: 'Full Home Design', path: '/interiors/full-home' },
            { name: 'Design Gallery', path: '/interiors/gallery' }
        ]
    },
    {
        name: 'Help', icon: FaPhoneAlt, path: '/help', subItems: [
            { name: 'Support Center', path: '/help/support' },
            { name: 'FAQs', path: '/help/faqs' },
            { name: 'Live Chat', path: '/help/chat' }
        ]
    },
];


// ✅ Updated Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, items, primaryColor, username, onLogin, onLogout }) => {
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
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
                    className="fixed inset-0 w-full h-full bg-white/5 backdrop-blur-sm z-[100] md:hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="absolute bottom-0 w-full bg-white shadow-2xl rounded-t-3xl max-h-[93vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <h2 className="text-xl font-extrabold font-It tracking-tight" style={{ color: primaryColor }}>
                                <a href='/'>RealEstate</a>
                            </h2>
                            <button onClick={onClose} className="text-2xl text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Account Section */}
                        <div className="flex flex-col space-y-2 mt-4">
                            <h3 className="text-xs font-semibold font-ns uppercase text-gray-500">Account & Support</h3>

                            {username ? (
                                <>
                                    <div className="py-3 px-4 flex items-center space-x-4 rounded-xl text-gray-700 bg-gray-50">
                                        <FaUser className="text-xl text-blue-500" />
                                        <span className="font-semibold font-ns">{username}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            onClose();
                                        }}
                                        className="py-3 px-4 flex items-center space-x-4 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <FaSignOutAlt className="text-xl text-red-500" />
                                        <span className="font-semibold font-ns">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        onLogin();
                                        onClose();
                                    }}
                                    className="py-3 px-4 flex items-center space-x-4 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FaUser className="text-xl text-gray-600" />
                                    <span className="font-semibold font-ns">Login / Sign Up</span>
                                </button>
                            )}
                        </div>

                        {/* Property Services */}
                        <h3 className="text-xs font-semibold font-ns uppercase text-gray-500 pt-6 border-t mt-6">
                            Property Services
                        </h3>
                        <div className="flex flex-col divide-y divide-gray-200">
                            {items.map((item) => {
                                const isExpanded = expandedItem === item.name;
                                const Icon = item.icon;

                                return (
                                    <div key={item.name} className="py-2">
                                        {item.subItems ? (
                                            <button
                                                onClick={() => toggleItem(item.name)}
                                                className="w-full flex justify-between items-center px-4 py-3 text-left rounded-xl hover:bg-sky-50 transition-colors"
                                            >
                                                <span className="font-bold font-ns text-gray-800 flex items-center space-x-3">
                                                    <Icon className="text-lg" style={{ color: primaryColor }} />
                                                    <span>{item.name}</span>
                                                </span>
                                                <FaChevronDown
                                                    className={`text-xs transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'} text-gray-500`}
                                                />
                                            </button>
                                        ) : (
                                            <a
                                                href={item.path}
                                                onClick={onClose}
                                                className="w-full px-4 py-3 rounded-xl hover:bg-sky-50 font-bold font-ns text-gray-800 flex items-center space-x-3"
                                            >
                                                <Icon className="text-lg" style={{ color: primaryColor }} />
                                                <span>{item.name}</span>
                                            </a>
                                        )}

                                        {/* Sub Items */}
                                        <AnimatePresence>
                                            {isExpanded && item.subItems && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="pl-12 mt-1 flex flex-col space-y-1 overflow-hidden"
                                                >
                                                    {item.subItems.map((sub, idx) => {
                                                        const SubIcon = item.icon;
                                                        return (
                                                            <a
                                                                key={idx}
                                                                href={sub.path}
                                                                onClick={onClose}
                                                                className="px-4 py-2.5 text-gray-700 flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                            >
                                                                <SubIcon className="text-sm" style={{ color: primaryColor }} />
                                                                <span>{sub.name}</span>
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// ✅ Navbar Component
export default function Navbar() {
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const [currentCity, setCurrentCity] = useState('Mumbai');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad'];

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUsername(parsedUser.organization?.name || parsedUser.user?.name || "User");
            } catch {
                setUsername("User");
            }
        } else setUsername(null);
    }, []);

    const handleCityChange = (city) => {
        setCurrentCity(city);
        setHoveredDropdown(null);
    };

    const handleLoginClick = () => navigate("/userLogin");

    const handleLogout = () => {
        localStorage.clear();
        setUsername(null);
        navigate("/");
    };

    const dropdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <nav className="shadow-lg shadow-[#426ff542] font-ns text-sm z-50 fixed top-0 w-full">
            {/* Top Bar */}
            <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white py-3">
                <div className="container mx-auto px-4 md:px-2 lg:px-8 flex justify-between items-center">
                    {/* Logo & City */}
                    <div className="flex items-center space-x-4 md:space-x-10">
                        <div className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer">
                            <a href='/'>RealEstate</a>
                        </div>

                        {/* City Selector */}
                        <div
                            className="relative cursor-pointer items-center space-x-1 hidden md:flex rounded-full px-3 py-1 hover:bg-white/20 transition-all duration-300"
                            onMouseEnter={() => setHoveredDropdown('Location')}
                            onMouseLeave={() => setHoveredDropdown(null)}
                        >
                            <FaMapMarkerAlt className="text-base" />
                            <span>{currentCity}</span>
                            <FaChevronDown className="text-[10px] opacity-70 transition-transform duration-300" />

                            {/* City Dropdown */}
                            <AnimatePresence>
                                {hoveredDropdown === 'Location' && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute top-full left-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden"
                                    >
                                        <div style={{ backgroundColor: PRIMARY_COLOR }} className="text-white px-4 py-2 text-xs font-bold">
                                            Select City
                                        </div>
                                        {cities.map((city) => (
                                            <div
                                                key={city}
                                                onClick={() => handleCityChange(city)}
                                                className={`px-4 py-2 hover:bg-blue-50 flex justify-between items-center cursor-pointer transition-colors ${currentCity === city ? 'bg-blue-100 font-bold text-blue-800' : ''
                                                    }`}
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

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4 md:space-x-2 text-white font-medium">
                        <div className="hidden md:flex items-center space-x-3">
                            <a href="/" className="flex items-center space-x-1 hover:bg-white/20 transition-all duration-300 rounded-full px-3 py-1">
                                <FaHome className="text-white" />
                                <span>Home</span>
                            </a>

                            {username ? (
                                <>
                                    <span className="flex items-center space-x-2">
                                        <FaUser />
                                        <span>{username}</span>
                                    </span>
                                    <span
                                        onClick={handleLogout}
                                        className="cursor-pointer flex items-center space-x-1 hover:bg-white/20 transition-all duration-300 rounded-full px-3 py-1"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </span>
                                </>
                            ) : (
                                <span
                                    onClick={handleLoginClick}
                                    className="cursor-pointer flex items-center space-x-1 hover:bg-white/20 transition-all duration-300 rounded-full px-3 py-1"
                                >
                                    <FaUser />
                                    <span>Login</span>
                                </span>
                            )}
                        </div>

                        {/* Post Property */}
                        <a
                            href="/sell/post-property"
                            className="bg-white hidden text-black font-bold rounded-full px-4 py-2 md:flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <span style={{ color: PRIMARY_COLOR }}>Post Property</span>
                            <span style={{ backgroundColor: BADGE_COLOR }} className="text-xs font-bold text-gray-900 px-1.5 py-0.5 rounded-full">
                                FREE
                            </span>
                        </a>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden text-xl p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                items={dropdownItems}
                onClose={() => setMobileMenuOpen(false)}
                primaryColor={PRIMARY_COLOR}
                username={username}
                onLogin={handleLoginClick}
                onLogout={handleLogout}
            />
        </nav>
    );
}
