import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaWordpress, FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiCloudinary, SiNextdotjs, SiTypescript } from 'react-icons/si';

const techs = [
    { name: 'React', icon: FaReact, color: 'group-hover:text-blue-400' },
    { name: 'Node.js', icon: FaNodeJs, color: 'group-hover:text-green-500' },
    { name: 'MongoDB', icon: SiMongodb, color: 'group-hover:text-green-600' },
    { name: 'Express', icon: SiExpress, color: 'group-hover:text-white' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'group-hover:text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'group-hover:text-blue-500' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'group-hover:text-cyan-400' },
    { name: 'WordPress', icon: FaWordpress, color: 'group-hover:text-blue-600' },
    { name: 'Cloudinary', icon: SiCloudinary, color: 'group-hover:text-blue-700' },
    { name: 'AWS', icon: FaAws, color: 'group-hover:text-orange-500' },
];

const TechMarquee = () => {
    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-sm uppercase tracking-widest text-gray-500">Technologies I work with</p>
            </div>

            <div className="relative flex w-full border-y border-glass-border bg-glass-white backdrop-blur-sm py-10">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Container */}
                <motion.div
                    aria-hidden="true"
                    className="flex flex-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                    style={{ whiteSpace: "nowrap" }}
                >
                    {/* Multiply the array to create seamless loop.
                        Using padding-right on items instead of gap on container ensures 
                        total width is exactly symmetric for the -50% translation.
                    */}
                    {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
                        <div key={`${tech.name}-${index}`} className="flex flex-col items-center group cursor-default pr-16">
                            <tech.icon
                                className={`text-5xl text-gray-600 transition-colors duration-300 ${tech.color}`}
                            />
                            <span className="mt-2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TechMarquee;
