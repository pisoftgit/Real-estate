import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
// import { FaImage } from 'react-icons/fa';

const PRIMARY_COLOR = '#1fa141'
const propertyCategories = [
    {
        title: 'Owner Properties',
        count: '49256',
        image:
            'https://media.istockphoto.com/id/2174014921/photo/real-estate-agent-giving-a-man-the-keys-to-his-new-home.jpg?s=612x612&w=0&k=20&c=WBuChYqnWW17g4S2sXOcKdJUJi6GHW5YZ_IJaO5Wu0Y=',
        buttonText: 'Explore',
        link: '#',
    },
    {
        title: 'Projects',
        count: '',
        image:
            'https://sterlingdevelopers.com/blog/wp-content/uploads/2023/09/Advantages-of-buying-property-from-reputed-developer.webp',
        buttonText: 'Explore',
        link: '#',
    },
    {
        title: '#ShareYourStory',
        subtitle: 'Share your story and WIN vouchers worth ₹7000',
        image:
            'https://static.vecteezy.com/system/resources/thumbnails/008/142/242/small/real-estate-brokerage-agent-deliver-a-sample-of-a-model-house-to-the-customer-mortgage-loan-agreement-making-lease-and-buy-and-sell-house-and-contract-home-insurance-mortgage-loan-concept-free-photo.jpg',
        buttonText: 'Click Here',
        isCTA: true,
        link: '#',
    },
    {
        title: 'Budget Homes',
        count: '1003',
        image:
            'https://www.dev-res.com/assets/blog/images/post/property-development-business-plan.jpg',
        buttonText: 'Explore',
        link: '#',
    }
]

const propertyCards = [
    {
        id: 1,
        image: '/hero_bg_3.jpg',
        bhk: '4 BHK Flat',
        price: '₹1.90 Cr',
        size: '',
        location: 'Yelahanka, Bangalore',
        status: 'Ready to Move',
        images: 4
    },
    {
        id: 2,
        image: '/hero_bg_2.jpg',
        bhk: '2 BHK Flat',
        price: '₹1.06 Cr',
        size: '1171 sqft',
        location: 'Varthur, Bangalore',
        status: 'Ready to Move',
        images: 1
    },
    {
        id: 3,
        image: '/hero_bg_1.jpg',
        bhk: '2 BHK Flat',
        price: '₹75 Lac',
        size: '888 sqft',
        location: 'Budigere Cross, Bangalore',
        status: 'Ready to Move',
        images: 27
    },
    {
        id: 4,
        image: '/hero_bg_4.jpg',
        bhk: '1 BHK Flat',
        price: '₹64.9 Lac',
        size: '721 sqft',
        location: 'Chambenahalli, Bangalore',
        status: 'Ready to Move',
        images: 2
    },
    {
        id: 5,
        image: '/hero_bg_4.jpg',
        bhk: '1 BHK Flat',
        price: '₹64.9 Lac',
        size: '721 sqft',
        location: 'Chambenahalli, Bangalore',
        status: 'Ready to Move',
        images: 2
    },
    {
        id: 6,
        image: '/hero_bg_4.jpg',
        bhk: '1 BHK Flat',
        price: '₹64.9 Lac',
        size: '721 sqft',
        location: 'Chambenahalli, Bangalore',
        status: 'Ready to Move',
        images: 2
    }
]

