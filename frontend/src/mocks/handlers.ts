import { http, HttpResponse } from 'msw'
import { fixtureData } from './fixtures'

export const handlers = [
  http.get('https://run.mocky.io/v3/98e4f04c-ba4a-49c8-9c8f-6c4772e9525f', () => {
    return HttpResponse.json(
      fixtureData,
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }
    )
  })
]