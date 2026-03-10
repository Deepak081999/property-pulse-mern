import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-blue-700 border-b border-blue-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button */}
                    </div>
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <Link className="flex flex-shrink-0 items-center mr-4" to="/">
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">
                                Property Pulse
                            </span>
                        </Link>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <Link
                                    to="/"
                                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/properties"
                                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Properties
                                </Link>
                                {user ? (
                                    <>
                                        <Link
                                            to="/properties/add"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Add Property
                                        </Link>
                                        <Link
                                            to="/properties/saved"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Saved Properties
                                        </Link>
                                        <Link
                                            to="/messages"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Messages
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;