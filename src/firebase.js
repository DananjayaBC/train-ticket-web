import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCWM9L8OqeHOgtvwMEyE0QjpIoswM6kjTg",
    authDomain: "onlinetrainticket-17091.firebaseapp.com",
    databaseURL: "https://onlinetrainticket-17091-default-rtdb.firebaseio.com",
    projectId: "onlinetrainticket-17091",
    storageBucket: "onlinetrainticket-17091.appspot.com",
    messagingSenderId: "427044396791",
    appId: "1:427044396791:web:21402a60331851a5407df2",
    measurementId: "G-HFMCYLBB77"
})

export const auth = app.auth()
export default app