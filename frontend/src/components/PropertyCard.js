import { Link } from 'react-router-dom';
import { FaMapMarker } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    const { _id, images, name, type, location, beds, baths, square_feet, rates } = property;

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <img
                src={images[0] || '/images/properties/default.jpg'}
                alt=""
                className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{type}</div>
                    <h3 className="text-xl font-bold">{name}</h3>
                </div>
                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    ${rates?.monthly ? rates.monthly.toLocaleString() : rates?.weekly ? rates.weekly.toLocaleString() : rates?.nightly ? rates.nightly.toLocaleString() : 'N/A'}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaMapMarker className="inline mr-1" />
                        {location?.city}, {location?.state}
                    </p>
                </div>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>{beds} Beds</p>
                    <p>{baths} Baths</p>
                    <p>{square_feet} sqft</p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <Link
                            to={`/properties/${_id}`}
                            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;