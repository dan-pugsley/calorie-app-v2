import React from 'react';
import ReactDOM from 'react-dom/client';
import Day from './Day';

class DayList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
        this.abortController = new AbortController();
    }

    componentDidMount() {
        this.fetchEntries();
    }
    
    componentDidUpdate() {
        //this.fetchEntries();
    }

    fetchEntries() {
        let url = '/api/entries/0/0';

        if (this.props.userId)
            url += '/' + this.state.userId;

        axios.get(url, {
            signal: this.abortController.signal
        })
        .then(res => {
            this.setState({
                isLoaded: true,
                data: res.data
            });
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    renderDay(name, entries) {
        return <Day name={name} entries={entries} showUser={this.props.showUser} />;
    }

    render() {
        if (this.state.error)
            return <div>Error: {this.state.error.message}</div>;

        if (!this.state.isLoaded)
            return <span className="day-list__loading">Loading...</span>;
        
        return (
            <>
                {this.renderDay('Tuesday', this.state.data.entries)}
                {this.renderDay('Monday', this.state.data.entries)}
            </>
        );
    }
}

//ReactDOM.createRoot(document.querySelector('.js-day-list')).render(<DayList />);
