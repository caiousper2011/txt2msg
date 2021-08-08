import { Tab, TabList } from '@chakra-ui/react';

export interface FilterTabHeaderProps {
  tabs: string[];
}

export const FilterTabHeader: React.FC<FilterTabHeaderProps> = ({ tabs }) => {
  return (
    <TabList>
      {tabs.map((tabItem) => (
        <Tab
          key={tabItem}
          fontSize={18}
          color="whiteAlpha.700"
          _selected={{
            color: 'white',
          }}
        >
          {tabItem}
        </Tab>
      ))}
    </TabList>
  );
};
