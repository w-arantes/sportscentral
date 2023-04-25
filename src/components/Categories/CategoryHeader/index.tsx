import {
  Flex,
  Text,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

interface CategoryHeaderProps {
  categoryName: string;
}

export function CategoryHeader({ categoryName }: CategoryHeaderProps) {
  return (
    <>
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              isCurrentPage
              href={`/events/category/${categoryName.toUpperCase()}`}
            >
              {categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Flex
        direction="row"
        align="flex-start"
        bg="gray.medium"
        width="100%"
        height="100px"
      >
        <Box w="32px" h="100%" bg="brand.primary" />

        <Flex
          direction="row"
          align="center"
          justify="flex-start"
          width="100%"
          height="100%"
          ml="1rem"
        >
          <Text
            fontSize="section"
            fontWeight="bold"
            color="white"
            casing="uppercase"
          >
            {`${categoryName} EVENTS`}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
