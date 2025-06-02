module.exports = function(req, res, next) {
    // Si c'est un fichier JavaScript
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
}; 