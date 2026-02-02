/**
 * Optimizes Cloudinary Image URLs for performance
 * @param {string} url - The original Cloudinary URL
 * @param {number} width - Target width (default 600px for mobile/cards)
 * @returns {string} - The optimized URL with transformations
 */
export const getOptimizedImage = (url, width = 600) => {
    if (!url) return '';
    if (!url.includes('cloudinary.com')) return url; // specific check for cloudinary

    // Split the URL to insert transformations
    // Example: https://res.cloudinary.com/demo/image/upload/v12345678/sample.jpg
    // Target: https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_600/v12345678/sample.jpg
    
    // Check if it already has transformations (simple check)
    if (url.includes('/upload/f_auto,q_auto')) return url;

    // Insert transformations after '/upload/'
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};
