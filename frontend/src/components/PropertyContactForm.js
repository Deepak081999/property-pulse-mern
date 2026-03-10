import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PropertyContactForm = ({ property, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const { name, email, phone, message } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/messages', {
                name,
                email,
                phone,
                message,
                property: property._id,
                recipient: property.owner,
            });
            toast.success('Message sent successfully');
            onClose();
        } catch (error) {
            toast.error('Error sending message');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your name"
                    value={name}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                    value={email}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone:
                </label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={onChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                    Message:
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your message"
                    value={message}
                    onChange={onChange}
                    required
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Send Message
                </button>
            </div>
        </form>
    );
};

export default PropertyContactForm;