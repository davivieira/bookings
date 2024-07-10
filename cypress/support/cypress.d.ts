declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login
     * @example cy.login('email@example.com')
     */
    login(email: string): Chainable<void>
  }
}
