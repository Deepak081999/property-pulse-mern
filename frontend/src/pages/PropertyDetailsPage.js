import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/PropertyDetails';

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                const data = await res.json();
                setProperty(data);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    return (
        <section className="bg-blue-50">
            <div className="container-xl m-auto px-4 py-6">
                {loading ? (
                    <div>Loading...</div>
                ) : property ? (
                    <PropertyDetails property={property} />
                ) : (
                    <p>Property not found</p>
                )}
            </div>
        </section>
    );
};

export default PropertyDetailsPage;