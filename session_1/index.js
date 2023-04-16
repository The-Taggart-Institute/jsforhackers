const express = require("express");
const PORT = process.env["NODE_ENV"] || 8000;

// Define app
const app = express();
// Set template engine
app.set('view engine', 'pug');

app.get("/", (req, res) => {
    const username = req.query.user || "User";
    res.render("index", {greeting: `Hello, ${username}!`});
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});