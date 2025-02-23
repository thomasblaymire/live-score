import { ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'

interface ModalElementProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function ModalElement({
  isOpen,
  onClose,
  title,
  children,
}: ModalElementProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
      <ModalOverlay />
      <Box mx={4}>
        <ModalContent background="#121212">
          <Box paddingBottom="3rem">
            {title ? <ModalHeader>{title}</ModalHeader> : null}
            <ModalCloseButton />
          </Box>

          <ModalBody paddingBottom="2rem">{children}</ModalBody>
        </ModalContent>
      </Box>
    </Modal>
  )
}
