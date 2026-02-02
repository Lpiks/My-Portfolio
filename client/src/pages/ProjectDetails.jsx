import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import SkeletonLoader from '../components/SkeletonLoader';
import { getOptimizedImage } from '../utils/imageUtils';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    const [form, setForm] = useState({
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/api/projects/${id}`);
                setProject(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/messages', {
                senderName: "Project Inquiry User", // Simplified for this context
                senderEmail: form.email,
                message: form.message,
                projectContext: {
                    projectId: project._id,
                    projectName: project.title
                }
            });
            setStatus('success');
            setForm({ email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    // Add keydown listener for Escape to close lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsLightboxOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (loading) {
        // ... (keep loading state)
        return (
            <div className="min-h-screen py-32 px-4 max-w-7xl mx-auto">
                <SkeletonLoader type="text" count={3} />
            </div>
        );
    }

    if (!project) return <div className="text-center py-20">Project not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
            <Helmet>
                <title>{`${project.title} | Abdelhadi Hammaz`}</title>
                <meta name="description" content={`Case study for ${project.title}: ${project.description.substring(0, 150)}...`} />
            </Helmet>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <FaArrowLeft /> Back to Project Gallery
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-white">{project.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-secondary border border-glass-border rounded-full text-xs font-mono text-accent">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-white hover:text-primary border border-glass-border transform hover:-translate-y-1 transition-all rounded-full font-bold">
                            <FaGithub /> Source Code
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white transform hover:-translate-y-1 transition-all rounded-full font-bold shadow-lg shadow-accent/20">
                            <FaExternalLinkAlt /> Live Preview
                        </a>
                    )}
                </div>
            </div>

            {/* Gallery + Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Gallery (2 Columns wide) */}
                <div className="lg:col-span-2 space-y-4">
                    <div
                        className="aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-glass-border shadow-2xl cursor-pointer relative group"
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        {project.images && project.images.length > 0 ? (
                            <>
                                <img 
                                    src={getOptimizedImage(project.images[activeImage].url, 1200)} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-bold">Click to Expand</span>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">No Preview Available</div>
                        )}
                    </div>
                    {/* Thumbnails */}
                    {project.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {project.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img 
                                        src={getOptimizedImage(img.url, 200)} 
                                        alt="Thumbnail" 
                                        className="w-full h-full object-cover" 
                                        width="96"
                                        height="64"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className="glass-card p-8 rounded-2xl mt-8">
                        {project.demoVideo && (
                            <div className="mb-8 relative aspect-video rounded-xl overflow-hidden border border-glass-border">
                                {project.demoVideo.includes('youtube.com') || project.demoVideo.includes('youtu.be') ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.demoVideo.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                        title="Project Demo"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                ) : project.demoVideo.includes('vimeo.com') ? (
                                    <iframe
                                        src={`https://player.vimeo.com/video/${project.demoVideo.split('/').pop()}`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                ) : (
                                    <video controls className="w-full h-full object-cover">
                                        <source src={project.demoVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        )}

                        <h2 className="text-2xl font-bold font-heading mb-4">About this Project</h2>
                        <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Right: Features & Contact (1 Column wide) */}
                <div className="space-y-8">
                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="text-xl font-bold font-heading mb-6 border-b border-glass-border pb-4">Key Features</h3>
                            <ul className="space-y-3">
                                {project.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                                        <FaCheckCircle className="text-accent mt-1 shrink-0" />
                                        <span className="text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contextual Inquiry CTA */}
                    <div className="bg-gradient-to-b from-secondary to-primary p-8 rounded-2xl border border-glass-border">
                        <h3 className="text-xl font-bold mb-2">Interested in this architecture?</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Contact me for details about <span className="text-accent font-bold">{project.title}</span> or to discuss a similar project.
                        </p>

                        <button
                            onClick={() => navigate('/contact', { state: { projectTitle: project.title } })}
                            className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                        >
                            Inquire about this Project <FaArrowLeft className="rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isLightboxOpen && project.images && project.images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={project.images[activeImage].url}
                            alt="Full View"
                            className="max-w-full max-h-screen object-contain rounded-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default ProjectDetails;
