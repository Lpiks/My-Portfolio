import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaProjectDiagram, FaEnvelope, FaCog, FaSignOutAlt, FaHome, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { path: '/admin', name: 'Overview', icon: FaHome },
        { path: '/admin/projects', name: 'Projects', icon: FaProjectDiagram },
        { path: '/admin/inbox', name: 'Inbox', icon: FaEnvelope },
        { path: '/admin/analytics', name: 'Analytics', icon: FaChartLine },
        { path: '/admin/settings', name: 'Settings', icon: FaCog },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

    return (
        <div className="min-h-screen bg-primary flex flex-col font-sans text-gray-100 selection:bg-accent selection:text-white">
            <Toaster position="bottom-right" toastOptions={{
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #333'
                }
            }} />

            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-glass-border h-20 px-8 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <span className="text-xl font-bold font-heading text-white tracking-tight">
                        AbdelhadiHammaz<span className="text-accent">.</span>
                    </span>

                    <nav className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium tracking-wide transition-colors relative ${isActive(item.path) ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <item.icon className="inline-block mr-2 mb-0.5" />
                                {item.name}
                                {isActive(item.path) && (
                                    <span className="absolute -right-3 top-0 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </header>

            {/* Main Layout Area */}
            <div className="flex-1 min-h-screen pt-28 px-6 lg:px-12 pb-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Command Center Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
                            {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
                        </h1>

                        <button
                            onClick={logout}
                            className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm font-medium text-gray-400 hover:text-white"
                        >
                            <FaSignOutAlt className="group-hover:text-red-400 transition-colors" />
                            <span>End Session</span>
                        </button>
                    </div>

                    {/* Page Content */}
                    <main className="relative">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-secondary pt-24 px-6 md:hidden animate-fade-in-down">
                    <nav className="flex flex-col gap-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`text-2xl font-bold flex items-center gap-4 ${isActive(item.path) ? 'text-white' : 'text-gray-600'}`}
                            >
                                <item.icon />
                                {item.name} <span className="text-accent">{isActive(item.path) ? '.' : ''}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
