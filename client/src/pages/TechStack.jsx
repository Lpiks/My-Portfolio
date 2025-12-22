import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
    {
        title: "Frontend Development",
        icon: FaCode,
        description: "I prioritize mobile-first, accessible UI using React and Tailwind. My philosophy is component-driven, ensuring reusability and maintainability.",
        techs: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "TypeScript"]
    },
    {
        title: "Backend & Database",
        icon: FaServer,
        description: "Robust, scalable API architectures. I advocate for clean controllers, secure authentication patterns, and efficient schema design.",
        techs: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Firebase", "PostgreSQL"]
    },
    {
        title: "Tools & DevOps",
        icon: FaTools,
        description: "Streamlining the development lifecycle. I believe in automated testing, continuous integration, and containerization for consistent deployments.",
        techs: ["Git & GitHub", "Docker", "AWS (EC2/S3)", "Vercel", "Postman", "Jest"]
    },
    {
        title: "CMS & Architecture",
        icon: FaDatabase,
        description: "Flexible content management. Whether headless or traditional, I build systems that empower clients without breaking the design system.",
        techs: ["WordPress", "Strapi", "Headless CMS", "Rest API", "GraphQL", "Microservices"]
    }
];

const TechStack = () => {
    return (
        <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Technological Arsenal</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A curated selection of tools I use to build world-class applications.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {categories.map((cat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-10 rounded-3xl border border-glass-border hover:bg-glass-white transition-colors duration-300"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-accent text-2xl">
                                <cat.icon />
                            </div>
                            <h2 className="text-2xl font-bold font-heading">{cat.title}</h2>
                        </div>

                        <p className="text-gray-400 mb-8 leading-relaxed border-l-2 border-accent/50 pl-4 italic">
                            &quot;{cat.description}&quot;
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {cat.techs.map(tech => (
                                <span key={tech} className="px-4 py-2 bg-primary/50 text-gray-300 text-sm font-mono rounded-lg border border-glass-border hover:border-accent transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-24">
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-bold text-lg hover:underline group">
                    Let&apos;s discuss your stack requirements <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default TechStack;
