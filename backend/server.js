const express = require("express")
const cors = require("cors")
const { static } = require("express")
const path = require("path")
const mongoose = require("mongoose")
const config = require("./utils/config")

const app = express()

app.use(cors())

// For environment variables .env
require("dotenv").config()

// Connect Database
mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("connected to database", config.mongoUrl)
  })
  .catch((err) => {
    console.log(err)
  })

mongoose.Promise = global.Promise

// body-parser is deprecated so using this instead
app.use(express.json({ limit: "50mb", extended: true }))
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
)

app.get("/", (req, res) => res.json({ msg: "Hello and welcome" }))

// Define routes
app.use("/api/books", require("./routes/books"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
