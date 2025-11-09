import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from './AnimeCard';
import { HomeItem } from '@shared/types';
interface AnimeCarouselProps {
  title: string;
  items: HomeItem[];
}
export function AnimeCarousel({ title, items }: AnimeCarouselProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`${item.link}-${index}`} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <AnimeCard {...item} type={item.link.includes('/movie/') ? 'movie' : 'series'} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}