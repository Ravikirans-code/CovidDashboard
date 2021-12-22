import React from 'react';
import './filterBar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASIC_STAT } from '../../actions';
class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut', date: new Date('2020-03-31') };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        console.log(this.state.date)
        return <div className="row filterPage">
            {this.props.currentView === BASIC_STAT ?
                <>
                    <div className="column">
                        <h2 className="StateName">States</h2>
                    </div>
                    <div className="column">
                        <label>Search By State</label>
                        <input type="text" onChange={this.props.handleSearch} placeholder="Type State Name Here" />
                    </div>
                </>
                :
                <>
                    <div className="column">
                        <h2 className="StateName">{this.props.stateData[0]}</h2>
                    </div>
                    <div className="column">
                        <label>Search By Dates</label>
                        <DatePicker selected={this.state.date} onChange={(e) => { this.setState({ date: e }); this.props.handleDate(e) }} autoComplete="false" />
                    </div>
                    <button class="button" onClick={() => {
                        this.props.handleCurrentView(BASIC_STAT)
                    }}>&#8592; Go To Dashboard</button>
                </>}
            {/* <div className="column">
                <DatePicker autoComplete="false" />
            </div>
            <div className="column">
                <div className="filcard">
                    <label>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="Confirmed">Confirmed Count</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label>
                </div>
            </div> */}

        </div>

    }
}

export default FilterBar;
