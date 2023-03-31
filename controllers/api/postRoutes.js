const router = require('express').Router(); 
const { Post, User, Comment } = require('../../models'); // import the models
const sequelize = require('../../config/connection'); // import the connection
const withAuth = require('../../utils/auth'); // import the auth middleware
 
router.get('/', (req, res) => {
    Post.findAll({ // find all the posts
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbdbPostData => res.json(dbdbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.get('/:id', (req, res) => { // find one post by id
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbdbPostData => {
            if (!dbdbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbdbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


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
        .then((dbPostData) => {
        res.json(dbPostData);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbdbPostData => {
            if (!dbdbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbdbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbdbPostData => { // if the post is deleted, return the post data
        if (!dbdbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbdbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;