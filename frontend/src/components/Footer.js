import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 py-4 mt-24">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="mb-4 md:mb-0">
                    <span className="text-sm text-gray-600">
                        © {currentYear} Property Pulse. All rights reserved.
                    </span>
                </div>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Facebook"
                    >
                        <FaFacebook size={20} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Twitter"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;