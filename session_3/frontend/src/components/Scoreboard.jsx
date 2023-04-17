const Scoreboard = ({score}) => (
    <div id="scoreboard">
        {["Wins", "Losses", "Draws"].map((s =>(
            <div className="score-counter" key={s}>
            <h3>{s}</h3>
            <div className="score-holder" id={s.toLowerCase()}>{score[s.toLowerCase()]}</div>
            </div>
        )))}
    </div>

);
export default Scoreboard;