import { mount } from 'cypress/react18'
import { signIn } from 'next-auth/react'

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

Cypress.Commands.add('login', () => {
  cy.window().then((win) => {
    try {
      signIn('github', { callbackUrl: 'http://localhost:3000' })
    } catch (err) {
      console.log('err', err)
    }
  })
})

Cypress.Commands.add('createMockSession', () => {
  cy.window().then((win) => {
    const mockSession = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
      expires: Date.now() + 3600,
      accessToken: 'mock-access-token',
    }
    win.sessionStorage.setItem(
      'next-auth.session-token',
      JSON.stringify(mockSession)
    )
    return mockSession
  })
})

Cypress.Commands.add('mount', (component, options: any) => {
  return mount(component, options)
})

export {}
