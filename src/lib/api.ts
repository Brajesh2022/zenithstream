import { useQuery } from '@tanstack/react-query';
import { HomeApiResponse, SearchApiResponse, Series, Movie } from '@shared/types';
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
export function useSearchData(query: string) {
  return useQuery<SearchApiResponse>({
    queryKey: ['search', query],
    queryFn: () => fetcher<SearchApiResponse>(`/search?url=https://animesalt.cc/?s=${encodeURIComponent(query)}`),
    enabled: !!query,
  });
}
export function useSeriesData(url: string) {
  return useQuery<Series>({
    queryKey: ['series', url],
    queryFn: () => fetcher<Series>(`/content?tool=series&url=${encodeURIComponent(url)}`),
    enabled: !!url,
  });
}
export function useMovieData(url: string) {
  return useQuery<Movie>({
    queryKey: ['movie', url],
    queryFn: () => fetcher<Movie>(`/content?tool=movie&url=${encodeURIComponent(url)}`),
    enabled: !!url,
  });
}
export function useSeasonData(url: string) {
    return useQuery<Series>({
        queryKey: ['season', url],
        queryFn: () => fetcher<Series>(`/content?tool=series&url=${encodeURIComponent(url)}`),
        enabled: !!url,
    });
}