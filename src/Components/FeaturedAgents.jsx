import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaThList, FaDollarSign, FaHandshake, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const agentsData = [
    {
        id: 1,
        name: "Estates Hub",
        image: "https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=1280/https://media-production.lp-cdn.com/media/75e3c575-d876-49d2-b113-15fd1f3369d7",
        initialDetails: "12 Properties For Sale | Since 2004",
        details: {
            "Operating since": "2004",
            "Properties For Sale": "12",
            "Properties For rent": "10",
            "Deals Closed": "1000",
            "Deals in": ["Rent/Lease", "Pre-launch"],
            "Operates in": ["Chembur", "Chembur East", "Union Park Chembur", "Swastik Park"],
        },
    },
    {
        id: 2,
        name: "Urban Property",
        image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        initialDetails: "25 Properties For Sale | Since 2010",
        details: {
            "Operating since": "2010",
            "Properties For Sale": "25",
            "Properties For rent": "30",
            "Deals Closed": "750",
            "Deals in": ["Residential", "Commercial"],
            "Operates in": ["Andheri", "Bandra", "Juhu"],
        },
    },
    {
        id: 3,
        name: "Golden Bricks",
        image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
        initialDetails: "18 Properties For Sale | Since 2008",
        details: {
            "Operating since": "2008",
            "Properties For Sale": "18",
            "Properties For rent": "15",
            "Deals Closed": "950",
            "Deals in": ["Flats", "Villas", "Plots"],
            "Operates in": ["Borivali", "Kandivali", "Dahisar"],
        },
    },
    {
        id: 4,
        name: "Prime Realty",
        image: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
        initialDetails: "50 Properties For Sale | Since 2015",
        details: {
            "Operating since": "2015",
            "Properties For Sale": "50",
            "Properties For rent": "45",
            "Deals Closed": "500",
            "Deals in": ["New Projects", "Resale"],
            "Operates in": ["Thane", "Panvel", "Kalyan"],
        },
    },
];

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const FeaturedAgents = () => {
    const [hoveredAgent, setHoveredAgent] = useState(null);

    return (
        <section className="container mx-auto px-4 md:px-8 py-10 font-ns">
            <div className="flex justify-between items-center mb-8"> {/* Updated div */}
                {/* Left side: Heading and Subtitle */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold inline-block bg-[#426ff5] text-white rounded-3xl py-1 px-4 font-ns">
                        Meet Our Top Agents
                    </h2>
                    <p className="text-sm mt-2 font-ns" style={{ color: "#4B5563" }}>
                        Dedicated experts to guide you through your property journey.
                    </p>
                </div>
                
                <Link to="/allAgents">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center px-6 py-2 bg-[#426ff5] text-white font-semibold rounded-full shadow-lg transition-colors duration-300 hover:bg-blue-700 text-sm md:text-base"
                    >
                        See All Agents
                        <FaChevronRight className="ml-2" />
                    </motion.button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {agentsData.map((agent) => (
                    <motion.div
                        key={agent.id}
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 group cursor-pointer"
                        onMouseEnter={() => setHoveredAgent(agent.id)}
                        onMouseLeave={() => setHoveredAgent(null)}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: agent.id * 0.08 }}
                    >
                        {/* Agent Image */}
                        <div className="h-64 w-full relative">
                            <img
                                src={agent.image}
                                alt={agent.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Initial Details Overlay (Visible when not hovered) */}
                            <AnimatePresence>
                                {hoveredAgent !== agent.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-start text-white"
                                        variants={overlayVariants}
                                        initial="visible"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        <h4 className="text-lg font-bold font-ns">{agent.name}</h4>
                                        <p className="text-xs font-ns">{agent.initialDetails}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Full Details Overlay (Appears on Hover) */}
                        <AnimatePresence>
                            {hoveredAgent === agent.id && (
                                <motion.div
                                    className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-white p-4"
                                    variants={overlayVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4 className="text-lg font-bold font-ns mb-3">{agent.name}</h4>
                                    <ul className="text-left w-full space-y-2 text-xs font-ns">
                                        <li className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-blue-400" />
                                            <span className="font-semibold">Operating since:</span> {agent.details["Operating since"]}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FaBuilding className="text-blue-400" />
                                            <span className="font-semibold">For Sale:</span> {agent.details["Properties For Sale"]}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FaThList className="text-blue-400" />
                                            <span className="font-semibold">For Rent:</span> {agent.details["Properties For rent"]}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FaHandshake className="text-blue-400" />
                                            <span className="font-semibold">Deals Closed:</span> {agent.details["Deals Closed"]}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FaDollarSign className="text-blue-400" />
                                            <span className="font-semibold">Deals in:</span> {agent.details["Deals in"].join(', ')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-blue-400" />
                                            <span className="font-semibold">Operates in:</span> {agent.details["Operates in"].join(', ')}
                                        </li>
                                    </ul>
                                    <Link to={`/agents`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-4 bg-[#426ff5] text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors duration-300 shadow-md font-ns"
                                        >
                                            View Profile
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedAgents;