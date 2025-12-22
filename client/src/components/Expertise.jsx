import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaPaintBrush } from 'react-icons/fa';

const methodologies = {
    scalable: {
        title: "Scalable Logic",
        icon: FaServer,
        description: "Building robustness into the core.",
        points: [
            "Microservices architecture ready for growth.",
            "Secure, JWT-based authentication systems.",
            "Optimized MongoDB schemas for high-volume data.",
            "Server-side rendering for superior SEO."
        ]
    },
    flexible: {
        title: "Flexible Content",
        icon: FaPaintBrush,
        description: "Empowering clients with control.",
        points: [
            "Custom-built CMS solutions for non-tech users.",
            "Dynamic component systems that adapt to content.",
            "Headless setups for ultimate frontend freedom.",
            "Automated content pipelines and backups."
        ]
    }
};

const Expertise = () => {
    const [activeTab, setActiveTab] = useState('scalable');

    return (
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">My Methodology</h2>

                {/* Toggle Controls */}
                <div className="inline-flex bg-secondary p-2 rounded-full border border-glass-border">
                    {Object.keys(methodologies).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === key
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {methodologies[key].title}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="glass-card p-10 md:p-16 rounded-3xl border border-glass-border flex flex-col md:flex-row gap-10 items-center"
                    >
                        <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center text-accent text-4xl shrink-0 border border-glass-border">
                            {activeTab === 'scalable' ? <FaServer /> : <FaPaintBrush />}
                        </div>

                        <div className="text-left">
                            <h3 className="text-3xl font-bold mb-2">{methodologies[activeTab].title}</h3>
                            <p className="text-gray-400 text-lg mb-6 italic">{methodologies[activeTab].description}</p>

                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {methodologies[activeTab].points.map((point, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Expertise;
