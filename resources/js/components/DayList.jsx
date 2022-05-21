import Day from './Day';
import {toRelativeLocaleDateString} from '../utils';

function DayList(props) {
    if (props.error)
        return <span className="day-list__loading">{props.error.response.data.message}</span>;

    if (props.isLoading)
        return <span className="day-list__loading">Loading...</span>;

    const days = [];
    const entries = props.data.entries;
    const locale = 'en-US';

    let currDate = null;
    let currDayEntries = [];

    const bankDay = function() {
        if (currDate) {
            days.push(
                <Day
                    key={currDate}
                    name={currDate}
                    calorieLimit={props.data.daily_calorie_limit}
                    entries={currDayEntries}
                    onClickEntryOverflow={props.onClickEntryOverflow}
                    showUser={props.showUser}
                />
            );
        }
    };

    for (let i = 0; i < entries.length; ++i)
    {
        const entry = entries[i];
        const dateTime = new Date(entry.created_at);
        const date = toRelativeLocaleDateString(dateTime, locale);

        if (currDate !== date) {
            bankDay();
            currDayEntries = [];
            currDate = date;
        }

        /**
         * While we have a dateTime representation of the entry, 
         * pass the formatted version into the data object.
         */
        entry.time = dateTime.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric'
        });

        currDayEntries.push(entry);
    }

    bankDay();
    return days;
}

export default DayList;
