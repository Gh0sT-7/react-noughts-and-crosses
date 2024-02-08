import './Log.scss';

export default function Log({turns}) {
    return (
        <div id="scopedLog">
            <ol id="log">
                {turns.map((turn) => (
                    <li key={`${turn.square.row}${turn.square.column}`}>
                        <b>{turn.player}</b> | selected <b>{turn.square.row}, {turn.square.column}</b>
                    </li>
                ))}
            </ol>
        </div>
    );
}
