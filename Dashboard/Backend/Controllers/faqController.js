const FaqModel = require("../models/faqModel");

class FaqController {
  // Get all faqs
  static async getAllFAQ(req, res) {
    try {
      const faqs = await FaqModel.getAll();
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  //Get by id
  static async getFaqById(req, res) {
    const { id } = req.params;
    try {
      const faq = await FaqModel.getById(id);
      if (faq) {
        res.status(200).json(faq);
      } else {
        res.status(404).json({ message: "FAQ not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Update FAQ by ID
  static async updateFaqById(req, res) {
    const { id } = req.params;
    const data = req.body;

    console.log("ID:", id);
    console.log("Data:", data);

    try {
      const updated = await FaqModel.updateById(id, data);

      if (updated) {
        res.status(200).json({ message: "FAQ updated successfully" });
      } else {
        res.status(404).json({ message: "FAQ not found" });
      }
    } catch (error) {
      console.error("Error updating FAQ by ID:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // Delete FAQ by ID
  static async deleteFaqById(req, res) {
    const { id } = req.params;

    try {
      const deleted = await FaqModel.deleteById(id);
      if (deleted) {
        res.status(200).json({ message: "FAQ deleted successfully" });
      } else {
        res.status(404).json({ message: "FAQ not found" });
      }
    } catch (error) {
      console.error("Error deleting FAQ by ID:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // Add new FAQ
  static async addFaq(req, res) {
    // const { question, answer } = req.body;`

    try {
      const newFaq = await FaqModel.addNew({ question, answer });
      res.status(201).json({ message: "FAQ added successfully", faq: newFaq });
    } catch (error) {
      console.error("Error adding new FAQ:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
}

module.exports = FaqController;
