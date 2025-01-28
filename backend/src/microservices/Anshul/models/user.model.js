import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minlength: [8, "Password field must be at least 8 characters"],
      select: false,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[a-zA-Z\s]+$/,
        "Full name must contain only letters and spaces",
      ],
      index: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\+[1-9]\d{1,14}$/,
        "Invalid phone number. Please include the country code (+1 for example)",
      ],
    },
    is_buyer: {
      type: Boolean,
      default: false,
    },
    is_seller: {
      type: Boolean,
      default: false,
    },
    documents: [{
      type: String,
    }]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
