import { httpClient, HttpClientDefaultResponse } from '@/infra/http';

export const deleteCategory = async (
  categoryId: string
): Promise<HttpClientDefaultResponse> => {
  try {
    const response = await httpClient.delete(`/categories/${categoryId}`);

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to delete category ${categoryId}.`);
  }
};
