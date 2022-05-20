/**
 * @param {number} timestamp 
 * @param {boolean} dateOnly 
 * @returns a string that can be passed to the value parameter of a datetime HTML input.
 */
export const timestampToInputVal = (timestamp, dateOnly = false) => {
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000; // convert offset to milliseconds
    return (new Date(timestamp - timezoneOffset)).toISOString().substring(0, dateOnly ? 10 : 16);
};

/**
 * @param {string} value 
 * @returns the timestamp representation of the given datetime HTML input value.
 */
export const inputValToTimestamp = value => {
    return new Date(value).getTime();
};

/**
 * @param {Date} date 
 * @param {string | string[]} locales 
 * @param {Intl.DateTimeFormatOptions} options 
 * @returns 'Today', 'Yesterday', 'Tomorrow' etc. if date is within 1 week of current date.
 */
export const toRelativeLocaleDateString = (date, locales, options = {}) => {
    const timelessDate = new Date(date.valueOf()).setHours(0, 0, 0, 0); // remove time
    let comp = new Date().setHours(0, 0, 0, 0); // compare to today

    if (timelessDate === comp)
        return 'Today';

    const dayMs = 86400000

    if (timelessDate > comp) { // in the future
        comp += dayMs; // tomorrow

        if (timelessDate === comp)
            return 'Tomorrow';

        comp += 6 * dayMs; // today next week

        if (timelessDate < comp)
            return date.toLocaleDateString(locales, {weekday: 'long'});
    }
    else { // in the past
        comp -= dayMs; // yesterday

        if (timelessDate === comp)
            return 'Yesterday';

        comp -= 6 * dayMs; // today last week

        if (timelessDate > comp)
            return date.toLocaleDateString(locales, {weekday: 'long'});
    }
    
    return date.toLocaleDateString(locales, options);
}