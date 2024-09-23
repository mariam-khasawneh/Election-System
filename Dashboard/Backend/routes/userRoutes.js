const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserEmail,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.put("/:id/email", updateUserEmail);

module.exports = router;
