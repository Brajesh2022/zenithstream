import { useHomeData } from '@/lib/api';
import { HeroBanner } from '@/components/anime/HeroBanner';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { Skeleton } from '@/components/ui/skeleton';
const HomePageSkeleton = () => (
  <>
    <Skeleton className="w-full h-[60vh] md:h-[80vh]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1/6 space-y-2">
              <Skeleton className="aspect-[2/3]" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1/6 space-y-2">
              <Skeleton className="aspect-[2/3]" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
export function HomePage() {
  const { data, isLoading, error } = useHomeData();
  if (isLoading) {
    return <HomePageSkeleton />;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Failed to load data</h2>
          <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }
  const heroItem = data?.mostWatchedSeries?.[0] || data?.mostWatchedFilms?.[0];
  return (
    <div>
      {heroItem && <HeroBanner item={heroItem} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        {data?.mostWatchedSeries && data.mostWatchedSeries.length > 0 && (
          <AnimeCarousel title="Most Watched Series" items={data.mostWatchedSeries} />
        )}
        {data?.mostWatchedFilms && data.mostWatchedFilms.length > 0 && (
          <AnimeCarousel title="Most Watched Films" items={data.mostWatchedFilms} />
        )}
        {data?.categorizedLists?.map((category) => (
          <AnimeCarousel key={category.category} title={category.category} items={category.items} />
        ))}
      </div>
    </div>
  );
}