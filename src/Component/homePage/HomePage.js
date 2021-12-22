import React from 'react';
import { connect } from 'react-redux';
import './homepage.css';
import StateCard from "../state/StateCard";
import FilterBar from "../filterBar/filterBar";

import DeatilPage from '../detailPage/DetailPage'

import { BasicStat, BASIC_STAT, TIMELINE_STAT, timelineState } from '../../actions';

import moment from 'moment';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchState: '', currentView: BASIC_STAT, States: false, stateData: '', dates: '2020-03-31' };
    }
    componentDidMount() {
        this.props.BasicStat()
    }
    handleSearch = (event) => {
        this.setState({ searchState: event.target.value });
    }
    handleDate = (event) => {
        this.setState({ dates: moment(event).format("YYYY-MM-DD") });
    }
    handleCurrentView = (view, stateData) => {
        if (view === TIMELINE_STAT) {
            this.props.timelineState()
            // this.state.stateData = stateData
        }
        this.setState({ currentView: view, searchState: "", stateData: stateData });
    }
    renderStateCard() {
        if (this.state.currentView === BASIC_STAT) {
            return this.props.statistics === undefined ? true : Object.entries(this.props.statistics).map(([key, value], index) => {
                var re = new RegExp(this.state.searchState, 'gi');
                if (key.match(re)) {
                    return <StateCard handleCurrentView={this.handleCurrentView} data={[key, value]} />
                } else {
                    return false;
                }

            })
        } else if (this.state.currentView === TIMELINE_STAT) {
            // this.props.timeline
            return this.props.timeline === undefined ? true : Object.entries(this.props.timeline).map(([key, value], index) => {
                return this.state.stateData[0] === key ?
                    Object.entries(value.dates).map(([key1, value1]) => {
                        if (key1 !== undefined && key1 === this.state.dates) {
                            return <DeatilPage data={[key, { 'dates': { [key1]: value1 } }]} />
                        } else {
                            return false
                        }

                    }) : false

            })
            // return <DeatilPage data={this.props.timeline}></DeatilPage>

        }
    }
    render() {
        var StateDA = this.renderStateCard();
        if (this.state.currentView === TIMELINE_STAT) {
            var newArr = [];
            for (var i = 0; i < StateDA.length; i++) {
                newArr = newArr.concat(StateDA[i]);
            }
            StateDA = newArr;
        }
        return <>
            <div className="header">
                <h2>Covid Tracker - India</h2>
            </div>
            <FilterBar handleCurrentView={this.handleCurrentView} currentView={this.state.currentView} stateData={this.state.stateData} handleSearch={this.handleSearch} handleDate={this.handleDate} />
            <div className="row">
                {/* < StateCard /> */}
                <div className="leftcolumn">
                    {Array.isArray(StateDA) && StateDA.every(v => v === false) === true ? <div className="search-message-empty-container">
                        <span className="search-message-empty-decal">
                            <span className="search-message-empty-decal-eyes">:</span>
                            <span>(</span>
                        </span>
                        <h2 className="search-message-empty-message">Nope, nothing.</h2>
                    </div> : StateDA}
                </div>
            </div>
        </>
    }
}

function mapStateToProps(state) {
    console.log('state', state)
    return { statistics: state.API_DATA.BASIC_STAT, timeline: state.API_DATA.TIMELINE_STAT }
}
export default connect(mapStateToProps, { BasicStat, timelineState })(HomePage);
