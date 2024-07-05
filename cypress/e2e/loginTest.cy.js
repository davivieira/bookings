describe('Login Test', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('/');
    cy.fixture('userEmailExample.json').then((user) => {
      cy.login(user.email)

      cy.contains('John Doe')
    })
    
  })
})
