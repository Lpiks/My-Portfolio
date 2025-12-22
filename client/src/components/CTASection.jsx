import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const CTASection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-primary to-secondary/50">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-glass-border rounded-full mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-green-400 tracking-wider uppercase">Available for Q1 2026</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
                        Let&apos;s build something <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">extraordinary</span>.
                    </h2>

                    <div className="flex justify-center">
                        <MagneticButton>
                            <Link to="/contact" className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                Start a Project
                            </Link>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Subtle Magnetic Effect Wrapper
const MagneticButton = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: x * 0.1, y: y * 0.1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default CTASection;
