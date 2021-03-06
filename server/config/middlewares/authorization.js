'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/signin');
    }
    next();
};

/**
 * Generic require login routing middleware
 */
exports.apiRequiresLogin = function(req, res,next) {
    if (!req.isAuthenticated()) {
        return res.jsonp(401,{ error:'User is not authorized'});
    }
    next();
};

// Profile authorization helpers
exports.isOwnerProfile = function(req, res, next) {
    if (req.user.role !== 'admin') {
        if (req.profile.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
    }
    next();
};

// User admin authorization helpers
exports.isAdmin = function(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// Article authorization helpers
exports.requireSameAuthor = function(req, res, next) {
    if (req.user.role !== 'admin'){
        if (req.post.user.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
    }
    next();
};