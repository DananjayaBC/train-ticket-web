import React from 'react'
import Navb from './layout/Navbar'
import TrainList from './TrainList'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from './context'

const TrainSearch =() =>{
    return (
        <Provider>
        <Router>
        <React.Fragment>
            <Navb />
            <br />
        <div className="container">
            <Switch>
                <Route exact path = "/" component={TrainList} />
            </Switch>
            </div> 
        </React.Fragment>  
        </Router>
        </Provider>
    )
}
export default TrainSearch;