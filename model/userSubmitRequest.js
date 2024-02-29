import mongoose from "mongoose"

const userSubmitSchema = new mongoose.Schema(
  {
    websiteurl: {
      type: String,
      required: [true, "websiteurl is required "],
    },
    carturl: {
      type: String,
      required: [true, "carturl is  required "],
    },
    status: {
      type: String,
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
)

const userRequestModel = mongoose.model("userRequest", userSubmitSchema)
export default userRequestModel
