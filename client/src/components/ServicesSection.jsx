import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

const ServicesSection = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">What I Offer</h2>
                <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`${service.span} h-full`}
                    >
                        <Link to={`/services/${service.id}`} className="block h-full">
                            <div className={`glass-card p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col justify-between`}>
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10 flex-grow">
                                    <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center text-2xl text-accent border border-glass-border group-hover:bg-accent group-hover:text-white transition-colors duration-300 mb-6">
                                        <service.icon />
                                    </div>

                                    <h3 className="text-2xl font-bold font-heading mb-3">{service.title}</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                                        {service.subtitle}
                                    </p>
                                </div>

                                <div className="relative z-10 pt-6 border-t border-glass-border mt-auto">
                                    <p className="text-xs font-mono text-accent uppercase tracking-wider flex items-center justify-between">
                                        <span>Learn More</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
