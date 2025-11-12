import { useMatch } from '../../hooks/useMatch'

describe('useMatch', () => {
  it('should fetch match data with the provided ID', () => {
    const id = '123'
    cy.intercept('GET', `/fixture/${id}`, { fixture: 'match.json' }).as(
      'matchRequest'
    )

    cy.wrap(useMatch(id)).should((result) => {
      expect(result.isSuccess).to.be.true
      expect(result.data).to.deep.equal({
        id: '123',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        startTime: '2023-03-16T19:00:00Z',
        score: null,
      })
    })

    cy.wait('@matchRequest')
  })

  it('should return an error if the request fails', () => {
    const id = '456'
    cy.intercept('GET', `/fixture/${id}`, { statusCode: 500 }).as(
      'matchRequest'
    )

    cy.wrap(useMatch(id)).should((result) => {
      expect(result.isError).to.be.true
      expect(result.error).to.have.property(
        'message',
        'Request failed with status code 500'
      )
    })

    cy.wait('@matchRequest')
  })
})

export {}
