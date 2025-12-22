const SkeletonLoader = ({ type = "card", count = 1 }) => {
    const skeletons = Array(count).fill(0);

    if (type === "card") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {skeletons.map((_, i) => (
                    <div key={i} className="glass-card rounded-2xl overflow-hidden h-96 animate-pulse">
                        <div className="h-64 bg-secondary/50"></div>
                        <div className="p-8 space-y-4">
                            <div className="h-4 bg-secondary/50 rounded w-1/4"></div>
                            <div className="h-8 bg-secondary/50 rounded w-3/4"></div>
                            <div className="h-4 bg-secondary/50 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "text") {
        return (
            <div className="space-y-4 animate-pulse w-full">
                {skeletons.map((_, i) => (
                    <div key={i} className="h-4 bg-secondary/50 rounded w-full last:w-3/4"></div>
                ))}
            </div>
        );
    }

    return null;
};

export default SkeletonLoader;
