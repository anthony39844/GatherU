import Nav from "../Nav/Nav";
import "./EventForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIdContext } from "../../context/IdContext";
import { useNavigate } from "react-router-dom";
function EventForm() {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { org } = useIdContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!org) {
      navigate("/");
    }
  });
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    console.log(e.target.value); // Log the new date value
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    const [year, month, day] = date.split("-");
    const eventData = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
        .value,
      month: month,
      day: day,
      year: year,
      time: (e.currentTarget.elements.namedItem("time") as HTMLInputElement)
        .value,
      place: (e.currentTarget.elements.namedItem("place") as HTMLInputElement)
        .value,
      org: (e.currentTarget.elements.namedItem("org") as HTMLInputElement)
        .value,
      description: (
        e.currentTarget.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/add_events",
        eventData
      );
      console.log("Event Created:", response.data); // Log the response data
      // You can show a success message or redirect the user here
    } catch (err) {
      console.error("Error submitting the event:", err);
    }
  };
  return (
    <>
      <Nav></Nav>
      <div className="container">
        <div className="form-container">
          <h1>Create an event</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name of Event"
            ></input>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={date}
              onChange={handleDateChange}
            ></input>
            <input
              type="time"
              id="time"
              name="time"
              required
              placeholder="Time of Event"
            ></input>
            <input
              type="text"
              id="place"
              name="place"
              required
              placeholder="Location of Event"
            ></input>
            <input
              type="text"
              id="org"
              name="org"
              required
              disabled
              placeholder={org || "Organization"}
              value={org || ""}
            ></input>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={message}
              onChange={handleChange}
              placeholder="Description"
              required
            ></textarea>
            <button className="submit-btn" type="submit">
              Make Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventForm;
