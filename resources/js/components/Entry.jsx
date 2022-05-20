function Entry(props) {
    const classNames = ['entry'];

    if (props.isCheat)
        classNames.push('entry--cheat');

    return (
        <div className={classNames.join(' ')}>
            <div className="entry__data">
                {props.showUser && <span>{props.userId}</span>}
                <span>{props.time}</span>
                <span>{props.name}</span>
                <span>{props.calories}</span>
            </div>
            <button className="entry__overflow-btn" onClick={e => this.props.onClick(e)}>
                <div>
                    <svg viewBox="0 0 5 17" width="5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M.6 2a1.85 1.85 0 1 0 3.7 0A1.85 1.85 0 0 0 .6 2Zm1.85 8.3a1.85 1.85 0 1 1 0-3.68 1.85 1.85 0 0 1 0 3.69Zm0 6.47a1.85 1.85 0 1 1 0-3.7 1.85 1.85 0 0 1 0 3.7Z" fill="#023047"/>
                    </svg>
                </div>
            </button>
        </div>
    );
}

export default Entry;
