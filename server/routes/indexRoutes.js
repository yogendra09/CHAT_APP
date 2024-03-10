const express = require('express');
const { userResgister, userLogin, currentUser, home } = require('../controllers/indexController');
const router = express();
const {isAuthenticated} = require("../middlewares/auth");

router.get('/',home);

router.post('/user' ,isAuthenticated,currentUser);

router.post('/register',userResgister);

router.post('/login',userLogin);








module.exports = router;