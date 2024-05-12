const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);

        res.status(200).json({ message: `Comment ${commentData} created` });
    } catch (err) {
        res.status(400).json({ message: 'Failed to create comment', error: err });
    }
})