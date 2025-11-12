import { useState, useEffect } from 'react'

export const useStoredPredictions = () => {
  const [predictions, setPredictions] = useState<Prediction>({})

  useEffect(() => {
    const storedPredictions = localStorage.getItem('predictions')
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions))
    }
  }, [])

  const updatePrediction = (
    matchId: number,
    teamAScore: number,
    teamBScore: number
  ) => {
    setPredictions((prevPredictions) => {
      const newPredictions = {
        ...prevPredictions,
        [matchId]: { teamA: teamAScore, teamB: teamBScore },
      }
      localStorage.setItem('predictions', JSON.stringify(newPredictions))
      return newPredictions
    })
  }

  return { predictions, updatePrediction }
}
