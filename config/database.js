import mongoose from "mongoose"

export const databaseConnect = () => {
  try {
    mongoose.connect(process.env.DB_URL)
    console.log("db connects successfully:)")
  } catch (error) {
    console.log(`database connection error ${error.message}`)
  }
}
