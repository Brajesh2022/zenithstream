export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// ZenithStream API Types
export interface HomeItem {
  title: string;
  link: string;
  image: string;
  season?: string | null;
  episode?: string | null;
}
export interface CategorizedList {
  category: string;
  items: HomeItem[];
}
export interface HomeApiResponse {
  mostWatchedSeries: HomeItem[];
  mostWatchedFilms: HomeItem[];
  categorizedLists: CategorizedList[];
}
export interface SearchResultItem {
  title: string;
  link: string;
  poster: string;
  type: string;
}
export type SearchApiResponse = SearchResultItem[];
export interface Genre {
  name: string;
  link: string;
}
export interface Language {
  name: string;
  link: string;
}
export interface Episode {
  episodeNumber: string | null;
  title: string | null;
  link: string | null;
  thumbnail: string | null;
}
export interface Season {
  seasonNumber: string | null;
  name: string | null;
  episodeRange: string | null;
  episodeCount: number | null;
  episodes: Episode[];
}
export interface Series {
  title: string;
  poster: string;
  overview: string;
  genres: Genre[];
  languages: Language[];
  seasons: Season[];
  episodes: null; // This seems to be always null based on docs
}
export interface Server {
  serverName: string;
  serverType: string;
  iframeUrl: string | null;
}
export interface DownloadLink {
  server: string;
  lang: string;
  quality: string;
  link: string;
}
export interface Movie {
  title: string;
  poster: string;
  overview: string;
  genres: Genre[];
  languages: Language[];
  servers: Server[];
  downloadLinks: DownloadLink[];
}
export interface EpisodeApiResponse {
  servers: Server[];
  downloadLinks: DownloadLink[];
}