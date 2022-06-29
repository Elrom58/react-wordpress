const settings = {
  name: "react-wordpress",
  state: {
    frontity: {
      //"url": "https://test.frontity.org",
      url: "http://wordpress.dd.local",
      title: "React meets Wordpress",
      description: "",
    },
  },
  packages: [
    {
      name: "@frontity/twentytwenty-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            //["Nature", "category/nature/"],
            ["Landschaft", "/category/landschaft/"],
            ["Street", "/category/street/"],
            ["Contact Us", "/contact-us/"],
            ["About Us", "/about-us/"],
          ],
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
          //"url": "https://test.frontity.org"
          "url": "http://wordpress.dd.local"
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@aamodtgroup/frontity-contact-form-7",
  ],
};


export default settings;
