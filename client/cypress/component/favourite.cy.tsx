describe('Favourite component', () => {
  it('toggles favourite status', () => {
    const fixture = { id: 1 }
    const userId = 1
    // const favourites = []

    // cy.stub(ReactQuery, 'useQuery').returns({
    //   data: [{ matchId: fixture.id }],
    // })

    // cy.stub(ReactQuery, 'useMutation').returns({
    //   mutate: () => {},
    // })

    // cy.mount(
    //   <Favourite fixture={fixture} userId={userId} favourites={favourites} />
    // )

    cy.get('button').click()
    cy.get('button').should('contain', '★')

    cy.get('button').click()
    cy.get('button').should('contain', '☆')
  })
})

export {}
