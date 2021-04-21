import React, { Component, useState } from 'react';
import { Consumer } from '../context';
import Spinner from '../layout/Spinner'
import { Button } from 'react-bootstrap'
import StripeCheckout from "react-stripe-checkout"
import Price from './Price'



function Trains() {


    const [product, setProduct] = useState({
        name: " {trainsList.startStationName}",
        price: "20",
        productBy: "facebook",

    });

    const makePayment = token => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`http://localhost:8282/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE ", response)
            const { status } = response;
            console.log("STATUS", status)
        })
            .catch(error => console.log(error))
    }

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
                                {priceList.map(priceList => (
                                    <React.Fragment key={priceList.priceLKR} priceList={priceList} >
                                        <div className="col-md-6 text-center">
                                            <div className="crd mb-4 shadow-sm ">
                                                <div className="card-body  bg-warning">

                                                    <p className="card-text">
                                                        <strong>Class </strong>: {priceList.className}
                                                        <br />

                                                        <StripeCheckout stripeKey="pk_test_51IRFO9B5pb3DZVnCWpMZmfWyao0MAfm1eYNTNOWQMvsvra8VE3YXsobJK0bxOm6Sj1wTy3S3P2w38NsZOZdRZjIx00qpLZDdVg" token={makePayment} name={priceList.priceLKR} amount={priceList.priceLKR * 100}>
                                                            <Button variant="danger" >Rs.{priceList.priceLKR}</Button>
                                                        </StripeCheckout>

                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>

                                ))}
                            </div>
                            <div className="row">
                                {trainsList.map(trainsList => (
                                    <React.Fragment key={trainsList.trainID} trainsList={trainsList} >
                                        <div className="col-md-6 text-center">
                                            <div className="crd mb-4 shadow-sm">
                                                <div className="card-body bg-light">
                                                    <h5>{trainsList.startStationName} - {trainsList.endStationName}</h5>
                                                    <p className="card-text">
                                                        <strong><i className="fas fa-time"></i>Arrival Time </strong>: {trainsList.arrivalTime}
                                                        <br />
                                                        <strong><i className="fas fa-play"></i>Arrival Time End Station </strong>: {trainsList.arrivalTimeEndStation}
                                                        <br />
                                                        <strong><i className="fas fa-play"></i>Final Station </strong>: {trainsList.finalStationName}

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>

                        </React.Fragment>

                    )
                }
            }}
        </Consumer>
    )
}

export default Trains;