const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', withAuth, async(req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        })
        res.json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;