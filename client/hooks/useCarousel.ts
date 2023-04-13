import { useState } from 'react'

export const useCarousel = (length: number, show: number, step: number) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Validate the step value to be between 1 and the number of items
  const validatedStep = length % step === 0 ? step : 1

  const handleNextClick = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => {
        const newIndex = prevState + validatedStep
        return newIndex <= length - show ? newIndex : prevState
      })
    }
  }

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => {
        const newIndex = prevState - validatedStep
        return newIndex >= 0 ? newIndex : prevState
      })
    }
  }

  return { currentIndex, handleNextClick, handlePrevClick }
}
