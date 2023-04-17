const loadLogs = async (player) => {
    const logsUrl = "http://localhost:8000/api/logs";
    let result = await fetch(
        logsUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({player})
        }
    );
    result = await result.json();
    console.log(result);
    return result;
}

const PlayerForm = ({setPlayer, setLog}) => (
    <form 
        name="player-form" 
        id="player-form" 
        onSubmit={async e => {
            e.preventDefault();
            const player = e.target[0].value
            setPlayer(player);
            const logs = await loadLogs(player);
            setLog(logs);
        }}
    >
        <input type="text" placeholder="Player Name" />
        <button type="submit">Submit</button>
    </form>
);

export default PlayerForm;