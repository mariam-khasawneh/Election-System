const knex = require("../config/db");
class ChatMessages {
  static async GetNId() {
    try {
      const result = await knex("ChatMessages").distinct('CN_Id');
      return result;
    } catch (error) {
      console.error("Error Get ChatMessages:", error);
      throw error;
    }
  }

  // -------------------------------Get------------------------------------------------------

  static async GetMessage(nationalId) {
    try {
      const result = await knex("ChatMessages")
        .join("Users", "ChatMessages.CN_Id", "=", "Users.N_Id")
        .select(
          "ChatMessages.*",
          "Users.name",
          "Users.email",
          "Users.religion",
          "Users.city"
        )
        .where("ChatMessages.CN_Id", nationalId) // إضافة شرط لجلب الرسائل الخاصة بالمستخدم المحدد
        .orderBy("ChatMessages.timestamp", "desc"); // ترتيب الرسائل حسب التوقيت;
      // .select("ChatMessages.", "Users.*"); هيك بتجيب كل الداتا الي بين الجدولين
      return result;
    } catch (error) {
      console.error("Error Get ChatMessages:", error);
      throw error;
    }
  }
  // -------------------------------post------------------------------------------------------

  static async PostMessage(CN_Id, Message) {
    try {
      await knex("ChatMessages").insert({
        CN_Id,
        Message,
        admin: true,
        Deleted: false,
      });
      return { message: "Message sent by admin." };
    } catch (error) {
      console.error("Database Error:", error.message); // إضافة تسجيل للخطأ
      throw new Error("Failed to send message.");
    }
  }
}
module.exports = ChatMessages;