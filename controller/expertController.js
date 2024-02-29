import ExpertModel from "../model/ExpertOpinion.js"
import userRequestModel from "../model/userSubmitRequest.js"
import userModel from "../model/userModel.js"
import patternModel from "../model/patternDetection.js"
import resultWithUserModel from "../model/resultWithUserInfo.js"
export const expertFindings = async (req, res) => {
  const result = await ExpertModel.create(req.body)
  if (result) {
    const upadteUserSubmitRequest = await userRequestModel
      .findOneAndUpdate(
        {
          _id: req.body.requestId,
        },
        { status: "expert-verified" },
        { new: true }
      )
      .populate("userId")
    const upadtepatternModel = await patternModel.findOneAndUpdate(
      {
        _id: result[0]?.patternFoundId._id,
      },
      { flag: "expert-verified" },
      { new: true }
    )
  }

  res.status(200).json({
    success: true,
    messgae: "expert verification done",
    data: result,
  })
}

export const getExpertfindings = async (req, res) => {
  const result = await ExpertModel.find({
    flag: "expert-verified",
  }).populate([
    "patternFoundId",
    {
      path: "requestId",
      populate: {
        path: "userId",
      },
    },
  ])
  res.status(200).json({
    success: true,
    message: "automation with manual data",
    data: result,
  })
}

export const getSingleResult = async (req, res) => {
  console.log(12, req.body)
  const result = await ExpertModel.findOne({
    //requestId: req.body.id,
    requestId: req.body.id,
  }).populate([
    "patternFoundId",
    {
      path: "requestId",
      populate: {
        path: "userId",
      },
    },
  ])

  res.status(200).json({
    success: true,
    message: "automation with manual result",
    data: result,
  })
}

export const getExpertVerifiedResult = async (req, res) => {
  const result = await ExpertModel.find({
    flag: "expert-verified",
  }).populate([
    "patternFoundId",
    {
      path: "requestId",
      populate: {
        path: "userId",
      },
    },
  ])
  res.status(200).json({
    success: true,
    message: "result",
    data: result,
  })
}
