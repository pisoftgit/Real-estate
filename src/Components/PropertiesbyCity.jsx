

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const sampleProperties = [
    {
        id: 1,
        title: 'Luxury Apartment in Andheri',
        city: 'Mumbai',
        locality: 'Andheri',
        price: '1.2 Cr',
        bhk: '3 BHK',
        image: '/hero_bg_1.jpg',
        postedBy: 'Dealer',
    },
    {
        id: 2,
        title: 'Cozy 2 BHK Flat in Koramangala',
        city: 'Bangalore',
        locality: 'Koramangala',
        price: '85 Lakh',
        bhk: '2 BHK',
        image: '/hero_bg_2.jpg',
        postedBy: 'Owner',
    },
    {
        id: 3,
        title: 'Spacious Villa in Baner',
        city: 'Pune',
        locality: 'Baner',
        price: '3.5 Cr',
        bhk: '4 BHK',
        image: '/hero_bg_3.jpg',
        postedBy: 'Builder',
    },
    {
        id: 4,
        title: 'Modern Flat in Whitefield',
        city: 'Bangalore',
        locality: 'Whitefield',
        price: '95 Lakh',
        bhk: '2 BHK',
        image: '/hero_bg_4.jpg',
        postedBy: 'Owner',
    },
    {
        id: 5,
        title: 'Penthouse in Koramangala',
        city: 'Bangalore',
        locality: 'Koramangala',
        price: '2.5 Cr',
        bhk: '4 BHK',
        image: '/hero_bg_1.jpg',
        postedBy: 'Builder',
    },
];


function PropertiesbyCity() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const navigate = useNavigate();


    const HandleSearch = () => {
        navigate('/search')
    }

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="container mx-auto px-4 md:px-8 py-8 relative">
            <h2 className="text-md inline-block rounded-3xl md:text-2xl lg:text-[2rem] text-ns px-4 py-1 bg-[#426ff5] text-white font-bold mb-6 font-ns">
                Popular Properties in your city
            </h2>

            <div className="hidden lg:block relative">
                <div
                    ref={scrollRef}
                    className={`flex space-x-6 overflow-x-auto scrollbar-hidden min-w-full px-2 py-6 cursor-${isDragging ? 'grabbing' : 'grab'}`}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    style={{ userSelect: isDragging ? 'none' : 'auto' }}
                >
                    {sampleProperties.map((property) => (
                        <motion.div
                            key={property.id}
                            className="relative rounded-xl overflow-visible shadow-lg group cursor-pointer min-w-[260px] flex-shrink-0"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-45 object-cover rounded-xl"
                                />
                                <button onClick={HandleSearch} className="absolute bottom-[-12px] left-1/2 transform z-2 -translate-x-1/2 bg-[#426ff5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg hover:bg-blue-600 hover:scale-115 transition-all whitespace-nowrap">
                                    Show Details
                                </button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black/80 text-white flex flex-col justify-center items-start p-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all rounded-xl"
                            >
                                <h3 className="text-lg font-bold">{property.title}</h3>
                                <p className="text-sm text-gray-200">
                                    {property.locality}, {property.city}
                                </p>
                                <p className="text-blue-300 font-semibold">₹ {property.price}</p>
                                <div className="flex justify-between w-full text-sm text-gray-300">
                                    <span>{property.bhk}</span>
                                    <span>By: {property.postedBy}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white/55 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white/55 to-transparent"
                />
            </div>

            <div className="lg:hidden overflow-x-auto -mx-2 px-2 overflow-y-hidden py-1">
                <div className="flex space-x-4">
                    {sampleProperties.map((property) => (
                        <motion.div
                            key={property.id}
                            className="min-w-[260px] max-w-xs flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300 relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-38 object-cover"
                                />
                                <button onClick={HandleSearch} className="absolute bottom-2 right-2 bg-white text-sm text-[#426ff5] font-bold px-3 py-1 rounded shadow hover:bg-blue-600 hover:scale-115 hover:text-white transition-all">
                                    Show Details
                                </button>
                            </div>
                            <div className="p-4 space-y-1">
                                <h3 className="text-base font-bold text-gray-800">{property.title}</h3>
                                <p className="text-sm text-gray-600">{property.locality}, {property.city}</p>
                                <p className="text-[#426ff5] font-semibold">₹ {property.price}</p>
                                <div className="flex justify-between text-xs text-gray-500 pt-1">
                                    <span>{property.bhk}</span>
                                    <span>By: {property.postedBy}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PropertiesbyCity