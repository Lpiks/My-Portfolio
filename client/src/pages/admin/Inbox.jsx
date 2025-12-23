import { useState, useEffect } from 'react';
import { useMessages } from '../../context/MessageContext';
import { FaTrash, FaReply, FaEnvelopeOpen } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';

const Inbox = () => {
    const { messages, loading, fetchMessages, markAsRead, deleteMessage } = useMessages();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, messageId: null, senderName: '' });
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSelectMessage = (msg) => {
        setSelectedMessage(msg);
        setIsMobileDetailOpen(true);
        if (!msg.isRead) {
            markAsRead(msg._id);
        }
    };

    const handleDeleteClick = (e, msg) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, messageId: msg._id, senderName: msg.senderName });
    };

    const confirmDelete = async () => {
        try {
            await deleteMessage(deleteModal.messageId);
            toast.success('Message deleted');
            if (selectedMessage?._id === deleteModal.messageId) {
                setSelectedMessage(null);
                setIsMobileDetailOpen(false);
            }
            setDeleteModal({ ...deleteModal, isOpen: false });
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Message?"
                message="Are you sure you want to delete the message from:"
                itemTitle={deleteModal.senderName}
            />

            {/* List View - Hidden on mobile if detail is open */}
            <div className={`w-full md:w-1/3 bg-secondary border border-glass-border rounded-2xl overflow-hidden flex flex-col ${isMobileDetailOpen ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-glass-border bg-primary/30">
                    <h2 className="font-bold text-white">Inbox ({messages.length})</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {loading ? (
                        <Skeleton count={5} height={80} baseColor="#1f2937" highlightColor="#374151" className="mb-2" />
                    ) : messages.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No messages</div>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg._id}
                                onClick={() => handleSelectMessage(msg)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedMessage?._id === msg._id ? 'bg-accent/10 border-accent/50' : 'bg-primary/20 border-transparent hover:bg-white/5'} ${!msg.isRead ? 'border-l-4 border-l-accent' : ''}`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-white text-sm truncate">{msg.senderName}</span>
                                    <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs text-accent mb-1 truncate">{msg.subject || 'No Subject'}</div>
                                <p className="text-gray-400 text-xs line-clamp-2">{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail View - Full width on mobile when open, hidden otherwise */}
            <div className={`flex-1 bg-secondary border border-glass-border rounded-2xl p-6 md:p-8 flex-col ${isMobileDetailOpen ? 'flex fixed inset-0 z-50 rounded-none md:static md:rounded-2xl md:z-auto' : 'hidden md:flex'}`}>
                {/* Mobile Back Button */}
                <div className="md:hidden pb-4 mb-4 border-b border-glass-border">
                    <button
                        onClick={() => setIsMobileDetailOpen(false)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >
                        ← Back to Inbox
                    </button>
                </div>
                {selectedMessage ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={selectedMessage._id}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-8 border-b border-glass-border pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject || 'No Subject'}</h2>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="font-bold text-gray-300">{selectedMessage.senderName}</span>
                                    <span>&lt;{selectedMessage.senderEmail}&gt;</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href={`mailto:${selectedMessage.senderEmail}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-bold transition-colors"
                                >
                                    <FaReply /> Reply
                                </a>
                                <button
                                    onClick={(e) => handleDeleteClick(e, selectedMessage)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                            {selectedMessage.message}
                        </div>

                        {selectedMessage.relatedProject && selectedMessage.relatedProject !== 'General' && (
                            <div className="mt-8 p-4 bg-primary/30 rounded-lg border border-glass-border">
                                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Context</span>
                                <p className="text-accent text-sm">Inquiry about project: <span className="font-bold">{selectedMessage.relatedProject}</span></p>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <FaEnvelopeOpen size={48} className="mb-4 opacity-20" />
                        <p>Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
