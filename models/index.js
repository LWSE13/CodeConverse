const Post = require('./Post');
const User = require('./users');
const Comment = require('./Comment');

User.hasMany(Post, {foreignKey: 'author'});
Post.belongsTo(User, {foreignKey: 'author'});

Post.hasMany(Comment, {foreignKey: 'post_id'});
Comment.belongsTo(Post, {foreignKey: 'post_id'});

User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {
    Post,
    User,
    Comment
}