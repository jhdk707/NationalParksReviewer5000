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

// delete request to delete post

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;