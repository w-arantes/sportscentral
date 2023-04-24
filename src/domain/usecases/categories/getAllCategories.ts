import { httpClient } from '@/infra/http';

export const getAllCategories = async () => {
  try {
    const { data } = await httpClient.get('/categories');

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch categories data.');
  }
};
