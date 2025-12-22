import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { FaRegLightbulb, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: "Strategy & Planning",
        description: "Every great project starts with a roadmap. I dive deep into your goals, target audience, and functional requirements to lay a solid foundation.",
        icon: FaRegLightbulb,
        color: "text-yellow-400",
        date: "Phase 1"
    },
    {
        id: 2,
        title: "Design & Wireframing",
        description: "Visualizing the solution. I create high-fidelity wireframes and interactive prototypes to ensure the user experience is intuitive and engaging before a single line of code is written.",
        icon: FaPencilRuler,
        color: "text-purple-400",
        date: "Phase 2"
    },
    {
        id: 3,
        title: "Development & Testing",
        description: "The core build. Using the MERN stack, I construct scalable backends and dynamic frontends, rigorously testing for performance, security, and responsiveness.",
        icon: FaCode,
        color: "text-blue-400",
        date: "Phase 3"
    },
    {
        id: 4,
        title: "Launch & Support",
        description: "Deployment is just the beginning. I ensure a smooth launch, SEO optimization, and provide ongoing support to keep your application running at peak performance.",
        icon: FaRocket,
        color: "text-green-400",
        date: "Phase 4"
    }
];

const Process = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={ref} className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Workflow Process</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A transparent, structured approach to delivering exceptional digital products.
                </p>
            </motion.div>

            <div className="relative">
                {/* Vertical Line */}
                <motion.div
                    className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-purple-500 origin-top"
                    style={{ scaleY }}
                />

                {/* Background Line (static) */}
                <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-glass-border -z-10"></div>

                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <StepCard key={step.id} step={step} index={index} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-32">
                <h2 className="text-3xl font-bold font-heading mb-8">Ready to start your journey?</h2>
                <Link to="/contact" className="px-10 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-200 transition-colors shadow-lg">
                    Start a Project
                </Link>
            </div>
        </div>
    );
};

const StepCard = ({ step, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Content Side */}
            <div className={`flex-1 w-full pl-20 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                <div className="glass-card p-8 rounded-2xl border border-glass-border hover:border-accent/50 transition-colors duration-300 relative group">
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 block">{step.date}</span>
                    <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-accent transition-colors">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
            </div>

            {/* Center Icon */}
            <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-primary border-4 border-secondary rounded-full flex items-center justify-center z-10 shadow-xl">
                    <step.icon className={`text-lg md:text-2xl ${step.color}`} />
                </div>
            </div>

            {/* Empty Side for balance */}
            <div className="hidden md:block flex-1" />
        </motion.div>
    );
};

export default Process;
