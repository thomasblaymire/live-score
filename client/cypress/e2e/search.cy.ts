describe('Search', () => {
  const searchInput = '[data-test="search-input"]'
  const searchButton = '[data-test="search-button"]'

  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/')
  //   cy.intercept('/api/auth/signin', (req) => {
  //     const session: any = {
  //       user: {
  //         name: 'John Doe',
  //         email: 'johndoe@example.com',
  //         image: 'https://example.com/profile.jpg',
  //       },
  //       expires: '2023-03-20T00:00:00.000Z',
  //     }
  //     req.reply(session)
  //   })
  //   cy.wait(500)
  // })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', '/auth/signin', (req) => {
      // Set the authentication token in the response
      req.reply({
        status: 200,
        body: {
          token: 'fake-token',
        },
      })
    })
    cy.visit('/auth/signin')

    // Fill in the login form and submit it
    cy.get('[data-test=signin-input-email]').type('testuser')
    cy.get('[data-test=signin-input-password]').type('password')
    cy.get('form').submit()
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

  it('should highlight the first result when the user types in text and tabs through the results', () => {
    cy.get('[data-test="search-input"]').type('search term{tab}')
    cy.get('[data-test="search-result"]')
      .first()
      .should('have.css', 'background-color', 'rgb(49, 49, 49)')
  })

  it('should highlight the second result when the user types in text and tabs through the results twice', () => {
    cy.get('[data-test="search-input"]').type('search term{tab}{tab}')
    cy.get('[data-test="search-result"]')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(49, 49, 49)')
  })

  it('should wrap around to the first result when the user tabs from the last result', () => {
    cy.get('[data-test="search-input"]').type('search term{tab}{tab}{tab}')
    cy.get('[data-test="search-result"]')
      .first()
      .should('have.css', 'background-color', 'rgb(49, 49, 49)')
  })

  it('should not highlight any results when the user has not typed in text', () => {
    cy.get('[data-test="search-result"]').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    )
  })
})

export {}
