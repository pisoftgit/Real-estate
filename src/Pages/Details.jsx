import React, { useEffect, useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaListUl, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../Components/Navbar2';
import { FaBed, FaBath, FaCouch } from 'react-icons/fa';
import { MdBalcony, MdDownload } from 'react-icons/md';

const navItems = [
    { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
    { id: 'details', label: 'More Details', icon: <FaListUl /> },
    { id: 'project', label: 'About Project', icon: <FaBuilding /> },
    { id: 'locality', label: 'About Locality', icon: <FaMapMarkerAlt /> },
];

const Details = () => {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            <Navbar />

            {showSticky && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 60, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm"
                >
                    <div className="flex justify-center gap-8 py-3 text-sm font-medium">
                        {navItems.map((item) => (
                            <ScrollLink
                                key={item.id}
                                to={item.id}
                                smooth={true}
                                spy={true}
                                offset={-70}
                                duration={500}
                                activeClass="text-[#1fa141] border-b-2 border-[#1fa141]"
                                className="cursor-pointer px-2 py-1 text-gray-600 hover:text-[#1fa141] transition-all"
                            >
                                <div className="flex items-center gap-1">
                                    {item.icon}
                                    {item.label}
                                </div>
                            </ScrollLink>
                        ))}
                    </div>
                </motion.div>
            )}

            <div className="pt-6 space-y-16 max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow border p-6 max-w-6xl mx-auto mt-10 font-sans">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">₹1.98 Cr</h2>
                            <div className="text-sm text-gray-500 mt-1">
                                2 BHK Flat For Sale in Gopalan Aqua, <span className="text-blue-600 underline">Whitefield, Bangalore</span>
                            </div>
                        </div>
                        <button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium">
                            Get Phone No.
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <img src="/hero_bg_3.jpg" alt="Living Room" className="rounded-lg h-40 w-full object-cover" />
                        <img src="/hero_bg_3.jpg" alt="Garden" className="rounded-lg h-40 w-full object-cover" />
                        <img src="/hero_bg_3.jpg" alt="Balcony" className="rounded-lg h-40 w-full object-cover" />
                        <img src="/hero_bg_3.jpg" alt="Building" className="rounded-lg h-40 w-full object-cover" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm text-gray-700">
                        <div className="flex items-center gap-2"><FaBed className="text-gray-600" />2 Beds</div>
                        <div className="flex items-center gap-2"><FaBath className="text-gray-600" />2 Baths</div>
                        <div className="flex items-center gap-2"><MdBalcony className="text-gray-600" />1 Balcony</div>
                        <div className="flex items-center gap-2"><FaCouch className="text-gray-600" />Semi-Furnished</div>
                    </div>

                    <hr className="my-6" />

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm text-gray-800">
                        <div>
                            <p className="text-gray-500">Super Built-Up Area</p>
                            <p>1325 sqft</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Price per sqft</p>
                            <p>₹14,943/sqft</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Transaction Type</p>
                            <p>Resale</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Status</p>
                            <p>Ready to Move</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Developer</p>
                            <p className="text-blue-600 underline">Gopalan Enterprises</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Project</p>
                            <p className="text-blue-600 underline">Gopalan Aqua</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Floor</p>
                            <p>1 (Out of 14 Floors)</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Facing</p>
                            <p>North - East</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded">
                            <MdDownload className="text-lg" /> Download Brochure
                        </button>
                        <p className="text-sm text-gray-500">Posted on: Sep 27, 25 | Property ID: 78708993</p>
                    </div>
                </div>

                {navItems.slice(1).map((item) => (
                    <Element name={item.id} key={item.id} className="pt-24">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-semibold text-[#1fa141] flex items-center gap-2">
                                {item.icon}
                                {item.label}
                            </h2>
                            <p className="text-gray-700">
                                Content coming soon...
                            </p>
                        </motion.div>
                    </Element>
                ))}
            </div>
        </div>
    );
};

export default Details;
