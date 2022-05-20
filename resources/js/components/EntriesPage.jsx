import React from 'react';
import ReactDOM from 'react-dom/client';
import EntriesControl from './EntriesControl';
import Day from './Day';
import EntryOverlay from './EntryOverlay';
import axios from 'axios';
import {toRelativeLocaleDateString} from '../utils';

class EntriesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            error: null,
            isOverlayOpen: false,
        };
    }

    componentDidMount() {
        axios.get('api/entries')
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res.data
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    error
                });
            });
    }

    renderDayList() {
        if (this.state.isLoading)
            return <span className="day-list__loading">Loading...</span>;

        const days = [];
        const entries = this.state.data.entries;

        let currDate = null;
        let currDayEntries = [];
    
        for (let i = 0; i < entries.length; ++i)
        {
            const entry = entries[i];
            const dateTimeParts = entry.created_at.split(/[^0-9]/);
            const dateTime = new Date(
                dateTimeParts[0],
                dateTimeParts[1] - 1,
                dateTimeParts[2],
                dateTimeParts[3],
                dateTimeParts[4],
                dateTimeParts[5]);
                
            const date = toRelativeLocaleDateString(dateTime, 'en-US');
    
            if (currDate !== date) {
                if (currDate) {
                    days.push(
                        <Day
                            key={currDate}
                            name={currDate}
                            calorieLimit={this.state.data.daily_calorie_limit}
                            entries={currDayEntries}
                            showUser={false}
                        />
                    );
                }

                currDayEntries = [];
                currDate = date;
            }

            currDayEntries.push(entry);
        }

        if (currDate)
            days.push(<Day key={currDate} name={currDate} entries={currDayEntries} showUser={false} />);

        return days;
    }

    render() {
        if (this.state.error)
            return <div>Error: {this.state.error.message}</div>;

        return (
            <>
                <div className="content" style={{width: '563px'}}>
                    <EntriesControl initialUserId={1} showUser={true}/>
                    <hr/>
                    <div className="day-list">{this.renderDayList()}</div>
                </div>
                <div className="overflow-menu hidden js-overflow-menu">
                    <input className="js-edit-btn" type="button" value="Edit"/> 
                    <input className="js-remove-btn" type="button" value="Remove"/>
                </div>
                {this.state.isOverlayOpen &&
                    <EntryOverlay
                        initialTimestamp={Date.now()}
                        initialFood=""
                        initialCalories=""
                        initialIsCheat={false}
                    />
                }
            </>
        );
    }
}

ReactDOM.createRoot(document.body).render(<EntriesPage />);
