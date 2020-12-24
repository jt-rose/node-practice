import express = require("express")

// mock db
const mockDB = [
    {
        name: "Dracula",
        location: "Transylvania",
        hobbies: "sucking blood"
    },
    {
        name: "Zombie",
        location: "RCPD station",
        hobbies: "eating brains"
    }
]

const app = express()

const port = process.env.PORT || 3030

// home page
app.get("/", (req, res) => {
    res.type("text/plain")
    res.send("beep boop")
})

// contact page
app.get("/contact", (req, res) => {
    res.type("text/plain")
    res.send("don't worry, we'll find you")
})

// sending JSON
app.get("/user", (req, res) => {
    res.json({
        name: "Dracula",
        location: "Transylvania",
        hobbies: "sucking blood"
    })
})

// sending another JSON
app.get("/user2", (req, res) => {
    res.json({
        name: "Zombie",
        location: "RCPD station",
        hobbies: "eating brains"
    })
})

// search query
app.get("/api", (req, res) => {
    const monsterName = "name" in req.query ? req.query.name : null;
    console.log(monsterName);

    if (monsterName) {
        const monster = mockDB.find(x => x.name === monsterName);
        if (monster) {
            res.json(monster)
        } else {
            res.type("text/plain")
            res.send(`no ${monsterName} at the mash`)
        }
    } else {
        res.type("text/plain")
        res.send(`please use a search query with a name parameter`)
    }
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