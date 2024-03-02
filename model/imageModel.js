import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
  },
  { timestamps: true }
)

const imageModel = mongoose.model("upload", userSchema)
export default imageModel
