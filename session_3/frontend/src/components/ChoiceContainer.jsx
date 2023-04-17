const ChoiceContainer = ({playHandler}) => (
    <div id="choice-container">
        {["Rock", "Paper", "Scissors"].map(c => (
            <button 
                key={c} 
                id={`choice-${c.toLowerCase()}`} className="choice-button"
                data-choice={c.toLowerCase()}
                onClick={e => playHandler(e.target.dataset.choice)}
            >
                {c}
            </button>
        ))}
    </div>

);

export default ChoiceContainer;