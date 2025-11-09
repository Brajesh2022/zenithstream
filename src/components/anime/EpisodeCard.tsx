import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle } from 'lucide-react';
import { encodeUrl } from '@/lib/utils';
import { Episode } from '@shared/types';
interface EpisodeCardProps {
  episode: Episode;
  seriesLink: string;
}
export function EpisodeCard({ episode, seriesLink }: EpisodeCardProps) {
  if (!episode.link) {
    return (
      <div className="group block rounded-lg overflow-hidden bg-muted/50 cursor-not-allowed">
        <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Episode not available</p>
        </AspectRatio>
        <div className="p-3">
          <p className="text-sm font-semibold truncate text-muted-foreground">
            Episode {episode.episodeNumber}: {episode.title || `Episode ${episode.episodeNumber}`}
          </p>
        </div>
      </div>
    );
  }
  const watchUrl = `/watch/${encodeUrl(episode.link)}?type=series&contentUrl=${encodeUrl(seriesLink)}`;
  return (
    <Link to={watchUrl} className="group block rounded-lg overflow-hidden bg-muted/50 transition-all duration-300 hover:bg-primary/10 hover:ring-2 hover:ring-primary">
      <AspectRatio ratio={16 / 9} className="bg-muted relative">
        <img
          src={episode.thumbnail || ''}
          alt={episode.title || `Episode ${episode.episodeNumber}`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
          <PlayCircle className="h-10 w-10 text-white/70 opacity-0 group-hover:opacity-100 group-hover:scale-110 transform transition-all duration-300" />
        </div>
      </AspectRatio>
      <div className="p-3">
        <p className="text-sm font-semibold truncate text-foreground group-hover:text-primary">
          Episode {episode.episodeNumber}: {episode.title || `Episode ${episode.episodeNumber}`}
        </p>
      </div>
    </Link>
  );
}