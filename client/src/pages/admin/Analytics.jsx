import { FaChartLine, FaClock, FaSignOutAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Analytics = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-end items-center mb-6">
                <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                >
                    Open Google Analytics <FaExternalLinkAlt size={12} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Real-time Users */}
                <div className="bg-secondary p-6 rounded-2xl border border-glass-border relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                            <FaChartLine size={24} />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">REAL-TIME</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">--</h2>
                    <p className="text-gray-400 text-sm mt-2">Active Users</p>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                </div>

                {/* Avg Session Duration */}
                <div className="bg-secondary p-6 rounded-2xl border border-glass-border relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <FaClock size={24} />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">AVG. SESSION</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">--:--</h2>
                    <p className="text-gray-400 text-sm mt-2">Duration</p>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                </div>

                {/* Bounce Rate */}
                <div className="bg-secondary p-6 rounded-2xl border border-glass-border relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                            <FaSignOutAlt size={24} />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">BOUNCE RATE</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">--%</h2>
                    <p className="text-gray-400 text-sm mt-2">Engagement</p>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                </div>
            </div>

            <div className="bg-secondary border border-glass-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-gray-600">
                    <FaChartLine size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Deep Dive Analysis</h3>
                <p className="text-gray-400 max-w-md">
                    For detailed reports on user demographics, acquisition channels, and behavior flow, please visit the official Google Analytics dashboard.
                </p>
                <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors"
                >
                    View Full Reports
                </a>
            </div>
        </div>
    );
};

export default Analytics;
