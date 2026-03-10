import { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookmarkButton = ({ propertyId }) => {
    const { user } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            checkBookmarkStatus();
        }
    }, [user, propertyId]);

    const checkBookmarkStatus = async () => {
        try {
            const res = await axios.get(`/api/bookmarks/check/${propertyId}`);
            setIsBookmarked(res.data.isBookmarked);
        } catch (error) {
            console.error('Error checking bookmark status:', error);
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            toast.error('Please login to bookmark properties');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('/api/bookmarks', { propertyId });
            setIsBookmarked(res.data.isBookmarked);
            toast.success(res.data.message);
        } catch (error) {
            toast.error('Error updating bookmark');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleBookmark}
            disabled={loading}
            className={`bg-white hover:bg-gray-100 text-gray-700 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {isBookmarked ? <FaBookmark className="mr-2" /> : <FaRegBookmark className="mr-2" />}
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
        </button>
    );
};

export default BookmarkButton;