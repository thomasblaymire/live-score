import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  results: SearchResponse[]
}

export const useSearchResults = ({ results }: Props) => {
  const router = useRouter()

  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0)
  const [resultData, setResultData] = useState<SearchResponse[]>(results)

  const handleKeyDown = useRef((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedResultIndex((prevIndex) => (prevIndex + 1) % resultData.length)
    } else if (e.key === 'ArrowUp') {
      setSelectedResultIndex(
        (prevIndex) => (prevIndex - 1 + resultData.length) % resultData.length
      )
    } else if (e.key === 'Enter') {
      const selectedTeam = resultData[selectedResultIndex].team
      router.push(
        {
          pathname: `/team/${selectedTeam.name}`,
          query: { code: selectedTeam.id },
        },
        `/team/${selectedTeam.name.toLowerCase()}`
      )
    }
  }).current

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    setResultData(results)
    setSelectedResultIndex(0)
  }, [results])

  return { selectedResultIndex, resultData }
}
