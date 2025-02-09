import { useState } from "react";
import Nav from "../Nav/Nav";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useIdContext } from "../../context/IdContext";

function SignIn() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const { setId, setOrg } = useIdContext();
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const contact = form.get("contact") as string;
    const contactList = contact
      ? contact.split(",").map((item) => item.trim())
      : [];
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    try {
      const response = await axios.post("http://localhost:8000/createAccount", {
        username: username,
        email: email,
        password: password,
        contact: contactList,
      });
      console.log("Form Data Submitted:", response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const response = await axios.post("http://localhost:8000/loginAccount", {
        email: email,
        password: password,
      });
      console.log("Form Data Submitted:", response.data);
      if (response.status == 200) {
        setId(response.data.id);
        setOrg(response.data.username);
        navigate(`/${response.status}`);
      }
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
          <form className="form" onSubmit={handleSignUp}>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Organization Name"
            ></input>

            <input
              type="email"
              id="email"
              name="email"
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

            <input
              type="email"
              id="contact"
              name="contact"
              multiple
              required
              placeholder="Board Member Emails (e.g. a@umn.edu, b@umn.edu)"
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
          <form className="form" onSubmit={handleSignIn}>
            <input
              type="email"
              id="email"
              name="email"
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
    </>
  );
}

export default SignIn;
