import express from "express"
const router = express.Router()
import msgDb from "../model/message.model.js"

router.post("/add", async (req, res) => {
  try {
    const { message, from, to } = req.body
    const data = await msgDb.create({
      message: { text: message },
      users: [to, from],
      sender: from,
    })
    if (data) {
      return res.send({ message: "Message was added to DB", status: true })
    }
    return res.send({ message: "Unable to add message to DB" })
  } catch (e) {
    console.log(e.message)
  }
})

router.post("/", async (req, res) => {
  const { to, from } = req.body
  const messages = await msgDb
    .find({
      users: {
        $all: [from, to],
      },
    })
    .sort({ updatedAt: 1 })

  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }
  })
  res.json(projectedMessages)
})

export default router
