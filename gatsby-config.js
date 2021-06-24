module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/App/*`] },
    },
  ],
}

