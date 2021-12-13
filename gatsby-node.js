/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const fetchCases = require("./src/helpers/asyncFetch").fetchCases

exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  const [cases, lastUpdate] = await fetchCases()
  // Create a page that lists all Pokémon.
  createPage({
    path: `/`,
    component: require.resolve("./src/components/homepage.js"),
    context: { cases, lastUpdate },
  })
}
