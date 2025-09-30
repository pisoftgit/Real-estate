import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,FaChevronRight , FaBuilding, FaCalendarAlt } from 'react-icons/fa';

const allAgentsData = [
    {
        id: 1,
        name: "Estates Hub",
        operatingSince: "2004",
        propertiesForSale: 12,
        propertiesForRent: 10,
        dealsClosed: 1000,
        dealsIn: ["Rent/Lease", "Pre-launch"],
        operatesIn: ["Chembur", "Chembur East", "Union Park Chembur", "Swastik Park"],
        city: "Mumbai",
        state: "Maharashtra",
        image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 2,
        name: "Urban Property",
        operatingSince: "2010",
        propertiesForSale: 25,
        propertiesForRent: 30,
        dealsClosed: 750,
        dealsIn: ["Residential", "Commercial"],
        operatesIn: ["Andheri", "Bandra", "Juhu"],
        city: "Mumbai",
        state: "Maharashtra",
        image: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
        id: 3,
        name: "Golden Bricks",
        operatingSince: "2008",
        propertiesForSale: 18,
        propertiesForRent: 15,
        dealsClosed: 950,
        dealsIn: ["Flats", "Villas", "Plots"],
        operatesIn: ["Borivali", "Kandivali", "Dahisar"],
        city: "Mumbai",
        state: "Maharashtra",
        image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    },
    {
        id: 4,
        name: "Prime Realty",
        operatingSince: "2015",
        propertiesForSale: 50,
        propertiesForRent: 45,
        dealsClosed: 500,
        dealsIn: ["New Projects", "Resale"],
        operatesIn: ["Thane", "Panvel", "Kalyan"],
        city: "Mumbai",
        state: "Maharashtra",
        image: "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
    },
    {
        id: 5,
        name: "Delhi Dreams",
        operatingSince: "2012",
        propertiesForSale: 40,
        propertiesForRent: 20,
        dealsClosed: 600,
        dealsIn: ["Apartments", "Builder Floors"],
        operatesIn: ["Saket", "Vasant Kunj", "Dwarka"],
        city: "Delhi",
        state: "Delhi",
        image: "https://i.pinimg.com/736x/77/71/68/7771683223d86b237a3304d6f32828b9.jpg",
    },
    {
        id: 6,
        name: "Pune Property Partners",
        operatingSince: "2009",
        propertiesForSale: 30,
        propertiesForRent: 25,
        dealsClosed: 850,
        dealsIn: ["Resale", "New Projects", "Commercial"],
        operatesIn: ["Wakad", "Hinjewadi", "Baner"],
        city: "Pune",
        state: "Maharashtra",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02HxyUDxaTgSz7JTuxZ4wm8TvArU2aCmSk48COMMwoMD2oBe8cjKpuIA_N0_tuzP27F0&usqp=CAU",
    },
];


const getUniqueFilters = (data, key) => {
    const values = data.map(item => item[key]);
    return ["Select", ...new Set(values)];
};

const cities = getUniqueFilters(allAgentsData, 'city');
const states = getUniqueFilters(allAgentsData, 'state');

const AgentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');
    const [selectedState, setSelectedState] = useState('All');

    const filteredAgents = allAgentsData.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.operatesIn.some(locality => locality.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCity = selectedCity === 'All' || agent.city === selectedCity;
        const matchesState = selectedState === 'All' || agent.state === selectedState;

        return matchesSearch && matchesCity && matchesState;
    });

    return (
        <div className="font-ns bg-gray-50 min-h-screen flex flex-col">
            <Navbar />

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 md:px-8 mt-15 md:mt-30 py-10 flex-grow"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Find Your Real Estate Agent</h1>
                    <p className="text-gray-500 mt-2">Browse a list of trusted agents and connect with them directly.</p>
                </div>

                <div className="bg-[#4281f5] p-6 md:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center gap-6 mb-12 transform transition-transform duration-300 hover:scale-[1.01]">
                    <div className="relative bg-white rounded-2xl flex-grow w-full lg:w-2/3 group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#426ff5] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search agents by name or operating area..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#426ff5] focus:ring-2 focus:ring-[#426ff5]/50 transition-all font-ns text-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row w-full lg:w-1/3 gap-4">
                        <div className="relative w-full">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            <select
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl appearance-none focus:outline-none focus:border-[#426ff5] focus:ring-2 focus:ring-[#426ff5]/50 transition-all font-ns text-gray-700 bg-white"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="All">All Cities</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <FaChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
                        </div>

                        {/* State Filter */}
                        <div className="relative w-full">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            <select
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl appearance-none focus:outline-none focus:border-[#426ff5] focus:ring-2 focus:ring-[#426ff5]/50 transition-all font-ns text-gray-700 bg-white"
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                            >
                                <option value="All">All States</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <FaChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Agent List */}
                <div className="space-y-6">
                    {filteredAgents.length > 0 ? (
                        filteredAgents.map(agent => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
                            >
                                {/* Agent Image */}
                                <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md">
                                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Agent Details */}
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">{agent.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <FaCalendarAlt className="inline-block mr-2" />
                                        Operating since: {agent.operatingSince}
                                    </p>
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-700">
                                        <p className="flex items-center gap-2"><FaBuilding className="text-blue-500" /> For Sale: {agent.propertiesForSale}</p>
                                        <p className="flex items-center gap-2"><FaBuilding className="text-blue-500" /> For Rent: {agent.propertiesForRent}</p>
                                        <p className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> Deals Closed: {agent.dealsClosed}</p>
                                        <p className="col-span-full flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> Operates in: {agent.operatesIn.join(', ')}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Deals in: {agent.dealsIn.join(', ')}</p>
                                </div>

                                {/* Contact Buttons */}
                                <div className="flex-shrink-0 flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#426ff5] text-white rounded-lg shadow-md font-semibold"
                                    >
                                        <FaPhoneAlt /> Call Agent
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md font-semibold"
                                    >
                                        <FaEnvelope /> Contact Agent
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 p-8">
                            <h3 className="text-xl font-semibold">No Agents Found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default AgentsPage;