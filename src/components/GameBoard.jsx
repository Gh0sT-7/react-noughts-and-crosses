// import { useState } from "react";

const initialGameBoard = [
    // [null, 'X', 'O'],
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSqureSelection/*, activePlayerSymbol*/, turns }) {

    /*
        Doesn't really work all that well as in order for the Log to work, you'll need to duplicate
        things while only adding a little more information, so best to implement in the App.js.
    */
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handeSquareSelection(rowIndex, columnIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //         updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSqureSelection();
    // }


    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, column } = square;

        gameBoard[row][column] = player;
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                {/* <button onClick={() => handeSquareSelection(rowIndex, columnIndex)}>{playerSymbol}</button> */}
                                <button onClick={() => onSqureSelection(rowIndex, columnIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
