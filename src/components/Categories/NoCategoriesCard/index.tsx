import { Center, CenterProps, Text } from '@chakra-ui/react';

interface NoCategoriesCardProps extends CenterProps {
  message?: string;
}

export function NoCategoriesCard({
  message = 'No available categories to show',
  ...rest
}: NoCategoriesCardProps) {
  return (
    <Center w="100%" h="296px" {...rest}>
      <Text fontSize="h1" color="gray.light">
        {message}
      </Text>
    </Center>
  );
}
