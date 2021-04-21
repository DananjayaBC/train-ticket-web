import React from 'react';
import Trains from './Trains/Trains';
import Search from './Trains/Search'

const TrainList = () => {
    return (
       <React.Fragment>
           <Search />
           <Trains />
       </React.Fragment>
    )
}
export default TrainList;