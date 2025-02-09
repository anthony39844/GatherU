import Nav from "../Nav/Nav";
import "./EventForm.css"
import { useState } from "react";

function EventForm() {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (e: any) => {
      setDate(e.target.value);
    };

    const handleChange = (e: any) => {
      setMessage(e.target.value); 
    };
  
    return ( 
        <>
            <Nav></Nav>
            <div className="container">
                <div className="form-container">
                    <h1>Create an event</h1>
                    <form className="form">
                        <input type="text" id="name" name="name" required placeholder="Name of Event"></input>
                        <input type="date" id="date" name="date" required value={date} onChange={handleDateChange}></input>
                        <input type="time" id="time" name="time" required placeholder="Time of Event"></input>
                        <input type="text" id="place" name="place" required placeholder="Location of Event"></input>
                        <input type="text" id="org" name="org" required placeholder="Organization"></input>
                        <textarea id="description" name="description" rows={4} value={message} onChange={handleChange} placeholder="Description"></textarea>
                        <button className="submit-btn" type="submit">Make Event</button>
                    </form>
                </div>
            </div>

        </> 
    );
}

export default EventForm;