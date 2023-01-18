describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="matches"]').click()
    cy.url().should('include', '/matches')
    cy.get('h1').contains('Matches Page')
  })

  it('should navigate to the teams page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="teams"]').click()
    cy.url().should('include', '/matches')
    cy.get('h1').contains('Teams')
  })

  it('should navigate to the leagues page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="leagues"]').click()
    cy.url().should('include', '/matches')
    cy.get('h1').contains('Leagues Page')
  })

  it('should navigate to the news page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="news"]').click()
    cy.url().should('include', '/news')
    cy.get('h1').contains('News Page')
  })

  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="transfers"]').click()
    cy.url().should('include', '/transfers')
    cy.get('h1').contains('Transfers Page')
  })
})
