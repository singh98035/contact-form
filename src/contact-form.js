import React, { useState, useRef, useEffect } from "react";
import database from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./App.css";
import emailjs from "@emailjs/browser";

function Contact() {
    // const [name, setName] = useState(" ");
    // const [email, setEmail] = useState(" ");
    // const [message, setMessage] = useState(" ");
    const [formErrors, setFormErrors] = useState({});
    //    const [loader, setLoader] = useState(false);

    const initialValues = { name: "", email: "", message: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const form = useRef();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };


    const submit = async (e) => {
        e.preventDefault();

        // const formValue = { name, email, message };

        setFormErrors(validate(formValues));



        try {
            const docRef = await addDoc(collection(database, "contacts"), {
                name: formValues.name,
                email: formValues.email,
                message: formValues.message,
                mailedOn: Timestamp.now()
            });
            // setLoader(false);
           // alert("Your mail has been submitted");
        } catch (e) {
            console.error("Error adding document: ", e);
            // setLoader(false);
        }

        sendMail();
        e.target.reset();
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0) {
            console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        console.log(values);
        

        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";

            console.log("email");
        }
         else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.message) {
            errors.message = "message is required";
        }
        return errors;
    };

    function sendMail() {
        emailjs.sendForm('service_yg8ed3h', 'template_fad1v0p', form.current, 'user_LiVPS4S2pVkvnkG3y3rWs')
            .then((result) => {
                alert("your mail has been Submitted");
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
                    value={formValues.name}
                    name="name"
                    onChange={handleChange}
                
                />
                <p>{formErrors.name}</p>
                <label>Email</label>
                <input
                    placeholder="Email"
                    value={formValues.email}
                    name="email"
                    onChange={handleChange}
                
                />
                <p>{formErrors.email}</p>
                <label>Message</label>
                <textarea
                    placeholder="Message"
                    value={formValues.message}
                    name="message"
                    onChange={handleChange}
                
                ></textarea>
                <p>{formErrors.message}</p>
                <button
                    type="submit"
                // style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;