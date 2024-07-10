const router = require('express').Router();
const { Post, User } = require('.../models');

// Fetch all blog posts

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

// Serialize data for template to read

        const posts = postData.map((post) => post.get({ plain: true}));

// Pass data to template

        res.render('home', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});