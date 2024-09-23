const knex = require("knex")(require("../knexfile").development);

exports.getAdminOrders = async (req, res) => {
  try {
    const Messages = await knex("Ads").select("*");
    res.status(200).json(Messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الرسائل." });
  }
};


  exports.UpdateAdminOrders = async (req, res) => {
  const { id } = req.params;
  const { acceptable } = req.body; // الحصول على البيانات من الطلب

  try {
      // تحديث حالة الطلب في قاعدة البيانات
      await knex('Ads')
          .where('id', id)
          .update({ acceptable: acceptable });

      res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order' });
  }
};
