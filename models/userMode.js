const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default:false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const solt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, solt);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
