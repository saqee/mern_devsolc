import mongoose from "mongoose"

const userSubmitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    feedback: {
      type: String,
      required: [true, "feedback field is required "],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
)

const userFeedbackModel = mongoose.model("feedback", userSubmitSchema)
export default userFeedbackModel
