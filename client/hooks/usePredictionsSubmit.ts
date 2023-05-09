import { API_URL } from '@/lib/constants'
import { getCookie } from '@/lib/cookie'
import axios from 'axios'

export const usePredictionsSubmit = (predictions: Prediction) => {
  const handlePredictionsSubmit = async () => {
    const formattedPredictions = Object.entries(predictions).map(
      ([matchId, scores]) => {
        return {
          matchId: parseInt(matchId),
          teamAScore: scores.teamA,
          teamBScore: scores.teamB,
        }
      }
    )

    const token = getCookie('token')

    try {
      const response = await axios.post(
        `${API_URL}/predictions`,
        { predictions: formattedPredictions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return handlePredictionsSubmit
}
