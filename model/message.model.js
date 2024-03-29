import mongoose from "mongoose"

const msgSchema = mongoose.Schema(
  {
    message: { text: { type: String, required: true } },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
)

const msgModel = mongoose.model("message", msgSchema)

export default msgModel
