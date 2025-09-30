import React, { useRef, useState } from 'react'
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
import Explore from '../Components/Explore'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'


const citiesList = ['Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad']
const localitiesList = ['Andheri', 'Koramangala', 'T. Nagar', 'Baner', 'Banjara Hills']
const budgets = ['0 - 50L', '50L - 1Cr', '1Cr - 2Cr', '2Cr+']
const propertyTypes = ['Flat', 'Plot', 'Commercial']
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK']
const postedBy = ['Owner', 'Dealer', 'Builder']

const slides = [
    { image: './hero_bg_1.jpg' },
    { image: './hero_bg_2.jpg' },
    { image: './hero_bg_3.jpg' },
    { image: './hero_bg_4.jpg' }
]

// Dropdown animation
const dropdownVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
}

const FilterDropdown = ({ label, icon: Icon, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(options[0])
  
    return (
        <div
            className="relative w-full md:w-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-blue-500 w-full md:w-auto text-sm bg-white"
            >
                <Icon className="text-blue-500 text-base" />
                <span>{selected}</span>
                <FaChevronDown className="text-xs text-gray-400" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 bg-white border border-blue-300 shadow-md rounded-md z-50 w-48"
                    >
                        {options.map((opt, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setSelected(opt)
                                    setIsOpen(false)
                                }}
                                className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer text-sm"
                            >
                                {opt}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Home() {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const navigate= useNavigate()

    const HandleSearch = () =>{
        navigate("/search")
    }

    return (
        <>
            <Navbar />

            <section className="relative h-[75vh] md:h-[80vh] z-10">
                <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-[90%] max-w-7xl text-center px-4">

                    <div className="text-white text-center space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight font-ns drop-shadow-lg"
                        >
                            Find Your Dream Home with <span className="text-[#cae1ff] font-It">HomeLand</span>
                        </motion.h1>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                            className="text-base md:text-2xl font-semibold text-white drop-shadow font-ns mb-4"
                        >
                            Explore properties in your favorite localities across India
                        </motion.h2>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/85 lg:bg-white rounded-xl lg:rounded-4xl border-blue-200 border-2 shadow-xl px-5 py-4 grid grid-cols-2 md:grid-cols-5 lg:flex lg:flex-row lg:flex-wrap items-stretch justify-between gap-2"
                    >
                        <FilterDropdown label="City" icon={FaMapMarkerAlt} options={citiesList} />
                        <FilterDropdown label="Locality" icon={FaBuilding} options={localitiesList} />
                        <FilterDropdown label="Budget" icon={FaRupeeSign} options={budgets} />
                        <FilterDropdown label="Property Type" icon={FaHome} options={propertyTypes} />
                        <FilterDropdown label="BHK" icon={FaBed} options={bhkOptions} />
                        <FilterDropdown label="Posted By" icon={FaUser} options={postedBy} />

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={HandleSearch}
                            whileHover={{ scale: 1.03 }}
                            className="bg-[#426ff5] text-white font-bold rounded-full px-6 py-2 flex items-center justify-center hover:bg-blue-700 transition w-full md:w-auto col-span-full"
                        >
                            <FaSearch className="mr-2" onClick={HandleSearch} />
                            Search
                        </motion.button>
                    </motion.div>

                </div>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
                    }}
                    onBeforeInit={swiper => {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                    }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="h-full"
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="h-full w-full bg-cover bg-center relative"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundAttachment: 'fixed'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/50 z-10"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Properties */}
            <section>
                    <Properties />
            </section>

            <section>
                <Explore />
            </section>
            
            <section>
                <Footer />
            </section>

        </>
    )
}
