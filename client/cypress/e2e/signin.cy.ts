describe('Signin', () => {
  beforeEach(() => {
    cy.visit('/auth/signin')
    cy.get('[data-test="signin-input-email"]').as('email')
    cy.get('[data-test="sign-in-submit"]').as('submit')
  })

  it('should contain a form element', () => {
    cy.get('form').should('exist')
  })

  it('should require an email', () => {
    cy.get('@submit').click()
    cy.get('input:invalid').should('have.length', 2)
  })

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type('notanemail')
    cy.get('@submit').click()
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 2)

    cy.get('@email')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.")

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true')
  })

  it('should require a password when the email is present', () => {
    cy.get('@email').type('valid@email.com{enter}')

    cy.get('[data-test="sign-up-password"]:invalid').should('have.length', 1)

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true')
  })

  it('should allow a user to enter an email and password and then signin', () => {
    const email = 'test@example.com'
    const password = 'testpassword1'

    cy.get('[data-test="signin-input-email"]').type(email)
    cy.get('[data-test="signin-input-password"]').type(password)
    cy.get('form').submit()
  })

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    cy.visit('/login')
    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('be', '/')

    // our auth cookie should be present
    cy.getCookie('live_score_access_token').should('exist')
  })
})

export {}
