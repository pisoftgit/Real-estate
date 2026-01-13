import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Navbar from '../Components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaMapMarkerAlt,
    FaHome,
    FaRupeeSign,
    FaSearch,
    FaBuilding,
    FaUser,
    FaBed,
    FaChevronDown
} from 'react-icons/fa'
import Properties from '../Components/Properties'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import PopularProperties from '../Components/Explore'
import FeaturedAgents from '../Components/FeaturedAgents'
import axios from 'axios'
import { BaseURL2 } from '../../BaseURL'

const citiesList = ['Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad']
const localitiesList = ['Andheri', 'Koramangala', 'T. Nagar', 'Baner', 'Banjara Hills']
const budgets = ['0 - 50L', '50L - 1Cr', '1Cr - 2Cr', '2Cr+']
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK']
const postedBy = ['Owner', 'Dealer', 'Builder']

const slides = [
    { image: './hero_bg_1.jpg' },
    { image: './hero_bg_2.jpg' },
    { image: './hero_bg_3.jpg' },
    { image: './hero_bg_4.jpg' }
]

const dropdownVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
}

const FilterDropdown = ({ label, icon: Icon, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const displayValue = selected?.name || label

    const handleSelect = (opt) => {
        onSelect(opt)
        setIsOpen(false)
    }

    const handleClear = () => {
        onSelect(null)
        setIsOpen(false)
    }

    return (
        <div
            className="relative w-full md:w-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border w-full md:w-auto text-sm bg-white transition-all ${
                    selected ? 'border-blue-700 text-blue-700 font-semibold' : 'border-blue-500 text-gray-800'
                }`}
            >
                <Icon className="text-blue-500 text-base" />
                <span>{displayValue}</span>
                <FaChevronDown className="text-xs text-gray-400" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 bg-white border border-blue-300 shadow-md rounded-md z-50 w-48 max-h-60 overflow-y-auto"
                    >
                        {selected && (
                            <div
                                onClick={handleClear}
                                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer text-sm border-b font-semibold"
                            >
                                Clear Selection
                            </div>
                        )}
                        {options?.map((opt, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer text-sm ${
                                    selected?.id === opt.id ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-800'
                                }`}
                            >
                                {opt.name || opt}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Home() {
    const navigate = useNavigate()
    const [propertyTypes, setPropertyTypes] = useState([])
    const [selectedPropertyType, setSelectedPropertyType] = useState(null)

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const res = await axios.get(`${BaseURL2}/property-stock-unit-items`)
                // Map to objects with id and name
                const mappedTypes = (res.data || res.data?.data || []).map(item => ({
                    id: item.id,
                    name: item.itemName
                }))
                setPropertyTypes(mappedTypes)
            } catch (error) {
                console.log("Error fetching property types:", error)
            }
        }
        fetchPropertyTypes()
    }, [])

    const HandleSearch = () => {
        const params = new URLSearchParams()
        if (selectedPropertyType) {
            params.append('propertyStockItemsId', selectedPropertyType.id)
        }
        navigate(`/search?${params.toString()}`)
    }

    return (
        <>
            <Navbar />

            {/* ------------------ HERO SECTION ------------------ */}
            <section className="relative h-[75vh] md:h-[80vh] lg:h-[750px] z-10">
                <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-[90%] container text-center px-4">
                    <div className="text-white text-center space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-white text-2xl md:text-4xl xl:text-5xl font-extrabold leading-tight font-ns drop-shadow-lg"
                        >
                            Find Your Dream Home with{' '}
                            <span className="text-[#cae1ff] font-It">RealEstate</span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-base md:text-2xl font-semibold text-white drop-shadow font-ns mb-4"
                        >
                            Explore properties in your favorite localities across India
                        </motion.h2>
                    </div>

                    {/* ------------------ SEARCH FILTERS ------------------ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/85 lg:bg-white mx-auto md:max-w-5xl rounded-xl md:rounded-4xl border-blue-200 border-2 shadow-xl px-5 lg:px-2 py-4 grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-2 lg:gap-4"
                    >
                        <FilterDropdown label="City" icon={FaMapMarkerAlt} options={citiesList} selected={null} onSelect={() => {}} />
                        <FilterDropdown label="Locality" icon={FaBuilding} options={localitiesList} selected={null} onSelect={() => {}} />
                        <FilterDropdown label="Budget" icon={FaRupeeSign} options={budgets} selected={null} onSelect={() => {}} />
                        <FilterDropdown
                            label="Property Type"
                            icon={FaHome}
                            options={propertyTypes}
                            selected={selectedPropertyType}
                            onSelect={setSelectedPropertyType}
                        />
                        <FilterDropdown label="BHK" icon={FaBed} options={bhkOptions} selected={null} onSelect={() => {}} />
                        <FilterDropdown label="Posted By" icon={FaUser} options={postedBy} selected={null} onSelect={() => {}} />

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            onClick={HandleSearch}
                            className="bg-[#426ff5] text-white font-bold rounded-full px-6 py-2 flex items-center justify-center hover:bg-blue-700 transition w-full md:w-auto col-span-full"
                        >
                            <FaSearch className="mr-2" />
                            Search
                        </motion.button>
                    </motion.div>
                </div>

                {/* ------------------ SLIDER ------------------ */}
                <Swiper
                    modules={[Autoplay, Navigation]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="h-full"
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="h-full w-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/50 z-10"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <Properties />
            <FeaturedAgents />
            <PopularProperties />
            <Footer />
        </>
    )
}
