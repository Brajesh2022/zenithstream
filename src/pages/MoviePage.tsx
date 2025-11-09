import { useParams, Link } from 'react-router-dom';
import { useMovieData } from '@/lib/api';
import { decodeUrl, encodeUrl } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download, Server as ServerIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const MoviePageSkeleton = () => (
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
export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const decodedId = id ? decodeUrl(id) : '';
  const { data: movie, isLoading, error } = useMovieData(decodedId);
  if (isLoading) return <MoviePageSkeleton />;
  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Failed to load movie data</h2>
          <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }
  if (!movie) return null;
  const firstWatchableServer = movie.servers.find(s => s.iframeUrl);
  const watchUrl = firstWatchableServer ? `/watch/${encodeUrl(firstWatchableServer.iframeUrl)}?type=movie&contentUrl=${encodeUrl(decodedId)}` : '#';
  return (
    <div>
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover blur-lg scale-110" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-24 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover rounded-lg shadow-2xl aspect-[2/3]" />
          </div>
          <div className="md:col-span-2 pt-8 md:pt-32 text-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map(genre => <Badge key={genre.name} variant="secondary">{genre.name}</Badge>)}
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose">{movie.overview}</p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!firstWatchableServer}>
              <Link to={watchUrl}>
                <PlayCircle className="mr-2 h-6 w-6" />
                Watch Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="servers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="servers">Streaming Servers</TabsTrigger>
            <TabsTrigger value="downloads">Download Links</TabsTrigger>
          </TabsList>
          <TabsContent value="servers" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.servers.map((server) => (
                <Button key={server.serverName} asChild variant="outline" className="justify-start gap-2" disabled={!server.iframeUrl}>
                  <Link to={`/watch/${encodeUrl(server.iframeUrl || '')}?type=movie&contentUrl=${encodeUrl(decodedId)}`}>
                    <ServerIcon className="h-4 w-4" />
                    <span>{server.serverName} ({server.serverType})</span>
                  </Link>
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="downloads" className="mt-6">
            <div className="space-y-2">
              {movie.downloadLinks.map((link, index) => (
                <a key={index} href={link.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">{link.server} - {link.quality}</p>
                      <p className="text-sm text-muted-foreground">{link.lang}</p>
                    </div>
                  </div>
                  <Button size="sm">Download</Button>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}