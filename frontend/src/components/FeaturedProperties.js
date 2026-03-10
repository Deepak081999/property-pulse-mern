import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            try {
                const res = await fetch('/api/properties/featured');
                const data = await res.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching featured properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProperties();
    }, []);

    return (
        <section className="bg-blue-50 px-4 pt-6 pb-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Featured Properties
                </h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.length === 0 ? (
                            <p>No featured properties found</p>
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

export default FeaturedProperties;