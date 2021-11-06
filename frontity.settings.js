const settings = {
  name: "frontity-events-app",
  state: {
    frontity: {
      url: "https://skylarkcreative.co.uk/",
      title: "Test Frontity App",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "events-theme",
      state: {
        theme: {
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "http://localhost:8888/events",
          postTypes: [
            {
              type: "events",
              endpoint: "events",
              archive: "events",
            },
            {
              type: "panelists",
              endpoint: "panelists",
              archive: "panelists",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
