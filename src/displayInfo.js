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
                    email: data.email ,
                    message: data.message,
                    mailedOn: moment(date).format('DD-MM-YYYY h:m:s a')
                };
            });
            setData(responseData);
            // console.log("Current data: ", res.docs.map(e => e.data()));
        });
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <td>
                        Name
                    </td>
                    <td>
                        Email
                    </td>
                    <td style={{ width:'650px' }}>
                        Message
                    </td>
                    <td>
                        Time
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((e, idx) => (
                        <tr key={idx}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td className="text-limit">{e.message}</td>
                            <td>{e.mailedOn}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


    )
}

export default DisplayInfo;