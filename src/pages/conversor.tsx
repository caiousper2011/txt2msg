import { Flex, TabPanel, calc } from '@chakra-ui/react';
import { TabPanels, Tabs, useDisclosure } from '@chakra-ui/react';
import { MutableRefObject, useRef } from 'react';
import { useEffect, useState, createRef } from 'react';
import { theme } from '../styles/theme';
import { APPLICATION_WRITTER_NAME } from '../utils/index';
import { FilterHeader } from '../components/FilterHeader';
import { FilterTabHeader } from '../components/FilterTabHeader';
import { FilterByContacts } from '../components/FilterByContacts';
import { FilterByDates } from '../components/FilterByDates';
import { Message } from '../components/Message';
import { MessageApp } from '../components/MessageApp';
import { SearchMessages } from '../components/SearchMessages';
import { SelectionMainContactDialog } from '../components/SelectionMainContactDialog';
import { useConversationFilters } from '../contexts/ConversationFilters';
import { MessagesHeader } from '../components/MessagesHeader';
import { useConversation } from '../contexts/ConversationContext';

const Conversor: React.FC = () => {
  const {
    isOpen: isSelectMainContactDialogOpen,
    onOpen: openSelectMainContactDialog,
    onClose: handleCloseSelectMainDialog,
  } = useDisclosure();
  const { mainContact } = useConversation();
  const { filteredMessages, highLightContact } = useConversationFilters();
  const { isOpen: showMenu, onToggle: onMenuToggle } = useDisclosure();
  const [messageBoxRef, setMessageBoxRef] = useState(
    [] as MutableRefObject<HTMLDivElement>[],
  );
  const messagesContainerRef = useRef<HTMLDivElement>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setMessageBoxRef(
      Array(filteredMessages.length)
        .fill(undefined)
        .map(() => createRef()),
    );
  }, [filteredMessages]);

  useEffect(() => {
    openSelectMainContactDialog();
  }, [openSelectMainContactDialog]);

  return (
    <>
      <Flex
        w={calc.subtract('100vw', `${theme.space[12]}`)}
        h={calc.subtract('100vh', '110px')}
        bg="gray.800"
        mx={6}
        mt={6}
        borderRadius={4}
        flexDirection="column"
      >
        <MessagesHeader
          onMenuToggle={onMenuToggle}
          showMenu={showMenu}
          openSelectMainContactDialog={openSelectMainContactDialog}
        />

        <Flex position="relative" flex="1" direction="row" overflow="hidden">
          {showMenu && (
            <Flex
              w="320px"
              bg="gray.600"
              flexDirection="column"
              h="100%"
              boxShadow="2xl"
            >
              <Tabs colorScheme="pink">
                <FilterTabHeader tabs={['Contatos', 'Datas']} />
                <TabPanels>
                  <TabPanel overflow="hidden">
                    <FilterHeader
                      title="Contatos participantes da conversas."
                      subtitle="Para destacar as mensagens desse contato basta clicar que
                      as mensagens enviadas por ele serão destacadas em tela"
                    />
                    <FilterByContacts />
                  </TabPanel>
                  <TabPanel>
                    <FilterHeader
                      title="Datas onde as conversas ocorreram."
                      subtitle="Para destacar as mensagens de alguma data, basta clicar
                      que as mensagens na respectiva data selecionada serão
                      destacadas em tela"
                    />
                    <FilterByDates />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          )}
          <Flex
            flex="1"
            flexDirection="column"
            alignItems="flex-start"
            px={4}
            py={2}
            overflowY="scroll"
            ref={messagesContainerRef}
          >
            {Boolean(filteredMessages) &&
              Boolean(mainContact) &&
              filteredMessages.map((message, index) => (
                <>
                  {message.writterName === APPLICATION_WRITTER_NAME ? (
                    <MessageApp key={message.id} message={message} />
                  ) : (
                    <Flex
                      key={message.id}
                      w="100%"
                      flexDirection="column"
                      bg={
                        highLightContact === message.writterName
                          ? 'gray.700'
                          : ''
                      }
                      py={2}
                    >
                      <Message
                        message={message}
                        ref={messageBoxRef[index]}
                        highLightWhenContains={search}
                      />
                    </Flex>
                  )}
                </>
              ))}
          </Flex>
        </Flex>

        <SearchMessages
          messagesBoxRef={messageBoxRef}
          messages={filteredMessages}
          messagesContainerRef={messagesContainerRef}
          handleSearchValue={setSearch}
          search={search}
        />
      </Flex>

      <SelectionMainContactDialog
        isOpen={isSelectMainContactDialogOpen}
        onClose={handleCloseSelectMainDialog}
      />
    </>
  );
};

export default Conversor;
