import { Text } from '@chakra-ui/react';

export interface FilterHeaderProps {
  title: string;
  subtitle: string;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <Text fontSize="md" color="gray.300">
        {title}
      </Text>
      <Text fontSize="xs">{subtitle}</Text>
    </>
  );
};
