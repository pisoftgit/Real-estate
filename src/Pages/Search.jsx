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
    FaLayerGroup,
    FaChevronLeft,
    FaChevronRight,
    FaAngleDoubleLeft,
    FaAngleDoubleRight
} from 'react-icons/fa';
import Navbar from '../Components/Navbar2';
import Footer from '../Components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseURL2 } from '../../BaseURL';
const PRIMARY_COLOR = '#426ff5';
const HOVER_BLUE = '#15803d'; 

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
const Pagination = ({ totalPages, paginate, currentPage }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    const btnBase = "px-3 py-2 mx-1 text-sm rounded-lg transition-all duration-200 border flex items-center justify-center min-w-[40px]";
    const activeClass = `text-white font-bold shadow-md`;
    const inactiveClass = "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
    const disabledClass = "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed";

    return (
        <nav className="flex flex-wrap justify-center items-center mt-10 mb-6 gap-1 z-10 relative">
            <button 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1}
                className={`${btnBase} ${currentPage === 1 ? disabledClass : inactiveClass}`}
                title="First Page"
            >
                <FaAngleDoubleLeft />
            </button>

            <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`${btnBase} ${currentPage === 1 ? disabledClass : inactiveClass}`}
            >
                <FaChevronLeft className="mr-1 text-xs" /> Prev
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${btnBase} ${currentPage === number ? activeClass : inactiveClass}`}
                    style={currentPage === number ? { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR } : {}}
                >
                    {number}
                </button>
            ))}

            <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`${btnBase} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
            >
                Next <FaChevronRight className="ml-1 text-xs" />
            </button>

            <button 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages}
                className={`${btnBase} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
                title="Last Page"
            >
                <FaAngleDoubleRight />
            </button>
        </nav>
    );
};

// Detail Item Component
const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <Icon className="text-sm" style={{ color: PRIMARY_COLOR }} />
        <span className="font-semibold text-gray-500">{label}:</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

// Property Card Component
const PropertyCard = ({ prop, openDetailsDrawer }) => {
    const navigate = useNavigate();
    const handleViewDetails = () => { navigate(`/PropertyDetails/${prop.propertyId}`); };

    const propertyId = prop.propertyId;
    const structureName = prop.flatHouseStructure?.structure || 'Property';
    const towerName = prop.subPropertyType?.isMultiTower ? ` ${prop.towerPropertyItem?.name || ''}` : ` ${prop.subPropertyType?.name || ''}`;
    const projectName = prop.projectName || 'a New Project';
    const title = `${structureName}${towerName} for sale in ${projectName}`;

    // Helper to get the first image
    const firstMedia = prop.propertyMediaList?.[0];

    return (
        <motion.div
            key={propertyId}
            className="bg-white rounded-xl font-ns shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row z-10"
            whileHover={{ scale: 1.005 }}
        >
            {/* IMAGE SECTION: Fixed size, only shows one image */}
            <div className="w-full md:w-1/3 h-64 md:h-80 relative bg-gray-100 overflow-hidden">
                {firstMedia ? (
                    <img
                        src={`${BaseURL2}/medias/${firstMedia.id}/properties/${propertyId}`}
                        alt={firstMedia.mediaLabel || title}
                        className="object-cover w-full h-full" 
                    />
                ) : (
                    <img 
                        src="/hero_bg_1.jpg" 
                        alt="Default" 
                        className="object-cover w-full h-full" 
                    />
                )}
                
                {/* Optional: Overlay count if you want users to know there are more photos */}
                {prop.propertyMediaList?.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                        +{prop.propertyMediaList.length - 1} Photos
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
                <div>
                    <h2 className="font-bold text-xl mb-1 text-gray-800 transition-colors uppercase tracking-tight">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-2 leading-relaxed">
                        {prop.description || "No description available for this property."}
                    </p>

                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 text-[13px] text-gray-700 border-t pt-3 border-gray-100">
                        <DetailItem icon={FaRulerCombined} label="Area" value={`${prop.area} ${prop.areaUnit?.unitName || ''}`} />
                        <DetailItem icon={FaLayerGroup} label="Floor" value={`${prop.floorNumber || '0'} / ${prop.floors?.length || '0'}`} />
                        <DetailItem icon={FaBuilding} label="Status" value={prop.availabilityStatus || 'N/A'} />
                        <DetailItem icon={FaBuilding} label="Builder" value={prop.builderName || 'N/A'} />
                        <DetailItem icon={FaMapMarkerAlt} label="Facing" value={prop.faceDirection?.faceDirection || 'N/A'} />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {prop.amenities?.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase w-full md:w-auto md:mr-2">Amenities:</span>
                                {prop.amenities.slice(0, 4).map((amenity) => (
                                    <span key={amenity.id} className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-[10px] font-bold rounded uppercase border border-blue-100 shadow-sm" style={{ color: PRIMARY_COLOR }}>
                                        <FaCheck className="text-[8px]" /> {amenity.amenityName}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100">
                    <div>
                        <div className="text-3xl font-black text-gray-900 tracking-tighter">
                            {prop.totalAmount ? `₹${prop.totalAmount.toLocaleString()}` : "Price on Request"}
                        </div>
                        <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                            Basic: {prop.basicAmount ? `₹${prop.basicAmount.toLocaleString()}` : "N/A"}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                        <button className="hidden md:flex items-center justify-center px-6 py-2.5 text-white rounded-full text-sm font-bold hover:shadow-lg transition-all" style={{ backgroundColor: PRIMARY_COLOR }}>
                            Contact Builder
                        </button>
                        <button onClick={handleViewDetails} className="hidden md:flex items-center justify-center px-6 py-2.5 border-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-all gap-1" style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}>
                            View Details
                        </button>
                        <button onClick={() => openDetailsDrawer(prop)} className="md:hidden w-full px-5 py-3 border-2 rounded-xl text-base font-bold transition" style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}>
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
    const navigate = useNavigate();
    const handleViewDetails = () => navigate(`/PropertyDetails/${prop.propertyId}`);

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[70] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl max-h-[92vh] overflow-y-auto z-[80] flex flex-col"
                    initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                >
                    <div className="flex justify-center py-4 sticky top-0 bg-white z-20">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                    </div>

                    <div className="px-6 pb-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-1 uppercase">
                                    {property.projectName}
                                </h3>
                                <div className="flex items-center text-gray-500 text-sm gap-1">
                                    <FaMapMarkerAlt style={{ color: PRIMARY_COLOR }} />
                                    <span>{property.city || "Location details"}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full bg-gray-100 text-gray-600 active:scale-95 transition-transform">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="p-6 rounded-3xl text-white mb-8 shadow-xl" style={{ backgroundColor: PRIMARY_COLOR }}>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Total Investment</p>
                            <div className="text-3xl font-black">
                                {property.totalAmount ? `₹${property.totalAmount.toLocaleString()}` : "Price on Request"}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl">
                                <FaRulerCombined className="mb-2" style={{ color: PRIMARY_COLOR }} />
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Super Area</p>
                                <p className="text-sm font-bold text-gray-800">{property.area} {property.areaUnit?.unitName}</p>
                            </div>
                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl">
                                <FaBuilding className="mb-2" style={{ color: PRIMARY_COLOR }} />
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
                                <p className="text-sm font-bold text-gray-800">{property.availabilityStatus || 'N/A'}</p>
                            </div>
                        </div>

                        {property.amenities?.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FaConciergeBell style={{ color: PRIMARY_COLOR }} /> Key Amenities
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.amenities.map((amenity) => (
                                        <div key={amenity.id} className="flex items-center gap-2 text-gray-700">
                                            <div className="min-w-[18px] h-[18px] bg-green-100 rounded-full flex items-center justify-center">
                                                <FaCheck className="text-[8px] text-green-600" />
                                            </div>
                                            <span className="text-sm font-medium">{amenity.amenityName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-8">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Description</h4>
                            <p className="text-gray-600 text-sm leading-relaxed italic">
                                "{property.description || "Exclusive property offering modern living spaces and premium finishes."}"
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button 
                                onClick={handleViewDetails} 
                                className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 animate-pulse"
                                style={{ backgroundColor: PRIMARY_COLOR, animationDuration: '2s' }} 
                            >
                                <FaHome /> Property Details
                            </button>
                            
                            <button className="w-full py-4 border-2 border-gray-200 rounded-2xl text-base font-bold text-gray-600 active:bg-gray-50 transition-colors">
                                Contact Builder
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
    return (
        <div className="relative flex-shrink-0 z-[50]">
            <button
                onMouseEnter={() => toggleDropdown(title)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-all border ${selectedOption ? 'text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                style={selectedOption ? { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR } : {}}
            >
                <span>{selectedOption || title}</span>
                {selectedOption && <FaTimes className="text-xs ml-1" onClick={(e) => clearSelection(title, e)} />}
                <FaChevronDown className={`text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 bg-white border border-gray-200 shadow-xl rounded-lg w-48 z-[60] overflow-hidden">
                        {options.map((option) => (
                            <div 
                                key={option} 
                                onClick={() => selectOption(title, option)} 
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${selectedOption === option ? 'bg-blue-100 font-bold' : 'text-gray-700'}`}
                                style={selectedOption === option ? { color: PRIMARY_COLOR } : {}}
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Filter Bar Component
const FilterBar = ({ filterSettings, pendingFilters, openKey, toggleDropdown, selectOption, clearSelection, openMobileFilterDrawer, closeDropdown, handleApplyFilters, appliedFilterCount, handleSearchChange }) => {
    return (
        <div className="fixed top-[var(--navbar-height)] w-full bg-white shadow-md z-[40] border-t border-gray-100" onMouseLeave={closeDropdown}>
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                <div className="hidden md:flex flex-grow max-w-sm mr-4">
                    <input type="text" placeholder="Search projects..." onChange={(e) => handleSearchChange(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition" />
                </div>
                <button onClick={openMobileFilterDrawer} className="md:hidden flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 bg-white rounded-lg text-sm font-semibold" style={{ color: PRIMARY_COLOR }}>
                    <FaSlidersH /> <span>Filters ({appliedFilterCount})</span>
                </button>
                <div className="hidden md:flex flex-wrap items-center gap-3 w-full justify-start">
                    {Object.entries(filterSettings).map(([key, options]) => (
                        <FilterDropdown key={key} title={key} options={options} selectedOption={pendingFilters[key]} toggleDropdown={toggleDropdown} selectOption={selectOption} clearSelection={clearSelection} isOpen={openKey === key} />
                    ))}
                    <button onClick={handleApplyFilters} className="text-white px-4 py-1.5 rounded-full text-sm font-bold ml-4 hover:opacity-90 transition" style={{ backgroundColor: PRIMARY_COLOR }}>Apply Filters</button>
                </div>
            </div>
        </div>
    );
};

// Mobile Filter Drawer Component
const MobileFilterDrawer = ({ filterSettings, pendingFilters, selectOption, onClose, handleApplyFilters, handleClearAllMobile }) => {
    const [currentSection, setCurrentSection] = useState(Object.keys(filterSettings)[0]);
    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[60] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
                <motion.div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col z-[70]" initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }}>
                    <div className="p-4 border-b flex justify-between items-center"><h3 className="text-xl font-bold">Filters</h3><button onClick={onClose} className="p-2"><FaTimes /></button></div>
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/3 bg-gray-50 border-r overflow-y-auto">
                            {Object.keys(filterSettings).map((key) => (
                                <button key={key} onClick={() => setCurrentSection(key)} className={`w-full text-left p-4 text-sm font-semibold border-l-4 ${currentSection === key ? 'bg-white border-blue-500' : 'text-gray-600 border-transparent'}`} style={currentSection === key ? { color: PRIMARY_COLOR, borderLeftColor: PRIMARY_COLOR } : {}}>{key}</button>
                            ))}
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto p-4 space-y-3">
                            {filterSettings[currentSection]?.map((option) => (
                                <div key={option} onClick={() => selectOption(currentSection, option)} className={`px-3 py-2 border rounded-lg flex justify-between items-center ${pendingFilters[currentSection] === option ? 'border-blue-500 bg-blue-50 font-bold' : 'text-gray-700 border-gray-200'}`} style={pendingFilters[currentSection] === option ? { color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR } : {}}>
                                    <span>{option}</span> {pendingFilters[currentSection] === option && <FaCheck className="text-sm" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t flex justify-between gap-3">
                        <button onClick={handleClearAllMobile} className="flex-1 px-4 py-3 border rounded-lg font-bold">Clear All</button>
                        <button onClick={handleApplyFilters} className="flex-1 px-4 py-3 text-white rounded-lg font-bold" style={{ backgroundColor: PRIMARY_COLOR }}>Show Results</button>
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
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

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

                const queryParams = {
                    needMedia: true,
                    needPLC: true,
                    needFloors: true,
                    propertyStockItemId: typeId || undefined,
                    isOnlyLinked: true,
                    isOnlySerialized: true,
                    isPaginated: true,
                    page: currentPage - 1,
                    pageSize: pageSize,
                    search: searchTerm || undefined
                };

                const res = await axios.get(`${BaseURL2}/properties`, { params: queryParams });
                const content = res.data?.content || res.data?.data || [];
                const total = res.data?.totalPages || 1;

                setProperties(content);
                setTotalPages(total);
            } catch (error) {
                setProperties([]);
                setTotalPages(1);
            } finally { setLoading(false); }
        };
        fetchProperties();
    }, [location.search, searchTerm, currentPage]);

    const filterSettings = {
        'Property Type': propertyTypes.map(pt => pt.itemName),
        Transaction: ['Buy', 'Rent', 'Sell'],
        City: ['Bangalore', 'Delhi', 'Mumbai'],
        Budget: ['<50L', '50L-1Cr', '1Cr+'],
        Status: ['Ready to Move', 'Under Construction'],
    };

    const selectOption = (key, option) => {
        setPendingFilters(prev => ({ ...prev, [key]: prev[key] === option ? undefined : option }));
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        const selectedTypeName = pendingFilters['Property Type'];
        if (selectedTypeName) {
            const found = propertyTypes.find(pt => pt.itemName === selectedTypeName);
            if (found) params.set('propertyStockItemId', found.id);
        }
        setCurrentPage(1);
        navigate(`/search?${params.toString()}`);
        setMobileFilterOpen(false);
        setOpenKey(null);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ '--navbar-height': '3.5rem' }}>
            <Navbar />
            <FilterBar
                filterSettings={filterSettings}
                pendingFilters={pendingFilters}
                openKey={openKey}
                toggleDropdown={(key) => setOpenKey(prev => (prev === key ? null : key))}
                selectOption={selectOption}
                clearSelection={(key, e) => { e.stopPropagation(); selectOption(key, pendingFilters[key]); }}
                openMobileFilterDrawer={() => setMobileFilterOpen(true)}
                closeDropdown={() => setOpenKey(null)}
                handleApplyFilters={handleApplyFilters}
                appliedFilterCount={Object.keys(pendingFilters).length}
                handleSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            />

            <div className="font-sans bg-gray-50 min-h-screen pt-[8rem] md:pt-[10rem]">
                <div className="max-w-7xl px-4 lg:container lg:px-2 mx-auto py-6">
                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-20 flex flex-col items-center">
                                <FaSpinner className="animate-spin text-4xl mb-3" style={{ color: PRIMARY_COLOR }} />
                                <p className="font-semibold" style={{ color: PRIMARY_COLOR }}>Loading properties...</p>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-md">
                                <FaHome className="text-5xl text-gray-300 mx-auto mb-4" />
                                <p className="text-lg font-bold text-gray-700">No properties found.</p>
                            </div>
                        ) : (
                            <>
                                {properties.map(prop => (
                                    <PropertyCard key={prop.propertyId} prop={prop} openDetailsDrawer={setSelectedProperty} />
                                ))}
                                <Pagination
                                    totalPages={totalPages}
                                    paginate={paginate}
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