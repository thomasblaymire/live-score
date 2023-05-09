import React from 'react'
import { mount } from 'cypress/react18'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { StandingsList } from '../../components/features/standings/standings-list'

describe('StandingsList', () => {
  const competitions = [{}]
  const isLoading = false

  const queryClient = new QueryClient()

  beforeEach(() => {
    cy.intercept('GET', '/api/leagues', { fixture: 'competitions.json' })
  })

  it('renders the competition list', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {/* <StandingsList competitions={competitions} isLoading={isLoading} /> */}
        </ChakraProvider>
      </QueryClientProvider>
    )

    cy.get('[data-test="competition-list"]').should('be.visible')
  })

  it('renders the competition items', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {/* <StandingsList competitions={competitions} isLoading={isLoading} /> */}
        </ChakraProvider>
      </QueryClientProvider>
    )

    cy.wait(500)
    cy.get('[data-test="competition-list"] > a').should('have.length', 2)
  })

  it('renders competition item with correct name', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {/* <StandingsList competitions={competitions} isLoading={isLoading} /> */}
        </ChakraProvider>
      </QueryClientProvider>
    )

    cy.get('[data-test="competition-list"] > a')
      .first()
      .contains('Premier League')
  })

  it('renders competition item with correct logo', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {/* <StandingsList competitions={competitions} isLoading={isLoading} /> */}
        </ChakraProvider>
      </QueryClientProvider>
    )

    cy.get('[data-test="competition-list"] > a')
      .first()
      .find('img')
      .should('have.attr', 'src')
      .and('match', /premier-league-logo\.png/)
  })
})

export {}
