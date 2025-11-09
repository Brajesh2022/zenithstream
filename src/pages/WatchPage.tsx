import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useMovieData, useEpisodeData } from '@/lib/api';
import { decodeUrl, encodeUrl } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Download, Server as ServerIcon, AlertTriangle } from 'lucide-react';
import { WatchPageInfo } from '@/components/anime/WatchPageInfo';
import { Server, DownloadLink } from '@shared/types';
const WatchPageSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      </div>
      <div className="lg:col-span-1 space-y-4">
        <Skeleton className="aspect-[2/3] w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  </div>
);
export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'movie' | 'series' | null;
  const contentUrl = searchParams.get('contentUrl');
  const decodedId = id ? decodeUrl(id) : '';
  const decodedContentUrl = contentUrl ? decodeUrl(contentUrl) : '';
  const [currentIframeUrl, setCurrentIframeUrl] = useState<string | null>(decodedId);
  const { data: movieData, isLoading: isLoadingMovie } = useMovieData(decodedContentUrl);
  const { data: episodeData, isLoading: isLoadingEpisode, error: episodeError } = useEpisodeData(decodedId);
  const isLoading = (type === 'movie' && isLoadingMovie) || (type === 'series' && isLoadingEpisode);
  const data = type === 'movie' ? movieData : episodeData;
  const servers: Server[] = data?.servers || [];
  const downloadLinks: DownloadLink[] = data?.downloadLinks || [];
  useEffect(() => {
    setCurrentIframeUrl(decodedId);
  }, [decodedId]);
  if (!type || !contentUrl) {
    return <div className="text-center py-20 text-destructive">Invalid URL: Missing type or content URL.</div>;
  }
  if (isLoading) return <WatchPageSkeleton />;
  if (episodeError) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center p-8 bg-muted rounded-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="mt-4 text-2xl font-semibold text-destructive">Failed to load episode data</h2>
          <p className="text-muted-foreground mt-2">{episodeError.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
            {currentIframeUrl ? (
              <iframe
                src={currentIframeUrl}
                allowFullScreen
                className="w-full h-full"
                title="Anime Player"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Select a server to start watching.
              </div>
            )}
          </AspectRatio>
          <div className="mt-6">
            <Tabs defaultValue="servers" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="servers">Streaming Servers</TabsTrigger>
                <TabsTrigger value="downloads">Download Links</TabsTrigger>
              </TabsList>
              <TabsContent value="servers" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {servers.map((server) => (
                    <Button
                      key={server.serverName}
                      variant={currentIframeUrl === server.iframeUrl ? 'default' : 'outline'}
                      className="justify-start gap-2"
                      disabled={!server.iframeUrl}
                      onClick={() => setCurrentIframeUrl(server.iframeUrl)}
                    >
                      <ServerIcon className="h-4 w-4" />
                      <span className="truncate">{server.serverName}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="downloads" className="mt-6">
                <div className="space-y-2">
                  {downloadLinks.length > 0 ? downloadLinks.map((link, index) => (
                    <a key={index} href={link.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <Download className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">{link.server} - {link.quality}</p>
                          <p className="text-sm text-muted-foreground">{link.lang}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Download</Button>
                    </a>
                  )) : <p className="text-muted-foreground text-center py-4">No download links available.</p>}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="lg:col-span-1">
          <WatchPageInfo type={type} contentUrl={decodedContentUrl} activeEpisodeUrl={decodedId} />
        </div>
      </div>
    </div>
  );
}