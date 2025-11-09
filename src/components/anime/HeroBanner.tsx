import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { HomeItem } from '@shared/types';
import { encodeUrl } from '@/lib/utils';
interface HeroBannerProps {
  item: HomeItem;
}
export function HeroBanner({ item }: HeroBannerProps) {
  const detailUrl = `/${item.link.includes('/movie/') ? 'movie' : 'series'}/${encodeUrl(item.link)}`;
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] text-white">
      <div className="absolute inset-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="max-w-lg animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            {item.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-prose">
            Discover the latest episodes and immerse yourself in the world of {item.title}.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to={detailUrl}>
                <PlayCircle className="mr-2 h-6 w-6" />
                Watch Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}