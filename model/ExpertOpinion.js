import mongoose from "mongoose"

const ExpertSchema = new mongoose.Schema(
  {
    url: Object,
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRequest",
    },
    patternFoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pattern",
    },
    flag: {
      type: String,
      default: "expert-verified",
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
)

const ExpertModel = mongoose.model("expertModel", ExpertSchema)
export default ExpertModel
