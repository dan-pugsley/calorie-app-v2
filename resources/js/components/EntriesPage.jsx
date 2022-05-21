import React from 'react';
import ReactDOM from 'react-dom/client';
import EntriesControl from './EntriesControl';
import DayList from './DayList';
import EntryOverlay from './EntryOverlay';
import EntryOverflowMenu from './EntryOverflowMenu';
import axios from 'axios';
import {parseInputValue, inputValToTimestamp, timestampToInputVal} from '../utils';

class EntriesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.initialUserId,
            fromDate: props.initialFromDate,
            toDate: props.initialToDate,
            isLoading: true,
            data: null,
            error: null,
            isOverlayOpen: false,
            isOverflowMenuOpen: false,
            overflowMenuTarget: null,
            overflowMenuEntryData: null,
        };
    }

    fetchEntries() {
        let fromTimestamp = inputValToTimestamp(this.state.fromDate);
        let toTimestamp = inputValToTimestamp(this.state.toDate);

        if (isNaN(fromTimestamp)) fromTimestamp = 0;
        if (isNaN(toTimestamp)) toTimestamp = 0;

        axios.get(`api/entries/${fromTimestamp}/${toTimestamp}/${this.state.userId}`)
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

    componentDidMount() {
        this.fetchEntries();
    }

    handleControlInputChange(e) {
        this.setState({
            [e.target.name]: parseInputValue(e.target),
            isLoading: true,
            error: null
        }, this.fetchEntries);
    }

    handleClickAddEntry() {
        this.setState({
            isOverlayOpen: true,
            overflowMenuEntryData: null
        });
    }

    handleClickEntryOverflow(data, button) {
        this.setState({
            isOverflowMenuOpen: true,
            overflowMenuTarget: button,
            overflowMenuEntryData: data,
        });
    }

    handleClickEntryEdit() {
        this.setState({
            isOverlayOpen: true,
            isOverflowMenuOpen: false,
        });
    }

    handleClickEntryRemove() {
        const data = this.state.overflowMenuEntryData;
        if (!confirm(`Are you sure you want to remove '${data.name}'?`))
            return;
        this.setState({
            isLoading: true,
            isOverflowMenuOpen: false,
        });
        axios.delete('api/entries/' + data.id)
            .then(res => {
                if (res.data.deleted)
                    this.fetchEntries();
                else
                    this.setState({isLoading: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
                alert(error.response.data.message);
            });
    }

    handleCloseEntryOverlay(update) {
        this.setState({
            isOverlayOpen: false,
            isLoading: update,
        });

        if (update)
            this.fetchEntries();
    }

    renderEntryOverlay() {
        const data = this.state.overflowMenuEntryData;
        return (
            <EntryOverlay
                id={data ? data.id : 0}
                userId={data ? data.user_id : this.state.userId}
                initialDateTime={data ? timestampToInputVal(new Date(data.created_at).getTime()) : timestampToInputVal(Date.now())}
                initialFood={data ? data.name : ''}
                initialCalories={data ? data.calories : ''}
                initialIsCheat={data ? data.is_cheat : false}
                handleClose={this.handleCloseEntryOverlay.bind(this)}
            />
        );
    }

    render() {
        return (
            <>
                <div className="content" style={{width: '563px'}}>
                    <EntriesControl
                        showUser={user.is_admin}
                        userId={this.state.userId}
                        fromDate={this.state.fromDate}
                        toDate={this.state.toDate}
                        showAddButton={this.state.userId > 0}
                        onInputChange={e => this.handleControlInputChange(e)}
                        onClickAddEntry={() => this.handleClickAddEntry()}
                    />
                    <hr/>
                    <div className="day-list">
                        <DayList
                            error={this.state.error}
                            isLoading={this.state.isLoading}
                            data={this.state.data}
                            onClickEntryOverflow={this.handleClickEntryOverflow.bind(this)}
                            showUser={this.state.userId === 0}
                        />    
                    </div>
                </div>
                {this.state.isOverflowMenuOpen &&
                    <EntryOverflowMenu
                        target={this.state.overflowMenuTarget}
                        onMouseLeave={() => this.setState({isOverflowMenuOpen: false})}
                        onClickEdit={() => this.handleClickEntryEdit()}
                        onClickRemove={() => this.handleClickEntryRemove()}
                    />
                }
                {this.state.isOverlayOpen && this.renderEntryOverlay()}
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('js-entries-page-root')).render(
    <EntriesPage
        initialUserId={user.id}
        initialFromDate=""
        initialToDate=""
    />
);
