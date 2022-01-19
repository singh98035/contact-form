import React, { useState, useRef } from "react";
import database from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./App.css";
import emailjs from "@emailjs/browser";

function Contact() {
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [message, setMessage] = useState(" ");
    const [loader, setLoader] = useState(false);

    const form = useRef();


    const submit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const docRef = await addDoc(collection(database, "contacts"), {
                name: name,
                email: email,
                message: message,
                mailedOn: Timestamp.now()
            });
            setLoader(false);
            alert("Your mail has been submitted");
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoader(false);
        }

        sendMail();
        e.target.reset();
    }


    function sendMail() {
        emailjs.sendForm('service_yg8ed3h', 'template_fad1v0p', form.current, 'user_LiVPS4S2pVkvnkG3y3rWs')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                alert("Something went Wrong! Check your email Address");
            });
    }

    return (
        <div className="app">
            <form ref={form} onSubmit={submit}>
                <h1>Contact Us</h1>

                <label>Name</label>
                <input
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Message</label>
                <textarea
                    placeholder="Message"
                    value={message}
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button
                    type="submit"
                    style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;