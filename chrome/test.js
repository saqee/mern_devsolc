import expres from "express"
import fs from "fs"
const app = expres()
app.use(expres.json())
app.post("/", (req, res) => {
  fs.writeFile("output.json", JSON.stringify(req.body), "utf8", (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("JSON data has been written to output.json")
  })
})

app.post("/text", (req, res) => {})

app.listen(3003, () => {
  console.log("running")
})
