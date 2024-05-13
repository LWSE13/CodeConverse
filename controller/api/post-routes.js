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

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,{
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
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({message: 'Failed to get post', error: err});
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user_id
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({message: 'Failed to create post', error: err});
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (!postData) {
        res.status(404).json({ message: "No product found with this id!" });
        return;
      }
  
      await Post.destroy({
        where: {
          id: req.params.id
        }
      });
  
      res.status(200).json(`Record deleted successfully! `);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'An error occurred while deleting the Post', error: err.message});
    }
  });

module.exports = router;