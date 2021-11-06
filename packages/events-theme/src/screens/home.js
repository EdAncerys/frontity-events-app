import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import Link from "@frontity/components/link";
import Image from "@frontity/components/image";
import Loading from "../components/loading";

import { colors } from "../config/colors";
import { Carousel } from "react-bootstrap";

const IMAGE_HEIGHT = 500;
const IMAGE_WIDTH = 400;

const home = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const [allEvents, setAllEvents] = useState([]);

  // GETTING DATA ----------------------------------------------------------------
  useEffect(async () => {
    await actions.source.fetch("/events"); // pre-fetch required data
    const eventEndPoint = await state.source.get("/events"); // get data
    const events = Object.values(eventEndPoint.items);
    const allEvents = events.map((event) => {
      return state.source[event.type][event.id];
    });
    setAllEvents(allEvents);
  }, []);

  if (!allEvents.length) return <Loading />;

  return (
    <div>
      <div>
        <p style={styles.title}>Our Famous Events</p>
      </div>
      <Carousel fade>
        {allEvents.map((item) => {
          const { title, event_logo } = item.acf;
          const link = item.link;
          
          // HELPERS ----------------------------------------------------
          const handleGoToEvent = () => {
            actions.router.set(link);
          };

          return (
            <Carousel.Item key={item.id}>
              <div style={styles.shade} />
              <div style={styles.shadeIntense} />
              <Image
                className="d-block w-100"
                src={event_logo.url}
                alt={title}
                height={IMAGE_HEIGHT}
                width={IMAGE_WIDTH}
                style={{ backgroundColor: "pink" }}
              />
              <Carousel.Caption>
                <div style={styles.container}>
                  <p style={styles.carouselTitle}>{title}</p>
                  <button className="btn btn-primary" onClick={handleGoToEvent}>
                    Go To Event
                  </button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    color: colors.secondary,
  },
  shade: {
    position: "absolute",
    width: "100%",
    height: IMAGE_HEIGHT,
    backgroundColor: colors.shade,
  },
  shadeIntense: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: IMAGE_HEIGHT / 3.5,
    backgroundColor: colors.shadeIntense,
  },
};

export default connect(home);
