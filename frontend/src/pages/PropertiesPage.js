import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // avoid cached 304 response by forcing a fresh request
                const res = await fetch(`/api/properties?page=${page}&pageSize=6`, { cache: 'no-store' });
                const data = await res.json();
                setProperties(data.properties);
                setTotalPages(Math.ceil(data.total / 6));
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [page]);

    return (
        <section className="bg-blue-50">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Browse Properties
                </h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.length === 0 ? (
                                <p>No properties found</p>
                            ) : (
                                properties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))
                            )}
                        </div>
                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                )}
            </div>
        </section>
    );
};

export default PropertiesPage;