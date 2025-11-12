import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

describe('useDebounce', () => {
  it('should debounce the input value', () => {
    cy.mount(() => {
      const [value, setValue] = useState('')
      const debouncedValue = useDebounce(value, 500)

      return (
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <p>Debounced value: {debouncedValue}</p>
        </div>
      )
    })

    cy.get('input').type('hello').should('have.value', 'hello')
    cy.get('p').should('not.have.text', 'Debounced value: hello')

    cy.wait(600)

    cy.get('p').should('have.text', 'Debounced value: hello')
  })
})

export {}
