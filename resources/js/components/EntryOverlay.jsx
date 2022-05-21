import React from 'react';
import FormRow from './FormRow';
import {parseInputValue, inputValToTimestamp} from '../utils';

class EntryOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: this.props.initialDateTime,
            food: this.props.initialFood,
            calories: this.props.initialCalories,
            isCheat: this.props.initialIsCheat,
            isSubmitting: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: parseInputValue(e.target)
        });
    }

    handleCancel() {
        if (this.state.isSubmitting)
            return;

        this.props.handleClose(false);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitting: true});
        const params = {
            name: this.state.food,
            calories: this.state.calories,
            is_cheat: this.state.isCheat,
            created_at_ts: inputValToTimestamp(this.state.dateTime),
            user_id: this.props.userId,
        };
        const request = this.props.id ?
            axios.put('api/entries/' + this.props.id, params) :
            axios.post('api/entries', params);

        request.then(res => {
            this.props.handleClose(res.data.id || res.data.changed);
        })
        .catch(error => {
            this.setState({isSubmitting: false});
            alert(error.response.data.message);
        });
    }

    render() {
        return (
            <div className="entry-overlay">
                <div className="entry-overlay__blocker" onClick={this.handleCancel}></div>
                <form className="entry-overlay__form" onSubmit={e => this.handleSubmit(e)} disabled={this.state.isSubmitting}>
                    <table className="entry-overlay__table">
                        <tbody>
                            <FormRow labelForId="entry-overlay__date" label="Date">
                                <input 
                                    id="entry-overlay__date"
                                    type="datetime-local"
                                    name="dateTime"
                                    value={this.state.dateTime}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </FormRow>
                            <FormRow labelForId="entry-overlay__name" label="Food">
                                <input
                                    id="entry-overlay__name"
                                    type="text"
                                    name="food"
                                    maxLength={constants.entries.name_max_length}
                                    value={this.state.food}
                                    onChange={this.handleInputChange}
                                    required
                                    autoFocus
                                />
                            </FormRow>
                            <FormRow labelForId="entry-overlay__cals" label="Calories">
                                <input
                                    id="entry-overlay__cals"
                                    type="number"
                                    name="calories"
                                    min="1"
                                    max={constants.entries.max_calories}
                                    value={this.state.calories}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </FormRow>
                            <FormRow labelForId="entry-overlay__cheat" label="Cheat">
                                <label className="entry-overlay__checkbox">
                                    <input
                                        id="entry-overlay__cheat"
                                        name="isCheat"
                                        className="invisible"
                                        type="checkbox"
                                        checked={this.state.isCheat}
                                        onChange={this.handleInputChange}
                                    />
                                    <span>✓</span>
                                </label>
                            </FormRow>
                        </tbody>
                    </table>
                    <div className="entry-overlay__btns">
                        <input className="btn btn--light btn--small" type="button" value="Cancel" onClick={this.handleCancel} />
                        <input className="btn btn--dark btn--small" type="submit" value="Confirm" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EntryOverlay;
