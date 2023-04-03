import { CompetitionList } from '../../components/competition-list'
import { competitionData } from '../fixtures/competitions'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

describe('Competitions list component', () => {
  const competitionList = '[data-test=competition-list]'
  const errorMsg = new Error('Error')

  beforeEach(() => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <CompetitionList />
      </QueryClientProvider>
    )
  })

  it('should render a list of different competitions with images', () => {
    cy.get(competitionList).should('exist')
    cy.get(competitionList).find('li').should('have.length.greaterThan', 5)
    cy.get(competitionList).find('img').should('be.visible')
  })
})

export {}
