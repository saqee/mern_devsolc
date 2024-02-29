import mongoose from "mongoose"

const userSubmitSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRequest",
    },
    patternFoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pattern",
    },
    flag: String,
  },
  { timestamps: true }
)

const resultWithUserModel = mongoose.model(
  "resultWithUserInfo",
  userSubmitSchema
)
export default resultWithUserModel
