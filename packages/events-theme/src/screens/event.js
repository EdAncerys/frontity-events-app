import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import Image from "@frontity/components/image";
import { colors } from "../config/colors";

const ServeRegistration = ({
  title,
  state,
  setEmail,
  setFirstName,
  setLastName,
  setPhoneNumber,
  handleSubmitRegistration,
}) => {
  if (!state.theme.isLoggedIn)
    return (
      <div>
        <p className="card-text">
          You need to be logged in to register for {title}
        </p>
      </div>
    );

  return (
    <div className="form-group text-start">
      <div className="form-group ">
        <label>Confirm Email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Enter email or username"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group ">
        <label>First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group ">
        <label>Last Name</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter last name"
        />
      </div>
      <div className="form-group ">
        <label>Phone Number</label>
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter phone number"
        />
      </div>
      <div className="form-group ">
        <label>Select number of guests</label>
        <select className="form-select">
          <option defaultValue>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
        </select>
      </div>
      <div className="form-group form-check ">
        <input type="checkbox" className="form-check-input" />
        <label className="form-check-label">Check me out</label>
      </div>
      <button
        type="submit"
        className="btn"
        style={{ color: colors.white, backgroundColor: colors.primary }}
        onClick={handleSubmitRegistration}
      >
        Register
      </button>
    </div>
  );
};

const ServePanelistContainer = ({ panelists, ServePanelists }) => {
  if (panelists === "") return null;

  return (
    <div>
      <h4 style={styles.title}>Event Panelists</h4>
      <div style={styles.panelistContainer}>
        <ServePanelists />
      </div>
    </div>
  );
};

const event = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const event = state.source[data.type][data.id];
  // console.log("eventData ", data); //debug

  const [allPanelistsID, setAllPanelistsID] = useState([]);
  const [allPanelists, setAllPanelists] = useState([]);
  const [eventData, setEventData] = useState(event);
  const [update, setUpdate] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { title, event_date, event_logo, panelists, attendees } = eventData.acf;
  const content = eventData.content.rendered;

  // GETTING PANELIST DATA ----------------------------------------------------------------
  if (panelists !== "")
    useEffect(async () => {
      // http://localhost:8888/events/wp-json/wp/v2/panelists
      // console.log("get panelists triggered"); // debug
      await actions.source.fetch("/panelists"); // pre-fetch required data
      const panelistsEndPoint = await state.source.get("/panelists"); // get data
      const panelistsObject = Object.values(panelistsEndPoint.items);
      const allPanelists = panelistsObject.map((panelist) => {
        return state.source[panelist.type][panelist.id];
      });
      // console.log("panelists ", panelistsEndPoint); // debug
      setAllPanelists(allPanelists);

      // Extracting event panelist IDs
      const panelistsID = Object.values(panelists).map((panelist) => {
        return panelist.ID;
      });
      setAllPanelistsID(panelistsID);
    }, []);

  // HELPERS ----------------------------------------------------
  const handleSubmitRegistration = async () => {
    console.log("handleSubmitRegistration triggered");
    const URL = "http://localhost:8888/events/wp-json/wp/v2/registrations";
    const jwt = state.theme.jwt;
    if (!jwt) return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    };

    const userCredentials = JSON.stringify({
      title: `${firstName} - ${lastName}`,
      content: "Event registration form",
      status: "publish",
      fields: {
        first_name: firstName,
        last_name: lastName,
        email,
        telephone: phoneNumber,
        company: "",
        job_tilte: "",
        event_id: [
          {
            ID: eventData.id,
          },
        ],
      },
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: userCredentials,
    };
    try {
      const data = await fetch(URL, requestOptions);
      const response = await data.json();
      if (response.id) {
        const URL = `http://localhost:8888/events/wp-json/wp/v2/events/${eventData.id}`;
        // Extracting event panelist IDs
        let updatedAttendees;
        if (attendees) {
          const currentAttendees = Object.values(attendees).map((attendee) => {
            return { ID: attendee.ID };
          });
          updatedAttendees = [...currentAttendees, { ID: response.id }];
        } else {
          updatedAttendees = [{ ID: response.id }];
        }

        const eventAttendees = JSON.stringify({
          fields: {
            attendees: updatedAttendees,
          },
        });
        const requestOptions = {
          method: "POST",
          headers,
          body: eventAttendees,
        };

        const data = await fetch(URL, requestOptions);
        const updateResponseData = await data.json();
        console.log("updateResponseData", updateResponseData);

        // updating screen data --------------------------------
        await actions.source.fetch(`${state.router.link}`); // pre-fetch required data
        const updateData = state.source.get(state.router.link);
        const updateEvent = state.source[updateData.type][updateData.id];
        console.log("updateEvent", updateEvent);
        setEventData(updateEvent);
      } else {
        console.log("Failed to update event data");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const ServePanelists = () => {
    if (panelists === "") return null;

    return allPanelists.map((panelist) => {
      if (!allPanelistsID.includes(panelist.id)) return;
      const { first_name, last_name, email, image } = panelist.acf;

      return (
        <div key={panelist.id}>
          <div
            className="card"
            style={{ width: "14rem", marginBlockStart: 10 }}
          >
            <Image src={image.url} alt={first_name} className="card-img-top" />
            <div className="card-body">
              <p className="card-text">
                {first_name} {last_name}
              </p>
              <p className="card-text">{email}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const ServeAttendeesContainer = () => {
    if (!attendees) return null;

    return (
      <div>
        <p style={{ color: colors.blue }}>
          Total attending: {attendees.length}
        </p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div className="card text-center" style={{ width: "700px" }}>
        <div className="card-header" style={styles.cardHeader}>
          <div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => actions.router.set("/events")}
            >
              Go Back
            </button>
          </div>
          <h4 style={styles.title}>{title}</h4>
        </div>
        <div className="card-body">
          <Image src={event_logo.url} alt={title} className="card-img-top" />
        </div>
        <div className="card-body m-2">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <ServePanelistContainer
            panelists={panelists}
            ServePanelists={ServePanelists}
          />
          <ServeAttendeesContainer />
        </div>

        <div className="card text-center">
          <div className="card-header">Register for {title} event</div>
          <div className="card-body">
            <ServeRegistration
              title={title}
              state={state}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhoneNumber={setPhoneNumber}
              handleSubmitRegistration={handleSubmitRegistration}
            />
          </div>

          <div className="card-footer text-muted">
            Event Starting Date: {event_date}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  cardHeader: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    paddingRight: 30,
  },
  panelistContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "50px 0",
  },
};

export default connect(event);
