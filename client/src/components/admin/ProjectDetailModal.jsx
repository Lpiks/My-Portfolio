import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCode, FaCheckCircle } from 'react-icons/fa';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary border border-glass-border rounded-2xl shadow-2xl"
                    >
                        {/* Header Image */}
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent z-10" />
                            {project.images && project.images.length > 0 ? (
                                <img
                                    src={project.images[0].url}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-primary/50 flex items-center justify-center text-gray-500">
                                    No Cover Image
                                </div>
                            )}

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 -mt-20 relative z-20">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left Column: Main Info */}
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <h2 className="text-4xl font-bold font-heading text-white mb-2">{project.title}</h2>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.map(tech => (
                                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-accent font-mono">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                                            <p>{project.description}</p>
                                        </div>
                                    </div>

                                    {project.features && project.features.length > 0 && (
                                        <div className="bg-primary/30 rounded-xl p-6 border border-glass-border">
                                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                <FaCheckCircle className="text-accent" /> Key Features
                                            </h3>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {project.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Sidebar Actions */}
                                <div className="w-full md:w-80 space-y-6">
                                    <div className="p-6 bg-white/5 rounded-2xl border border-glass-border space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Project Links</h3>

                                        {project.liveLink ? (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-4 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl transition-all font-bold group"
                                            >
                                                <span>View Live Demo</span>
                                                <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        ) : (
                                            <div className="px-4 py-3 bg-gray-800 text-gray-500 rounded-xl flex items-center gap-2 cursor-not-allowed">
                                                <FaExternalLinkAlt /> No Live Link
                                            </div>
                                        )}

                                        {project.repoLink ? (
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all font-medium group"
                                            >
                                                <span>Source Code</span>
                                                <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                                            </a>
                                        ) : (
                                            <div className="px-4 py-3 bg-gray-800 text-gray-500 rounded-xl flex items-center gap-2 cursor-not-allowed">
                                                <FaGithub /> No Repo Link
                                            </div>
                                        )}
                                    </div>

                                    {/* Stats / Metadata */}
                                    <div className="p-6 bg-primary/30 rounded-2xl border border-glass-border">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Metadata</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Created</span>
                                                <span className="text-gray-300 font-mono">{new Date(project.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">ID</span>
                                                <span className="text-gray-300 font-mono text-xs">{project._id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
