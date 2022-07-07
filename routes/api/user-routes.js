const router = require("express").Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).post(updateUser);

// /api/users/:userId/friends
router.route("/:userId/assignments").post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/assignments/:assignmentId").delete(deleteFriend);

module.exports = router;
