const { Schema, model } = require("mongoose");

const OAuth = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
      ref: "User",
    },

    acces_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    
  },
  { timestamps: true }
);

module.exports = model("OAuth", OAuth);