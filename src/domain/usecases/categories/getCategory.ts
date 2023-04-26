import { httpClient } from '@/infra/http';

export const getCategory = async (categoryId: string) => {
  try {
    const { data } = await httpClient.get('/categories', {
      params: {
        id: categoryId
      }
    });

    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find the category.');
  }
};
