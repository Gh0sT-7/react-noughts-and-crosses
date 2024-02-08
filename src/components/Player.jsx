import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);


    /**
     * @handleEditPlayerClick
     * Handle the triggering of the edit state for entering a player name.
     * 
     * @params isEditing
     */
    function handleEditPlayerClick(isEditing) {
        setIsEditing((editing) => !editing); // Use this way of doing things as it makes a call to update.
        // setIsEditing(!editing); // This way doesn't allow immediate updating, only schedules the update in the future.
        
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }


    /**
     * @handleNameChange
     * Handle the input of the new player name.
     * 
     * @params event
     */
    function handleNameChange(event) {
        console.log(event);
        console.log(event.target.value);
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ? (
                    <input
                        required
                        type="text"
                        value={playerName}
                        onChange={handleNameChange}
                    />
                ) : (
                    <span className="player-name">{playerName}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>

            <button onClick={handleEditPlayerClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    );
}