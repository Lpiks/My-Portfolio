import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { FaArrowLeft } from 'react-icons/fa';

const ServiceDetail = () => {
    const { serviceSlug } = useParams();
    const navigate = useNavigate();
    const service = services.find(s => s.id === serviceSlug);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, [serviceSlug]);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
                <Link to="/" className="text-accent hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
            >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>

            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-3xl text-accent border border-glass-border mb-6">
                        <service.icon />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight">{service.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light border-l-4 border-accent pl-6 py-2">
                        {service.subtitle}
                    </p>
                </motion.div>

                {/* Visual/Description Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`glass-card p-8 rounded-2xl relative overflow-hidden bg-gradient-to-br ${service.gradient}`}
                >
                    <p className="text-gray-200 text-lg leading-relaxed relative z-10">
                        {service.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-glass-border/30">
                        <span className="text-sm font-mono text-white/70 uppercase tracking-widest">Core Tech Stack</span>
                        <p className="text-accent font-bold mt-1 text-lg">{service.tech}</p>
                    </div>
                </motion.div>
            </div>

            {/* Technical Roadmap */}
            <div className="mb-24">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold font-heading mb-12 text-center"
                >
                    Development Roadmap
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {service.roadmap.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-secondary/30 border border-glass-border p-6 rounded-xl relative"
                        >
                            <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary border border-accent text-accent rounded-full flex items-center justify-center font-bold shadow-lg text-sm">
                                {index + 1}
                            </span>
                            <h3 className="text-lg font-bold mb-2 mt-2">{step.title}</h3>
                            <p className="text-sm text-gray-400">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Core Features */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold font-heading mb-12 text-center">Deliverables & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="glass p-6 rounded-lg border-l-4 border-accent hover:bg-glass-white transition-colors"
                        >
                            <p className="font-medium text-gray-200">{feature}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contextual CTA */}
            <div className="text-center py-16 bg-gradient-to-t from-secondary/50 to-transparent rounded-3xl border border-glass-border">
                <h2 className="text-3xl font-bold font-heading mb-6">Ready to scale your business?</h2>
                <Link
                    to="/contact"
                    className="inline-block px-10 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-accent/40"
                    state={{ subject: `Inquiry about ${service.title}` }} // Pass context to contact form
                >
                    Request a {service.title} Quote
                </Link>
            </div>
        </motion.div>
    );
};

export default ServiceDetail;
