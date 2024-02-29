import express from "express"
import {
  userRegisterCtr,
  userLoginCtr,
  userProfileCtr,
  userProfileUpdateCtr,
  userSubmitRequestCtr,
  userFeedbackCtr,
  getAllUserRequestCtr,
  getAllUserFeedbackCtr,
  userStatusUpdateCtr,
  userRequestDeleteCtr,
  getOngoingStatusCtr,
  getAllClientRequestCtr,
  getExpertStatusCtr,
  getAllExpertUser,
  getSingleExpert,
} from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post("/register", userRegisterCtr)
router.post("/login", userLoginCtr)
router.post("/profile", authMiddleware, userProfileCtr)
router.post("/updateProfile", authMiddleware, userProfileUpdateCtr)
router.post("/submit-request", authMiddleware, userSubmitRequestCtr)
router.post("/submit-feedback", authMiddleware, userFeedbackCtr)

router.get("/user-all-request", authMiddleware, getAllUserRequestCtr)
router.get("/client-all-request", authMiddleware, getAllClientRequestCtr)
router.get("/ongoing-request", authMiddleware, getOngoingStatusCtr)
router.get("/expert-request", authMiddleware, getExpertStatusCtr)
router.patch("/user-all-request/:id", authMiddleware, userStatusUpdateCtr)
router.delete("/user-all-request/:id", authMiddleware, userRequestDeleteCtr)
router.get("/user-all-feedback", authMiddleware, getAllUserFeedbackCtr)
router.get("/get-all-expert-user", getAllExpertUser)
router.get("/:expertId", getSingleExpert)
export default router
