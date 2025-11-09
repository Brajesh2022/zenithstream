import { Link } from 'react-router-dom';
import { useMovieData, useSeriesData } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, encodeUrl } from '@/lib/utils';
import { Tv, Film } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Episode, Season } from '@shared/types';
interface WatchPageInfoProps {
  type: 'movie' | 'series';
  contentUrl: string;
  activeEpisodeUrl?: string;
}
const WatchPageInfoSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-[2/3] w-full" />
    <Skeleton className="h-6 w-3/4" />
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  </div>
);
export function WatchPageInfo({ type, contentUrl, activeEpisodeUrl }: WatchPageInfoProps) {
  const { data: movieData, isLoading: isLoadingMovie } = useMovieData(contentUrl, type === 'movie');
  const { data: seriesData, isLoading: isLoadingSeries } = useSeriesData(contentUrl, type === 'series');
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  useEffect(() => {
    if (type === 'series' && seriesData && activeEpisodeUrl) {
      const activeSeason = seriesData.seasons.find(season =>
        season.episodes.some(ep => ep.link === activeEpisodeUrl)
      );
      setCurrentSeason(activeSeason || null);
    }
  }, [seriesData, activeEpisodeUrl, type]);
  if ((type === 'movie' && isLoadingMovie) || (type === 'series' && isLoadingSeries)) {
    return <WatchPageInfoSkeleton />;
  }
  if (type === 'movie' && movieData) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <Film className="w-5 h-5" />
          <span>Now Playing</span>
        </h3>
        <img src={movieData.poster} alt={movieData.title} className="rounded-lg aspect-[2/3] object-cover" />
        <h4 className="text-lg font-semibold">{movieData.title}</h4>
      </div>
    );
  }
  if (type === 'series' && seriesData && currentSeason) {
    const episodesToList: Episode[] = currentSeason.episodes;
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <Tv className="w-5 h-5" />
          <span>Episodes - {currentSeason.name || `Season ${currentSeason.seasonNumber}`}</span>
        </h3>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="space-y-2">
            {episodesToList.map((episode) => {
              if (!episode.link) return null;
              const isActive = episode.link === activeEpisodeUrl;
              const watchUrl = `/watch/${encodeUrl(episode.link)}?type=series&contentUrl=${encodeUrl(contentUrl)}`;
              return (
                <Link
                  key={episode.link}
                  to={watchUrl}
                  className={cn(
                    "block p-3 rounded-md transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted"
                  )}
                >
                  <p className="font-semibold text-sm truncate">
                    Ep {episode.episodeNumber}: {episode.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }
  return null;
}