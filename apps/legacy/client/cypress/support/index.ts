import './commands'
import { mount } from 'cypress/react18'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      createMockSession(): any
      // add the following line to declare the login command
      signinUser(user: { email: string; password: string }): any
    }
  }
}
