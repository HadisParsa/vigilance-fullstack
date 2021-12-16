const User = require('./User');
const BlogPost = require("./BlogPost");
const Comment = require('./Comment');
const Like = require('./Like');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPost.hasMany(Like, {
  foreignKey: 'blogpost_id'
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id'
});

module.exports = { User, BlogPost, Comment, Like};
