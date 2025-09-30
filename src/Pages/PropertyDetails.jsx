import React, { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaBed, FaBath, FaHome, FaShoppingBag, FaSchool, FaTrain, FaHospital, FaArrowRight } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { FaWifi, FaSwimmingPool, FaCar, FaDumbbell, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import "../App.css"
import Footer from "../Components/Footer";
import PropertiesbyCity from "../Components/PropertiesbyCity";

const DARK_COLOR = "#1F2937";
const TEXT_COLOR = "#4B5563";
const ACCENT_COLOR = "#426ff5";

const relatedProjects = [
    {
        id: 1,
        title: "Skyline Heights",
        location: "Andheri West, Mumbai",
        price: "₹2.5 Cr onwards",
        imageUrl: "hero_bg_4.jpg",
    },
    {
        id: 2,
        title: "bluewood Residency",
        location: "Kandivali East, Mumbai",
        price: "₹1.8 Cr onwards",
        imageUrl: "https://cdn.confident-group.com/wp-content/uploads/2024/12/27103036/types-of-real-estate-overview-scaled.jpg",
    },
    {
        id: 3,
        title: "Coastal Villas",
        location: "Virar, Mumbai",
        price: "₹95 Lac onwards",
        imageUrl: "https://photos.zillowstatic.com/fp/7147e670e881aaf4689aa7a7c36c707b-cc_ft_960.jpg",
    },
    {
        id: 4,
        title: "Urban Oasis",
        location: "Bandra, Mumbai",
        price: "₹3.2 Cr onwards",
        imageUrl: "https://photos.zillowstatic.com/fp/88da7907bab8a7f4ebbc7e8ba9dcb642-cc_ft_960.jpg",
    },
    {
        id: 5,
        title: "The Royal Estate",
        location: "Worli, Mumbai",
        price: "₹5.0 Cr onwards",
        imageUrl: "https://photos.zillowstatic.com/fp/cf4a456da7cea618ddfbfc38915202d6-p_c.jpg",
    },
    {
        id: 6,
        title: "Hillside Homes",
        location: "Thane, Mumbai",
        price: "₹1.2 Cr onwards",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_8CNg2qr_fqQmmqNkVfbPn3mVNW4nqh6Duh1TQNq9wzwMVqIjv3cT6GP51vDYolCQzA&usqp=CAU",
    },
];

const PropertyOverview = () => {
    const sections = {
        about: "About Property",
        amenities: "Amenities",
        locality: "Locality Details",
        builder: "Builder Info",
    };

    const [activeSection, setActiveSection] = useState("about");
    const sectionRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        Object.keys(sections).forEach((key) => {
            if (sectionRefs.current[key]) {
                observer.observe(sectionRefs.current[key]);
            }
        });

        return () => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const handleScrollToSection = (sectionId) => {
        const targetElement = sectionRefs.current[sectionId];
        if (targetElement) {
            const headerOffset = 150;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (targetElement.offsetHeight / 2) - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };


    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <header className="relative h-96 md:h-[500px] lg:h-[400px] overflow-hidden">
                    <img
                        src="/hero_bg_4.jpg"
                        alt="Property Exterior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 py-25 px-8 md:p-28 lg:p-17 text-center text-white max-w-4xl mx-auto">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold font-ns tracking-tight drop-shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Aspen Park Residence
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl font-ns mt-2 drop-shadow-md"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            A luxurious 1 BHK apartment in the prestigious Goregaon East, Mumbai.
                        </motion.p>
                    </div>
                </header>

                {/* Main Content & Sidebar */}
                <section className="container mx-auto mt-[-80px] md:mt-[-25px] px-4 md:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-7">
                        <div className="lg:col-span-2 space-y-12">
                            <motion.div
                                className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <p className="text-4xl md:text-5xl font-bold font-ns" style={{ color: DARK_COLOR }}>₹1.35 Cr</p>
                                        <p className="text-sm font-medium font-ns mt-1" style={{ color: TEXT_COLOR }}>
                                            <span className="text-blue-600 font-normal font-ns">Approx. EMI </span>₹47,000/month
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center px-6 py-4 rounded-xl text-white font-ns font-semibold text-lg shadow-lg transition-colors duration-300"
                                        style={{ backgroundColor: ACCENT_COLOR }}
                                    >
                                        <FaPhoneAlt className="mr-3" /> Contact Owner
                                    </motion.button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-10">
                                    <FeatureItem icon={<FaBed />} label="Bedrooms" value="1" />
                                    <FeatureItem icon={<FaBath />} label="Bathrooms" value="2" />
                                    <FeatureItem icon={<MdBalcony />} label="Balconies" value="2" />
                                    <FeatureItem icon={<FaHome />} label="Area" value="412 sqft" />
                                </div>
                            </motion.div>

                            {/* Section Content */}
                            <div className="space-y-12 lg:space-y-20">
                                <div ref={(el) => (sectionRefs.current.about = el)} id="about">
                                    <SectionHeader title="About this Property" subtitle="Comprehensive details on the residence and its specifications." />
                                    <div className="space-y-8 mt-8">
                                        <p className="text-lg leading-relaxed" style={{ color: TEXT_COLOR }}>
                                            This beautifully designed 1 BHK apartment in Aspen Park is a prime example of urban living combined with luxury. The property is fully furnished, with high-quality interiors and fittings, and offers stunning views from its two expansive balconies. Situated on the 14th floor, it guarantees privacy and an open feel, making it an ideal home for individuals or small families looking for convenience and style.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <SpecItem label="Transaction" value="Resale" />
                                            <SpecItem label="Status" value="Ready to Move" />
                                            <SpecItem label="Floor" value="14 (Out of 16)" />
                                            <SpecItem label="Facing" value="South-West" />
                                            <SpecItem label="Parking" value="1 Open" />
                                            <SpecItem label="Lifts" value="3" />
                                        </div>
                                    </div>
                                </div>

                                <div ref={(el) => (sectionRefs.current.amenities = el)} id="amenities" >
                                    <SectionHeader title="Community Amenities" subtitle="Enjoy a wide range of facilities designed for a modern lifestyle." />
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                                        <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
                                        <Amenity icon={<FaDumbbell />} label="Gymnasium" />
                                        <Amenity icon={<FaCar />} label="Parking" />
                                        <Amenity icon={<FaWifi />} label="Wi-Fi" />
                                        <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
                                        <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
                                        <Amenity icon={<FaDumbbell />} label="Gymnasium" />
                                        <Amenity icon={<FaCar />} label="Parking" />
                                        <Amenity icon={<FaWifi />} label="Wi-Fi" />
                                        <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
                                        <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
                                        <Amenity icon={<FaDumbbell />} label="Gymnasium" />
                                        <Amenity icon={<FaCar />} label="Parking" />
                                        <Amenity icon={<FaWifi />} label="Wi-Fi" />
                                        <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
                                        <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
                                        <Amenity icon={<FaDumbbell />} label="Gymnasium" />
                                        <Amenity icon={<FaCar />} label="Parking" />
                                        <Amenity icon={<FaWifi />} label="Wi-Fi" />
                                        <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
                                    </div>
                                </div>

                                <div ref={(el) => (sectionRefs.current.locality = el)} id="locality" >
                                    <SectionHeader title="Locality Details" subtitle="Connectivity and convenience at your doorstep." />
                                    <p className="text-lg leading-relaxed mt-8" style={{ color: TEXT_COLOR }}>
                                        The Aspen Park Residence is conveniently located at a prime location in Goregaon East. The full address is:
                                        <br />
                                        <span className="font-semibold font-ns" style={{ color: DARK_COLOR }}>Plot No. 123, Aspen Park, Aarey Road, Goregaon East, Mumbai, Maharashtra 400065</span>
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-8">
                                        <LocalityItem icon={<FaTrain />} label="Metro Station" value="0.5 km" />
                                        <LocalityItem icon={<FaSchool />} label="School" value="1.0 km" />
                                        <LocalityItem icon={<FaHospital />} label="Hospital" value="3.1 km" />
                                        <LocalityItem icon={<FaShoppingBag />} label="Shopping Mall" value="2.5 km" />
                                        <LocalityItem icon={<FaCar />} label="Highway Access" value="2.0 km" />
                                    </div>
                                    <div className="mt-8 h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15074.791356698901!2d72.84372389175098!3d19.16469941173139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b748b6f7584d%3A0x4137c9279cba62d8!2sAspen%20Park!5e0!3m2!1sen!2sin!4v1759217991901!5m2!1sen!2sin"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Google Map of Goregaon East"
                                        ></iframe>
                                    </div>
                                </div>

                                <div ref={(el) => (sectionRefs.current.builder = el)} id="builder" className="pb-16 pt-1">
                                    <SectionHeader title="About the Builder" subtitle="A legacy of excellence and trust in real estate." />
                                    <p className="text-lg leading-relaxed mt-8" style={{ color: TEXT_COLOR }}>
                                        Developed by <span className="font-semibold font-ns" style={{ color: DARK_COLOR }}>XYZ Developers</span>, a distinguished name in Mumbai's real estate market with over 15 years of excellence. Known for their commitment to quality and timely delivery, XYZ Developers has a portfolio of high-end residential projects that are celebrated for their modern design and strategic locations. Aspen Park stands as a testament to their vision.
                                    </p>
                                    <div className="mt-12">
                                        <SectionHeader title="Related Works" subtitle="Explore other prestigious projects by XYZ Developers." />
                                        <RelatedWorks projects={relatedProjects} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 hidden lg:block">
                            <div className="sticky top-30 mt-15 space-y-4 p-6 rounded-3xl bg-white shadow-blue-300 border-blue-50 shadow-lg">
                                <h3 className="text-xl font-bold font-ns" style={{ color: DARK_COLOR }}>Quick Navigation</h3>
                                {Object.entries(sections).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleScrollToSection(key)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-ns font-medium transition-all duration-300 ${activeSection === key
                                            ? `text-white shadow-md transform scale-[1.02]`
                                            : "text-gray-700 hover:bg-blue-100 bg-gray-100"
                                            }`}
                                        style={activeSection === key ? { backgroundColor: ACCENT_COLOR } : {}}
                                    >
                                        <span>{value}</span>
                                        <FaArrowRight className="text-sm" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <section>
                   <PropertiesbyCity />             
            </section>

            <section>
                <Footer />
            </section>
        </>
    );
};

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-ns font-bold inline-block bg-[#426ff5] text-white rounded-4xl py-1 px-5">{title}</h2>
        <p className="text-lg mt- font-ns" style={{ color: TEXT_COLOR }}>{subtitle}</p>
    </div>
);

const FeatureItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="text-2xl md:text-3xl" style={{ color: ACCENT_COLOR }}>{icon}</div>
        <div>
            <p className="text-xs font-medium uppercase font-ns tracking-wider" style={{ color: TEXT_COLOR }}>{label}</p>
            <p className="font-bold text-lg md:text-xl font-ns" style={{ color: DARK_COLOR }}>{value}</p>
        </div>
    </div>
);

const SpecItem = ({ label, value }) => (
    <div className="p-4 rounded-xl border border-gray-200 bg-blue-50 shadow-lg">
        <p className="text-sm uppercase font-ns text-blue-800 font-bold">{label}</p>
        <p className="font-semibold text-lg mt-1 font-ns" style={{ color: DARK_COLOR }}>{value}</p>
    </div>
);

const Amenity = ({ icon, label }) => (
    <div className="flex flex-col items-center justify-center shadow-lg bg-blue-50 text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200">
        <div className="text-4xl mb-3" style={{ color: ACCENT_COLOR }}>{icon}</div>
        <div className="text-gray-900 text-sm font-bold tracking-wide font-ns">{label}</div>
    </div>
);

const LocalityItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 shadow-lg border border-gray-200">
        <div className="text-2xl" style={{ color: ACCENT_COLOR }}>{icon}</div>
        <div>
            <p className="text-sm font-bold font-ns uppercase text-blue-800">{label}</p>
            <p className="font-semibold text-lg font-ns" style={{ color: DARK_COLOR }}>{value}</p>
        </div>
    </div>
);

const RelatedWorks = ({ projects }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            className="overflow-x-auto scrollbar-hidden"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            <div className="flex space-x-6 pb-4">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="flex-shrink-0 w-80 rounded-2xl overflow-hidden shadow-lg bg-white"
                        whileHover={{ y: -5 }}
                        transition={{ type: "tween", stiffness: 700 }}
                    >
                        <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover" />
                        <div className="p-6">
                            <h4 className="text-xl font-bold font-ns" style={{ color: DARK_COLOR }}>{project.title}</h4>
                            <p className="text-sm font-ns mt-1" style={{ color: TEXT_COLOR }}>{project.location}</p>
                            <p className="text-lg font-bold font-ns mt-3" style={{ color: ACCENT_COLOR }}>{project.price}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PropertyOverview;