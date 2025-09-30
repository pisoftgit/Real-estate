import React, { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaMedal, FaStar, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import "../App.css"; // Ensure this CSS is shared for consistent styling
import Footer from "../Components/Footer";
import PropertiesbyCity from "../Components/PropertiesbyCity"; // This component is reused
import FeaturedAgents from "./FeaturedAgents";

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
        title: "Bluewood Residency",
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
];

const AgentProfile = () => {
    const sections = {
        about: "About Agent",
        projects: "Featured Projects",
        reviews: "Client Reviews",
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
    }, [sections]);

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
                        alt="Agent Profile Background"
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
                            Sarah Thompson
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl font-ns mt-2 drop-shadow-md"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Your trusted real estate expert in Mumbai.
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
                                        <p className="text-3xl md:text-4xl font-bold font-ns" style={{ color: DARK_COLOR }}>4.8/5</p>
                                        <p className="text-sm font-medium font-ns mt-1" style={{ color: TEXT_COLOR }}>
                                            <span className="text-blue-600 font-normal font-ns">124 Reviews </span>
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center px-6 py-4 rounded-xl text-white font-ns font-semibold text-lg shadow-lg transition-colors duration-300"
                                        style={{ backgroundColor: ACCENT_COLOR }}
                                    >
                                        <FaPhoneAlt className="mr-3" /> Get in Touch
                                    </motion.button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-10">
                                    <FeatureItem icon={<FaBuilding />} label="Experience" value="10+ Years" />
                                    <FeatureItem icon={<FaMapMarkerAlt />} label="Location" value="Mumbai" />
                                    <FeatureItem icon={<FaMedal />} label="Properties Sold" value="200+" />
                                    <FeatureItem icon={<FaStar />} label="Client Rating" value="4.8/5" />
                                </div>
                            </motion.div>

                            {/* Section Content */}
                            <div className="space-y-12 lg:space-y-20">
                                <div ref={(el) => (sectionRefs.current.about = el)} id="about">
                                    <SectionHeader title="About Sarah Thompson" subtitle="A brief introduction to your dedicated agent." />
                                    <div className="space-y-8 mt-8">
                                        <p className="text-lg leading-relaxed" style={{ color: TEXT_COLOR }}>
                                            Sarah Thompson is a veteran real estate agent with over 10 years of experience specializing in the Mumbai metropolitan area. Known for her in-depth market knowledge, exceptional negotiation skills, and a client-first approach, Sarah has successfully helped hundreds of clients find their dream homes. Her expertise spans across residential and commercial properties, with a strong focus on high-end apartments and luxury villas in prime locations.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <SpecItem label="Specialization" value="Luxury Residential" />
                                            <SpecItem label="Languages" value="English, Hindi, Marathi" />
                                            <SpecItem label="Contact" value="sarah.thompson@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div ref={(el) => (sectionRefs.current.projects = el)} id="projects">
                                    <SectionHeader title="Featured Projects" subtitle="Explore properties sold by Sarah." />
                                    <RelatedWorks projects={relatedProjects} />
                                </div>

                                <div ref={(el) => (sectionRefs.current.reviews = el)} id="reviews" className="pb-16 pt-1">
                                    <SectionHeader title="Client Reviews" subtitle="Hear from clients who worked with Sarah." />
                                    <div className="space-y-6 mt-8">
                                        <ReviewItem
                                            name="Rahul Sharma"
                                            date="September 2025"
                                            rating={5}
                                            review="Sarah was incredible throughout the entire process. Her professionalism and attention to detail made buying our first home a stress-free experience. Highly recommend her services!"
                                        />
                                        <ReviewItem
                                            name="Priya Patel"
                                            date="August 2025"
                                            rating={5}
                                            review="I had a fantastic experience working with Sarah. She's not just knowledgeable about the market, but she also truly listens to her clients' needs."
                                        />
                                        <ReviewItem
                                            name="Amit Singh"
                                            date="July 2025"
                                            rating={4}
                                            review="Excellent service. Sarah helped me find a great investment property within my budget. She's a true professional."
                                        />
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
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-ns font-medium transition-all duration-300 ${activeSection === key ? `text-white shadow-md transform scale-[1.02]` : "text-gray-700 hover:bg-blue-100 bg-gray-100"}`}
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
                <FeaturedAgents />
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

const ReviewItem = ({ name, date, rating, review }) => (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-md">
        <div className="flex justify-between items-center mb-2">
            <div>
                <p className="font-bold text-lg font-ns" style={{ color: DARK_COLOR }}>{name}</p>
                <p className="text-sm font-ns" style={{ color: TEXT_COLOR }}>{date}</p>
            </div>
            <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rating ? "" : "text-gray-300"} />
                ))}
            </div>
        </div>
        <p className="text-md leading-relaxed" style={{ color: TEXT_COLOR }}>"{review}"</p>
    </div>
);

export default AgentProfile;