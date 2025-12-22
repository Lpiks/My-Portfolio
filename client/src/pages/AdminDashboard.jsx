import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPen, FaEnvelope, FaProjectDiagram } from 'react-icons/fa';

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects'); // projects | messages

    // State
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        features: '', // New field
        images: '',
        liveLink: '',
        repoLink: ''
    });

    useEffect(() => {
        if (!admin) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [admin, navigate]);

    const fetchData = async () => {
        try {
            const [projRes, msgRes] = await Promise.all([
                axios.get('http://localhost:5000/api/projects'),
                axios.get('http://localhost:5000/api/messages', { withCredentials: true })
            ]);
            setProjects(projRes.data);
            setMessages(msgRes.data);
        } catch (error) {
            console.error("Fetch Data Error", error);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`, { withCredentials: true });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm("Delete message?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/messages/${id}`, { withCredentials: true });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditInit = (project) => {
        setIsEditing(true);
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            features: project.features ? project.features.join(', ') : '', // Handle feature array
            images: project.images.map(img => img.url).join(', '),
            liveLink: project.liveLink || '',
            repoLink: project.repoLink || ''
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            ...formData,
            techStack: formData.techStack.split(',').map(tech => tech.trim()),
            features: formData.features.split(',').map(feat => feat.trim()), // Process features
            images: formData.images.split(',').map(url => ({ url: url.trim() })) // Simple URL handling for now
        };

        try {
            if (isEditing && currentProject) {
                await axios.put(`http://localhost:5000/api/projects/${currentProject._id}`, projectData, { withCredentials: true });
            } else {
                await axios.post('http://localhost:5000/api/projects', projectData, { withCredentials: true });
            }
            // Reset
            setIsEditing(false);
            setCurrentProject(null);
            setFormData({ title: '', description: '', techStack: '', features: '', images: '', liveLink: '', repoLink: '' });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Error saving project");
        }
    };

    return (
        <div className="min-h-screen bg-primary px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
                    <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm">Logout</button>
                </div>

                <div className="flex space-x-4 mb-8 border-b border-glass-border pb-4">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <FaProjectDiagram /> <span>Projects</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <FaEnvelope /> <span>Messages ({messages.filter(m => !m.isRead).length})</span>
                    </button>
                </div>

                {activeTab === 'projects' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-1 bg-secondary p-6 rounded-xl border border-glass-border h-fit">
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input className="w-full bg-primary/50 border border-glass-border p-3 rounded" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                <textarea className="w-full bg-primary/50 border border-glass-border p-3 rounded" placeholder="Description" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Tech Stack (comma separated)"
                                        value={formData.techStack}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                        className="w-full bg-primary/50 border border-glass-border p-3 rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Key Features (comma separated)"
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        className="w-full bg-primary/50 border border-glass-border p-3 rounded"
                                    />
                                </div>
                                <input className="w-full bg-primary/50 border border-glass-border p-3 rounded" placeholder="Image URLs (comma separated)" value={formData.images} onChange={e => setFormData({ ...formData, images: e.target.value })} />
                                <input className="w-full bg-primary/50 border border-glass-border p-3 rounded" placeholder="Live Link" value={formData.liveLink} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} />
                                <input className="w-full bg-primary/50 border border-glass-border p-3 rounded" placeholder="Repo Link" value={formData.repoLink} onChange={e => setFormData({ ...formData, repoLink: e.target.value })} />

                                <div className="flex gap-2">
                                    <button type="submit" className="flex-1 bg-accent hover:bg-accent-dark py-2 rounded font-bold transition-colors">
                                        {isEditing ? 'Update' : 'Create'}
                                    </button>
                                    {isEditing && (
                                        <button type="button" onClick={() => { setIsEditing(false); setCurrentProject(null); setFormData({ title: '', description: '', techStack: '', features: '', images: '', liveLink: '', repoLink: '' }); }} className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded transition-colors">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2 space-y-4">
                            {projects.map(project => (
                                <div key={project._id} className="bg-secondary p-4 rounded-xl border border-glass-border flex justify-between items-center group">
                                    <div>
                                        <h4 className="font-bold text-lg">{project.title}</h4>
                                        <p className="text-sm text-gray-400 truncate max-w-md">{project.description}</p>
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditInit(project)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><FaPen size={14} /></button>
                                        <button onClick={() => handleDeleteProject(project._id)} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><FaTrash size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="bg-secondary rounded-xl border border-glass-border overflow-hidden">
                        {messages.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No messages yet.</div>
                        ) : (
                            <div className="divide-y divide-glass-border">
                                {messages.map(msg => (
                                    <div key={msg._id} className="p-6 hover:bg-white/5 transition-colors">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-bold text-accent">{msg.senderName} <span className="text-gray-400 font-normal text-sm">&lt;{msg.senderEmail}&gt;</span></h4>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                <button onClick={() => handleDeleteMessage(msg._id)} className="text-gray-500 hover:text-red-400"><FaTrash size={12} /></button>
                                            </div>
                                        </div>
                                        {msg.projectContext && msg.projectContext.projectName && (
                                            <div className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded mb-2 border border-accent/20">
                                                Project: {msg.projectContext.projectName}
                                            </div>
                                        )}
                                        <p className="text-gray-300">{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
