const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/', async (req, res) => {
    try {
        req.body.user_id = req.session.user_id;
        const commentData = await Comment.create(req.body);

        res.status(200).json({ message: `Comment ${commentData.content} created` });
    } catch (err) {
        res.status(400).json({ message: 'Failed to create comment', error: err });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        
        if (!commentData) {
            return res.status(404).json({ message: 'No comment found with this id' });
        }

        const commentContent = commentData.content;

        await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ message: `Comment '${commentContent}' deleted` });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete comment', error: err });
    }
})

module.exports = router;