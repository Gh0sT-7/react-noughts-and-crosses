export default function Log({turns}) {
    return (
        <ol id="log">
            {turns.map((turn) => (
                <li key={`${turn.square.row}${turn.square.column}`}>
                    <b>{turn.player}</b> | selected <b>{turn.square.row}, {turn.square.column}</b>
                </li>
            ))}
        </ol>
    );
}
