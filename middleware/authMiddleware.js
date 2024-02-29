import jwt from "jsonwebtoken"
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `authentication failed`,
      })
    } else {
      req.body.userId = decode.id
      req.userId = decode.id
      next()
    }
  })
}
