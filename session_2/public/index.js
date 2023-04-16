const gameState = {
    wins: 0,
    losses: 0,
    draws: 0,
    player: ""
}


function updateScores() {
    const counters = ["wins", "losses", "draws"];
    for (let c of counters) {
        let counter = document.getElementById(c);
        counter.innerHTML = gameState[c];
    }
}

function logGame(result, playerChoice, computerChoice) {
    const gameLog = document.getElementById("game-log");
    const newLog = `${result}: ${gameState.player} chose ${playerChoice}, Computer chose ${computerChoice}`;
    gameLog.innerHTML += `<p>${newLog}</p>`;
}

async function play(playerChoice) {
    // Declare result
    const data = {
        player: gameState.player,
        choice: playerChoice
    }
    let result = await fetch(
        "/api/play",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    result = await result.json();

    // Determine Outcome
    if (result.outcome === "WIN") {
        gameState.wins++;
    } else if (result.outcome === "LOSS") {
        gameState.losses++;
    } else {
        gameState.draws++;
    }

    updateScores();
    logGame(result.outcome, playerChoice, result.computerChoice);

}

function initializeGame() {
    // Set player name
    gameState.player = prompt("Player name");
    const nameDiv = document.getElementById("player-name");
    nameDiv.innerText = gameState.player;
    
    // Set choice handlers
    const choiceButtons = document.querySelectorAll(".choice-button");
    choiceButtons.forEach(b => {
        b.addEventListener("click", e => {
            const playerChoice = e.target.id.replace("choice-","");
            play(playerChoice);
        });
    });

    // Initialize Scores
    updateScores();
}

window.onload = () => {
    initializeGame();
}