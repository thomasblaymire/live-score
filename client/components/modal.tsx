import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

interface ModalElementProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactChild
}

export function ModalElement({
  isOpen,
  onClose,
  title,
  children,
}: ModalElementProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
