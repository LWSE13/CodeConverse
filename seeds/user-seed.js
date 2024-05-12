const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password123", 10),
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("password123", 10),
    },
    {
        name: "Bob Smith",
        email: "bob@example.com",
        password: bcrypt.hashSync("password123", 10),
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;