import { ReactNode } from 'react';
import { Flex, FlexProps, Skeleton, Stack, Text } from '@chakra-ui/react';

interface SectionProps extends FlexProps {
  children: ReactNode;
  title: string;
  isLoading?: boolean;
  isLoadingCategories?: boolean;
}

export function Section({
  children,
  title,
  isLoading = false,
  isLoadingCategories = false,
  ...rest
}: SectionProps) {
  return (
    <Flex
      as="section"
      direction="column"
      width="100%"
      height="340px"
      mb="5rem"
      {...rest}
    >
      <Flex direction="row" justify="flex-start" px="36px">
        <Text fontSize="title" fontWeight="bold">
          {title}
        </Text>
      </Flex>

      <Flex direction="row" align="center" justify="center" mt="1rem">
        <Stack direction="row" spacing="2rem">
          {isLoading || isLoadingCategories ? (
            <>
              {isLoadingCategories ? (
                <>
                  <Skeleton minWidth="296px" height="40px" />
                  <Skeleton minWidth="296px" height="40px" />
                  <Skeleton minWidth="296px" height="40px" />
                  <Skeleton minWidth="296px" height="40px" />
                  <Skeleton minWidth="296px" height="40px" />
                </>
              ) : (
                <>
                  <Skeleton minWidth="296px" height="296px" />
                  <Skeleton minWidth="296px" height="296px" />
                  <Skeleton minWidth="296px" height="296px" />
                  <Skeleton minWidth="296px" height="296px" />
                  <Skeleton minWidth="296px" height="296px" />
                </>
              )}
            </>
          ) : (
            <>{children}</>
          )}
        </Stack>
      </Flex>

      <Flex direction="row" justify="flex-start" px="36px">
        <Text fontSize="h2" fontWeight="bold" mt="1rem">
          {`All ${title.toUpperCase()}`}
        </Text>
      </Flex>
    </Flex>
  );
}
