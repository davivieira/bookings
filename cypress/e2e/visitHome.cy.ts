describe('Visit HomePage', () => {
  it('should visit the root URL and display the app', () => {
    cy.visit('/')
    cy.contains('Rent your next stay')
  })
})