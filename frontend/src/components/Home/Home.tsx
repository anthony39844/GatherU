import Nav from "../Nav/Nav";
import "./Home.css"
import { useParams } from "react-router-dom";

function Home () {
    const { status } = useParams(); 
    return ( 
        <>
            <Nav status={status}></Nav>
            <div className="home-container">
                <h1 className="sub-title">The fastest way to get involved around campus.</h1>
                <div className="img-body">
                </div>
            </div>
        </>
    );
}

export default Home;