import React, { useState, useEffect, Fragment, useContext } from 'react'
import Navb from '../layout/Navbar'
import firebase from '../../firebase';
import { useAuth } from "../../contexts/AuthContext"
import 'firebase/firestore';
import Spinner from '../layout/Spinner'
import moment from 'moment'

function SnapshotFirebaseAdvanced() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);


  const ref = firebase.firestore().collection('userData').doc(currentUserId).collection(moment().format('YYYY-MM-DD')).orderBy('date', "desc");

  function getPayments() {
    setLoading(true);
    ref

      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data(currentUser.uid));
        });
        setPayments(items);
        setLoading(false);
      });
  }

  useEffect(() => {
    getPayments();
    // eslint-disable-next-line
  }, []);


  return (
    <React.Fragment>
      <Navb />
      {loading ? <Spinner /> : null}
      {payments.map((payment) => (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center  ">
            <div className="crd mb-4 shadow-sm">
              <div className="card-body bg-light" key={payment.id}>
                <h5>{payment.description}</h5>
                <p className="card-text" >

                  <strong><i className="fas fa-play"></i> {payment.date} </strong>
                  <br />
                  <strong><i className="fas fa-time"></i>Payment ID - {payment.PaymentId}</strong>
                  <br />
                  <strong><i className="fas fa-time"></i>Class - {payment.class} </strong>
                  <br />
                  <strong><i className="fas fa-play"></i> Rs.{payment.price} </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}
export default SnapshotFirebaseAdvanced;