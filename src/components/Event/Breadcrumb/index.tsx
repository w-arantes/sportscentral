import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  FlexProps
} from '@chakra-ui/react';

interface EventBreadcrumbProps extends FlexProps {
  id: string;
  category: string;
  title: string;
}

export function EventBreadcrumb({
  id,
  category,
  title,
  ...rest
}: EventBreadcrumbProps) {
  return (
    <Flex align="center" justify="flex-start" w="100%" h="56px" {...rest}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/categories/${category}`}>
            {category.toUpperCase()}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/dashboard/categories/${id}`}>
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
