import { mount } from 'cypress/react18'

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

Cypress.Commands.add('mount', (component, options: any) => {
  return mount(component, options)
})

export {}
