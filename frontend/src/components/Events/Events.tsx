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
        let isMounted = true;
        let verifiedAccounts :string[]= [];
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/events");

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

      // Fetch verification status for each event's org_id
      const verificationChecks = newEvents.map(event =>{
        if (!verifiedAccounts.includes(event.org_id)) {
            return axios
              .get(`http://localhost:8000/get_one_account/${event.org_id}`)
              .then(res => {
                const isVerified = res.data[0].status === "verified";
                
                if (isVerified) {
                    verifiedAccounts = [...new Set([...verifiedAccounts, event.org_id])];
                  console.log(verifiedAccounts)
                }
      
                return { ...event, isVerified };
              })
              .catch(() => ({ ...event, isVerified: false }));
          } else {
            return Promise.resolve({ ...event, isVerified: true }); // Skip API call if already verified
          }}
      );

      const verifiedEvents = (await Promise.all(verificationChecks)).filter(
        event => event.isVerified
      );


      if (isMounted) {
        setData(verifiedEvents); 
      }

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  fetchEvents();
  return () => {
    isMounted = false; // Cleanup function
  };
    }, [])
    
    data.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
      })

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
                            <h1 className="day-title">{`${key}`}</h1>
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