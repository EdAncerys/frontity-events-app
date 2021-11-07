import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import Image from "@frontity/components/image";
import { colors } from "../config/colors";

const event = ({ state, actions }) => {
  const [allPanelists, setAllPanelists] = useState([]);
  const [allPanelistsID, setAllPanelistsID] = useState([]);
  const data = state.source.get(state.router.link);
  const eventData = state.source[data.type][data.id];

  const { title, event_date, event_logo, panelists } = eventData.acf;
  const content = eventData.content.rendered;
  console.log(panelists);

  // GETTING PANELIST DATA ----------------------------------------------------------------
  if (panelists !== "")
    useEffect(async () => {
      // http://localhost:8888/events/wp-json/wp/v2/panelists
      await actions.source.fetch("/panelists"); // pre-fetch required data
      const panelistsEndPoint = await state.source.get("/panelists"); // get data
      const panelistsObject = Object.values(panelistsEndPoint.items);
      const allPanelists = panelistsObject.map((panelist) => {
        return state.source[panelist.type][panelist.id];
      });
      console.log(allPanelists);
      setAllPanelists(allPanelists);

      // Extracting event panelist IDs
      const panelistsID = Object.values(panelists).map((panelist) => {
        return panelist.ID;
      });
      setAllPanelistsID(panelistsID);
    }, []);

  // HELPERS ----------------------------------------------------
  const ServePanelistContainer = () => {
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

  const ServeRegistration = () => {
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
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter email or username"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group ">
          <label>Select number of guests</label>
          <select className="form-select">
            <option selected>Open this select menu</option>
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
          // onClick={handleUserLogin}
        >
          Register
        </button>
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
          <ServePanelistContainer />
        </div>

        <div className="card text-center">
          <div className="card-header">Register for {title} event</div>
          <div className="card-body">
            <ServeRegistration />
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
