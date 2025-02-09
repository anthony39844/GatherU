import Nav from "../Nav/Nav";
import "./OrgEvents.css";
import { Event } from "../Events/EventsInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrgEvents() {
  let params = useParams();
  const orgId = params.id;
  const [orgEvents, setOrgEvents] = useState<Event[]>([]);
  useEffect(() => {
    if (!orgId) return;

    const fetchEvents = async () => {
      try {
        const accountResponse = await axios.get(
          `http://localhost:8000/get_one_account/${orgId}`
        );
        const eventsList = accountResponse.data[0].events_list || [];

        const eventRequests = eventsList.map((eventId: string) =>
          axios.get(`http://localhost:8000/event_by_id/${eventId}`)
        );

        const eventResponses = await Promise.all(eventRequests);
        const newEvents: Event[] = eventResponses.map((res) => ({
          name: res.data.name,
          time: res.data.time,
          month: res.data.month,
          day: res.data.day,
          year: res.data.year,
          place: res.data.place,
          org: res.data.org,
          org_id: res.data.org_id,
          description: res.data.description,
        }));
        setOrgEvents(newEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [orgId]);

  return (
    <>
      <Nav></Nav>
      <div className="container">
        <div className="events">
          <div className="header">
            <h1>Your Events</h1>
            <Link className="btn" to="/EventForm">
              Add Event
            </Link>
          </div>
          {orgEvents.map((data, index) => {
            return (
              <div className="event-module" key={index}>
                <div className="event-header">
                  <div className="event-title">
                    <p className="event-name">{data.name}</p>
                  </div>
                  <div className="event-info">
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    <p className="event-org">{data.org}</p>
                  </div>
                  <div className="event-info">
                    <FontAwesomeIcon icon={faClock} />
                    <p className="event-time">{data.time}</p>
                  </div>
                  <div className="event-info">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p className="event-place">{data.place}</p>
                  </div>
                </div>
                <div className="event-details">
                  <p className="event-desc">{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default OrgEvents;
