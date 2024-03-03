import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose"
import { databaseConnect } from "./config/database.js"
import cors from "cors"
import patternModel from "./model/patternDetection.js"
import userFeedbackModel from "./model/userFeedback.js"
import userRequestModel from "./model/userSubmitRequest.js"
import resultWithUserModel from "./model/resultWithUserInfo.js"
import expertRoutes from "./routes/expertRoutes.js"
import { Server } from "socket.io"
//const users = require("./src/controllers/user.controller")
import avatars from "./controller/avatar.controller.js"
import message from "./controller/message.controller.js"
import { cloudinary } from "./config/cloudnary.js"
dotenv.config()

//database connection

databaseConnect()

//all the middlewares
const app = express()
app.use(express.json())
app.use(cors())

//all routes for the application
app.use("/api/v1/user/", userRoutes)
app.use("/api/v1/expert/", expertRoutes)
//send pattern detection data to database
app.post("/", async (req, res) => {
  const data = await patternModel.create({
    result: [...req.body.result],
    flag: req.body.flag,
  })
  res.status(200).json({
    data: "data",
  })
})

app.get("/pattern", async (req, res) => {
  const data = await patternModel.find({ flag: "done" })
  res.status(200).send({
    data: data,
  })
})

app.post("/result/:id", async (req, res) => {
  const { id } = req.params
  const data = await patternModel.findOne({ flag: "done" })
  const userInfo = await userRequestModel.findById(id).populate("userId")
  //session implemantation
  const session = await mongoose.startSession()
  let result = []
  try {
    session.startTransaction()
    const create = await resultWithUserModel.create([req.body], { session })
    if (!create) {
      throw new Error("task undone")
    }
    await patternModel.findOneAndUpdate(
      { _id: req.body.patternFoundId },
      { flag: "waiting-expert" },
      { new: true }
    )
    await userRequestModel.findOneAndUpdate(
      { _id: id },
      { status: "waiting-expert" },
      { new: true }
    )
    result.push(create[0])
    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }

  res.status(200).send({
    success: true,
    message: "Automatic detection is ongoing.",
    data: result,
  })
})
app.get("/result", async (req, res) => {
  const result = await resultWithUserModel.find({}).populate([
    "patternFoundId",
    {
      path: "requestId",
      populate: {
        path: "userId",
      },
    },
  ])

  res.status(200).send({
    success: true,
    message: "Automatic detection is done.Wait for expert opinion",
    data: result,
  })
})

//imgae send to cloudnary
app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute()

  const publicIds = resources.map((file) => file.public_id)
  res.send(publicIds)
})

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    })
    console.log(uploadResponse)
    res.json({ msg: "yaya" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "Something went wrong" })
  }
})

//

//server connection
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT)
})

//chat
app.use("/avatars", avatars)
app.use("/messages", message)
const sockets = new Server(server, {
  cors: {
    origin: "https://saqeeb-z91h.onrender.com",
    credentials: true,
  },
})

/* const io = socket(server, {
  cors: {
    origin: "http://localhost:9000",
    credentials: true,
  },
}) */

const io = sockets

global.OnlineUsers = new Map()

/* io.on("connection", (socket) => {
  console.log("Connection established")

  getApiAndEmit(socket)
  socket.on("disconnect", () => {
    console.log("Disconnected")
  })
}) */

io.on("connection", (socket) => {
  global.chatSocket = socket
  socket.on("add-user", (userId) => {
    OnlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = OnlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.message)
    }
  })
})
