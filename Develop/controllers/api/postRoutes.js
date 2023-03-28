const router = require('express').Router();
const { Post } = require('../../models');

// router.post('/post', async (req, res) => {
//     //boiler plate placeholder
//     try {
//         const newPost = await Post.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/', async (req, res) => {
    //boiler plate placeholder
    Post.create(req.body)
        .then((postData) => {
        res.json(postData);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;