import { useState, useEffect } from 'react';
import api from '../../utils/api';
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
        liveLink: '',
        repoLink: '',
        featuredOnHome: false,
        displayOrder: 0
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    // Image Management State
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

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
            const res = await api.get('/api/projects');
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
            liveLink: project.liveLink || '',
            repoLink: project.repoLink || '',
            featuredOnHome: project.featuredOnHome || false,
            displayOrder: project.displayOrder || 0
        });

        // Initialize existing images
        if (project.images && project.images.length > 0) {
            setExistingImages(project.images);
        } else {
            setExistingImages([]);
        }
        setImagesToDelete([]);
        setPreviewImages([]); // Creating new ones only for new uploads
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
            await api.delete(`/api/projects/${deleteModal.projectId}`);
            toast.success('Project deleted');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    // Image Management Handlers
    const handleDeleteExistingImage = (id) => {
        // Fallback for missing IDs (use index logic if needed, but here we just prevent undefined)
        if (!id) return;
        setImagesToDelete(prev => [...prev, id]);
        setExistingImages(prev => prev.filter(img => img._id !== id));
    };

    const handleMakeMainImage = (index) => {
        const newImages = [...existingImages];
        const [selected] = newImages.splice(index, 1);
        newImages.unshift(selected); // Add to beginning
        setExistingImages(newImages);
        toast.success("Image set as main");
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
        data.append('featuredOnHome', formData.featuredOnHome);
        data.append('displayOrder', formData.displayOrder);

        // Append Image Management Data
        data.append('imagesToDelete', JSON.stringify(imagesToDelete));
        data.append('existingImagesOrder', JSON.stringify(existingImages.map(img => img._id)));

        // Append Files
        if (selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                data.append('images', file);
            });
        }

        // Debug FormData
        for (let pair of data.entries()) {

        }

        const toastId = toast.loading('Saving...');
        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            };

            if (editingProject) {
                await api.put(`/api/projects/${editingProject._id}`, data, config);
                toast.success('Project updated', { id: toastId });
            } else {
                await api.post('/api/projects', data, config);
                toast.success('Project created', { id: toastId });
            }
            setIsFormOpen(false);
            setEditingProject(null);
            setFormData({ title: '', description: '', techStack: '', features: '', liveLink: '', repoLink: '', featuredOnHome: false, displayOrder: 0 });
            setSelectedFiles([]);
            setPreviewImages([]);
            setExistingImages([]);
            setImagesToDelete([]);
            fetchProjects();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error saving project', { id: toastId });
        }
    };

    const resetForm = () => {
        setIsFormOpen(true);
        setEditingProject(null);
        setFormData({ title: '', description: '', techStack: '', features: '', liveLink: '', repoLink: '', featuredOnHome: false, displayOrder: 0 });
        setSelectedFiles([]);
        setPreviewImages([]);
        setExistingImages([]);
        setImagesToDelete([]);
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
                                        <label className="text-sm text-gray-400 block mb-1">Repo Link *</label>
                                        <input className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.repoLink} onChange={e => setFormData({ ...formData, repoLink: e.target.value })} required />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-sm text-gray-400 block mb-1">Display Rank</label>
                                            <input type="number" className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: e.target.value })} />
                                        </div>
                                        <div className="flex items-center justify-center pt-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-5 h-5 accent-accent" checked={formData.featuredOnHome} onChange={e => setFormData({ ...formData, featuredOnHome: e.target.checked })} />
                                                <span className="text-white font-medium">Show on Home Page</span>
                                            </label>
                                        </div>
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

                                    {/* Existing Images Management */}
                                    {existingImages.length > 0 && (
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-2">Manage Existing Images (First is Main)</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {existingImages.map((img, idx) => (
                                                    <div key={img._id || idx} className="relative group aspect-video rounded-lg overflow-hidden border border-glass-border">
                                                        <img src={img.url} alt="Project" className="w-full h-full object-cover" />

                                                        {/* Gradient Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-100 transition-opacity" />

                                                        {/* Actions */}
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteExistingImage(img._id)}
                                                                className="bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm transition-all shadow-lg"
                                                                title="Delete Image"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        {/* Make Main Button */}
                                                        {idx !== 0 && (
                                                            <div className="absolute top-2 left-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMakeMainImage(idx)}
                                                                    className="bg-white/20 hover:bg-accent text-white px-2 py-1 text-xs rounded-md backdrop-blur-sm transition-all border border-white/20"
                                                                >
                                                                    Make Main
                                                                </button>
                                                            </div>
                                                        )}
                                                        {idx === 0 && (
                                                            <div className="absolute top-2 left-2">
                                                                <span className="bg-accent text-white px-2 py-1 text-xs rounded-md shadow-lg font-bold">
                                                                    Main Image
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1">Add New Images</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full bg-primary/50 border border-glass-border p-3 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark cursor-pointer"
                                        />
                                    </div>

                                    {/* Preview New Uploads */}
                                    {previewImages.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs text-gray-500 mb-2">New Uploads Preview</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {previewImages.map((src, idx) => (
                                                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-glass-border bg-black relative">
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
