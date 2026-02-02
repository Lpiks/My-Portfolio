import { useProjects } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TechMarquee from '../components/TechMarquee';
import ServicesSection from '../components/ServicesSection';
import Workflow from '../components/Workflow';
import Expertise from '../components/Expertise';
import CTASection from '../components/CTASection';

const Home = () => {
    const { projects, loading } = useProjects();

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Abdelhadi Hammaz | Full-Stack & Cross-Platform Developer</title>
                <meta name="description" content="Portfolio of Abdelhadi Hammaz. Building high-performance web applications and cross-platform mobile experiences with modern tech stacks." />
                <link rel="canonical" href="https://abdelhadihammaz.netlify.app/" />
            </Helmet>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 md:py-32 flex flex-col items-center text-center px-4 max-w-7xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
                    Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Digital Reality</span>
                    <span className="text-accent">.</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-10">
                    I build high-performance web applications with a focus on premium aesthetics and seamless user experiences.
                </p>
                <div className="flex gap-4">
                    <a href="#showroom" className="px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        Explore Work
                    </a>
                    <Link to="/contact" className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-medium transition-all">
                        Contact Me
                    </Link>
                </div>
            </motion.section>

            <TechMarquee />

            <ServicesSection />

            {/* Showroom Section */}
            <section id="showroom" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">Selected Projects</h2>
                        <div className="h-1 w-20 bg-accent mt-4 rounded-full"></div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 py-20">Loading projects...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {projects.filter(p => p.featuredOnHome).slice(0, 2).map((project) => (
                            <motion.div
                                key={project._id}
                                layoutId={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="aspect-video bg-gray-800 overflow-hidden relative">
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>

                                    {project.images && project.images.length > 0 ? (
                                        <img src={project.images[0].url} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono">No Preview</div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-gray-300 border border-glass-border">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                                    <Link to={`/project/${project._id}`} className="text-white font-medium inline-flex items-center gap-2 hover:gap-4 transition-all">
                                        View Case Study <span className="text-accent">&rarr;</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <Workflow />

            <Expertise />

            <CTASection />
        </div>
    );
};

export default Home;
