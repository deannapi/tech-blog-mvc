const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
});