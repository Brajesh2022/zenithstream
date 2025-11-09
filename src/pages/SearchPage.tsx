import { useParams } from 'react-router-dom';
import { useSearchData } from '@/lib/api';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Skeleton } from '@/components/ui/skeleton';
const SearchPageSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-[2/3]" />
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
);
export default function SearchPage() {
  const { query } = useParams<{ query: string }>();
  const decodedQuery = query ? decodeURIComponent(query) : '';
  const { data, isLoading, error } = useSearchData(decodedQuery);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
          Search Results for: <span className="text-primary">{decodedQuery}</span>
        </h1>
        {isLoading && <SearchPageSkeleton />}
        {error && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-destructive">Failed to load search results</h2>
            <p className="text-muted-foreground mt-2">{error.message}</p>
          </div>
        )}
        {data && data.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No results found</h2>
            <p className="text-muted-foreground mt-2">Try a different search term.</p>
          </div>
        )}
        {data && data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {data.map((item) => (
              <AnimeCard
                key={item.link}
                title={item.title}
                image={item.poster}
                link={item.link}
                type={item.type.toLowerCase().includes('movie') ? 'movie' : 'series'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}