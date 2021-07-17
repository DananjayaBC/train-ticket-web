import React, { useState, } from 'react'
import { Button } from 'react-bootstrap'
import StripeCheckout from "react-stripe-checkout"
import firebase from '../../firebase';
import moment from 'moment'
import { useAuth } from "../../contexts/AuthContext"


const Price = (props) => {

    const { currentUser } = useAuth();
    const currentUserId = currentUser ? currentUser.uid : null;
    const authorId = currentUser ? currentUser.uid : null;
    const currentUserEmail = currentUser ? currentUser.email : null;
    const { priceList } = props;



    const [product, setProduct] = useState({
        name: "Alawwa - Ambepussa",
        price: priceList && priceList.priceLKR,
        productBy: "RAILWAY SL",

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

            firebase.firestore().collection("userData").doc(currentUserId).collection(moment().format('YYYY-MM-DD')).add({
                PaymentId: token.id,
                PaymentType: 'paid',
                class: priceList && priceList.className,
                date: moment().format('YYYY-MM-DD – HH:mm A'),
                description: "ALAWWA - AMBEYPUSSA",
                endStation: 'AMBEYPUSSA',
                name: currentUserEmail,
                price: `${parseInt(priceList && priceList.priceLKR)}.00`,
                startStation: 'ALAWWA'
            })

            firebase.firestore().collection("admin")
                .doc(moment().format('YYYY-MM-DD'))
                .collection('tickets')
                .add({
                    PaymentId: token.id,
                    PaymentType: 'paid',
                    class: priceList && priceList.className,
                    date: moment().format('YYYY-MM-DD – HH:mm A'),
                    description: "ALAWWA - AMBEPUSSA",
                    endStation: 'AMBEYPUSSA',
                    name: currentUserEmail,
                    price: parseInt(priceList && priceList.priceLKR),
                    startStation: 'ALAWWA'
                })
            firebase.firestore().collection("administration")
                .doc(moment().format('YYYY-MM'))
                .collection('tickets')
                .add({
                    PaymentId: token.id,
                    PaymentType: 'paid',
                    class: priceList && priceList.className,
                    date: moment().format('YYYY-MM-DD – HH:mm A'),
                    description: "ALAWWA - AMBEPUSSA",
                    endStation: 'AMBEYPUSSA',
                    name: currentUserEmail,
                    price: parseInt(priceList && priceList.priceLKR),
                    startStation: 'ALAWWA'
                })


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