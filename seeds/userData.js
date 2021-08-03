const { User } = require('../models');

const userData = [
    {
        username: 'Xandromus',
        email: 'me@me.com',
        password: 'password',
    },
  ];
  
  const seedUsers = () => User.bulkCreate(userData);
  
  module.exports = seedUsers;