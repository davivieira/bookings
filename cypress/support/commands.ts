/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string) => {
  cy.get('[data-testid="login-button"]').click()
  cy.get('input[name=email]').type(email)
  cy.get('[data-testid="submit-login-button"]').click()
})