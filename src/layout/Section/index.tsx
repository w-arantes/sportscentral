import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Flex, FlexProps, Skeleton, Stack, Text, Link } from '@chakra-ui/react';

interface SectionProps extends FlexProps {
  children: ReactNode;
  title: string;
  isLoading?: boolean;
  isLoadingCategories?: boolean;
  footerLink?: boolean;
  url?: string;
  showTotal?: boolean;
  total?: number | null;
}

export function Section({
  children,
  title,
  isLoading = false,
  isLoadingCategories = false,
  footerLink = false,
  url,
  showTotal = false,
  total,
  ...rest
}: SectionProps) {
  return (
    <Flex
      as="section"
      direction="column"
      width="100%"
      height="400px"
      mt="2rem"
      mb="2rem"
      {...rest}
    >
      <Flex direction="row" justify="flex-start" align="center">
        <Text fontSize="title" fontWeight="bold">
          {title}
        </Text>
        {showTotal && (
          <Text fontSize="h2" ml="1rem">
            ({total})
          </Text>
        )}
      </Flex>

      <Flex
        direction="row"
        align="center"
        justify="flex-start"
        mt="1rem"
        mb="1rem"
      >
        <Stack direction="row" spacing="2rem">
          {isLoading || isLoadingCategories ? (
            <>
              {isLoadingCategories ? (
                <>
                  <Skeleton fadeDuration={1} minWidth="296px" height="40px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="40px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="40px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="40px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="40px" />
                </>
              ) : (
                <>
                  <Skeleton fadeDuration={1} minWidth="296px" height="296px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="296px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="296px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="296px" />
                  <Skeleton fadeDuration={1} minWidth="296px" height="296px" />
                </>
              )}
            </>
          ) : (
            <>{children}</>
          )}
        </Stack>
      </Flex>

      {footerLink && (
        <Flex direction="row" justify="flex-start">
          <Link
            as={NextLink}
            href={`${url}`}
            _hover={{
              textDecoration: 'none',
              color: 'brand.primary',
              transition: 'color 0.5s ease'
            }}
          >
            <Text fontSize="h2" fontWeight="bold">
              VIEW ALL
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
