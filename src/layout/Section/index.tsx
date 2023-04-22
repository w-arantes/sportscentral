import { ReactNode } from 'react';
import { Flex, FlexProps, Skeleton, Stack, Text } from '@chakra-ui/react';

interface SectionProps extends FlexProps {
  children: ReactNode;
  title: string;
  isLoading?: boolean;
}

export function Section({
  children,
  title,
  isLoading = false,
  ...rest
}: SectionProps) {
  return (
    <Flex as="section" direction="column" width="100%" height="340px" {...rest}>
      <Flex direction="row" align="center" justify="flex-start">
        <Text fontSize="title" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      {isLoading ? (
        <Stack direction="row" spacing="2rem">
          <Skeleton width="100%" height="296px" />
          <Skeleton width="100%" height="296px" />
          <Skeleton width="100%" height="296px" />
          <Skeleton width="100%" height="296px" />
        </Stack>
      ) : (
        <>
          {children}
          <Text fontSize="h2" fontWeight="bold" mt="1rem">
            {`All ${title.toUpperCase()}`}
          </Text>
        </>
      )}
    </Flex>
  );
}
