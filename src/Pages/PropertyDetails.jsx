import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaBed, FaHome, FaArrowRight, FaSpinner, FaMapMarkerAlt, FaCheckCircle, FaBuilding, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdBalcony, MdOutlineChair } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PropertiesbyCity from "../Components/PropertiesbyCity";
import { BaseURL2 } from "../../BaseURL";
import "../App.css";

const DARK_COLOR = "#1F2937";
const TEXT_COLOR = "#4B5563";
const ACCENT_COLOR = "#426ff5";

const PropertyOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("about");
    const sectionRefs = useRef({});

    // Gallery Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const sections = {
        about: "About Property",
        gallery: "Photo Gallery",
        amenities: "Amenities",
        locality: "Locality Details",
        builder: "Builder Info",
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BaseURL2}/properties`, {
                    params: {
                        propertyId: id,
                        needMedia: true,
                        needPLC: true,
                        needFloors: true,
                        isOnlySerialized: true,
                    }
                });
                if (response.data?.content?.length > 0) {
                    setProperty(response.data.content[0]);
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.5 }
        );

        Object.keys(sections).forEach((key) => {
            if (sectionRefs.current[key]) observer.observe(sectionRefs.current[key]);
        });

        return () => observer.disconnect();
    }, [loading]);

    const handleScrollToSection = (sectionId) => {
        const targetElement = sectionRefs.current[sectionId];
        if (targetElement) {
            const headerOffset = 150;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
        }
    };

    // --- Gallery Logic ---
    const openGallery = (index) => {
        const token = localStorage.getItem("token");
        if (!token) {
            // alert("Please login to view the property gallery.");
            navigate("/userLogin"); // Uncomment to redirect
            return;
        }
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % property.propertyMediaList.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + property.propertyMediaList.length) % property.propertyMediaList.length);
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center">
            <FaSpinner className="animate-spin text-4xl mb-4" style={{ color: ACCENT_COLOR }} />
            <p className="font-ns font-bold text-gray-400">Loading {id}...</p>
        </div>
    );

    if (!property) return <div className="h-screen flex items-center justify-center font-ns font-bold">Property Details Not Available</div>;

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <header className="relative h-96 md:h-[500px] lg:h-[400px] overflow-hidden">
                    <img src="/hero_bg_4.jpg" alt="Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 py-25 px-8 md:p-28 lg:p-17 text-center text-white max-w-4xl mx-auto">
                        <motion.h1 
                            className="text-4xl md:text-6xl font-bold font-ns tracking-tight drop-shadow-lg"
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        >
                            {property.projectName}
                        </motion.h1>
                        <motion.p 
                            className="text-lg md:text-xl font-ns mt-2 drop-shadow-md"
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                        >
                            {property.flatHouseStructure?.structure} {property.towerPropertyItem?.name} in {property.towerName}
                        </motion.p>
                    </div>
                </header>

                <section className="container mx-auto mt-[-80px] md:mt-[-25px] px-4 md:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-7">
                        <div className="lg:col-span-2 space-y-12">
                            {/* Summary Card */}
                            <motion.div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <p className="text-4xl md:text-5xl font-bold font-ns" style={{ color: DARK_COLOR }}>
                                            ₹{property.totalAmount?.toLocaleString()}
                                        </p>
                                        <p className="text-sm font-medium font-ns mt-1" style={{ color: TEXT_COLOR }}>
                                            <span className="text-blue-600 font-normal">Base Price: </span>₹{property.basicAmount?.toLocaleString()}
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center px-6 py-4 rounded-xl text-white font-ns font-semibold text-lg shadow-lg"
                                        style={{ backgroundColor: ACCENT_COLOR }}
                                    >
                                        <FaPhoneAlt className="mr-3" /> Contact Builder
                                    </motion.button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-10">
                                    <FeatureItem icon={<FaBed />} label="Structure" value={property.flatHouseStructure?.structure} />
                                    <FeatureItem icon={<MdOutlineChair />} label="Furnishing" value={property.furnishingStatus?.status} />
                                    <FeatureItem icon={<MdBalcony />} label="Floor" value={`${property.floorNumber} of ${property.floors?.length}`} />
                                    <FeatureItem icon={<FaHome />} label="Area" value={property.areaDetails} />
                                </div>
                            </motion.div>

                            <div className="space-y-12 lg:space-y-20">
                                {/* About Section */}
                                <div ref={(el) => (sectionRefs.current.about = el)} id="about">
                                    <SectionHeader title="About Property" />
                                    <div className="space-y-8 mt-8">
                                        <p className="text-lg leading-relaxed font-ns" style={{ color: TEXT_COLOR }}>
                                            {property.description}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <SpecItem label="Possession" value={property.possessionStatus?.replace(/_/g, ' ')} />
                                            <SpecItem label="Facing" value={property.faceDirection?.faceDirection} />
                                            <SpecItem label="Carpet Area" value={`${property.carpetArea} ${property.carpetAreaUnit?.unitName}`} />
                                            <SpecItem label="Unit No." value={property.unitNumber} />
                                            <SpecItem label="Tower" value={property.towerName} />
                                            <SpecItem label="Loading" value={`${property.loadingPercentage}%`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery Section with 4x4 logic */}
                                <div ref={(el) => (sectionRefs.current.gallery = el)} id="gallery">
                                    <SectionHeader title="Photo Gallery" />
                                    {!property.propertyMediaList || property.propertyMediaList.length === 0 ? (
                                        <div className="mt-8 p-12 bg-gray-100 rounded-3xl text-center border-2 border-dashed border-gray-300">
                                            <p className="text-gray-500 font-ns font-bold">No pictures available for this property.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-8 h-[300px] md:h-[450px]">
                                            {property.propertyMediaList.slice(0, 3).map((media, index) => {
                                                const hasMore = property.propertyMediaList.length > 3;
                                                return (
                                                    <div 
                                                        key={media.id} 
                                                        onClick={() => openGallery(index)}
                                                        className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group
                                                            ${index === 0 ? 'col-span-3 row-span-2' : 'col-span-1 row-span-1'}
                                                        `}
                                                    >
                                                        <img 
                                                            src={`${BaseURL2}/medias/${media.id}/properties/${property.propertyId}`} 
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                            alt={media.mediaLabel || "Property"} 
                                                        />
                                                        {index === 2 && hasMore && (
                                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                                                                <p className="text-3xl font-bold">+{property.propertyMediaList.length - 2}</p>
                                                                <p className="text-sm font-ns font-bold uppercase tracking-widest">More Pics</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Amenities Section */}
                                <div ref={(el) => (sectionRefs.current.amenities = el)} id="amenities">
                                    <SectionHeader title="Amenities & Facilities" />
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                                        {property.amenities?.map((item) => (
                                            <Amenity key={item.id} icon={<FaCheckCircle />} label={item.amenityName} />
                                        ))}
                                        {property.facilities?.map((item) => (
                                            <Amenity key={item.id} icon={<FaShieldAlt />} label={item.facilityName} />
                                        ))}
                                    </div>
                                </div>

                                {/* Locality Section */}
                                <div ref={(el) => (sectionRefs.current.locality = el)} id="locality">
                                    <SectionHeader title="Locality Details" />
                                    <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl mt-8 border border-blue-100">
                                        <FaMapMarkerAlt className="text-2xl mt-1" style={{ color: ACCENT_COLOR }} />
                                        <div>
                                            <p className="font-ns font-bold text-xl" style={{ color: DARK_COLOR }}>{property.towerName}, {property.projectName}</p>
                                            <p className="font-ns text-gray-500">Floor {property.floorNumber}, Unit {property.unitNumber}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913127413!2d77.03288541508055!3d28.50290968246803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEwLjUiTiA3N8KwMDInMDYuMiJF!5e0!3m2!1sen!2sin!4v1625562000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} title="Map" allowFullScreen loading="lazy"></iframe>
                                    </div>
                                </div>

                                {/* Builder Section */}
                                <div ref={(el) => (sectionRefs.current.builder = el)} id="builder" className="pb-16 pt-1">
                                    <SectionHeader title="Builder Info" />
                                    <div className="flex items-center gap-6 mt-8 p-8 rounded-3xl bg-gray-50 border border-gray-200">
                                        <div className="h-20 w-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg" style={{ backgroundColor: ACCENT_COLOR }}>
                                            {property.builderName?.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold font-ns" style={{ color: DARK_COLOR }}>{property.builderName}</h4>
                                            <p className="font-ns text-gray-500 flex items-center gap-2"><FaBuilding /> Registered Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1 hidden lg:block">
                            <div className="sticky top-32 mt-10 space-y-4 p-6 rounded-3xl bg-white shadow-2xl border border-blue-50">
                                <h3 className="text-xl font-bold font-ns mb-4" style={{ color: DARK_COLOR }}>Quick Navigation</h3>
                                {Object.entries(sections).map(([key, value]) => (
                                    <button
                                        key={key} onClick={() => handleScrollToSection(key)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-ns font-bold transition-all ${activeSection === key ? `text-white shadow-lg scale-[1.03]` : "text-gray-600 hover:bg-blue-50 bg-gray-50 border border-transparent"}`}
                                        style={activeSection === key ? { backgroundColor: ACCENT_COLOR } : {}}
                                    >
                                        <span>{value}</span> <FaArrowRight className={`text-sm transition-transform ${activeSection === key ? 'translate-x-1' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Image Slider Modal --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={closeGallery}
                    >
                        <button className="absolute top-8 right-8 text-white text-3xl hover:rotate-90 transition-transform p-2">
                            <FaTimes />
                        </button>

                        <button onClick={prevImage} className="absolute left-4 md:left-8 text-white text-4xl p-4 hover:bg-white/10 rounded-full transition-all">
                            <FaChevronLeft />
                        </button>

                        <div className="max-w-6xl w-full h-[80vh] flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                            <motion.img 
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={`${BaseURL2}/medias/${property.propertyMediaList[currentImageIndex].id}/properties/${property.propertyId}`} 
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            />
                            <div className="mt-8 text-white font-ns font-bold bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                                {currentImageIndex + 1} / {property.propertyMediaList.length}
                            </div>
                        </div>

                        <button onClick={nextImage} className="absolute right-4 md:right-8 text-white text-4xl p-4 hover:bg-white/10 rounded-full transition-all">
                            <FaChevronRight />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <PropertiesbyCity />
            <Footer />
        </>
    );
};

// --- Sub-components (Kept for clarity) ---

const SectionHeader = ({ title }) => (
    <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-ns font-bold inline-block bg-[#426ff5] text-white rounded-full py-2 px-8 shadow-md">{title}</h2>
    </div>
);

const FeatureItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="text-3xl" style={{ color: ACCENT_COLOR }}>{icon}</div>
        <div>
            <p className="text-xs font-bold uppercase font-ns tracking-widest" style={{ color: TEXT_COLOR }}>{label}</p>
            <p className="font-bold text-lg md:text-xl font-ns" style={{ color: DARK_COLOR }}>{value || "N/A"}</p>
        </div>
    </div>
);

const SpecItem = ({ label, value }) => (
    <div className="p-5 rounded-2xl border border-gray-100 bg-blue-50/50 hover:bg-blue-50 transition-colors shadow-sm">
        <p className="text-xs uppercase font-ns text-blue-600 font-black tracking-tighter">{label}</p>
        <p className="font-bold text-lg mt-1 font-ns" style={{ color: DARK_COLOR }}>{value || "N/A"}</p>
    </div>
);

const Amenity = ({ icon, label }) => (
    <div className="flex flex-col items-center justify-center shadow-md bg-white text-center p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="text-4xl mb-3" style={{ color: ACCENT_COLOR }}>{icon}</div>
        <div className="text-gray-800 text-xs font-black uppercase tracking-tighter font-ns">{label}</div>
    </div>
);

export default PropertyOverview;


// import React, { useState, useRef, useEffect } from "react";
// import { FaPhoneAlt, FaBed, FaBath, FaHome, FaShoppingBag, FaSchool, FaTrain, FaHospital, FaArrowRight } from "react-icons/fa";
// import { MdBalcony } from "react-icons/md";
// import { FaWifi, FaSwimmingPool, FaCar, FaDumbbell, FaShieldAlt } from "react-icons/fa";
// import { motion } from "framer-motion";
// import Navbar from "../Components/Navbar";
// import "../App.css"
// import Footer from "../Components/Footer";
// import PropertiesbyCity from "../Components/PropertiesbyCity";

// const DARK_COLOR = "#1F2937";
// const TEXT_COLOR = "#4B5563";
// const ACCENT_COLOR = "#426ff5";

// const relatedProjects = [
//     {
//         id: 1,
//         title: "Skyline Heights",
//         location: "Andheri West, Mumbai",
//         price: "₹2.5 Cr onwards",
//         imageUrl: "hero_bg_4.jpg",
//     },
//     {
//         id: 2,
//         title: "bluewood Residency",
//         location: "Kandivali East, Mumbai",
//         price: "₹1.8 Cr onwards",
//         imageUrl: "https://cdn.confident-group.com/wp-content/uploads/2024/12/27103036/types-of-real-estate-overview-scaled.jpg",
//     },
//     {
//         id: 3,
//         title: "Coastal Villas",
//         location: "Virar, Mumbai",
//         price: "₹95 Lac onwards",
//         imageUrl: "https://photos.zillowstatic.com/fp/7147e670e881aaf4689aa7a7c36c707b-cc_ft_960.jpg",
//     },
//     {
//         id: 4,
//         title: "Urban Oasis",
//         location: "Bandra, Mumbai",
//         price: "₹3.2 Cr onwards",
//         imageUrl: "https://photos.zillowstatic.com/fp/88da7907bab8a7f4ebbc7e8ba9dcb642-cc_ft_960.jpg",
//     },
//     {
//         id: 5,
//         title: "The Royal Estate",
//         location: "Worli, Mumbai",
//         price: "₹5.0 Cr onwards",
//         imageUrl: "https://photos.zillowstatic.com/fp/cf4a456da7cea618ddfbfc38915202d6-p_c.jpg",
//     },
//     {
//         id: 6,
//         title: "Hillside Homes",
//         location: "Thane, Mumbai",
//         price: "₹1.2 Cr onwards",
//         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_8CNg2qr_fqQmmqNkVfbPn3mVNW4nqh6Duh1TQNq9wzwMVqIjv3cT6GP51vDYolCQzA&usqp=CAU",
//     },
// ];

// const galleryImages = [
//     { id: 1, url: "/hero_bg_4.jpg", alt: "Property Exterior View" },
//     { id: 2, url: "/hero_bg_1.jpg", alt: "Living Room" },
//     { id: 3, url: "/hero_bg_1.jpg", alt: "Bedroom" },
//     { id: 4, url: "/hero_bg_3.jpg", alt: "Kitchen" },
//     { id: 5, url: "/hero_bg_2.jpg", alt: "Bathroom" },
// ];
// const PropertyOverview = () => {
//     const sections = {
//         about: "About Property",
//         gallery: "Photo Gallery",
//         amenities: "Amenities",
//         locality: "Locality Details",
//         builder: "Builder Info",
//     };

//     const [activeSection, setActiveSection] = useState("about");
//     const sectionRefs = useRef({});

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setActiveSection(entry.target.id);
//                     }
//                 });
//             },
//             { threshold: 0.5 }
//         );

//         Object.keys(sections).forEach((key) => {
//             if (sectionRefs.current[key]) {
//                 observer.observe(sectionRefs.current[key]);
//             }
//         });

//         return () => {
//             Object.values(sectionRefs.current).forEach((ref) => {
//                 if (ref) observer.unobserve(ref);
//             });
//         };
//     }, []);

//     const handleScrollToSection = (sectionId) => {
//         const targetElement = sectionRefs.current[sectionId];
//         if (targetElement) {
//             const headerOffset = 150;
//             const elementPosition = targetElement.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (targetElement.offsetHeight / 2) - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth",
//             });
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <main className="min-h-screen">
//                 <header className="relative h-96 md:h-[500px] lg:h-[400px] overflow-hidden">
//                     <img
//                         src="/hero_bg_4.jpg"
//                         alt="Property Exterior"
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
//                     <div className="absolute bottom-0 left-0 py-25 px-8 md:p-28 lg:p-17 text-center text-white max-w-4xl mx-auto">
//                         <motion.h1
//                             className="text-4xl md:text-6xl font-bold font-ns tracking-tight drop-shadow-lg"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.8 }}
//                         >
//                             Aspen Park Residence
//                         </motion.h1>
//                         <motion.p
//                             className="text-lg md:text-xl font-ns mt-2 drop-shadow-md"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             A luxurious 1 BHK apartment in the prestigious Goregaon East, Mumbai.
//                         </motion.p>
//                     </div>
//                 </header>

//                 {/* Main Content & Sidebar */}
//                 <section className="container mx-auto mt-[-80px] md:mt-[-25px] px-4 md:px-8 relative z-10">
//                     <div className="lg:grid lg:grid-cols-3 lg:gap-7">
//                         <div className="lg:col-span-2 space-y-12">
//                             <motion.div
//                                 className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
//                                 initial={{ y: 20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ duration: 0.6 }}
//                             >
//                                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                                     <div className="mb-4 md:mb-0">
//                                         <p className="text-4xl md:text-5xl font-bold font-ns" style={{ color: DARK_COLOR }}>₹1.35 Cr</p>
//                                         <p className="text-sm font-medium font-ns mt-1" style={{ color: TEXT_COLOR }}>
//                                             <span className="text-blue-600 font-normal font-ns">Approx. EMI </span>₹47,000/month
//                                         </p>
//                                     </div>
//                                     <motion.button
//                                         whileHover={{ scale: 1.02 }}
//                                         whileTap={{ scale: 0.98 }}
//                                         className="flex items-center justify-center px-6 py-4 rounded-xl text-white font-ns font-semibold text-lg shadow-lg transition-colors duration-300"
//                                         style={{ backgroundColor: ACCENT_COLOR }}
//                                     >
//                                         <FaPhoneAlt className="mr-3" /> Contact Owner
//                                     </motion.button>
//                                 </div>
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-10">
//                                     <FeatureItem icon={<FaBed />} label="Bedrooms" value="1" />
//                                     <FeatureItem icon={<FaBath />} label="Bathrooms" value="2" />
//                                     <FeatureItem icon={<MdBalcony />} label="Balconies" value="2" />
//                                     <FeatureItem icon={<FaHome />} label="Area" value="412 sqft" />
//                                 </div>
//                             </motion.div>

//                             {/* Section Content */}
//                             <div className="space-y-12 lg:space-y-20">
//                                 <div ref={(el) => (sectionRefs.current.about = el)} id="about">
//                                     <SectionHeader title="About this Property" subtitle="Comprehensive details on the residence and its specifications." />
//                                     <div className="space-y-8 mt-8">
//                                         <p className="text-lg leading-relaxed" style={{ color: TEXT_COLOR }}>
//                                             This beautifully designed 1 BHK apartment in Aspen Park is a prime example of urban living combined with luxury. The property is fully furnished, with high-quality interiors and fittings, and offers stunning views from its two expansive balconies. Situated on the 14th floor, it guarantees privacy and an open feel, making it an ideal home for individuals or small families looking for convenience and style.
//                                         </p>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                             <SpecItem label="Transaction" value="Resale" />
//                                             <SpecItem label="Status" value="Ready to Move" />
//                                             <SpecItem label="Floor" value="14 (Out of 16)" />
//                                             <SpecItem label="Facing" value="South-West" />
//                                             <SpecItem label="Parking" value="1 Open" />
//                                             <SpecItem label="Lifts" value="3" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div ref={(el) => (sectionRefs.current.gallery = el)} id="gallery" >
//                                     <SectionHeader title="Photo Gallery" subtitle="See what makes this property special." />
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
//                                         <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
//                                             <img src={galleryImages[0].url} alt={galleryImages[0].alt} className="w-full h-full object-cover" />
//                                         </div>
//                                         <div className="w-full h-40 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
//                                             <img src={galleryImages[1].url} alt={galleryImages[1].alt} className="w-full h-full object-cover" />
//                                         </div>
//                                         <div className="w-full h-40 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
//                                             <img src={galleryImages[2].url} alt={galleryImages[2].alt} className="w-full h-full object-cover" />
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
//                                         {galleryImages.slice(3, 9).map((image) => (
//                                             <div key={image.id} className="w-full h-40 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
//                                                 <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
//                                             </div>
//                                         ))}
//                                         {/* Last cell with "More images" tag */}
//                                         <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer group">
//                                             <div className="flex flex-col items-center">
//                                                 <FaArrowRight className="text-3xl text-gray-400 mb-1 transition-all duration-300 group-hover:text-blue-500" />
//                                                 <p className="text-md font-semibold text-gray-600 group-hover:text-blue-500">More Images</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div ref={(el) => (sectionRefs.current.amenities = el)} id="amenities" >
//                                     <SectionHeader title="Community Amenities" subtitle="Enjoy a wide range of facilities designed for a modern lifestyle." />
//                                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
//                                         <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
//                                         <Amenity icon={<FaDumbbell />} label="Gymnasium" />
//                                         <Amenity icon={<FaCar />} label="Parking" />
//                                         <Amenity icon={<FaWifi />} label="Wi-Fi" />
//                                         <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
//                                         <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
//                                         <Amenity icon={<FaDumbbell />} label="Gymnasium" />
//                                         <Amenity icon={<FaCar />} label="Parking" />
//                                         <Amenity icon={<FaWifi />} label="Wi-Fi" />
//                                         <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
//                                         <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
//                                         <Amenity icon={<FaDumbbell />} label="Gymnasium" />
//                                         <Amenity icon={<FaCar />} label="Parking" />
//                                         <Amenity icon={<FaWifi />} label="Wi-Fi" />
//                                         <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
//                                         <Amenity icon={<FaSwimmingPool />} label="Swimming Pool" />
//                                         <Amenity icon={<FaDumbbell />} label="Gymnasium" />
//                                         <Amenity icon={<FaCar />} label="Parking" />
//                                         <Amenity icon={<FaWifi />} label="Wi-Fi" />
//                                         <Amenity icon={<FaShieldAlt />} label="24/7 Security" />
//                                     </div>
//                                 </div>

//                                 <div ref={(el) => (sectionRefs.current.locality = el)} id="locality" >
//                                     <SectionHeader title="Locality Details" subtitle="Connectivity and convenience at your doorstep." />
//                                     <p className="text-lg leading-relaxed mt-8" style={{ color: TEXT_COLOR }}>
//                                         The Aspen Park Residence is conveniently located at a prime location in Goregaon East. The full address is:
//                                         <br />
//                                         <span className="font-semibold font-ns" style={{ color: DARK_COLOR }}>Plot No. 123, Aspen Park, Aarey Road, Goregaon East, Mumbai, Maharashtra 400065</span>
//                                     </p>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-8">
//                                         <LocalityItem icon={<FaTrain />} label="Metro Station" value="0.5 km" />
//                                         <LocalityItem icon={<FaSchool />} label="School" value="1.0 km" />
//                                         <LocalityItem icon={<FaHospital />} label="Hospital" value="3.1 km" />
//                                         <LocalityItem icon={<FaShoppingBag />} label="Shopping Mall" value="2.5 km" />
//                                         <LocalityItem icon={<FaCar />} label="Highway Access" value="2.0 km" />
//                                     </div>
//                                     <div className="mt-8 h-96 w-full rounded-2xl overflow-hidden shadow-xl">
//                                         <iframe
//                                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15074.791356698901!2d72.84372389175098!3d19.16469941173139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b748b6f7584d%3A0x4137c9279cba62d8!2sAspen%20Park!5e0!3m2!1sen!2sin!4v1759217991901!5m2!1sen!2sin"
//                                             width="100%"
//                                             height="100%"
//                                             style={{ border: 0 }}
//                                             allowFullScreen=""
//                                             loading="lazy"
//                                             referrerPolicy="no-referrer-when-downgrade"
//                                             title="Google Map of Goregaon East"
//                                         ></iframe>
//                                     </div>
//                                 </div>

//                                 <div ref={(el) => (sectionRefs.current.builder = el)} id="builder" className="pb-16 pt-1">
//                                     <SectionHeader title="About the Builder" subtitle="A legacy of excellence and trust in real estate." />
//                                     <p className="text-lg leading-relaxed mt-8" style={{ color: TEXT_COLOR }}>
//                                         Developed by <span className="font-semibold font-ns" style={{ color: DARK_COLOR }}>XYZ Developers</span>, a distinguished name in Mumbai's real estate market with over 15 years of excellence. Known for their commitment to quality and timely delivery, XYZ Developers has a portfolio of high-end residential projects that are celebrated for their modern design and strategic locations. Aspen Park stands as a testament to their vision.
//                                     </p>
//                                     <div className="mt-12">
//                                         <SectionHeader title="Related Works" subtitle="Explore other prestigious projects by XYZ Developers." />
//                                         <RelatedWorks projects={relatedProjects} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="lg:col-span-1 hidden lg:block">
//                             <div className="sticky top-30 mt-15 space-y-4 p-6 rounded-3xl bg-white shadow-blue-300 border-blue-50 shadow-lg">
//                                 <h3 className="text-xl font-bold font-ns" style={{ color: DARK_COLOR }}>Quick Navigation</h3>
//                                 {Object.entries(sections).map(([key, value]) => (
//                                     <button
//                                         key={key}
//                                         onClick={() => handleScrollToSection(key)}
//                                         className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-ns font-medium transition-all duration-300 ${activeSection === key
//                                             ? `text-white shadow-md transform scale-[1.02]`
//                                             : "text-gray-700 hover:bg-blue-100 bg-gray-100"
//                                             }`}
//                                         style={activeSection === key ? { backgroundColor: ACCENT_COLOR } : {}}
//                                     >
//                                         <span>{value}</span>
//                                         <FaArrowRight className="text-sm" />
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <section>
//                 <PropertiesbyCity />
//             </section>

//             <section>
//                 <Footer />
//             </section>
//         </>
//     );
// };

// const SectionHeader = ({ title, subtitle }) => (
//     <div className="mb-4">
//         <h2 className="text-2xl md:text-3xl font-ns font-bold inline-block bg-[#426ff5] text-white rounded-4xl py-1 px-5">{title}</h2>
//         {/* <p className="text-lg mt- font-ns" style={{ color: TEXT_COLOR }}>{subtitle}</p> */}
//     </div>
// );

// const FeatureItem = ({ icon, label, value }) => (
//     <div className="flex items-center gap-4">
//         <div className="text-2xl md:text-3xl" style={{ color: ACCENT_COLOR }}>{icon}</div>
//         <div>
//             <p className="text-xs font-medium uppercase font-ns tracking-wider" style={{ color: TEXT_COLOR }}>{label}</p>
//             <p className="font-bold text-lg md:text-xl font-ns" style={{ color: DARK_COLOR }}>{value}</p>
//         </div>
//     </div>
// );

// const SpecItem = ({ label, value }) => (
//     <div className="p-4 rounded-xl border border-gray-200 bg-blue-50 shadow-lg">
//         <p className="text-sm uppercase font-ns text-blue-800 font-bold">{label}</p>
//         <p className="font-semibold text-lg mt-1 font-ns" style={{ color: DARK_COLOR }}>{value}</p>
//     </div>
// );

// const Amenity = ({ icon, label }) => (
//     <div className="flex flex-col items-center justify-center shadow-lg bg-blue-50 text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200">
//         <div className="text-4xl mb-3" style={{ color: ACCENT_COLOR }}>{icon}</div>
//         <div className="text-gray-900 text-sm font-bold tracking-wide font-ns">{label}</div>
//     </div>
// );

// const LocalityItem = ({ icon, label, value }) => (
//     <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 shadow-lg border border-gray-200">
//         <div className="text-2xl" style={{ color: ACCENT_COLOR }}>{icon}</div>
//         <div>
//             <p className="text-sm font-bold font-ns uppercase text-blue-800">{label}</p>
//             <p className="font-semibold text-lg font-ns" style={{ color: DARK_COLOR }}>{value}</p>
//         </div>
//     </div>
// );

// const RelatedWorks = ({ projects }) => {
//     const scrollRef = useRef(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(0);

//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollLeft(scrollRef.current.scrollLeft);
//     };

//     const handleMouseLeave = () => {
//         setIsDragging(false);
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging) return;
//         e.preventDefault();
//         const x = e.pageX - scrollRef.current.offsetLeft;
//         const walk = (x - startX) * 1.5;
//         scrollRef.current.scrollLeft = scrollLeft - walk;
//     };

//     return (
//         <div
//             className="overflow-x-auto scrollbar-hidden"
//             ref={scrollRef}
//             onMouseDown={handleMouseDown}
//             onMouseLeave={handleMouseLeave}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             style={{ cursor: isDragging ? "grabbing" : "grab" }}
//         >
//             <div className="flex space-x-6 pb-4">
//                 {projects.map((project) => (
//                     <motion.div
//                         key={project.id}
//                         className="flex-shrink-0 w-80 rounded-2xl overflow-hidden shadow-lg bg-white"
//                         whileHover={{ y: -5 }}
//                         transition={{ type: "tween", stiffness: 700 }}
//                     >
//                         <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover" />
//                         <div className="p-6">
//                             <h4 className="text-xl font-bold font-ns" style={{ color: DARK_COLOR }}>{project.title}</h4>
//                             <p className="text-sm font-ns mt-1" style={{ color: TEXT_COLOR }}>{project.location}</p>
//                             <p className="text-lg font-bold font-ns mt-3" style={{ color: ACCENT_COLOR }}>{project.price}</p>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PropertyOverview;