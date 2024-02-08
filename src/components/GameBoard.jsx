export default function GameBoard({ onSqureSelection/*, activePlayerSymbol*/, board }) {

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

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                {/* <button onClick={() => handeSquareSelection(rowIndex, columnIndex)}>{playerSymbol}</button> */}
                                <button
                                    onClick={() => onSqureSelection(rowIndex, columnIndex)}
                                    disabled={playerSymbol !== null}
                                    className={playerSymbol !== null ? 'disabled' : undefined}
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
