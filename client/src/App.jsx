import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';

// Common Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

// Client Pages (Lazy Loaded except Home)
import Home from './pages/Home';
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Process = lazy(() => import('./pages/Process'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Components & Guard (Lazy Loaded)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const Inbox = lazy(() => import('./pages/admin/Inbox'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Settings = lazy(() => import('./pages/admin/Settings'));

// Hooks
import usePageTracking from './hooks/usePageTracking';

function App() {
    const location = useLocation();

    // Initialize Google Analytics Tracking
    usePageTracking();

    // Logic to detect if the user is in the Admin section
    const isAdminRoute = location.pathname.startsWith(import.meta.env.VITE_ADMIN_ROUTE);

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
                <Suspense fallback={<PageLoader />}>
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
                            <Route path={import.meta.env.VITE_ADMIN_LOGIN} element={<AdminLogin />} />

                            {/* --- PROTECTED ADMIN SUITE --- */}
                            <Route path={import.meta.env.VITE_ADMIN_ROUTE} element={<ProtectedRoute />}>
                                {/* Layout handles the Sidebar and Topbar for Admin */}
                                <Route element={<AdminLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="projects" element={<AdminProjects />} />
                                    <Route path="inbox" element={<Inbox />} />
                                    <Route path="analytics" element={<Analytics />} />
                                    <Route path="settings" element={<Settings />} />
                                </Route>
                            </Route>

                            {/* --- CATCH ALL 404 --- */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>
            </main>

            {/* 4. Conditionally render Footer (Hidden in Admin) */}
            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;
