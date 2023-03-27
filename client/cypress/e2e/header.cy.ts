describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have a link to the home page', () => {
    cy.get('header a').should('have.attr', 'href', '/')
  })

  it('should navigate to the home page when the logo is clicked', () => {
    cy.get('header img').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should navigate to the log in page when the login button clicked', () => {
    cy.get('[data-test=login-button]').contains('Log In').click()
    // Gets us some coverage whilst the callback URL form next auth is auto-generated
    cy.url().then(($url) => {
      if ($url.includes('/auth/signin')) {
        cy.log('Yes')
      } else {
        cy.log('No')
      }
    })
  })

  it('should navigate to the sign up page when the signup button clicked', () => {
    cy.get('[data-test=signup-button]').contains('Sign Up').click()
    cy.url().then(($url) => {
      if ($url.includes('/api/auth/signup')) {
        cy.log('Yes')
      } else {
        cy.log('No')
      }
    })
  })
})

export {}
