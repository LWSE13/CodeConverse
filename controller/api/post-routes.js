const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({message: 'Failed to get posts', error: err});
    }
})

module.exports = router;