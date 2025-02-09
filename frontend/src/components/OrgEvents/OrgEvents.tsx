import Nav from "../Nav/Nav";
import "./OrgEvents.css"
import { Event } from "../Events/EventsInterface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from "react-router-dom";

function OrgEvents() {
    let orgId = "2"
    let data: Event[] = [ 
        {"name":"CASA chinese new years the best day gong xi fa cai hong bao", month: 2, day: 14, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"this is the best time of year where i am going to get hella money and get rich so fuck yall broke boys go get your paper up. u know gong xi fa cai hong bao na lai, xin nian kuai le shen ti jian kang and things of that nature, w prosperity long fortune and thigns of that nature"}, 
        {"name":"VSAM tet show", month: 2, day: 15, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"MOMREORM"}, 
        {"name":"me", month: 2, day: 16, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"1","description":"MOMREORM"}, 
        {"name":"u know", month: 2, day: 17, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"1","description":"MOMREORM"}, 
        {"name":"the vibes", month: 2, day: 17, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"1","description":"MOMREORM"},  
    ];

    let orgEvents = data.filter((item) => {
        return item.org_id == orgId;  
    });
    
    return (
        <>
        <Nav></Nav>
        <div className="container">
            <div className="events">
                <div className="header">
                    <h1>Your Events</h1>
                    <Link className="btn" to="/EventForm">Add Event</Link>
                </div>
                {orgEvents.map((data, index) => {
                    return (
                        <div className="event-module" key={index}>
                            <div className="event-header">
                                <div className="event-title">
                                    <p className="event-name">
                                        {data.name}
                                    </p>
                                </div>
                                <div className="event-info">
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                    <p className="event-org">
                                        {data.org}
                                    </p>
                                </div>
                                <div className="event-info">
                                    <FontAwesomeIcon icon={faClock} />
                                    <p className="event-time">
                                        {data.time}
                                    </p>
                                </div>
                                <div className="event-info">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p className="event-place">
                                        {data.place}
                                    </p>
                                </div>
                            </div>
                            <div className="event-details">
                                <p className="event-desc">{data.description}</p>
                            </div>
                        </div> 
                    )
                })}
            </div>
        </div>
        </>
    );
}

export default OrgEvents;