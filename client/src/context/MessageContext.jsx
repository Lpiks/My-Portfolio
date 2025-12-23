import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get('/api/messages');
            setMessages(data);
            setUnreadCount(data.filter(m => !m.isRead).length);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/api/messages/${id}/read`);
            setMessages(prev => prev.map(msg =>
                msg._id === id ? { ...msg, isRead: true } : msg
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const deleteMessage = async (id) => {
        try {
            await api.delete(`/api/messages/${id}`);
            // Optimistic update
            const msgToDelete = messages.find(m => m._id === id);
            setMessages(prev => prev.filter(msg => msg._id !== id));
            if (msgToDelete && !msgToDelete.isRead) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error("Failed to delete message", error);
            // Re-fetch on error to ensure sync
            fetchMessages();
            throw error; // Re-throw to let UI handle toast
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Automatic re-fetch on window focus
    useEffect(() => {
        const onFocus = () => {
            fetchMessages();
        };
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, []);

    return (
        <MessageContext.Provider value={{ messages, unreadCount, loading, fetchMessages, markAsRead, deleteMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
