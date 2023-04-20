const ChoiceContainer = ({playHandler}) => (
    <div id="choice-container">
        {["Rock", "Paper", "Scissors"].map(c => (
            <button 
                key={c} 
                id={`choice-${c.toLowerCase()}`} className="choice-button"
                onClick={e => playHandler(c.toLowerCase())}
            >
                {c}
            </button>
        ))}
    </div>

);

export default ChoiceContainer;
