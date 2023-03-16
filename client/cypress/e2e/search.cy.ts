describe('Search', () => {
  const searchInput = '[data-test="search-input"]'
  const searchButton = '[data-test="search-button"]'

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  beforeEach(() => {
    // Visit the page with the search component
    cy.visit('/search')
  })

  it('displays search results for a valid query', () => {
    // Type a search query into the search input
    cy.get('input[type="search"]').type('cypress')

    // Click the search button
    cy.get('button[type="submit"]').click()

    // Check that search results are displayed
    cy.get('.search-results').should('exist')
  })

  it('displays a message for an empty search', () => {
    // Leave the search input empty
    cy.get('input[type="search"]').clear()

    // Click the search button
    cy.get('button[type="submit"]').click()

    // Check that an error message is displayed
    cy.get('.error-message').should('contain', 'Please enter a search term')
  })

  it('displays an error message for an invalid search', () => {
    // Type an invalid search query into the search input
    cy.get('input[type="search"]').type('qwertyuiopasdfghjklzxcvbnm')

    // Click the search button
    cy.get('button[type="submit"]').click()

    // Check that an error message is displayed
    cy.get('.error-message').should(
      'contain',
      'No results found for search term'
    )
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
