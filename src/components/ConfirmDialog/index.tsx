import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useRef } from 'react';

export interface ConfirmDialogProps {
  title: string;
  description: string;
  open: boolean;
  onClose: (action: boolean) => void;
  confirmButtonText: string;
  cancelButtonText: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  open,
  onClose,
  confirmButtonText,
  cancelButtonText,
}) => {
  const cancelRef = useRef();
  const handleClose = () => {};
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={open}
      leastDestructiveRef={cancelRef}
      isCentered
      onEsc={() => handleClose(false)}
    >
      <AlertDialogOverlay />

      <AlertDialogContent bg="gray.700" color="gray.400">
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing={4} display="flex" w="100%">
            <Button
              flex="1"
              ref={cancelRef}
              onClick={() => handleClose(false)}
              colorScheme="blackAlpha"
              size="sm"
            >
              {cancelButtonText}
            </Button>
            <Button
              size="sm"
              flex="1"
              colorScheme="pink"
              onClick={() => handleClose(true)}
              autoFocus={true}
            >
              {confirmButtonText}
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
