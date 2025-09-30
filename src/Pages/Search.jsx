import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronDown,
    FaTimes,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBuilding,
    FaSlidersH,
    FaCheck
} from 'react-icons/fa';
import Navbar from '../Components/Navbar2';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const PRIMARY_COLOR = '#426ff5';
const HOVER_blue = '#15803d';
const ACCENT_TEXT_COLOR = `text-[${PRIMARY_COLOR}]`;

const filterSettings = {
    Transaction: ['Buy', 'Rent', 'Sell'],
    City: ['Bangalore', 'Delhi', 'Mumbai'],
    Locality: ['Sarjapur', 'JP Nagar', 'HSR Layout'],
    Budget: ['<50L', '50L-1Cr', '1Cr-2Cr', '2Cr+'],
    'Property Type': ['Flat', 'Villa', 'Independent House'],
    BHK: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
    Status: ['Ready to Move', 'Under Construction'],
    'More Filters': ['Furnished', 'Resale'],
};

const mockProperties = [
    { id: 1, title: '3 BHK Ready to Occupy Flat for sale in Bhavya Dazzle Sarjapur', carpet: '1306 sqft', status: 'Ready to Move', floor: '2 out of 8', builder: 'Bhavya Builders (Operating Since: 2009)', price: '₹1.03 Cr', rate: '₹7,900 per sqft', image: '/hero_bg_1.jpg' },
    { id: 2, title: '3 BHK Ready to Occupy Flat for sale in Sri Nipuna Heritage', carpet: '1320 sqft', status: 'Ready to Move', floor: '5 out of 12', builder: 'Sri Nipuna Builders', price: '₹1.10 Cr', rate: '₹8,300 per sqft', image: '/hero_bg_2.jpg' },
    { id: 3, title: '2 BHK Under Construction Flat in JP Nagar', carpet: '950 sqft', status: 'Under Construction', floor: '3 out of 6', builder: 'bluefield Constructions', price: '₹75 Lakh', rate: '₹8,500 per sqft', image: '/hero_bg_4.jpg' },
];

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <Icon className={`text-sm ${ACCENT_TEXT_COLOR}`} />
        <span className="font-semibold text-gray-500">{label}:</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

