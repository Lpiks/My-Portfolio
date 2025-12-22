import { motion } from 'framer-motion';

const steps = [
    {
        id: "01",
        title: "Discovery",
        description: "Understanding your goals, target audience, and requirements to define the project scope."
    },
    {
        id: "02",
        title: "Design",
        description: "Creating high-fidelity wireframes and interactive prototypes to visualize the user experience."
    },
    {
        id: "03",
        title: "Development",
        description: "Writing clean, scalable code using the MERN stack to bring the design to life."
    },
    {
        id: "04",
        title: "Deployment",
        description: "Testing, optimizing, and launching your application to the world."
    }
];

const Workflow = () => {
    return (
        <section className="py-24 bg-secondary/30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Development Process</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">From concept to code, I follow a structured approach to ensure quality.</p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-glass-border -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-primary border border-glass-border p-8 rounded-2xl relative group hover:border-accent transition-colors duration-300"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 bg-primary border border-glass-border text-accent font-mono font-bold w-12 h-12 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {step.id}
                                </div>
                                <div className="mt-6 md:mt-8">
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
