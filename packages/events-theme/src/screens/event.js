import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import Image from "@frontity/components/image";

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
      <div style={{ paddingTop: 50 }}>
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
          <div className="card" style={{ width: "14rem" }}>
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

  return (
    <div>
      <div className="card text-center">
        <div className="card-header" style={styles.container}>
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
        <div className="card-footer text-start text-muted">
          Event Starting Date: {event_date}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
    justifyContent: "space-around",
    padding: "50px 0",
  },
};

export default connect(event);
