import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Client Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Client Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import ServiceDetail from './pages/ServiceDetail';
import Process from './pages/Process';
import TechStack from './pages/TechStack';
import Contact from './pages/Contact';

// Admin Components & Guard
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import Inbox from './pages/admin/Inbox';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

// Hooks
import usePageTracking from './hooks/usePageTracking';

function App() {
    const location = useLocation();

    // Initialize Google Analytics Tracking
    usePageTracking();

    // Logic to detect if the user is in the Admin section
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen bg-primary">
            {/* 1. Global Utility */}
            <ScrollToTop />

            {/* 2. Conditionally render Client Navbar (Hidden in Admin) */}
            {!isAdminRoute && <Navbar />}

            {/* 3. Main Content Area 
                - Adds pt-20 (padding top) only for client pages to clear fixed Navbar.
                - Admin pages get 0 padding to allow Sidebar/Dashboard to hit the top.
            */}
            <main className={`flex-grow ${!isAdminRoute ? 'pt-20' : ''}`}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>

                        {/* --- PUBLIC CLIENT ROUTES --- */}
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                        <Route path="/process" element={<Process />} />
                        <Route path="/stack" element={<TechStack />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* --- ADMIN AUTH ROUTE --- */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* --- PROTECTED ADMIN SUITE --- */}
                        <Route path="/admin" element={<ProtectedRoute />}>
                            {/* Layout handles the Sidebar and Topbar for Admin */}
                            <Route element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="projects" element={<AdminProjects />} />
                                <Route path="inbox" element={<Inbox />} />
                                <Route path="analytics" element={<Analytics />} />
                                <Route path="settings" element={<Settings />} />
                            </Route>
                        </Route>

                    </Routes>
                </AnimatePresence>
            </main>

            {/* 4. Conditionally render Footer (Hidden in Admin) */}
            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;