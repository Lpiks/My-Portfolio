import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { admin } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Process', path: '/process' },
        { name: 'Tech Stack', path: '/stack' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md border-b border-glass-border shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold font-heading text-white">
                            AbdelhadiHammaz<span className="text-accent">.</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1.5 ${isActive(link.path) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {link.name}
                                    {isActive(link.path) && (
                                        <motion.span
                                            layoutId="activeDot"
                                            className="w-1.5 h-1.5 bg-accent rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className={`${isActive('/contact') ? 'bg-accent border-accent' : 'bg-white/10 border-white/10 hover:bg-white/20'} border text-white px-6 py-2 rounded-full font-medium transition-all`}
                            >
                                Let&apos;s Talk
                            </Link>

                        </div>
                    </div>

                    {/* Mobile Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-secondary border-b border-glass-border"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'text-accent' : 'text-gray-300 hover:text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium text-white mt-4 ${isActive('/contact') ? 'bg-accent' : 'bg-white/10'}`}
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;