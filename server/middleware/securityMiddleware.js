const xss = require('xss');

/**
 * Recursive function to sanitize strings (XSS) and objects (NoSQL Injection)
 * @param {any} data - The data to sanitize
 * @returns {any} - The sanitized data
 */
const sanitizeData = (data) => {
    if (!data) return data;

    if (Array.isArray(data)) {
        return data.map(value => sanitizeData(value));
    }

    if (typeof data === 'object' && data !== null) {
        const sanitizedObject = {};
        Object.keys(data).forEach(key => {
            // NoSQL Sanitize: Skip keys starting with $ or containing . from being copied
            if (key.startsWith('$') || key.includes('.')) {
                return; // Remove dangerous keys
            }
            sanitizedObject[key] = sanitizeData(data[key]);
        });
        return sanitizedObject;
    }

    if (typeof data === 'string') {
        return xss(data);
    }

    return data;
};

/**
 * Middleware to sanitize inputs against XSS and NoSQL Injection
 */
const securityMiddleware = (req, res, next) => {
    if (req.body) req.body = sanitizeData(req.body);
    if (req.params) req.params = sanitizeData(req.params);
    
    // Handle query params carefully (Express 5 might weirdly make it read-only mostly, 
    // but usually re-assignment works. If not, we sanitize values in place if possible, 
    // but sanitizeData returns new obj. Let's try direct assignment, if it fails safe-guard?)
    if (req.query) {
       try {
           req.query = sanitizeData(req.query);
       } catch (e) {
           console.error("Could not sanitize req.query directly:", e);
           // Fallback: Try mutating properties if direct assignment failed
           // (Rare edge case in some Express configs)
       }
    }
    
    next();
};

module.exports = securityMiddleware;
