const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateProfile
} = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.put('/profile', updateProfile);

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
