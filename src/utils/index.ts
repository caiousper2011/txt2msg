import { v4 as uuidv4 } from 'uuid';
interface ISeparateContentAndDate {
  messageDate: string;
  data: string;
  id: string;
}
interface IExtractWritterName extends ISeparateContentAndDate {
  writterName: string;
}

interface IConversation {
  writtersName?: string[];
  data: IExtractWritterName[];
  messagesDate?: string[];
}

export const APPLICATION_WRITTER_NAME = 'whatsapp';

export const conversor = () => {
  const breakLinesDriveByMessageDate = (fileContent: string) => {
    const breakByDate = new RegExp(
      /(\d{2}\/\d{2}\/(\d{4}|\d{2})\s\d{2}:\d{2}.*)/,
    );
    return fileContent.split(breakByDate);
  };

  const removeAnyNonRealContentOrDirty = (fileContent: string[]) => {
    const removeNonContentReg = new RegExp(
      /\d{2}\/\d{2}\/(\d{4}|\d{2})\s\d{2}:\d{2}/,
    );
    return fileContent.filter((content) => removeNonContentReg.test(content));
  };

  const separateContentAndDate = (
    fileContent: string[],
  ): ISeparateContentAndDate[] => {
    const breakContentBySeparator = new RegExp(/(\s[-*?]\s)/);

    return fileContent.map((content) => {
      const [messageDate, _, messageContent] = content.split(
        breakContentBySeparator,
      );
      const id = uuidv4();
      return { messageDate, data: messageContent, id };
    });
  };

  const extractWritterNameAndMessage = (
    fileContent: ISeparateContentAndDate[],
  ): IExtractWritterName[] => {
    const breakContentBySeparator = new RegExp(/([:*?]\s)/);

    return fileContent.map((content) => {
      const [writterName, _, messageContent] = breakContentBySeparator.test(
        content.data,
      )
        ? content.data.split(breakContentBySeparator)
        : [APPLICATION_WRITTER_NAME, , content.data];
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
      ...new Set(
        fileContent.data
          .map((content) => content.writterName)
          .filter((writterName) => writterName !== APPLICATION_WRITTER_NAME),
      ),
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

  const run = (fileContent: string): IConversation => {
    const contentConverted: IConversation = functionsToConvert.reduce(
      (convertedPreviousValue, conversorFunction) =>
        conversorFunction(convertedPreviousValue),
      fileContent,
    );

    return contentConverted;
  };

  return {
    run,
  };
};
