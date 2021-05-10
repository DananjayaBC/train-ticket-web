import React, { Component, useState } from 'react';
import { Consumer } from '../context';
import Spinner from '../layout/Spinner'
import Train from './Train';
import Price from './Price';


class Trains extends Component {



    render() {

        return (
            <Consumer>
                {value => {
                    const { trainsList, priceList, heading } = value;
                    if (trainsList === undefined || trainsList.length === 0 && priceList === undefined || priceList.length === 0) {
                        return <Spinner />
                    } else {
                        return (
                            <React.Fragment>
                                <h3 className="text-center mb-4">{heading}</h3>
                                <div className="row">
                                    {priceList.map(a => (
                                        <Price key={a.priceLKR} priceList={a} trainsList={a}
                                        />
                                    ))}
                                </div>
                                <div className="row">
                                    {trainsList.map(b => (
                                        <Train key={b.trainID} trainsList={b} />
                                    ))}
                                </div>

                            </React.Fragment>

                        )
                    }
                }}
            </Consumer>
        )
    }
}
export default Trains;