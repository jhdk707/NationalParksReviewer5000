const path = require('path')
let currentPath = path.join(__dirname)
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


//post - user
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//user - comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
//post belongs to user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
//has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});
//comment belongs to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
//comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Post, Comment, User};