const PropertyCard = ({ prop, openDetailsDrawer }) => {
    const primaryBg = `bg-[${PRIMARY_COLOR}]`;
    const primaryText = `text-[${PRIMARY_COLOR}]`;
    const primaryBorder = `border-[${PRIMARY_COLOR}]`;
    const navigate = useNavigate()

    const handleViewDetails = () => {
        navigate("/PropertyDetails")
    }

    return (
        <motion.div
            key={prop.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
            whileHover={{ scale: 1.005 }}
        >
            <div className="w-full md:w-1/3 h-56 md:h-auto relative">
                <img
                    src={prop.image}
                    alt={prop.title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
                <div>
                    <h2 className={`font-semibold text-xl mb-1 text-gray-800 hover:${primaryText} transition-colors`}>{prop.title}</h2>
                    <p className="text-gray-500 text-sm italic line-clamp-2">
                        Close to many educational institutions and workspace. Spacious, airy and well-lit project…
                    </p>

                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm text-gray-700 border-t pt-3 border-gray-100">
                        <DetailItem icon={FaMapMarkerAlt} label="Area" value={prop.carpet} />
                        <DetailItem icon={FaBuilding} label="Status" value={prop.status} />
                        <DetailItem icon={FaChevronDown} label="Floor" value={prop.floor} />
                        <DetailItem icon={FaBuilding} label="Builder" value={prop.builder.split(' ')[0]} />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100">
                    <div>
                        <div className="text-3xl font-bold text-gray-900">{prop.price}</div>
                        <div className="text-base text-gray-500 font-medium">{prop.rate}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                        <button
                            className={`hidden md:flex items-center justify-center px-5 py-2 ${primaryBg} text-white rounded-full text-sm font-semibold hover:bg-[${HOVER_blue}] transition`}
                        >
                            Contact Builder
                        </button>
                        <button
                            className={`hidden md:flex items-center justify-center px-5 py-2 border-2 ${primaryBorder} ${primaryText} rounded-full text-sm font-semibold hover:bg-[${PRIMARY_COLOR}] hover:text-white transition gap-1`}
                        >
                            <FaPhoneAlt /> Call Now
                        </button>

                        <button
                            onClick={handleViewDetails}
                            className={`hidden md:flex items-center justify-center px-5 py-2 border-2 ${primaryBorder} ${primaryText} rounded-full text-sm font-semibold hover:bg-[${PRIMARY_COLOR}] hover:text-white transition gap-1`}
                        >
                            View Details
                        </button>
                        <button
                            onClick={() => openDetailsDrawer(prop)}
                            className={`md:hidden w-full px-5 py-2 border-2 ${primaryBorder} ${primaryText} rounded-lg text-base font-semibold hover:bg-[${PRIMARY_COLOR}] hover:text-white transition`}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MobileDetailsDrawer = ({ property, onClose }) => {
    const primaryBg = `bg-[${PRIMARY_COLOR}]`;
    const primaryText = `text-[${PRIMARY_COLOR}]`;
    const primaryBorder = `border-[${PRIMARY_COLOR}]`;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="p-5">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1 bg-gray-300 rounded-full" />
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800 pr-4">{property.title}</h3>
                            <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0">
                                <FaTimes className="text-base text-gray-600" />
                            </button>
                        </div>

                        <div className={`p-4 rounded-xl ${primaryBg} text-white mb-4`}>
                            <div className="text-3xl font-bold">{property.price}</div>
                            <div className="text-sm opacity-90">{property.rate}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-base text-gray-700 border-t border-b py-4 border-gray-100">
                            <div><strong className={primaryText}>Area:</strong> {property.carpet}</div>
                            <div><strong className={primaryText}>Status:</strong> {property.status}</div>
                            <div><strong className={primaryText}>Floor:</strong> {property.floor}</div>
                            <div><strong className={primaryText}>Builder:</strong> {property.builder}</div>
                        </div>

                        <p className="text-gray-600 mt-4 italic text-sm">
                            Close to many educational institutions and workspace. Spacious, airy and well-lit project…
                        </p>

                        <div className="mt-8 space-y-3">
                            <button className={`w-full px-4 py-3 ${primaryBg} text-white rounded-lg text-base font-bold hover:bg-[${HOVER_blue}] flex items-center justify-center transition`}>
                                Contact Builder
                            </button>
                            <button className={`w-full px-4 py-3 border-2 ${primaryBorder} ${primaryText} rounded-lg text-base font-bold hover:bg-[${PRIMARY_COLOR}] hover:text-white transition flex items-center justify-center gap-2`}>
                                <FaPhoneAlt /> Get Phone No.
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const FilterDropdown = ({ title, options, selectedOption, toggleDropdown, selectOption, clearSelection, isOpen }) => {
    const primaryBg = `bg-[${PRIMARY_COLOR}]`;
    const primaryText = `text-[${PRIMARY_COLOR}]`;
    const dropdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
    };

    return (
        <div
            className="relative flex-shrink-0"
        >
            <button
                onMouseEnter={() => toggleDropdown(title)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${selectedOption
                    ? `${primaryBg} text-white shadow-md`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                    }`}
            >
                <span>{selectedOption || title}</span>
                {selectedOption && (
                    <FaTimes
                        className="text-xs ml-1 p-0.5 rounded-full hover:bg-white/30"
                        onClick={(e) => clearSelection(title, e)}
                    />
                )}
                <FaChevronDown
                    className={`text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} ${selectedOption ? 'text-white' : 'text-gray-400'}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-full mt-2 bg-white border border-gray-200 shadow-xl rounded-lg w-48 z-40 overflow-hidden right-0 md:left-0"
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => selectOption(title, option)}
                                className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-blue-50 hover:${primaryText} transition-colors ${selectedOption === option ? `bg-blue-100 ${primaryText} font-bold` : 'text-gray-700'
                                    }`}
                            >
                                <span>{option}</span>
                                {selectedOption === option && <FaCheck className="text-xs" />}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FilterBar = ({ filterSettings, selected, openKey, toggleDropdown, selectOption, clearSelection, openMobileFilterDrawer, handleClearAll, closeDropdown }) => {
    const primaryText = `text-[${PRIMARY_COLOR}]`;

    return (
        <div
            className="fixed top-[var(--navbar-height)] w-full bg-white shadow-md z-10 border-t border-gray-100"
            onMouseLeave={closeDropdown}
        >
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                <button
                    onClick={openMobileFilterDrawer}
                    className={`md:hidden flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 ${primaryText} bg-white rounded-lg text-sm font-semibold shadow hover:bg-blue-50 transition`}
                >
                    <FaSlidersH />
                    <span>Filters ({Object.keys(selected).length})</span>
                </button>

                {/* Desktop Filters */}
                <div className="hidden md:flex flex-wrap items-center gap-3 w-full justify-start">
                    {Object.entries(filterSettings).map(([key, options]) => (
                        <FilterDropdown
                            key={key}
                            title={key}
                            options={options}
                            selectedOption={selected[key]}
                            toggleDropdown={toggleDropdown}
                            selectOption={selectOption}
                            clearSelection={clearSelection}
                            isOpen={openKey === key}
                        />
                    ))}
                    {Object.keys(selected).length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="text-xs text-gray-500 hover:text-red-500 ml-2 font-semibold"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const MobileFilterDrawer = ({ filterSettings, selected, selectOption, onClose }) => {
    const [currentSection, setCurrentSection] = useState(Object.keys(filterSettings)[0]);
    const primaryBg = `bg-[${PRIMARY_COLOR}]`;
    const primaryText = `text-[${PRIMARY_COLOR}]`;

    const handleApplyFilters = () => {
        onClose();
    };

    const handleClearAllMobile = () => {
        selectOption(null);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[60] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                        <h3 className="text-xl font-bold text-gray-800">Filter Properties</h3>
                        <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                            <FaTimes className="text-base text-gray-600" />
                        </button>
                    </div>

                    {/* Content Body: Two-Column Layout */}
                    <div className="flex flex-1 overflow-y-hidden">
                        <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                            {Object.keys(filterSettings).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setCurrentSection(key)}
                                    className={`w-full text-left p-4 text-sm font-semibold transition-colors border-l-4 ${currentSection === key
                                        ? `bg-white ${primaryText} border-[${PRIMARY_COLOR}]`
                                        : 'text-gray-600 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto p-4 space-y-3">
                            {filterSettings[currentSection].map((option) => (
                                <div
                                    key={option}
                                    onClick={() => selectOption(currentSection, option)}
                                    className={`px-3 py-2 text-base rounded-lg flex justify-between items-center cursor-pointer transition-colors border ${selected[currentSection] === option
                                        ? `${primaryText} border-[${PRIMARY_COLOR}] bg-blue-50 font-bold`
                                        : 'text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{option}</span>
                                    {selected[currentSection] === option && <FaCheck className={`text-sm ${primaryText}`} />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 flex-shrink-0 flex justify-between gap-3">
                        <button
                            onClick={handleClearAllMobile}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base font-bold text-gray-700 hover:bg-gray-50 transition"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleApplyFilters}
                            className={`flex-1 px-4 py-3 ${primaryBg} text-white rounded-lg text-base font-bold hover:bg-[${HOVER_blue}] transition`}
                        >
                            Show Results ({Object.keys(selected).length})
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function App() {
    const [selected, setSelected] = useState({});
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openKey, setOpenKey] = useState(null);
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

    const toggleDropdown = (key) => {
        setOpenKey(key);
    };

    const closeDropdown = () => {
        setOpenKey(null);
    };

    const selectOption = (key, option) => {
        if (key === null) {
            setSelected({});
            setOpenKey(null);
            return;
        }

        setSelected((prev) => {
            const isSelected = prev[key] === option;
            const newSelection = isSelected ? undefined : option;
            if (!newSelection) {
                const newSel = { ...prev };
                delete newSel[key];
                return newSel;
            }

            return { ...prev, [key]: newSelection };
        });

    };

    const clearSelection = (key, e) => {
        e.stopPropagation();
        setSelected((prev) => {
            const newSel = { ...prev };
            delete newSel[key];
            return newSel;
        });
        setOpenKey(null);
    };

    const handleClearAll = () => {
        setSelected({});
        setOpenKey(null);
    }

    const openDetailsDrawer = (property) => {
        setSelectedProperty(property);
        document.body.style.overflow = 'hidden';
    };

    const closeDetailsDrawer = () => {
        setSelectedProperty(null);
        document.body.style.overflow = 'unset';
    };

    const openMobileFilterDrawer = () => {
        setMobileFilterOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileFilterDrawer = () => {
        setMobileFilterOpen(false);
        document.body.style.overflow = 'unset';
    };

    const contentPaddingTop = 'pt-[7.5rem] md:pt-[10rem] lg:pt-[7rem]';

    return (
        <div style={{ '--navbar-height': '3.5rem' }}>
            <Navbar />
            <FilterBar
                filterSettings={filterSettings}
                selected={selected}
                openKey={openKey}
                toggleDropdown={toggleDropdown}
                selectOption={selectOption}
                clearSelection={clearSelection}
                openMobileFilterDrawer={openMobileFilterDrawer}
                handleClearAll={handleClearAll}
                closeDropdown={closeDropdown}
            />

            <div className={`font-sans bg-gray-50 min-h-screen ${contentPaddingTop}`}>
                <div className="max-w-7xl px-4 lg:container lg:px-2 mx-auto py-6">
                    <div className="space-y-6">
                        {mockProperties.map((prop) => (
                            <PropertyCard key={prop.id} prop={prop} openDetailsDrawer={openDetailsDrawer} />
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {selectedProperty && (
                        <MobileDetailsDrawer property={selectedProperty} onClose={closeDetailsDrawer} />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <MobileFilterDrawer
                            filterSettings={filterSettings}
                            selected={selected}
                            selectOption={selectOption}
                            onClose={closeMobileFilterDrawer}
                        />
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
}