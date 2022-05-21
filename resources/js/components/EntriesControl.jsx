import React from 'react';
import FormRow from './FormRow';

class EntriesControl extends React.Component {
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
                                    type="number"
                                    name="userId"
                                    value={this.props.userId}
                                    onChange={this.props.onInputChange}
                                    min="0"
                                />
                            </FormRow>
                        }
                        <FormRow labelForId="control__from-date" label="From" >
                            <input
                                id="control__from-date"
                                className="btn"
                                type="date"
                                name="fromDate"
                                value={this.props.fromDate}
                                onChange={this.props.onInputChange}
                            />
                        </FormRow>
                        <FormRow labelForId="control__to-date" label="To" >
                            <input
                                id="control__to-date"
                                className="btn"
                                type="date"
                                name="toDate"
                                value={this.props.toDate}
                                onChange={this.props.onInputChange}
                            />
                        </FormRow>
                    </tbody>
                </table>
                {this.props.showAddButton && <input className="btn btn--dark" type="button" value="+ Add entry" onClick={this.props.onClickAddEntry} />}
            </div>
        );
    }
}

export default EntriesControl;
