export default {
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/index.ts',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    videosFolder: 'cypress/videos',
  },
}