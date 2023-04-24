import NextLink from 'next/link';
import { Link, Tooltip } from '@chakra-ui/react';
import { CategoryEntity } from '@/domain/models';

import { CategoryTag } from './CategoryTag';

export function CategoryCard({ id, name }: CategoryEntity) {
  return (
    <Link
      as={NextLink}
      href={`/events-by-category/${id}`}
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Tooltip label="Show all category events" openDelay={500}>
        <CategoryTag name={name} isCard />
      </Tooltip>
    </Link>
  );
}
