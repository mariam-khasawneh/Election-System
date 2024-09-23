const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig.development);

async function getAllUsers(req, res) {
  try {
    const users = await knex("Users").select("*");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateUserEmail(req, res) {
  const userId = req.params.id;
  const newEmail = req.body.email;

  try {
    const result = await knex("Users")
      .where({ N_Id: userId })
      .update({ email: newEmail });

    if (result === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ error: "Failed to update email" });
  }
}

module.exports = {
  getAllUsers,
  updateUserEmail,
};
