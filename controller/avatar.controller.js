import express from "express"
const router = express.Router()
import avatar from "../model/avatar.model.js"

router.get("/", async (req, res) => {
  try {
    const data = await avatar.find()
    res.send(data)
  } catch (e) {
    res.send({ message: e.msg })
  }
})

export default router
