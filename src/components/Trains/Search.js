import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../context'
import moment from 'moment'


class Search extends Component {

    state = {
        selectValue2: '',
        selectValue1: ''
    };


    findTrain = (dispatch, e, item) => {
        e.preventDefault();

        axios.get(`http://api.lankagate.gov.lk:8280/railway/1.0/train/searchTrain?startStationID=${this.state.selectValue1}&endStationID=${this.state.selectValue2}&startTime=00:00:00&endTime=23:59:00&lang=en&searchDate=${moment().format('yyyy-MM-DD')}`
            , { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer 42d59105-7b78-35b7-962f-c224be1a3828' } })
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRAINS',
                    payload: res.data.RESULTS.directTrains.trainsList,
                });


                this.setState({ selectValue1: '', selectValue2: '' })


            })
            .catch(err => console.log(err));

        axios.get(`http://api.lankagate.gov.lk:8280/railway/1.0/ticket/getPrice?startStationID=${this.state.selectValue1}&endStationID=${this.state.selectValue2}&lang=en`
            , { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer 42d59105-7b78-35b7-962f-c224be1a3828' } })
            .then(res => {
                dispatch({
                    type: 'SEARCH_PRICES',
                    payload: res.data.RESULTS.priceList,
                });


                this.setState({ selectValue1: '', selectValue2: '' })

            })
            .catch(err => console.log(err));
    }

    handleChange1 = e => {
        this.setState({ selectValue2: e.target.value });
    }
    handleChange = e => {
        this.setState({ selectValue1: e.target.value });
    }


    render() {

        const stations = require("../../stations.json");
        return (

            <Consumer>

                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-3">
                            <h1 className="display-5 text-center">
                                <i className="fas fa-search"></i>Search
                         </h1>
                            <p className="lead text-center">Get the Train Schedule</p>
                            <form onSubmit={this.findTrain.bind(this, dispatch)}>
                                <div className="form-group">
                                    <select type="text"
                                        className="form-control form-control-lg"
                                        value={this.state.selectValue1}
                                        onChange={this.handleChange}
                                    >

                                        {
                                            stations.stationList.map(item => (<option key={item.stationID} name="station1" onChange={this.handleChange}

                                                value={item.stationID} >{item.stationName}</option>))
                                        }
                                    </select>

                                    <br />
                                    <select type="text"
                                        className="form-control form-control-lg"
                                        value={this.state.selectValue2}
                                        onChange={this.handleChange1}
                                    >
                                        {stations.stationList.map(item1 => (<option key={item1.stationID} name="station2" onChange={this.handleChange1}

                                            value={item1.stationID} >{item1.stationName}</option>))}
                                    </select>

                                </div>


                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Search</button>
                            </form>
                        </div>
                    );
                }}

            </Consumer>

        )
    }
}
export default Search;

