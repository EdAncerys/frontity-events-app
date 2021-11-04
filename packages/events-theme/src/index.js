import Root from "./screens/index";

const myFirstTheme = {
  name: "event-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      isUrlVisible: true,
    },
  },
  actions: {
    theme: {
      toggleUrl: ({ state }) => {
        state.theme.isUrlVisible = !state.theme.isUrlVisible;
      },
    },
  },
};

export default myFirstTheme;
