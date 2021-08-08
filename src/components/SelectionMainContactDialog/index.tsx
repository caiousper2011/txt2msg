import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  UseModalProps,
} from '@chakra-ui/react';
import { useConversation } from '../../contexts/ConversationContext';

export const SelectionMainContactDialog: React.FC<UseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    conversation: { writtersName },
    handleSelectMainContact,
    mainContact,
  } = useConversation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="gray.900" m="auto">
        <ModalHeader fontSize="2xl">
          Selecionar o contato principal na conversa
        </ModalHeader>
        <ModalBody>
          <Text color="gray.300">
            Selecione o contato principal, pode ser você ou outro contato da
            lista abaixo:
          </Text>

          <HStack>
            <RadioGroup
              onChange={handleSelectMainContact}
              value={mainContact}
              colorScheme="pink"
            >
              <SimpleGrid
                flexDirection="column"
                alignItems="flex-start"
                spacing={2}
                mt={4}
              >
                {writtersName?.map((writterName) => (
                  <Radio key={writterName} value={writterName}>
                    {writterName}
                  </Radio>
                ))}
              </SimpleGrid>
            </RadioGroup>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="pink"
            disabled={!mainContact}
            onClick={onClose}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
