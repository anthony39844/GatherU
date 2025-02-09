import Nav from "../Nav/Nav";
import "./Events.css"
import { Event } from "./EventsInterface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios';
import { useEffect, useState } from "react";

function Events() {
    const [data, setData] = useState<Event[]>([])

    useEffect(() => {
        axios.get('http://localhost:8000/events')
        .then(response => {
            const newEvents: Event[] = response.data.map((current: any) => ({
                name: current.name,
                time: current.time,
                month: current.month,
                day: current.day,
                year: current.year,
                place: current.place,
                org: current.org,
                org_id: current.org_id,
                description: current.description,
              }));
              setData(newEvents); // Update state
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
    }, [])

    let groupedItems = data.reduce((acc: {[key: string]: Event[]}, item) => {
        const dateKey = `${item.month}-${item.day}-${item.year}`;
      
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
      
        acc[dateKey].push(item);
      
        return acc;
    }, {});

    return (
        <>
        <Nav></Nav>
        <div className="container">
            <div className="event-cal">
                {Object.entries(groupedItems).map(([key, value]) => {
                    return (
                        <div className="day-module" key={key}>
                            <h1 className="day-title">{`${key.split("-").slice(0, 2).join("-")}`}</h1>
                            {value.map((data, index) => {
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
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default Events;