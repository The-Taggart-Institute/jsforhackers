const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { allowedNodeEnvironmentFlags } = require("process");
const { syncBuiltinESMExports } = require("module");
const app = express();
const sqlite3 = require("sqlite3").verbose();

const PORT = process.env["NODE_PORT"] || 8000;
const DB_FILE = process.env["RPS_FILE"] || "rps.db";
let db;

if (!fs.existsSync("rps.db")) {
    db = new sqlite3.Database("rps.db");
    // create the PLAYERLOG table
    db.run(`
    CREATE TABLE PLAYERLOG (
    id INTEGER PRIMARY KEY,
    player TEXT,
    playerChoice TEXT,
    computerChoice TEXT,
    outcome TEXT
    )
    `, (err) => {
    if (err) {
    console.error(err.message);
    } else {
    console.log('PLAYERLOG table created successfully');
    }
    });
} else {
    db = new sqlite3.Database("rps.db");
}

const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
}

function getComputerChoice() {
    const choices = Object.keys(beats);
    const choiceIdx = Math.floor(Math.random() * choices.length);
    return choices[choiceIdx];
}

function play(playerChoice) {
    // Get Comp Choice
    const computerChoice = getComputerChoice();
    // Declare result
    let result = {
        computerChoice,
        outcome: ""
    };

    // Determine Outcome
    if (beats[playerChoice] === computerChoice) {
        result.outcome = "WIN";
    } else if (beats[computerChoice] === playerChoice) {
        result.outcome = "LOSS";
    } else {
        result.outcome = "DRAW";
    }
    return result;
}

function getPlayerLogs(player, callback) {
    let playerLogs = db.all(`SELECT player, playerChoice, computerChoice, outcome FROM PLAYERLOG WHERE player = '${player}'`,
    (err, rows) => {
        if (err) {
            console.error(err.message);
            callback([]);
        } else {
            callback(rows);
        }
    });
    return playerLogs;
}

function save(player, choice, result) {
    db.run(`
        INSERT INTO PLAYERLOG (player, playerChoice, computerChoice, outcome)
        VALUES ('${player}', '${choice}', '${result.computerChoice}', '${result.outcome}');
    `,
    );
}

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Set up game API
app.post("/api/play", (req, res) => {
    const player = req.body.player;
    const choice = req.body.choice;
    const result = play(choice);
    save(player, choice, result);
    res.send(JSON.stringify(result));
});

// Set up game API
app.post("/api/logs", async (req, res) => {
    const player = req.body.player;
    getPlayerLogs(player, (playerLogs => {
        console.log(playerLogs);
        res.send(JSON.stringify(playerLogs));
    }));
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})