const GameLog = ({log}) => (
    <div id="game-log">
        {
            log.map((l, idx) => (
                <p key={idx}>
                    <b>{l.outcome}:</b> {l.player} chose {l.playerChoice}; Computer chose {l.computerChoice}
                    </p>
            ))
        }
    </div>
);

export default GameLog