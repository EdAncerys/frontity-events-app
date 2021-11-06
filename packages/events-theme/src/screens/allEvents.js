import React from "react";
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

const allEvents = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  // console.log("data", data); // debug

  // HELPERS ----------------------------------------------------
  const ServeEventComponent = ({ item }) => {
    const event = state.source[data.type][item.id].acf;
    const { title, event_date, event_ovner, event_logo, event_start_time } =
      event;
    const link = item.link;

    // HELPERS ----------------------------------------------------
    const handleGoToEvent = () => {
      actions.router.set(link);
    };

    return (
      <div className="card m-2" style={{ width: "18em" }}>
        <Image
          src={event_logo.url}
          alt={title}
          height={200}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{title}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Event Start Date: {event_date}</li>
            <li className="list-group-item">
              Event Start Time: {event_start_time}
            </li>
          </ul>
          <button className="btn btn-primary" onClick={handleGoToEvent}>
            More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.container}>
        {data.items.map((item) => {
          return <ServeEventComponent key={item.id} item={item} />;
        })}
      </div>

      <PrevNextNav>
        {data.previous && (
          <button
            onClick={() => {
              actions.router.set(data.previous);
            }}
          >
            &#171; Prev
          </button>
        )}
        {data.next && (
          <button
            onClick={() => {
              actions.router.set(data.next);
            }}
          >
            Next &#187;
          </button>
        )}
      </PrevNextNav>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
};

const Items = styled.div`
  & > a {
    display: block;
    margin: 6px 0;
    font-size: 1.2em;
    color: steelblue;
    text-decoration: none;
  }
`;
const PrevNextNav = styled.div`
  padding-top: 1.5em;

  & > button {
    background: #eee;
    text-decoration: none;
    padding: 0.5em 1em;
    color: #888;
    border: 1px solid #aaa;
    font-size: 0.8em;
    margin-right: 2em;
  }
  & > button:hover {
    cursor: pointer;
  }
`;

export default connect(allEvents);
