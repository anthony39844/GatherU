import Nav from "../Nav/Nav";
import "./Events.css"
import { Event } from "./EventsInterface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'; 

function Events() {
    let data: Event[] = [ 
        {"name":"CASA chinese new years the best day gong xi fa cai hong bao", month: 2, day: 14, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"this is the best time of year where i am going to get hella money and get rich so fuck yall broke boys go get your paper up. u know gong xi fa cai hong bao na lai, xin nian kuai le shen ti jian kang and things of that nature, w prosperity long fortune and thigns of that nature"}, 
        {"name":"VSAM tet show", month: 2, day: 15, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"MOMREORM"}, 
        {"name":"me", month: 2, day: 16, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"MOMREORM"}, 
        {"name":"u know", month: 2, day: 17, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"MOMREORM"}, 
        {"name":"the vibes", month: 2, day: 17, year: 2025, "time":"5:00","place":"coffman","org":"umn","org_id":"2","description":"MOMREORM"},  
    ];

    let groupedItems = data.reduce((acc: {[key: string]: Event[]}, item) => {
        const dateKey = `${item.month}-${item.day}-${item.year}`;
      
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
      
        acc[dateKey].push(item);
      
        return acc;
    }, {});
    console.log(groupedItems)
    const groupedArrays = Object.values(groupedItems);
    console.log(groupedArrays)
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