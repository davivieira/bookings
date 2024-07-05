Cypress.Commands.add('login', (email) => {
  cy.get('[data-testid="login-button"]').click()
  cy.get('input[name=email]').type(email)
  cy.get('[data-testid="submit-login-button"]').click()
})