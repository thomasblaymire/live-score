import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://run.mocky.io/v3/7d632e4b-c32c-41e1-ab30-7ce76a6c4cd5', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawData = await response.json()
  

    const data = {
      response: rawData
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching fixtures:', error)
    return NextResponse.json({ error: 'Failed to fetch fixtures' }, { status: 500 })
  }
}