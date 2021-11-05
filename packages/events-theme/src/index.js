import Root from "./screens/index";

const myFirstTheme = {
  name: "event-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      isLoggedIn: false,
    },
  },
  actions: {
    theme: {
      setLogin:
        ({ state }) =>
        (value) => {
          state.theme.isLoggedIn = value;
        },
    },
  },
};

export default myFirstTheme;
