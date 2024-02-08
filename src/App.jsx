import { useState } from "react";
import { WINNING_COMBINATIONS } from './winning-combinations.js'

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log";


const initialGameBoard = [
    // [null, 'X', 'O'],
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


// Moved into it's own function due to duplication.
function deriveActivePlayer(gameTurns) {
    let currentPLayer = 'X'; // Set an initial default for checking.

    /*
        Check for the instance there are no previous turns from the old gameTurns state and 
        if the previous turn was X, switch to O.
    */
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPLayer = 'O';
    }

    return currentPLayer;
}


function App() {
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2',
    });
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState('X'); 
    /*
        We're managing it as state because we need to update the symbol on the board and which player turn it is.
        Yes, we need to update the state when triggering a UI update, but we already have this in gameTurns. 
        Technically, we're already have this information so we could trim things further as setGameTurns has what
        we need. Instead of a dedicated activePlayer state for UI changes, we could use some derived state from 
        the logic from inside handleSelectedSquare.
    */

    const activePlayer = deriveActivePlayer(gameTurns);


    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, column } = square;

        gameBoard[row][column] = player;
    }


    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    
    const hasDraw = gameTurns.length === 9 && !winner;


    function handleSelectedSquare(rowIndex, columnIndex) {
        // setActivePlayer((currentlyActivePlayer) => currentlyActivePlayer === 'X' ? 'O' : 'X'); // Uneeded state from eplantion above.
        setGameTurns((prevTurns) => {
            const currentPLayer = deriveActivePlayer(prevTurns);

            // Track which row and column square was selected by which player and add to "history" in prevTurns.
            const updatedTurns = [
                {
                    square: {
                        row: rowIndex,
                        column: columnIndex
                    },
                    player: activePlayer
                },
                ...prevTurns,
            ];

            return updatedTurns; // Return a new value for the game turns state.
        });
    }


    /**
     * Function for handling the changing of the player names
     *
     * @usage onChangeName={handlePlayerNameChange}.
     */
    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }


    /**
     * Function for GameBoard onRestart for restarting the game.
     *
     * @usage onRestart={handleRestart}.
     */
    function handleRestart() {
        setGameTurns([]);
    }


    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>

                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

                {/* <GameBoard onSqureSelection={handleSelectedSquare} activePlayerSymbol={activePlayer} /> */}
                <GameBoard onSqureSelection={handleSelectedSquare} board={gameBoard} />
            </div>

            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
