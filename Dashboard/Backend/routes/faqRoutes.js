const express = require("express");
const router = express.Router();
const FaqController = require("../Controllers/faqController");

// Route to get faq by id
router.get("/faq/:id", FaqController.getFaqById);

// GET all
router.get("/faqs", FaqController.getAllFAQ);

// PUT by id
router.put("/faq/:id", FaqController.updateFaqById);

// DELETE by id
router.delete("/faq/:id", FaqController.deleteFaqById);

//Add new faq
router.post("/faqs", FaqController.addFaq);

module.exports = router;
