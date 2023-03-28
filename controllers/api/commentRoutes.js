const router = require('express').Router();
const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


router.post('/', async(req, res) => {
    //example usage:
    //POST localhost:3001/api/comment
    //with JSON body containing something like:

    /* A USER WITH AN ID AND A POST WITH AN ID MUST EXIST FIRST
        {
            "content": "test COMMENT Content1",
            "user_id": 1,
            "post_id": 2
        }
    */

    Comment.create(req.body)
        .then((postData) => {
        res.json(postData);
    })
    .catch((err) => {
        res.json(err);
    });
})

module.exports = router;