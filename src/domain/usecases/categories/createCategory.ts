import { httpClient } from '@/infra/http';
import { CategoryEntity } from '@/domain/models';

export const createCategory = async ({ id, name }: CategoryEntity) => {
  try {
    const response = await httpClient.post('/categories', {
      id,
      name
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create category.');
  }
};
