///////dependencies//////////////
require("dotenv").config()
const express = require("express")
const middleware = require("./utility/middleware")

///////////import routes///////////////
const UserRouter = require("./controllers/users")
const GroupRouter = require("./controllers/groups")
const SongRouter = require("./controllers/songs")

////express application object////////
const path = require("path")
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

//////Middleware/////
middleware(app)

//////Home Route//////////
app.get("/", (req,res) => {
    const session = req.session
    res.render("index.liquid", {session})
})


////////Register Routes/////////
app.use("/user", UserRouter)
app.use("/groups", GroupRouter)
app.use("/songs", SongRouter)



//////error route/////////
app.get("/error", (req,res) => {
    const session = req.session
    const error = req.query.error || "This page does not exist"
    res.render("error.liquid", {error, session})
})


//////catch-all route for non-existent paths/////
app.all("*", (req,res) => {
    res.redirect("/error")
})


/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))