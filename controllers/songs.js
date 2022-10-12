////dependencies////
const express = require("express")
const Song = require("../models/songs")

/////router////
const router = express.Router()

////////////ROUTES//////

/////////GET route to view all songs by group////////
router.get("/", (req,res) => {
    const session = req.session
    Song.find({owner: session.groupId})
        .then(songs => {
            res.render("songs/index", {songs, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to render new song form///////////
router.get("/new", (req,res) => {
    const session = req.session
    res.render("songs/new", {session})
})

////////POST route to create new song////////////
router.post("/", (req,res) => {
    req.body.owner = req.session.groupId
    let keywordString = req.body.keywords
    let keywordArray = keywordString.split(",")
    let spacelessArray = keywordArray.map(word => { return word.trim() })
    req.body.keywords = spacelessArray    
    Song.create(req.body)
        .then(song => {
            console.log("new song: ", song)
            res.redirect("/songs")
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////GET route to show song///////////
router.get("/:songId", (req,res) => {
    const songId = req.params.songId
    const session = req.session
    Song.findById(songId)
        .then(song => {
            res.render("songs/show", {song, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////GET route to render edit song form////////////
router.get("/edit/:songId", (req,res) => {
    const songId = req.params.songId
    const session = req.session
    Song.findById(songId)
        .then(song => {
            res.render("songs/edit", {song, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

///////PUT route to update song///////////////
// router.put("/:songId", (req,res) => {
//     const songId = req.params.songId

// })

////////GET route to render delete song page////////////
// router.get("/delete/:songId", (req,res) => {
//     const songId = req.params.songId
// const session = req.session

// })

///////////DELETE route to delete song////////////
// router.delete("/delete/:songId", (req,res) => {
//     const songId = req.params.songId

// })






module.exports = router