'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

/**
 * Find post by id
 */
exports.post = function(req, res, next, id) {
   Post.findOne({ '_id': id }, function (err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('Failed to load post ' + id));
        }
        req.post = post;
        next();
    });
};

/**
 * Create a post
 */
exports.create = function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Update a post
 */
exports.update = function(req, res) {
    var post = req.post;
    post = _.extend(post, req.body);
    post.save(function(err) {
        if (err) {
             console.log(err);
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Delete a post
 */
exports.destroy = function(req, res) {
    var post = req.post;
    post.remove(function(err) {
        if (err) {
            console.log(err); 
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Show an post
 */
exports.show = function(req, res) {
    res.jsonp(req.post);
};

/**
 * List of posts
 */
exports.all = function(req, res) {
    Post.find().sort('-created').exec(function(err, posts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(posts);
        }
    });
};