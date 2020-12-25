import express = require("express")

// mock db
let mockDB = [
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
app.get("/api/:name", (req, res) => {
    const monsterName = req.params.name;
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

// add a new monster
// sample: add/{"name":"Cthulu","location":"Murky Depths","hobbies":"spelunking"}
app.get("/add/:monster", (req, res) => {
    const monster = JSON.parse(req.params.monster);
    const monsterKeys = ["name", "location", "hobbies"];
    // confirm object shape and add to mockDB
    if (monsterKeys.every(key => 
        key in monster && typeof monster[key] === "string")) {
        mockDB.push(monster);
        res.type("text/plain")
        res.send(`${monster.name} has joined the mash`)
    } else {
        //reject if wrong object shape
        res.type("text/plain")
        res.send("Please provide the right object")
    }
})

app.get("/remove/:monster", (req, res) => {
    const monsterName = req.params.monster;
    const monster = mockDB.find(x => x.name === monsterName);
    if (monster) {
        mockDB = mockDB.filter(x => x.name !== monsterName)
        res.type("text/plain")
        res.send(`${monsterName} has been kicked out of the mash`)
    } else {
        res.type("text/plain")
        res.send(`Could ${monsterName} be invisible or a ghost? No ${monsterName} found at this party`)
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