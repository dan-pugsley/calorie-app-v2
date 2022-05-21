import React from 'react';
import ReactDOM from 'react-dom/client';

function Stat(props) {
    return (
        <div className="stat">
            <span>{props.label}:</span>
            <span>{props.value}</span>
        </div>
    );
}

class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            data: null,
        };
    }

    componentDidMount() {
        axios.all([
            axios.get('api/report/entries-added/' + this.props.period),
            axios.get('api/report/user-avg-cals/' + this.props.period),
        ])
        .then(axios.spread((res1, res2) => {
            this.setState({
                isLoading: false,
                data: Object.assign(res1.data, res2.data),
            });
        }))
        .catch(error => {
            this.setState({
                isLoading: false,
                error
            });
        });
    }

    getEntriesText() {
        if (this.state.isLoading)
            return null;

        const currPeriod = this.state.data.current_period;
        const prevPeriod = this.state.data.previous_period;

        if (prevPeriod <= 0)
            return currPeriod;

        let increasePerc = Math.round(100 * (currPeriod / prevPeriod - 1));

        if (increasePerc > 0)
            increasePerc = '+' + increasePerc;

        return `${currPeriod} (${increasePerc}%)`;
    }

    render() {
        return (
            <div className="content" style={{width: 380}}>
                <span className="heading">Last {this.props.period} days</span>
                <hr/>
                <div>
                    <Stat label="Entries" value={this.state.isLoading ? 'Loading...' : this.getEntriesText()} />
                    <Stat label="Avg. cals / user" value={this.state.isLoading ? 'Loading...' : this.state.data.average_calories_per_user + ' cal'} />
                </div>
            </div>
        );
    }
}

const element = document.getElementById('js-report-page-root');

if (element)
    ReactDOM.createRoot(element).render(<ReportPage period={7} />);
