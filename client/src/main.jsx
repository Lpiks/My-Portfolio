import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { MessageProvider } from './context/MessageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ProjectProvider>
                    <MessageProvider>
                        <App />
                    </MessageProvider>
                </ProjectProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
