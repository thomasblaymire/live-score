import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function AuthModal({
  isOpen,
  onClose,
  title,
  children,
}: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="#141416"
        color="white"
        borderRadius="15px"
        border="solid 1px #353945"
      >
        <ModalHeader display="flex">
          <Text>{title}</Text>
          <ModalCloseButton padding="0" />
        </ModalHeader>
        <ModalBody padding="1rem 2rem">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
