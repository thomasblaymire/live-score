describe('Search', () => {
  const searchInput = '[data-test="search-input"]'
  const searchButton = '[data-test="search-button"]'

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should not display a search icon when a user is not authenticated', () => {})

  it('should display a fullpage search when a user clicks on the search icon', () => {
    cy.signinUser({ username: 'tom@test.com', password: 'test123' })
    cy.get(searchButton).click()
    cy.get(searchInput).should('exist')
  })

  it('should allow users to search for a Football team', () => {
    cy.get(searchButton).click()
    cy.get(searchInput).clear().type('leeds united')
    cy.get('[data-test="search-result"]').should('have.length', 1)
  })
})

export {}
