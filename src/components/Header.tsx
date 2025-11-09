import { Link, useNavigate } from 'react-router-dom';
import { Search, Clapperboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
export function Header() {
  const navigate = useNavigate();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Clapperboard className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary tracking-tighter">ZenithStream</span>
          </Link>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
              <Input
                type="search"
                name="search"
                placeholder="Search anime..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}