import React, { createContext, useContext, useState } from 'react'

interface ModalContextData {
  modals: { [key: string]: boolean }
  toggleModal: (modalName: string) => void
}

interface ModalProviderProps {
  children: React.ReactChild[]
}

const ModalContext = createContext<ModalContextData>({
  modals: {},
  toggleModal: () => {},
})

export const useModalContext = () => useContext(ModalContext)

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({})

  const toggleModal = (modalName: string) =>
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }))

  return (
    <ModalContext.Provider value={{ modals, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}
