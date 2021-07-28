interface ISeparateContentAndDate {
  messageDate: string;
  data: string;
}

interface IExtractWritterName {
  writterName: string;
  messageDate: string;
  data: string;
}

interface IConversation {
  writtersName?: string[];
  data: IExtractWritterName[];
  messagesDate?: string[];
}

const removalMessages = [
  'Nem mesmo o WhatsApp pode ler ou ouvi-las. Toque para saber mais.',
];

export const conversor = () => {
  const breakLinesDriveByMessageDate = (fileContent: string) => {
    const breakByDate = new RegExp(/(\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}.*)/);
    return fileContent.split(breakByDate);
  };

  const removeAnyNonRealContentOrDirty = (fileContent: string[]) => {
    const removeNonContentReg = new RegExp(/\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}/);
    return fileContent.filter((content) => {
      return (
        removeNonContentReg.test(content) &&
        removalMessages.some(
          (removalMessage) => !content.includes(removalMessage),
        )
      );
    });
  };

  const separateContentAndDate = (
    fileContent: string[],
  ): ISeparateContentAndDate[] => {
    const breakContentBySeparator = new RegExp(/(\s[-*?]\s)/);

    return fileContent.map((content) => {
      const [messageDate, _, messageContent] = content.split(
        breakContentBySeparator,
      );
      return { messageDate, data: messageContent };
    });
  };

  const extractWritterNameAndMessage = (
    fileContent: ISeparateContentAndDate[],
  ): IExtractWritterName[] => {
    const breakContentBySeparator = new RegExp(/([:*?]\s)/);

    return fileContent.map((content) => {
      const [writterName, _, messageContent] = content.data.split(
        breakContentBySeparator,
      );
      return { ...content, writterName, data: messageContent };
    });
  };

  const extractDates = (fileContent: IExtractWritterName[]): IConversation => {
    const messagesDate = [
      ...new Set(
        fileContent.map((content) => content.messageDate.split(' ').shift()),
      ),
    ];
    return {
      data: fileContent,
      messagesDate,
    };
  };

  const extractWrittersName = (fileContent: IConversation): IConversation => {
    const writtersName = [
      ...new Set(fileContent.data.map((content) => content.writterName)),
    ];

    return {
      ...fileContent,
      writtersName,
    };
  };

  const functionsToConvert: Function[] = [
    breakLinesDriveByMessageDate,
    removeAnyNonRealContentOrDirty,
    separateContentAndDate,
    extractWritterNameAndMessage,
    extractDates,
    extractWrittersName,
  ];

  const run = (fileContent: string): void => {
    const contentConverted = functionsToConvert.reduce(
      (convertedPreviousValue, conversorFunction) => {
        const convertedContent = conversorFunction(convertedPreviousValue);
        console.log(convertedContent);
        return convertedContent;
      },
      fileContent,
    );

    return contentConverted;
  };

  return {
    run,
  };
};
