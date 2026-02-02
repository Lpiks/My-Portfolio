import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaProjectDiagram } from 'react-icons/fa';

const Contact = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        senderName: '',
        senderEmail: '',
        subject: 'General Inquiry',
        message: '',
        relatedProject: 'General'
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    useEffect(() => {
        if (location.state?.projectTitle) {
            setFormData(prev => ({
                ...prev,
                subject: `Inquiry: ${location.state.projectTitle}`,
                relatedProject: location.state.projectTitle,
                message: `I'm interested in discussing the "${location.state.projectTitle}" project...`
            }));
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/api/messages', formData);
            setStatus('success');
            setFormData({ senderName: '', senderEmail: '', subject: 'General Inquiry', message: '', relatedProject: 'General' });
        } catch (error) {
            console.error("Submission Error Details:", JSON.stringify(error.response?.data, null, 2));
            setStatus('error');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 flex items-center">
            <Helmet>
                <title>Contact Me | Abdelhadi Hammaz</title>
                <meta name="description" content="Get in touch for collaborations, project inquiries, or technical consultation. Available for freelance and full-time opportunities." />
            </Helmet>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full"
            >
                {/* Left Column: Info */}
                <div className="space-y-10">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                            Let&apos;s build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-600">something extraordinary</span>.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                            Have a project in mind? Looking for a technical partner? I&apos;m currently available for new opportunities.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email Me</p>
                                <a href="mailto:hello@example.com" className="text-lg font-bold hover:text-accent transition-colors">elhadihammaz@outlook.com</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-lg font-bold">Remote / Worldwide</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-4">
                        <a href="https://github.com/Lpiks" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-glass-border rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="https://linkedin.com/in/abdelhadi-hammaz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-glass-border rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <FaLinkedin className="text-xl" />
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-xl border border-glass-border p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    {/* Project Context Badge */}
                    {formData.relatedProject !== 'General' && (
                        <div className="mb-6 bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-center gap-3 animate-pulse">
                            <FaProjectDiagram className="text-accent" />
                            <span className="text-sm text-gray-300">
                                Inquiry regarding <span className="text-white font-bold">{formData.relatedProject}</span>
                            </span>
                        </div>
                    )}

                    {/* Success Overlay */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-secondary/95 z-20 flex flex-col items-center justify-center text-center p-8"
                        >
                            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                                <FaPaperPlane className="text-3xl text-accent" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-400 mb-8">I&apos;ll get back to you within 24 hours.</p>
                            <button onClick={() => setStatus('idle')} className="text-accent font-bold hover:underline">Send another message</button>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-primary/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                    value={formData.senderName}
                                    onChange={e => setFormData({ ...formData, senderName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-primary/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                    value={formData.senderEmail}
                                    onChange={e => setFormData({ ...formData, senderEmail: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                            <div className="relative">
                                {/* If we have a project context, we can make this read-only or just pre-filled. */}
                                {/* For better UX, let's keep it editable but styled differently if pre-filled */}
                                <input
                                    type="text"
                                    className={`w-full bg-primary/50 border rounded-xl px-4 py-3 focus:outline-none transition-colors ${formData.relatedProject !== 'General'
                                        ? 'border-accent/50 text-accent font-medium'
                                        : 'border-glass-border focus:border-accent'
                                        }`}
                                    // If there is a project context, we can change the placeholder dynamically
                                    placeholder={
                                        formData.relatedProject !== 'General'
                                            ? `Inquiry regarding ${formData.relatedProject}...`
                                            : "e.g., Mobile App Concept"
                                    }
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                            <textarea
                                rows="4"
                                className="w-full bg-primary/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'sending' ? (
                                <><span>Sending...</span></>
                            ) : (
                                <><span>Send Message</span> <FaPaperPlane /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Contact;
