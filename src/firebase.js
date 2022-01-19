import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"


const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyC7TRhjptZhTy-GAizUDugvMnJARY27rt4",
        authDomain: "contact-form-99b7b.firebaseapp.com",
        projectId: "contact-form-99b7b",
        storageBucket: "contact-form-99b7b.appspot.com",
        messagingSenderId: "86218206374",
        appId: "1:86218206374:web:199e5fc534de40e5521867"
    });

const database = getFirestore(firebaseApp);

export default database;