const express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();
const PORT = process.env["NODE_PORT"] || 8000;


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


app.use(express.static("public"));
app.use(express.json());

// Set up game API
app.post("/api/play", (req, res) => {
    console.log(req.body);
    const player = req.body.player;
    const choice = req.body.choice;
    const result = play(choice);
    res.send(JSON.stringify(result));
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})