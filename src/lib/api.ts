import { useQuery } from '@tanstack/react-query';
import { HomeApiResponse } from '@shared/types';
const API_BASE_URL = '/api/v1';
async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: 'Request failed with status ' + res.status }));
    throw new Error(errorBody.error || 'An unknown error occurred');
  }
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || 'API returned an error');
  }
  return data.data;
}
export function useHomeData() {
  return useQuery<HomeApiResponse>({
    queryKey: ['home'],
    queryFn: () => fetcher<HomeApiResponse>('/home?url=https://animesalt.cc/'),
  });
}