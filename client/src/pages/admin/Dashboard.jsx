import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useMessages } from '../../context/MessageContext';
import { FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
    const { projects, loading: projectsLoading, fetchProjects } = useProjects();
    const { messages, unreadCount, loading: messagesLoading, fetchMessages } = useMessages();

    // Explicit re-fetch on mount/return to tab as requested
    useEffect(() => {
        fetchProjects();
        fetchMessages();
    }, []);

    const loading = projectsLoading || messagesLoading;
    const stats = {
        projects: projects.length,
        messages: messages.length,
        unread: unreadCount
    };

    return (
        <div className="space-y-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Projects Card */}
                <div className="relative bg-secondary/30 backdrop-blur-xl p-8 rounded-3xl border-t border-white/5 border-l border-white/5 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
                                <div className="relative w-12 h-12 bg-secondary border border-white/10 rounded-full flex items-center justify-center text-accent shadow-lg">
                                    <FaProjectDiagram size={20} />
                                </div>
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500 opacity-60 uppercase">Total Projects</span>
                        </div>

                        <div className="flex items-end gap-4">
                            {loading ? (
                                <Skeleton width={60} height={40} baseColor="#1f2937" highlightColor="#374151" />
                            ) : (
                                <h2 className="text-6xl font-mono font-bold text-white tracking-tighter leading-none">{stats.projects}</h2>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-16 h-8 opacity-40">
                                {/* Simple SVG Sparkline */}
                                <svg viewBox="0 0 100 50" className="w-full h-full stroke-accent fill-none stroke-[3px]">
                                    <path d="M0 40 Q 25 45, 50 20 T 100 10" />
                                </svg>
                            </div>
                            <span>Portfolio Growth</span>
                        </div>
                    </div>
                </div>

                {/* Messages Card */}
                <div className="relative bg-secondary/30 backdrop-blur-xl p-8 rounded-3xl border-t border-white/5 border-l border-white/5 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                                <div className="relative w-12 h-12 bg-secondary border border-white/10 rounded-full flex items-center justify-center text-blue-400 shadow-lg">
                                    <FaEnvelope size={20} />
                                </div>
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500 opacity-60 uppercase">Inbox</span>
                        </div>

                        <div className="flex items-end gap-4">
                            {loading ? (
                                <Skeleton width={60} height={40} baseColor="#1f2937" highlightColor="#374151" />
                            ) : (
                                <h2 className="text-6xl font-mono font-bold text-white tracking-tighter leading-none">{stats.messages}</h2>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                            <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded">+5</span>
                            <span>New inquiries this month</span>
                        </div>
                    </div>
                </div>

                {/* Unread Card */}
                <div className="relative bg-secondary/30 backdrop-blur-xl p-8 rounded-3xl border-t border-white/5 border-l border-white/5 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"></div>
                                <div className="relative w-12 h-12 bg-secondary border border-white/10 rounded-full flex items-center justify-center text-amber-400 shadow-lg">
                                    <FaEnvelope size={20} />
                                </div>
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500 opacity-60 uppercase">Pending View</span>
                        </div>

                        <div className="flex items-end gap-4">
                            {loading ? (
                                <Skeleton width={60} height={40} baseColor="#1f2937" highlightColor="#374151" />
                            ) : (
                                <h2 className="text-6xl font-mono font-bold text-white tracking-tighter leading-none">{stats.unread}</h2>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                            {stats.unread > 0 ? (
                                <span className="text-amber-400">Response required ASAP</span>
                            ) : (
                                <span className="text-emerald-500">All caught up!</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
