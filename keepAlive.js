const express = require("express")
const app = express()

app.get("/", (req, res) => {
	res.send("Bot Online")
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Website ready")
})

module.exports = app;