const router = require('express').Router();
const { Comment } = require('../models');

router.post('/comment', async (req, res) => {
    //boiler plate placeholder
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;