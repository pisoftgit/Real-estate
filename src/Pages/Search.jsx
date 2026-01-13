import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronDown,
    FaTimes,
    FaConciergeBell,
    FaMapMarkerAlt,
    FaBuilding,
    FaSlidersH,
    FaCheck,
    FaSpinner,
    FaHome,
    FaRulerCombined,
    FaLayerGroup
} from 'react-icons/fa';
import Navbar from '../Components/Navbar2';
import Footer from '../Components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseURL2 } from '../../BaseURL';

const PRIMARY_COLOR = '#426ff5';
const HOVER_blue = '#15803d';


// Helper to get initial state from URL
const getInitialFiltersFromURL = (search, propertyTypes = []) => {
    const params = new URLSearchParams(search);
    const typeId = params.get('propertyStockItemId');
    const initial = {};

    if (typeId && propertyTypes.length > 0) {
        const found = propertyTypes.find(pt => String(pt.id) === String(typeId));
        if (found) initial['Property Type'] = found.itemName;
    }
    return initial;
};

// Pagination Component
const Pagination = ({ propertiesPerPage, totalProperties, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProperties / propertiesPerPage);
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    const primaryBg = `bg-[${PRIMARY_COLOR}]`;

    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center mt-10 z-10 relative">
            <ul className="flex list-none">
                {pageNumbers.map(number => (
                    <li key={number} className="mx-1">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors ${currentPage === number
                                    ? `bg-[#426ff5] text-white font-bold`
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Detail Item Component
const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <Icon className={`text-sm text-[#426ff5]`} />
        <span className="font-semibold text-gray-500">{label}:</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

// Property Card Component
const PropertyCard = ({ prop, openDetailsDrawer }) => {
    const primaryBg = `bg-[#426ff5]`;
    const primaryText = `text-[#426ff5]`;
    const primaryBorder = `border-[#426ff5]`;
    const navigate = useNavigate();

    const handleViewDetails = () => { navigate("/PropertyDetails"); };

    const propertyId = prop.propertyId;
    const structureName = prop.flatHouseStructure?.structure || 'Property';
    const towerName = prop.subPropertyType.isMultiTower ? ` ${prop.towerPropertyItem?.name } - ${prop.towerPropertyItem.name}` : ` ${ prop.subPropertyType.name}`
    const projectName = prop.projectName || 'a New Project';
    const title = `${structureName}${towerName} for sale in ${projectName}`;

    return (
        <motion.div
            key={propertyId || prop.projectId}
            className="bg-white rounded-xl font-ns shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row z-10"
            whileHover={{ scale: 1.005 }}
        >
            {/* Image Section - Loops over all images */}
            <div className="w-full md:w-1/3 h-64 md:h-85 relative bg-gray-100">
                <div className="flex md:flex-col overflow-x-auto md:overflow-hidden h-full snap-x snap-mandatory">
                    {prop.propertyMediaList?.length > 0 ? (
                        prop.propertyMediaList.map((media) => (
                            <img
                                key={media.id}
                                src={`${BaseURL2}/medias/${media.id}/properties/${propertyId}`}
                                alt={media.mediaLabel || title}
                                className="object-cover min-w-full h-full md:min-h-full snap-center border-r md:border-r-0 md:border-b border-white"
                            />
                        ))
                    ) : (
                        <img src="/hero_bg_1.jpg" alt="Default" className="object-cover w-full h-full" />
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
                <div>
                    <h2 className={`font-bold text-xl mb-1 text-gray-800 hover:${primaryText} transition-colors uppercase tracking-tight`}>
                        {title}
                    </h2>

                    {/* DESCRIPTION SECTION (Previously Builder Name) */}
                    <p className="text-gray-600 text-sm line-clamp-2 mt-2 leading-relaxed">
                        {prop.description || "No description available for this property."}
                    </p>

                    {/* Main Details Grid - NOW INCLUDES BUILDER */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 text-[13px] text-gray-700 border-t pt-3 border-gray-100">
                        <DetailItem icon={FaRulerCombined} label="Area" value={`${prop.area} ${prop.areaUnit?.unitName || ''}`} /><DetailItem
                            icon={FaLayerGroup}
                            label="Floor"
                            value={`${prop.floorNumber || '0'} out of ${prop.floors?.length || '0'}`}
                        />
                        <DetailItem icon={FaBuilding} label="Status" value={prop.availabilityStatus || 'N/A'} />
                        <DetailItem icon={FaBuilding} label="Builder" value={prop.builderName || 'N/A'} />
                        <DetailItem icon={FaMapMarkerAlt} label="Facing" value={prop.faceDirection?.faceDirection || 'N/A'} />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {/* SEPARATE AMENITIES HOOK */}
                        {prop.amenities?.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase w-full md:w-auto md:mr-2">Amenities:</span>
                                {prop.amenities.map((amenity) => (
                                    <span key={amenity.id} className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#426ff5] text-[10px] font-bold rounded uppercase border border-blue-100 shadow-sm">
                                        <FaCheck className="text-[8px]" /> {amenity.amenityName}
                                    </span>
                                ))}
                            </div>
                        )}

                        {prop.facilities?.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase w-full md:w-auto md:mr-2">Facilities:</span>
                                {prop.facilities.map((facility) => (
                                    <span key={facility.id} className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase border border-green-100 shadow-sm">
                                        <FaConciergeBell className="text-[8px]" /> {facility.facilityName}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100">
                    <div>
                        <div className="text-3xl font-black text-gray-900 tracking-tighter">
                            {prop.totalAmount ? `₹${prop.totalAmount.toLocaleString()}` : "Price on Request"}
                        </div>
                        <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                            Basic Amount:{prop.basicAmount ?` ₹${prop.basicAmount.toLocaleString()}` : "Price on Request"}
                        </div>
                        
                    </div>
                        <div className='border-2 border-blue-500 p-2 px-3 rounded-xl bg-blue-50 mx-auto inline-block'>
                        <div className="text-sm font-bold text-black uppercase tracking-wider">
                            {prop.furnishingStatus?.status || 'Unfurnished'}
                        </div>
                        </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                        <button className={`hidden md:flex items-center justify-center px-6 py-2.5 ${primaryBg} text-white rounded-full text-sm font-bold hover:shadow-lg transition-all`}>
                            Contact Builder
                        </button>
                        <button onClick={handleViewDetails} className={`hidden md:flex items-center justify-center px-6 py-2.5 border-2 ${primaryBorder} ${primaryText} rounded-full text-sm font-bold hover:bg-blue-50 transition-all gap-1`}>
                            View Details
                        </button>
                        <button onClick={() => openDetailsDrawer(prop)} className={`md:hidden w-full px-5 py-3 border-2 ${primaryBorder} ${primaryText} rounded-xl text-base font-bold transition`}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Mobile Details Drawer Component
const MobileDetailsDrawer = ({ property, onClose }) => {
    const primaryBg = `bg-[#426ff5]`;
    const primaryText = `text-[#426ff5]`;
    const navigate = useNavigate();
    const handleViewDetails = () => navigate("/PropertyDetails");

    const title = `${property.flatHouseStructure?.structure || 'Property'} in ${property.projectName || 'Project'}`;

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[70] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto z-[80]"
                    initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="p-5">
                        <div className="flex justify-center mb-4"><div className="w-12 h-1 bg-gray-300 rounded-full" /></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800 pr-4">{title}</h3>
                            <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <FaTimes className="text-base text-gray-600" />
                            </button>
                        </div>
                        <div className={`p-4 rounded-xl ${primaryBg} text-white mb-4`}>
                            <div className="text-3xl font-bold">{property.totalAmount ? `₹${property.totalAmount.toLocaleString()}` : "Price on Request"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-base text-gray-700 border-t border-b py-4 border-gray-100">
                            <div><strong className={primaryText}>Area:</strong> {property.area} {property.areaUnit?.unitName}</div>
                            <div><strong className={primaryText}>Floor:</strong> {property.floorNumber}</div>
                            <div><strong className={primaryText}>Status:</strong> {property.availabilityStatus}</div>
                            <div><strong className={primaryText}>Unit:</strong> {property.unitNumber}</div>
                        </div>
                        <div className="mt-8 flex flex-col gap-3">
                            <button className={`w-full px-4 py-3 ${primaryBg} text-white rounded-lg text-base font-bold hover:bg-[${HOVER_blue}] flex items-center justify-center transition`}>
                                Contact Builder
                            </button>
                            <button onClick={handleViewDetails} className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-bold text-gray-700 hover:bg-gray-50 transition`}>
                                Property Details
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Filter Dropdown Component
const FilterDropdown = ({ title, options, selectedOption, toggleDropdown, selectOption, clearSelection, isOpen }) => {
    const primaryText = `text-[#426ff5]`;
    const dropdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
    };

    return (
        <div className="relative flex-shrink-0 z-[50]">
            <button
                onMouseEnter={() => toggleDropdown(title)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${selectedOption
                    ? `bg-[#426ff5] text-white shadow-md`
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
                <FaChevronDown className={`text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} ${selectedOption ? 'text-white' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants} initial="initial" animate="animate" exit="exit"
                        className="absolute top-full mt-2 bg-white border border-gray-200 shadow-xl rounded-lg w-48 z-[60] overflow-hidden right-0 md:left-0"
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => selectOption(title, option)}
                                className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-blue-50 hover:${primaryText} transition-colors ${selectedOption === option ? `bg-blue-100 ${primaryText} font-bold` : 'text-gray-700'}`}
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

// Filter Bar Component
const FilterBar = ({ filterSettings, pendingFilters, openKey, toggleDropdown, selectOption, clearSelection, openMobileFilterDrawer, handleClearAll, closeDropdown, handleApplyFilters, appliedFilterCount, handleSearchChange }) => {
    const filterCount = Object.keys(pendingFilters).length;
    return (
        <div className="fixed top-[var(--navbar-height)] w-full bg-white shadow-md z-[40] border-t border-gray-100" onMouseLeave={closeDropdown}>
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                <div className="hidden md:flex flex-grow max-w-sm mr-4">
                    <input
                        type="text"
                        placeholder="Search by Project Name, Builder..."
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition"
                    />
                </div>

                <button
                    onClick={openMobileFilterDrawer}
                    className={`md:hidden flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-[#426ff5] bg-white rounded-lg text-sm font-semibold shadow hover:bg-blue-50 transition`}
                >
                    <FaSlidersH />
                    <span>Filters ({appliedFilterCount})</span>
                </button>

                <div className="hidden md:flex flex-wrap items-center gap-3 w-full justify-start">
                    {Object.entries(filterSettings).map(([key, options]) => (
                        <FilterDropdown
                            key={key} title={key} options={options}
                            selectedOption={pendingFilters[key]}
                            toggleDropdown={toggleDropdown}
                            selectOption={selectOption}
                            clearSelection={clearSelection}
                            isOpen={openKey === key}
                        />
                    ))}

                    {filterCount > 0 && (
                        <button onClick={handleClearAll} className="text-xs text-gray-500 hover:text-red-500 ml-2 font-semibold">
                            Clear Pending
                        </button>
                    )}

                    <motion.button
                        onClick={handleApplyFilters}
                        className={`bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold ml-4 hover:bg-blue-700 transition`}
                        whileTap={{ scale: 0.95 }}
                    >
                        Apply Filters
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

// Mobile Filter Drawer Component
const MobileFilterDrawer = ({ filterSettings, pendingFilters, selectOption, onClose, handleApplyFilters, handleClearAllMobile }) => {
    const [currentSection, setCurrentSection] = useState(Object.keys(filterSettings)[0]);
    const primaryBg = `bg-[#426ff5]`;
    const primaryText = `text-[#426ff5]`;

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[60] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col z-[70]"
                    initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                        <h3 className="text-xl font-bold text-gray-800">Filter Properties</h3>
                        <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FaTimes /></button>
                    </div>
                    <div className="flex flex-1 overflow-y-hidden">
                        <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                            {Object.keys(filterSettings).map((key) => (
                                <button
                                    key={key} onClick={() => setCurrentSection(key)}
                                    className={`w-full text-left p-4 text-sm font-semibold border-l-4 ${currentSection === key ? `bg-white ${primaryText} border-[#426ff5]` : 'text-gray-600 border-transparent'}`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto p-4 space-y-3">
                            {filterSettings[currentSection]?.map((option) => (
                                <div
                                    key={option} onClick={() => selectOption(currentSection, option)}
                                    className={`px-3 py-2 border rounded-lg flex justify-between items-center cursor-pointer ${pendingFilters[currentSection] === option ? `${primaryText} border-[#426ff5] bg-blue-50 font-bold` : 'text-gray-700 border-gray-200'}`}
                                >
                                    <span>{option}</span>
                                    {pendingFilters[currentSection] === option && <FaCheck className="text-sm" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t flex-shrink-0 flex justify-between gap-3">
                        <button onClick={handleClearAllMobile} className="flex-1 px-4 py-3 border rounded-lg font-bold text-gray-700">Clear All</button>
                        <button onClick={handleApplyFilters} className={`flex-1 px-4 py-3 ${primaryBg} text-white rounded-lg font-bold`}>Show Results</button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ---------------- MAIN APP ----------------

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [pendingFilters, setPendingFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openKey, setOpenKey] = useState(null);
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 20;

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const res = await axios.get(`${BaseURL2}/property-stock-unit-items`);
                const data = res?.data?.data || res?.data || [];
                setPropertyTypes(data);
                setPendingFilters(getInitialFiltersFromURL(location.search, data));
            } catch (error) { console.error(error); }
        };
        fetchPropertyTypes();
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(location.search);
                const typeId = params.get('propertyStockItemId');

                let apiUrl = `${BaseURL2}/properties?`;
                if (typeId) apiUrl += `propertyStockItemId=${typeId}&`;
                if (searchTerm) apiUrl += `search=${searchTerm}`;

                const res = await axios.get(apiUrl);
                setProperties(res.data?.content || res.data || []);
                setCurrentPage(1);
            } catch (error) {
                setProperties([]);
            } finally { setLoading(false); }
        };
        fetchProperties();
    }, [location.search, searchTerm]);

    const filterSettings = {
        'Property Type': propertyTypes.map(pt => pt.itemName),
        Transaction: ['Buy', 'Rent', 'Sell'],
        City: ['Bangalore', 'Delhi', 'Mumbai'],
        Budget: ['<50L', '50L-1Cr', '1Cr+'],
        Status: ['Ready to Move', 'Under Construction'],
    };

    const selectOption = (key, option) => {
        setPendingFilters(prev => ({
            ...prev,
            [key]: prev[key] === option ? undefined : option
        }));
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        const selectedTypeName = pendingFilters['Property Type'];

        if (selectedTypeName) {
            const found = propertyTypes.find(pt => pt.itemName === selectedTypeName);
            if (found) params.set('propertyStockItemId', found.id);
        }

        navigate(`/search?${params.toString()}`);
        setMobileFilterOpen(false);
        setOpenKey(null);
    };

    const toggleDropdown = (key) => setOpenKey(prev => (prev === key ? null : key));
    const handleSearchChange = (val) => setSearchTerm(val);

    const indexOfLast = currentPage * propertiesPerPage;
    const currentProperties = properties.slice(indexOfLast - propertiesPerPage, indexOfLast);

    return (
        <div style={{ '--navbar-height': '3.5rem' }}>
            <Navbar />

            <FilterBar
                filterSettings={filterSettings}
                pendingFilters={pendingFilters}
                openKey={openKey}
                toggleDropdown={toggleDropdown}
                selectOption={selectOption}
                clearSelection={(key, e) => { e.stopPropagation(); selectOption(key, pendingFilters[key]); }}
                openMobileFilterDrawer={() => setMobileFilterOpen(true)}
                handleClearAll={() => setPendingFilters({})}
                closeDropdown={() => setOpenKey(null)}
                handleApplyFilters={handleApplyFilters}
                appliedFilterCount={Object.keys(pendingFilters).length}
                handleSearchChange={handleSearchChange}
            />

            <div className="font-sans bg-gray-50 min-h-screen pt-[8rem] md:pt-[10rem]">
                <div className="max-w-7xl px-4 lg:container lg:px-2 mx-auto py-6">
                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-20 flex flex-col items-center">
                                <FaSpinner className="animate-spin text-4xl text-blue-500 mb-3" />
                                <p className="font-semibold text-blue-500">Loading properties...</p>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-md">
                                <FaHome className="text-5xl text-gray-300 mx-auto mb-4" />
                                <p className="text-lg font-bold text-gray-700">No properties found.</p>
                            </div>
                        ) : (
                            <>
                                {currentProperties.map(prop => (
                                    <PropertyCard key={prop.propertyId} prop={prop} openDetailsDrawer={setSelectedProperty} />
                                ))}
                                <Pagination
                                    propertiesPerPage={propertiesPerPage}
                                    totalProperties={properties.length}
                                    paginate={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProperty && <MobileDetailsDrawer property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
                {isMobileFilterOpen && (
                    <MobileFilterDrawer
                        filterSettings={filterSettings}
                        pendingFilters={pendingFilters}
                        selectOption={selectOption}
                        onClose={() => setMobileFilterOpen(false)}
                        handleApplyFilters={handleApplyFilters}
                        handleClearAllMobile={() => setPendingFilters({})}
                    />
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
}