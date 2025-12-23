import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary px-4">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/50 rounded-full blur-3xl -z-10" />

            <div className="text-center max-w-lg z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="w-24 h-24 bg-secondary border border-glass-border rounded-full flex items-center justify-center text-accent shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <FaExclamationTriangle size={40} />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold font-heading text-white mb-4 tracking-tight"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl text-gray-300 font-bold mb-6"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 mb-10 leading-relaxed"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-accent/20 group"
                    >
                        <FaHome className="group-hover:-translate-y-0.5 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
