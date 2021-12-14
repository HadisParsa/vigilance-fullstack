const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json')
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(blogPostData);

  process.exit(0);
};

seedDatabase();
