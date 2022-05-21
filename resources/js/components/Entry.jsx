import React from 'react';

class Entry extends React.PureComponent {
    constructor(props) {
        super(props);
        this.overflowButton = React.createRef();
    }
    render() {
        const classNames = ['entry'];
    
        if (this.props.isCheat)
            classNames.push('entry--cheat');
    
        return (
            <div className={classNames.join(' ')}>
                <div className="entry__data">
                    {this.props.showUser && <span>{this.props.userId}</span>}
                    <span>{this.props.time}</span>
                    <span>{this.props.name}</span>
                    <span>{this.props.calories}</span>
                </div>
                <button
                    ref={this.overflowButton}
                    className="entry__overflow-btn"
                    onClick={() => this.props.onClickOverflow(this.overflowButton.current)}
                >
                    <div>
                        <svg viewBox="0 0 5 17" width="5">
                            <path fillRule="evenodd" clipRule="evenodd" d="M.6 2a1.85 1.85 0 1 0 3.7 0A1.85 1.85 0 0 0 .6 2Zm1.85 8.3a1.85 1.85 0 1 1 0-3.68 1.85 1.85 0 0 1 0 3.69Zm0 6.47a1.85 1.85 0 1 1 0-3.7 1.85 1.85 0 0 1 0 3.7Z" fill="#023047"/>
                        </svg>
                    </div>
                </button>
            </div>
        );
    }
}

export default Entry;
