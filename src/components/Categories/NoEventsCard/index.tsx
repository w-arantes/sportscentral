import { Center, CenterProps, Text } from '@chakra-ui/react';

interface NoEventsCardProps extends CenterProps {
  message: string;
}

export function NoEventsCard({ message, ...rest }: NoEventsCardProps) {
  return (
    <Center w="100%" h="296px" {...rest}>
      <Text fontSize="h1" color="gray.light">
        {message}
      </Text>
    </Center>
  );
}
