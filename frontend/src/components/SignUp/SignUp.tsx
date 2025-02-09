import { useState } from "react";
import Nav from "../Nav/Nav";
import "./SignUp.css";
import EventForm from "../EventForm/EventForm";
import OrgEvents from "../OrgEvents/OrgEvents";
import axios from "axios";

function SignIn() {
  const [signUp, setSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Split the input value by commas and remove any extra spaces
      const updatedContacts = value
        .split(",")
        .map((contact) => contact.trim()) // Trim whitespace from each contact
        .filter((contact) => contact); // Remove empty strings if there are accidental commas
      setFormData({
        ...formData,
        [name]: updatedContacts,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    console.log("Form Data:", formData);
    try {
      // Make POST request to your backend
      const response = await axios.post(
        "http://localhost:8000/createAccount",
        formData
      );
      console.log("Form Data Submitted:", response.data); // Handle the response data from the backend
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <>
      <Nav></Nav>
      <div
        className="sign-up-container"
        style={{ display: signUp ? "flex" : "none" }}
      >
        <h1 className="subtext">
          Sign up as an organization to promote your events!
        </h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Organization Name"
              onChange={handleChange}
            ></input>

            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Organization Email"
              onChange={handleChange}
            ></input>

            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            ></input>

            <input
              type="email"
              id="contact"
              name="contact"
              multiple
              required
              placeholder="Board Member Emails (e.g. a@umn.edu, b@umn.edu)"
              onChange={handleChange}
            ></input>
            <button className="submit-btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <h3>
          Or sign in <span onClick={() => setSignUp(!signUp)}>here</span>
        </h3>
      </div>
      <div
        className="sign-in-container"
        style={{ display: signUp ? "none" : "flex" }}
      >
        <div className="form-container">
          <form className="form">
            <input
              type="email"
              id="user"
              name="user"
              required
              placeholder="Organization Email"
            ></input>

            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
            ></input>

            <button className="submit-btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <h3>
          Back to sign up <span onClick={() => setSignUp(!signUp)}>here</span>
        </h3>
      </div>
      <EventForm></EventForm>
      <OrgEvents></OrgEvents>
    </>
  );
}

export default SignIn;
