import { useProjects } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';

const Projects = () => {
    const { projects, loading } = useProjects();

    if (loading) {
        return (
            <div className="min-h-screen py-32 px-4 max-w-7xl mx-auto">
                <SkeletonLoader type="card" count={4} />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Project Archive</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A collection of experiments, products, and solutions I've engineered.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
                    >
                        <div className="aspect-video bg-gray-800 overflow-hidden relative">
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>

                            {project.images && project.images.length > 0 ? (
                                <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono">No Preview</div>
                            )}
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-gray-300 border border-glass-border">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">{project.description}</p>

                            <Link to={`/project/${project._id}`} className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all mt-auto self-start">
                                View Case Study <span className="text-accent">&rarr;</span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
