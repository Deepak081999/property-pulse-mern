import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const HomeProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch('/api/properties?page=1&pageSize=3');
                const data = await res.json();
                setProperties(data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Recent Properties
                </h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.length === 0 ? (
                            <p>No properties found</p>
                        ) : (
                            properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomeProperties;