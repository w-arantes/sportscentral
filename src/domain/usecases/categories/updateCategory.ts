import { httpClient, HttpClientDefaultResponse } from '@/infra/http';

export const updateCategory = async (
  currentId: string,
  id: string,
  name: string
): Promise<HttpClientDefaultResponse> => {
  try {
    const response = await httpClient.put(`/categories/${currentId}`, {
      id,
      name
    });

    return response;
  } catch (error) {
    throw new Error(`Unable to update category ${currentId}`);
  }
};
