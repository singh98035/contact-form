import React, { useEffect, useState } from "react";
import { doc, onSnapshot, collection, query, orderBy, } from "firebase/firestore";
import database from "./firebase";
import "./App.css";
import moment from "moment";

function DisplayInfo() {

    const [data, setData] = useState([]);
    useEffect(() => {
        let collectionRef = collection(database, "contacts");
        let queryRef = query(collectionRef, orderBy('mailedOn', 'desc'));
        onSnapshot(queryRef, (res) => {
            let responseData = res.docs.map(e => {
                let data = e.data();
                let date = new Date(data.mailedOn.seconds * 1000);

                return {
                    id: e.id,
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    mailedOn: moment(date).format('DD-MM-YYYY h:m:s a')
                };
            });
            setData(responseData);
            // console.log("Current data: ", res.docs.map(e => e.data()));
        });
    }, [])

    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}.</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.message}</td>
                                <td>{e.mailedOn}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>


    )
}

export default DisplayInfo;