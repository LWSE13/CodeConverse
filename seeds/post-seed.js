const { Post } = require('../models');

const postData = [
    {
        title: "First Post",
        content: "This is the content of the first post",
        author: 1, // assuming this user exists
    },
    {
        title: "Second Post",
        content: "This is the content of the second post",
        author: 2, // assuming this user exists
    },
    {
        title: "Third Post",
        content: "This is the content of the third post",
        author: 1, // assuming this user exists
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;