export default function PopularProperties() {

    const navigate = useNavigate();
    const HandleSearch = () =>{
        navigate("/Search")
    }
    
    return (
        <>
            <section className='max-w-7xl mx-auto px-4 md:px-8 py-8'>
                <h2 className='text-xl md:text-2xl font-ns font-semibold text-gray-800 mb-6 relative inline-block'>
                    We've got properties for everyone
                    <span className='absolute left-0 -bottom-1 w-12 h-1 bg-green-700 rounded-full' />
                </h2>

                <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {propertyCategories.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative aspect-[4/5] w-full rounded-lg overflow-hidden shadow-md group"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4 text-white text-center">
                                <div>
                                    {item.count && (
                                        <p className="text-2xl font-ns font-bold">{item.count}</p>
                                    )}
                                    <h3 className="text-lg font-ns font-semibold leading-tight">{item.title}</h3>
                                    {item.subtitle && (
                                        <p className="text-sm font-ns font-light mt-1">{item.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            {item.buttonText && (
                                <button
                                    className="absolute bottom-3 right-3 bg-green-700 text-white text-sm font-semibold px-3 py-1.5 rounded opacity-0 pointer-events-none
            transition-opacity duration-300 ease-in-out
            group-hover:opacity-100 group-hover:pointer-events-auto
            shadow-lg hover:bg-green-800"
                                >
                                    {item.buttonText}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile layout: horizontal scroll */}
                <div className="lg:hidden overflow-x-auto no-scrollbar -mx-2 px-2">
                    <div className="flex space-x-4">
                        {propertyCategories.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative flex-shrink-0 w-72 aspect-[4/5] rounded-lg overflow-hidden shadow-md group"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4 text-white text-center">
                                    <div>
                                        {item.count && (
                                            <p className="text-2xl font-ns font-bold">{item.count}</p>
                                        )}
                                        <h3 className="text-lg font-ns font-semibold leading-tight">{item.title}</h3>
                                        {item.subtitle && (
                                            <p className="text-sm font-ns font-light mt-1">{item.subtitle}</p>
                                        )}
                                    </div>
                                </div>

                                {item.buttonText && (
                                    <button
                                        className="absolute bottom-3 right-3 bg-green-700 text-white text-sm font-semibold px-3 py-1.5 rounded opacity-0 pointer-events-none
              transition-opacity duration-300 ease-in-out
              group-hover:opacity-100 group-hover:pointer-events-auto
              shadow-lg hover:bg-green-800"
                                    >
                                        {item.buttonText}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className='max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6'>
                <div className='flex justify-center items-start flex-col lg:justify-between lg:flex-row'>
                    <h2 className='text-md md:text-xl font-ns font-bold px-4 py-1 rounded-4xl bg-[#1fa141] text-white'>
                        Popular Owner Properties
                    </h2>
                    <a
                        href='#'
                        className='text-sm text-green-700 font-ns font-semibold hover:underline px-4 py-2'
                    >
                        See all Properties→
                    </a>
                </div>

                <div className='lg:hidden overflow-x-auto no-scrollbar -mx-2 px-2'>
                    <div className='flex space-x-4'>
                        {propertyCards.map(property => (
                            <div
                                key={property.id}
                                className='min-w-[270px] max-w-[270px] flex-shrink-0 bg-white rounded-2xl shadow hover:shadow-md transition'
                            >
                                <div className='relative'>
                                    <img
                                        src={property.image}
                                        alt={property.bhk}
                                        className='w-full h-40 object-cover rounded-t-lg'
                                    />
                                    {/* <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <FaImage className="text-xs" />
                  {property.images}
                </div> */}
                                </div>
                                <div className='p-3'>
                                    <h3 className='text-sm font-ns font-bold'>{property.bhk}</h3>
                                    <p
                                        className='text-sm font-ns font-semibold'
                                        style={{ color: PRIMARY_COLOR }}
                                    >
                                        {property.price}{' '}
                                        {property.size && (
                                            <span className='text-gray-700'>| {property.size}</span>
                                        )}
                                    </p>
                                    <p className='text-sm text-gray-700'>{property.location}</p>
                                    <p className='text-xs text-gray-700'>{property.status}</p>
                                </div>
                                <div className='px-3 pb-3'>
                                    <button onClick={HandleSearch} className='bg-green-700 hover:bg-green-700 text-white text-sm font-ns font-semibold px-4 py-1 rounded-xl'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Large screens - Hovering Grid Cards */}
                <div className='hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6'>
                    {propertyCards.map(property => (
                        <motion.div
                            key={property.id}
                            className='relative rounded-xl overflow-hidden shadow-md group cursor-pointer'
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            {/* Background Image */}
                            <img
                                src={property.image}
                                alt={property.bhk}
                                className='w-full h-48 object-cover'
                            />

                            {/* Image Count */}
                            {/* <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 z-10">
              <FaImage className="text-xs" />
              {property.images}
            </div> */}

                            {/* Hover Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className='absolute inset-0 bg-black/80 text-white flex flex-col justify-center items-start p-4 space-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all'
                            >
                                <h3 className='text-lg font-ns font-bold'>{property.bhk}</h3>
                                <p className='text-sm text-gray-200'>{property.location}</p>
                                <p className='text-green-300 font-ns font-semibold'>
                                    {property.price} {property.size && ` | ${property.size}`}
                                </p>
                                <div className='flex justify-between w-full text-sm text-gray-300'>
                                    <span>{property.status}</span>
                                </div>
                                <button
                                    className='bg-white text-sm font-ns font-semibold text-black px-4 py-1 rounded'
                                    style={{ color: PRIMARY_COLOR }}
                                    onClick={HandleSearch}
                                >
                                    View Details
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    )
}
