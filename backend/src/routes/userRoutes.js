
const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');

router.use(protect);
// Add authorize('admin') middleware here if needed

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
