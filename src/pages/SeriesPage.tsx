import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSeriesData, useSeasonData } from '@/lib/api';
import { decodeUrl } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EpisodeCard } from '@/components/anime/EpisodeCard';
import { Episode, Season } from '@shared/types';
const SeriesPageSkeleton = () => (
  <div>
    <div className="relative w-full h-[50vh] md:h-[60vh]">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-24 md:-mt-32 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        </div>
        <div className="md:col-span-2 pt-8 md:pt-32">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default function SeriesPage() {
  const { id } = useParams<{ id: string }>();
  const decodedId = id ? decodeUrl(id) : '';
  const { data: initialSeries, isLoading: isLoadingInitial, error: initialError } = useSeriesData(decodedId, true);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [displayedEpisodes, setDisplayedEpisodes] = useState<Episode[]>([]);
  const seasonUrlToFetch = useMemo(() => {
    if (!selectedSeason || selectedSeason.episodes.length > 0) return null;
    const seriesSlug = decodedId.split('/series/')[1]?.replace('/', '');
    const firstEpisodeInRange = selectedSeason.episodeRange?.split('-')[0];
    if (!seriesSlug || !firstEpisodeInRange) return null;
    return `https://animesalt.cc/episode/${seriesSlug}-${selectedSeason.seasonNumber}x${firstEpisodeInRange}/`;
  }, [selectedSeason, decodedId]);
  const { data: seasonData, isLoading: isLoadingSeason, error: seasonError } = useSeasonData(seasonUrlToFetch || '', !!seasonUrlToFetch);
  useEffect(() => {
    if (initialSeries?.seasons?.[0]) {
      setSelectedSeason(initialSeries.seasons[0]);
    }
  }, [initialSeries]);
  useEffect(() => {
    if (selectedSeason) {
      if (selectedSeason.episodes.length > 0) {
        setDisplayedEpisodes(selectedSeason.episodes);
      } else if (seasonData) {
        const matchingSeason = seasonData.seasons.find(s => s.seasonNumber === selectedSeason.seasonNumber);
        if (matchingSeason) {
          setDisplayedEpisodes(matchingSeason.episodes);
        }
      } else {
        setDisplayedEpisodes([]);
      }
    }
  }, [selectedSeason, seasonData]);
  const handleSeasonChange = (seasonNumber: string) => {
    const season = initialSeries?.seasons.find(s => s.seasonNumber === seasonNumber);
    if (season) {
      setSelectedSeason(season);
    }
  };
  if (isLoadingInitial) return <SeriesPageSkeleton />;
  const error = initialError || seasonError;
  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Failed to load series data</h2>
          <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }
  if (!initialSeries) return null;
  return (
    <div>
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img src={initialSeries.poster} alt={initialSeries.title} className="w-full h-full object-cover blur-lg scale-110" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-24 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <img src={initialSeries.poster} alt={initialSeries.title} className="w-full h-auto object-cover rounded-lg shadow-2xl aspect-[2/3]" />
          </div>
          <div className="md:col-span-2 pt-8 md:pt-32 text-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">{initialSeries.title}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {initialSeries.genres.map(genre => <Badge key={genre.name} variant="secondary">{genre.name}</Badge>)}
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose">{initialSeries.overview}</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Episodes</h2>
          {initialSeries.seasons.length > 1 && (
            <Select onValueChange={handleSeasonChange} defaultValue={selectedSeason?.seasonNumber || ''}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a season" />
              </SelectTrigger>
              <SelectContent>
                {initialSeries.seasons.map(season => (
                  <SelectItem key={season.seasonNumber} value={season.seasonNumber || ''}>
                    {season.name || `Season ${season.seasonNumber}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {isLoadingSeason ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-video" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedEpisodes.map(episode => (
              <EpisodeCard key={episode.link || episode.episodeNumber} episode={episode} seriesLink={decodedId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}