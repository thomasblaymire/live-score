describe('Search', () => {
  const searchInput = '[data-test="search-input"]'
  const searchButton = '[data-test="search-button"]'
  const searchResult = '[data-test="search-result"]'
  const searchOverlay = '[data-test="search-overlay"]'

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3030/api/current-user', (req) => {
      req.reply({
        status: 200,
        body: {
          user: {
            id: 1,
            email: 'user@example.com',
            name: 'John Doe',
          },
        },
      })
    })

    cy.wait(500)
    cy.visit('http://localhost:3000')
  })

  it('should display a seach icon in header', () => {
    cy.get('[data-test=search-button]').should('exist')
  })

  it('should display search results for a valid query', () => {
    cy.get(searchButton).click()
    cy.get(searchInput).type('leeds')
    cy.get(searchResult).should('exist')
  })

  it('should display a loading spinner as the results are loading', () => {
    cy.get(searchButton).click()
    cy.get(searchInput).type('leeds')
    cy.get('[data-test="loading-spinner"]').should('exist')
  })

  it('should highlight the first result when the user types in text and tabs through the results', () => {
    cy.get(searchButton).click()
    cy.wait(500)
    cy.get(searchInput).type('leeds')
    cy.get('body').trigger('keydown', {
      eventConstructor: 'KeyboardEvent',
      keyCode: 40,
      force: true,
    })
    cy.get(searchResult)
      .first()
      .should('have.css', 'background-color', 'rgb(49, 49, 49)')
  })

  it('should remove all results when the search input has been cleared', () => {
    cy.get(searchButton).click()
    cy.wait(500)
    cy.get(searchInput).type('leeds')
    cy.get(searchInput).clear()
    cy.get(searchResult).should('not.exist')
  })

  it('should close the full screen search when the esc key is pressed', () => {
    cy.get(searchButton).click()
    cy.wait(500)
    cy.get('body').trigger('keydown', {
      eventConstructor: 'KeyboardEvent',
      keyCode: 27,
      force: true,
    })
    cy.get(searchOverlay).should('not.exist')
  })

  it('should navigate to the team result page when a result is clicked', () => {
    cy.get(searchButton).click()
    cy.wait(500)
    cy.get(searchInput).type('leeds')
    cy.get(searchResult).first().click()
    cy.url().should('include', '/team')
  })
})

export {}
