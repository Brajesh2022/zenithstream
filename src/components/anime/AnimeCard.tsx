import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle } from 'lucide-react';
import { encodeUrl } from '@/lib/utils';
interface AnimeCardProps {
  title: string;
  image: string;
  link: string;
  type?: 'series' | 'movie';
}
export function AnimeCard({ title, image, link, type = 'series' }: AnimeCardProps) {
  const detailUrl = `/${type}/${encodeUrl(link)}`;
  return (
    <Link to={detailUrl} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/50 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardContent className="p-0">
          <AspectRatio ratio={2 / 3} className="bg-muted">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <PlayCircle className="h-12 w-12 text-white/70 opacity-0 group-hover:opacity-100 group-hover:scale-110 transform transition-all duration-300" />
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
      <h3 className="mt-2 text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{title}</h3>
    </Link>
  );
}