import React from 'react';
import Entry from './Entry';

class Day extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    renderCalorieWarning() {
        return (
            <svg viewBox="0 0 22 20" width="22">
                <path fillRule="evenodd" clipRule="evenodd" d="m21.44 13.95-7-11.97a3.97 3.97 0 0 0-6.88 0l-7 11.98A4 4 0 0 0 3.97 20h14.04a4.01 4.01 0 0 0 3.43-6.05ZM2.28 14.97 9.29 2.98a1.98 1.98 0 0 1 3.42 0l7 11.99a2 2 0 0 1-1.7 3.03H3.97a2 2 0 0 1-1.7-3.03ZM11 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-10h-2v7h2V6Z" fill="#FFB703"/>
            </svg>
        );
    }

    renderEntries() {
        return this.props.entries.map(data => {
            return (
                <Entry
                    key={data.id}
                    userId={data.user_id}
                    time="09:00"
                    name={data.name}
                    calories={data.calories}
                    isCheat={data.is_cheat}
                    showUser={this.props.showUser}
                />
            );
        });
    }

    render() {
        const totalCalories = this.props.entries.reduce((accumulator, entry) => {
            return entry.is_cheat ? accumulator : accumulator + entry.calories;
        }, 0);

        return (
            <div className="day">
                <label className="day__header">
                    <input className="invisible" type="checkbox" checked={this.state.isOpen} onChange={e => this.setState({isOpen: e.target.checked})}/>
                    <span className="day__name">{this.props.name}</span>
                    <div className="day__cal-count">
                        <span>{totalCalories}</span>
                        {totalCalories > this.props.calorieLimit && this.renderCalorieWarning()}
                    </div>
                    <svg className="day__chevron" viewBox="0 0 16 9" width="16">
                        <path fillRule="evenodd" clipRule="evenodd" d="m14.08.08 1.18 1.18L8 8.5.74 1.26 1.92.08 8 6.15 14.08.08Z" fill="#fff"/>
                    </svg>
                </label>
                {this.state.isOpen && <div className="day__entry-list">{this.renderEntries()}</div>}
            </div>
        );
    }
}

export default Day;
