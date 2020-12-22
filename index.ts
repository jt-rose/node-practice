const express = require("express")

const app = express()

const port = process.env.PORT || 3030

// home page
app.get("/", (req, res) => {
    res.type("text/plain")
    res.send("beep boop")
})

app.get("/contact", (req, res) => {
    res.type("text/plain")
    res.send("don't worry, we'll find you")
})

// 404 page
app.use((req, res) => {
    res.type("text/plain")
    res.status(400)
    res.send("404 - not found")
})

// 500 page
app.use((err, req, res, next) => {
    console.log(err.message)
    res.type("text/plain")
    res.status(500)
    res.send("500 - server error")
})

app.listen(port, () => console.log(
    `express started on port ${port}`
))