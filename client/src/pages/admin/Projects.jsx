import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import ProjectTable from '../../components/admin/ProjectTable';
import ProjectDetailModal from '../../components/admin/ProjectDetailModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // View Details Modal State
    const [viewingProject, setViewingProject] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null, projectTitle: '' });

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        features: '',
        liveLink: '',
        repoLink: ''
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    // Cleanup previews on unmount or change
    useEffect(() => {
        return () => {
            previewImages.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewImages]);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load projects');
            setLoading(false);
        }
    };

    const handleView = (project) => {
        setViewingProject(project);
        setIsDetailOpen(true);
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            features: project.features ? project.features.join(', ') : '',
            liveLink: project.liveLink || '',
            repoLink: project.repoLink || ''
        });
        // Set previews to existing images
        if (project.images && project.images.length > 0) {
            setPreviewImages(project.images.map(img => img.url));
        } else {
            setPreviewImages([]);
        }
        setSelectedFiles([]); // Clear new files
        setIsFormOpen(true);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Generate Previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviews);
    };

    const handleDeleteClick = (project) => {
        setDeleteModal({ isOpen: true, projectId: project._id, projectTitle: project.title });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${deleteModal.projectId}`, { withCredentials: true });
            toast.success('Project deleted');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('techStack', formData.techStack);
        data.append('features', formData.features);
        data.append('liveLink', formData.liveLink);
        data.append('repoLink', formData.repoLink);

        // Append Files
        if (selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                data.append('images', file);
            });
        }

        const toastId = toast.loading('Saving...');
        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            };

            if (editingProject) {
                await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, data, config);
                toast.success('Project updated', { id: toastId });
            } else {
                await axios.post('http://localhost:5000/api/projects', data, config);
                toast.success('Project created', { id: toastId });
            }
            setIsFormOpen(false);
            setEditingProject(null);
            setFormData({ title: '', description: '', techStack: '', features: '', liveLink: '', repoLink: '' });
            setSelectedFiles([]);
            setPreviewImages([]);
            fetchProjects();
        } catch (error) {
            console.error(error);
            toast.error('Error saving project', { id: toastId });
        }
    };

    const resetForm = () => {
        setIsFormOpen(true);
        setEditingProject(null);
        setFormData({ title: '', description: '', techStack: '', features: '', liveLink: '', repoLink: '' });
        setSelectedFiles([]);
        setPreviewImages([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center">
                <button
                    onClick={resetForm}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                    <FaPlus /> Add Project
                </button>
            </div>

            <ProjectTable
                projects={projects}
                loading={loading}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const project = projects.find(p => p._id === id);
                    if (project) handleDeleteClick(project);
                }}
                onView={handleView}
            />

            {/* View Details Modal */}
            <ProjectDetailModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                project={viewingProject}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Project?"
                message="This action cannot be undone. You are about to permanently delete:"
                itemTitle={deleteModal.projectTitle}
            />

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-secondary border border-glass-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">{editingProject ? 'Edit Project' : 'New Project'}</h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    {/* Left Column: Inputs */}
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Title</label>
                                        <input className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Tech Stack (comma separated)</label>
                                        <input className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.techStack} onChange={e => setFormData({ ...formData, techStack: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Live Link</label>
                                        <input className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.liveLink} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Repo Link</label>
                                        <input className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.repoLink} onChange={e => setFormData({ ...formData, repoLink: e.target.value })} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Right Column: Text Areas & Images */}
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Description</label>
                                        <textarea className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Key Features (comma separated)</label>
                                        <textarea className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" rows="2" value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Project Images (Upload)</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark cursor-pointer"
                                        />
                                    </div>

                                    {/* Live Preview */}
                                    {previewImages.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs text-gray-500 mb-2">Image Previews</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {previewImages.map((src, idx) => (
                                                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-glass-border bg-black relative group">
                                                        <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-1 lg:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-glass-border">
                                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 rounded-lg hover:bg-white/5 text-gray-300">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-bold">
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
