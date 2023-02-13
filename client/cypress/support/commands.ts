declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    signinUser(user: any): Chainable<Element>
  }
}

Cypress.Commands.add('signinUser', (user) => {
  cy.session(
    user,
    () => {
      cy.visit('/signin')
      cy.get('input[name=email]').type(user.email)
      cy.get('input[name=password]').type(user.password)
      cy.click('button#login' as any)
    },
    {
      validate: () => {
        cy.getCookie('live_score_access_token').should('exist')
      },
    }
  )
})
