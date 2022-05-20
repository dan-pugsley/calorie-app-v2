import React from 'react';
import FormRow from './FormRow';
import {timestampToInputVal, inputValToTimestamp} from '../utils';

class EntryOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: this.props.initialTimestamp,
            food: this.props.initialFood,
            calories: this.props.initialCalories,
            isCheat: this.props.initialIsCheat,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    parseInputValue(input) {
        switch (input.type) {
            case 'datetime-local': return inputValToTimestamp(input.value);
            case 'number': return parseInt(input.value);
            case 'checkbox': return input.checked;
            default: return input.value;
        }
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: this.parseInputValue(e.target)
        });
    }

    handleCancel(e) {
        console.log('cancel');
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
    }

    render() {
        return (
            <div className="entry-overlay">
                <div className="entry-overlay__blocker"></div>
                <form className="entry-overlay__form">
                    <table className="entry-overlay__table">
                        <tbody>
                            <FormRow labelForId="entry-overlay__date" label="Date">
                                <input 
                                    id="entry-overlay__date"
                                    type="datetime-local"
                                    name="timestamp"
                                    value={timestampToInputVal(this.state.timestamp)}
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
                        <input className="btn btn--light btn--small" type="button" value="Cancel" onClick={e => this.handleCancel(e)} />
                        <input className="btn btn--dark btn--small" type="submit" value="Confirm" onClick={e => this.handleSubmit(e)} />
                    </div>
                </form>
            </div>
        );
    }
}

export default EntryOverlay;
