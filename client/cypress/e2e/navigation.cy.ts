describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('should navigate to the correct page', () => {
      cy.get('a[href*="matches"]').click()
      cy.url().should('include', '/matches')
      cy.get('h2').contains('Matches')

      cy.get('a[href*="teams"]').click()
      cy.url().should('include', '/teams')
      cy.get('h2').contains('Teams')

      cy.get('a[href*="predict"]').click()
      cy.url().should('include', '/predict')
      cy.get('h2').contains('Prediction')

      cy.get('a[href*="news"]').click()
      cy.url().should('include', '/news')
      cy.get('h2').contains('News Page')

      cy.get('a[href*="transfers"]').click()
      cy.url().should('include', '/transfers')
      cy.get('h2').contains('Transfers Page')
    })
  })

  context('Mobile resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-8')
    })

    it('should display a mobile menu when hamburger menu is pressed', () => {
      const hamburgerButton = '[data-test="hamburger-button"]'

      cy.get(hamburgerButton).click()

      // check that links still exist and are functionable
      cy.get('nav').find('a').should('have.length', 5).eq(1).click()
      cy.url().should('eq', 'http://localhost:3000/teams')
    })
  })
})

export {}
