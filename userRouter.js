const express = require('express');

const router = express.Router();

router.get('/register', function(req, res) {
    res.send('userRouter.js')
});

module.exports = router;