// code away!
const express = require("express")
// const morgan = require("morgan")
const logger = require("./middleware/middleware")

const server = express()
const port = 3000

server.use(express.json())
// server.use(morgan("combined"))
server.use(logger)

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})