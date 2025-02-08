import { useState } from "react";
import Nav from "../Nav/Nav";
import "./SignUp.css"

function SignIn() {
    const [signUp, setSignUp] = useState(true)

    return ( 
        <>
            <Nav></Nav>
            <div className="sign-up-container" style={{display: signUp ? "flex" : "none"}}>
                <h1 className="subtext">Sign up as an organization to promote your events!</h1>
                <div className="form-container">
                    <form className="form">
                        <input type="email" id="user" name="user" required placeholder="Organization Email"></input>

                        <input type="password" id="password" name="password" required placeholder="Password"></input>

                        <input type="email" id="emails" name="emails" multiple required placeholder="Board Member Emails (e.g. a@umn.edu, b@umn.edu)"></input>
                        <button className="submit-btn" type="submit">Sign Up</button>
                    </form>
                </div>
                <h3>Or sign in <span onClick={() => setSignUp(!signUp)}>here</span></h3>
            </div>
            <div className="sign-in-container" style={{display: signUp ? "none" : "flex"}}>
                <div className="form-container">
                    <form className="form">
                        <input type="email" id="user" name="user" required placeholder="Organization Email"></input>

                        <input type="password" id="password" name="password" required placeholder="Password"></input>

                        <button className="submit-btn" type="submit">Sign In</button>
                    </form>
                </div>
                <h3>Back to sign up <span onClick={() => setSignUp(!signUp)}>here</span></h3>
            </div>
        </> 
    );
}

export default SignIn;