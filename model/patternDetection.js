import mongoose from "mongoose"

const userSubmitSchema = new mongoose.Schema(
  {
    result: [],
    flag: String,
  },
  { timestamps: true }
)

const patternModel = mongoose.model("pattern", userSubmitSchema)
export default patternModel
