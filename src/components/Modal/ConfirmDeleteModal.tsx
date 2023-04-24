import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack
} from '@chakra-ui/react';

interface ConfirmDeleteModalProps {
  closeDialog: () => void;
  dialogState: boolean;
  onConfirm: () => void;
  dialogText: string;
  confirmLabel: string;
  cancelLabel: string;
}

export function ConfirmDeleteModal({
  closeDialog,
  dialogState,
  onConfirm,
  dialogText,
  confirmLabel,
  cancelLabel
}: ConfirmDeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={closeDialog}
      isOpen={dialogState}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent bg="gray.medium" w="600px" rounded="none">
        <AlertDialogHeader>Confim Delete</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{dialogText}</AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing="2rem">
            <Button w="100px" onClick={onConfirm}>
              {confirmLabel}
            </Button>
            <Button
              w="100px"
              variant="danger"
              ref={cancelRef}
              onClick={onConfirm}
            >
              {cancelLabel}
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
