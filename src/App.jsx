import { useState } from "react";
import { WINNING_COMBINATIONS } from './winning-combinations.js'

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Log from "./components/Log/Log.jsx";


const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
    // [null, 'X', 'O'],
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


/**
 * @deriveActivePlayer
 * Determine who the current active player is during the game.
 * 
 * @params gameTurns
 */
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


/**
 * @deriveGameBoard
 * Work out where each placement was made by each player.
 *
 * @params gameTurns
 */
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, column } = square;

        gameBoard[row][column] = player;
    }

    return gameBoard;
}


/**
 * @deriveWinner
 * Determine who the winner of the game is.
 *
 * @params gameBoard, players
 */
function deriveWinner(gameBoard, players) {
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

    return winner;
}



function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState('X'); 
    /*
        We're managing the activePlayer state because we need to update the symbol on the board and which player 
        turn it is. Yes, technically we need to update the state when triggering a UI update, but we already have
        this in gameTurns already. As we already have this information we could trim things further as setGameTurns
        has what we need. Instead of a dedicated activePlayer state for UI changes, we could use some derived state 
        from the logic from inside handleSelectedSquare.
    */

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;


    /**
     * @handleSelectedSquare
     * Handle the selection of the current square by checking which players turn it is and tracking who picked a specific square.
     * This is achieved by keeping track of the combination of which row and column combo was chosen.
     * 
     * @params rowIndex, columnIndex
     */
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
     * @handlePlayerNameChange
     * Handle the changing of player name based on the symbol they have.
     *
     * @params symbol, newName
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
     * @handleRestart
     * Handle the restart of the game by resetting back to the initial state.
     *
     * @params symbol, newName
     */
    function handleRestart() {
        setGameTurns([]);
    }


    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
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
