import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectTable = ({ projects, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <div className="bg-secondary border border-glass-border rounded-xl overflow-hidden p-4">
                <Skeleton count={5} height={60} baseColor="#1f2937" highlightColor="#374151" className="mb-2" />
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="bg-secondary border border-glass-border rounded-xl p-10 text-center text-gray-500">
                No projects found. Add your first one!
            </div>
        );
    }

    return (
        <div className="bg-secondary border border-glass-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-primary/50 text-gray-400 text-sm uppercase tracking-wider">
                            <th className="p-4 font-medium">Thumbnail</th>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium hidden sm:table-cell">Tech Stack</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-glass-border">
                        {projects.map((project) => (
                            <tr
                                key={project._id}
                                onClick={() => onView(project)}
                                className="hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                                <td className="p-4 w-32">
                                    <div className="w-20 h-14 bg-gray-800 rounded-lg overflow-hidden border border-glass-border">
                                        {project.images && project.images.length > 0 ? (
                                            <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Img</div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-white">{project.title}</div>
                                    <div className="text-gray-500 text-xs truncate max-w-xs">{project.description}</div>
                                </td>
                                <td className="p-4 hidden sm:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack.slice(0, 3).map(tech => (
                                            <span key={tech} className="px-2 py-0.5 bg-primary rounded border border-glass-border text-xs text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 3 && <span className="text-xs text-gray-500">+{project.techStack.length - 3}</span>}
                                    </div>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEdit(project); }}
                                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-block p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                                            title="View Live"
                                        >
                                            <FaEye />
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectTable;
