import React from 'react';

class EntryOverflowMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
        this.ref = React.createRef();
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize() {
        this.forceUpdate();
    }

    componentDidMount() {
        this.setState({
            width: this.ref.current.offsetWidth
        });
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render() {
        const targetRect = this.props.target.getBoundingClientRect();
        const offsetTop = targetRect.y + document.documentElement.scrollTop;
        const offsetLeft = targetRect.x + targetRect.width - this.state.width;
    
        return (
            <div
                ref={this.ref}
                className="overflow-menu"
                style={{top: offsetTop, left: offsetLeft}}
                onMouseLeave={this.props.onMouseLeave}
            >
                <input type="button" value="Edit" onClick={this.props.onClickEdit} />
                <input type="button" value="Remove" onClick={this.props.onClickRemove}/>
            </div>
        );
    }
}

export default EntryOverflowMenu;
