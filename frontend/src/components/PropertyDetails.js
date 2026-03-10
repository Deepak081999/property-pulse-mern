import { useState } from 'react';
import { FaArrowLeft, FaMapMarker, FaShare, FaBed, FaBath, FaRulerCombined, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookmarkButton from './BookmarkButton';
import PropertyContactForm from './PropertyContactForm';
import ShareButtons from './ShareButtons';

const PropertyDetails = ({ property }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [showContactForm, setShowContactForm] = useState(false);

    const {
        _id,
        name,
        type,
        description,
        location,
        beds,
        baths,
        square_feet,
        amenities,
        rates,
        seller_info,
        images,
        owner,
    } = property;

    return (
        <>
            {/* Header */}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>

            {/* Property Images */}
            <section>
                <div className="container m-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <img
                                src={images[0] || '/images/properties/default.jpg'}
                                alt=""
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="grid grid-cols-2 gap-4">
                                {images.slice(1, 5).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Info */}
            <section>
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-blue-500">{name}</h1>
                                <p className="text-gray-500 text-lg">{type}</p>
                            </div>
                            <div className="mb-4 flex align-middle text-gray-500">
                                <FaMapMarker className="text-lg text-orange-700 mr-2" />
                                <p className="text-orange-700">
                                    {location?.street}, {location?.city}, {location?.state} {location?.zipcode}
                                </p>
                            </div>

                            <div className="w-full h-[400px] mb-4">
                                {/* Map component would go here */}
                                <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
                                    <p>Map Placeholder</p>
                                </div>
                            </div>

                            <div className="w-full bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-6">Rates & Options</h3>
                                <div className="flex flex-col md:flex-row justify-around">
                                    {rates?.weekly && (
                                        <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-500">${rates.weekly.toLocaleString()}</div>
                                                <div className="text-gray-500">Weekly</div>
                                            </div>
                                        </div>
                                    )}
                                    {rates?.monthly && (
                                        <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-500">${rates.monthly.toLocaleString()}</div>
                                                <div className="text-gray-500">Monthly</div>
                                            </div>
                                        </div>
                                    )}
                                    {rates?.nightly && (
                                        <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-500">${rates.nightly.toLocaleString()}</div>
                                                <div className="text-gray-500">Nightly</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
                                <h3 className="text-lg font-bold mb-6">Property Description & Details</h3>
                                <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                                    <p>
                                        <FaBed className="inline-block mr-2" /> {beds} <span className="hidden sm:inline">Beds</span>
                                    </p>
                                    <p>
                                        <FaBath className="inline-block mr-2" /> {baths} <span className="hidden sm:inline">Baths</span>
                                    </p>
                                    <p>
                                        <FaRulerCombined className="inline-block mr-2" />
                                        {square_feet} <span className="hidden sm:inline">sqft</span>
                                    </p>
                                </div>
                                <p className="text-gray-500 mb-4">{description}</p>
                            </div>
                        </main>

                        {/* Sidebar */}
                        <aside className="space-y-4">
                            <BookmarkButton propertyId={_id} />
                            <ShareButtons />

                            {/* Contact Form */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                                {user ? (
                                    showContactForm ? (
                                        <PropertyContactForm property={property} onClose={() => setShowContactForm(false)} />
                                    ) : (
                                        <button
                                            onClick={() => setShowContactForm(true)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                        >
                                            Contact Property Manager
                                        </button>
                                    )
                                ) : (
                                    <p className="text-center text-gray-500">
                                        You must be logged in to contact the property manager.
                                    </p>
                                )}
                            </div>

                            {/* Property Owner Info */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-6">Property Owner</h3>
                                <div className="text-gray-500">
                                    <p>Name: {seller_info?.name}</p>
                                    <p>Email: {seller_info?.email}</p>
                                    <p>Phone: {seller_info?.phone}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyDetails;