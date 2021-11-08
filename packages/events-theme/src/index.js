import Root from "./screens/index";

const myFirstTheme = {
  name: "event-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      jwt: null,
      isLoggedIn: false,
    },
  },
  actions: {
    theme: {
      beforeCSR: async ({ state, actions }) => {
        console.log("beforeCSR triggered"); // debug
        // if (document.cookie) state.theme.isLoggedIn = true;
        // await Promise.all([actions.source.fetch("/events")]);
      },
      afterCSR: async ({ state, actions }) => {
        setInterval(async () => {
          console.log("refresh cycle");
          await actions.source.fetch(`/events/`);
          // determine if there is an update between frontiy state and wp rest api info
          // if true do something
        }, 1000);
      },
      setLogin:
        ({ state }) =>
        (value) => {
          state.theme.isLoggedIn = value;
        },
      setTaken:
        ({ state }) =>
        (value) => {
          state.theme.jwt = value;
        },
    },
  },
};

export default myFirstTheme;
