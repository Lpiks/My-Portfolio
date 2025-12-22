import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, itemTitle }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-secondary border border-glass-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaExclamationTriangle className="text-3xl text-red-500" />
                        </div>

                        <h3 className="text-2xl font-bold font-heading mb-2">{title || "Confirm Deletion"}</h3>
                        <p className="text-gray-400 mb-6">
                            {message || "Are you sure you want to delete this item?"}
                            {itemTitle && <span className="block mt-1 font-bold text-white">"{itemTitle}"</span>}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-primary border border-glass-border text-gray-300 font-bold rounded-xl hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { onConfirm(); onClose(); }}
                                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteConfirmationModal;
