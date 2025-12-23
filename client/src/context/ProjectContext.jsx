import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/projects');
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();

        const onFocus = () => fetchProjects();
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, loading, fetchProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
