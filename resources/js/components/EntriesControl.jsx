import React from 'react';
import FormRow from './FormRow';
import {timestampToInputVal, inputValToTimestamp} from '../utils';

class EntriesControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.initialUserId,
            fromTimestamp: '',
            toTimestamp: Date.now()
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    parseInputValue(input) {
        switch (input.type) {
            case 'date':
            case 'datetime-local': return inputValToTimestamp(input.value);
            case 'number': return parseInt(input.value);
            default: return input.value;
        }
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: this.parseInputValue(e.target)
        });
    }

    render() {
        return (
            <div className="control">
                <table className="control__filters" cellSpacing="0">
                    <tbody>
                        {this.props.showUser &&
                            <FormRow labelForId="control__user" label="User" >
                                <input
                                    id="control__user"
                                    className="btn"
                                    name="userId"
                                    type="number"
                                    value={this.state.userId}
                                    onChange={this.handleInputChange} min="0"
                                />
                            </FormRow>
                        }
                        <FormRow labelForId="control__from-date" label="From" >
                            <input
                                id="control__from-date"
                                className="btn"
                                name="fromTimestamp"
                                type="date"
                                value={timestampToInputVal(this.state.fromTimestamp, true)}
                                onChange={this.handleInputChange}
                            />
                        </FormRow>
                        <FormRow labelForId="control__to-date" label="To" >
                            <input
                                id="control__to-date"
                                className="btn"
                                name="toTimestamp"
                                type="date"
                                value={timestampToInputVal(this.state.toTimestamp, true)}
                                onChange={this.handleInputChange}
                            />
                        </FormRow>
                    </tbody>
                </table>
                <input className="btn btn--dark" type="button" value="+ Add entry" />
            </div>
        );
    }
}

export default EntriesControl;
