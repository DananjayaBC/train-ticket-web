import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import StripeCheckout from "react-stripe-checkout"
import Train from './Train';

const Price = (props) => {
    const { priceList } = props;


    const [product, setProduct] = useState({
        name: " {trainsList.startStationName}",
        price: priceList && priceList.priceLKR,
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
        <div className="col-md-6 text-center">
            <div className="crd mb-4 shadow-sm ">
                <div className="card-body  bg-warning">

                    <p className="card-text">
                        <strong>Class </strong>: {priceList.className}
                        <br />

                        <StripeCheckout stripeKey="pk_test_51IRFO9B5pb3DZVnCWpMZmfWyao0MAfm1eYNTNOWQMvsvra8VE3YXsobJK0bxOm6Sj1wTy3S3P2w38NsZOZdRZjIx00qpLZDdVg" token={makePayment} on name={priceList.priceLKR} amount={priceList.priceLKR * 100}>
                            <Button variant="danger" >Rs.{priceList.priceLKR}</Button>
                        </StripeCheckout>

                    </p>

                </div>
            </div>
        </div>



    )

}
export default Price;