import express from "express"
import {
  expertFindings,
  getExpertfindings,
  getSingleResult,
  getExpertVerifiedResult,
} from "../controller/expertController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post("/expert-findings", expertFindings)
router.get("/expert-findings", getExpertfindings)
router.post("/send-result-to-user", getSingleResult)
router.get("/expert-verification", getExpertVerifiedResult)

export default router
