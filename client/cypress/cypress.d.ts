declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    signinUser(user: any): Chainable<Element>
    mount: typeof mount
  }
}
