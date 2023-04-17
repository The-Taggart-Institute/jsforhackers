import { useState } from 'react';
import RPSHeader from './components/RPSHeader';
import PlayerForm from './components/PlayerForm';
import PlayerName from './components/PlayerName';
import Scoreboard from './components/Scoreboard';
import ChoiceContainer from './components/ChoiceContainer';
import GameLog from './components/GameLog';

function App() {
  const [player, setPlayer] = useState("");
  const [score, setScore] = useState({wins: 0, losses: 0, draws: 0});
  const [log, setLog] = useState([]);

  const playHandler = async (choice) => {
    const playUrl = "http://localhost:8000/api/play";
    let result = await fetch(
        playUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({player, choice})
        }
    );
    result = await result.json();
    console.log(result);

    if (result.outcome === "WIN") {
        setScore({...score, wins: score.wins + 1});
    } else if (result.outcome === "LOSS") {
        setScore({...score, losses: score.losses + 1});
    } else {
        setScore({...score, draws: score.draws + 1});
    }
    const newLog = {
      player,
      outcome: result.outcome,
      playerChoice: choice,
      computerChoice: result.computerChoice
    }
    setLog(log.concat([newLog]));

  }

  return (
    <div>
      <RPSHeader />
      { 
        player === "" ?  
        <PlayerForm setPlayer={setPlayer} setLog={setLog} /> :
        <>
          <PlayerName player={player} /> 
          <Scoreboard score={score}/>
          <ChoiceContainer playHandler={playHandler} />
          <GameLog log={log} />
        </>
      }
    </div>
  )
}

export default App
