import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaShieldAlt } from 'react-icons/fa';

const Settings = () => {
    const [isTrackingDisabled, setIsTrackingDisabled] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem('isAdminTrackingDisabled');
        setIsTrackingDisabled(storedValue === 'true');
    }, []);

    const handleToggleTracking = () => {
        const newValue = !isTrackingDisabled;
        setIsTrackingDisabled(newValue);
        localStorage.setItem('isAdminTrackingDisabled', newValue);

        if (newValue) {
            toast.success('Analytics tracking disabled for this browser.');
        } else {
            toast.success('Analytics tracking enabled.');
        }
    };

    return (
        <div className="space-y-8">


            <div className="bg-secondary border border-glass-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6 border-b border-glass-border pb-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <FaShieldAlt size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Privacy & Analytics</h2>
                        <p className="text-sm text-gray-400">Manage how your own visits are tracked.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-white">Disable Admin Tracking</h3>
                        <p className="text-sm text-gray-400 max-w-md">
                            Prevent Google Analytics from counting your own visits to the site. This setting is saved in your local browser storage.
                        </p>
                    </div>
                    <button
                        onClick={handleToggleTracking}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isTrackingDisabled ? 'bg-accent' : 'bg-gray-700'}`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isTrackingDisabled ? 'translate-x-7' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
                <div className="mt-4 p-4 bg-primary/30 rounded-lg text-xs text-gray-500">
                    Status: <span className={isTrackingDisabled ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                        {isTrackingDisabled ? 'Tracking Blunted (Hidden)' : 'Tracking Active (Visible)'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Settings;
