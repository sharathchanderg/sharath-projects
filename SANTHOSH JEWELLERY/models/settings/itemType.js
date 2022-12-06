const mongoose = require("mongoose");

const itemType = mongoose.Schema({
  item_name: String,
  status: {
    type: String,
    enum: ["Active", "In Active"],
    default: "Active",
  },
});

module.exports = mongoose.model("ItemType", itemType);
