async function getFixtures() {
  try {
  
    const response = await fetch('/api/fixtures', { next: { revalidate: 20 } })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Server data:', data)
    
    return data?.response ?? []
  } catch (error) {
    console.error('Error fetching fixtures:', error)
    return []
  }
}
export async function ServerFixtures({ children }: { children: React.ComponentType<{fixtures: any[]}> }) {
  const fixtures = await getFixtures()
  const Component = children
  return <Component fixtures={fixtures} />
}