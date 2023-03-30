const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    //example usage:
    //POST localhost:3001/api/post
    //with JSON body containing something like:

    /* A USER WITH AN ID MUST EXIST FIRST
        {
        "title": "test Title1",
        "content": "test Content1",
	 	"user_id": 1
        }
    */
    
    Post.create(req.body)
        .then((postData) => {
        res.json(postData);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;