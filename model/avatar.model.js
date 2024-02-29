import mongoose from "mongoose"

const avatarSchema = mongoose.Schema({
  id: { type: Number },
  src: { type: String, required: true },
})

const avatarModel = mongoose.model("Avatar", avatarSchema)

export default avatarModel
