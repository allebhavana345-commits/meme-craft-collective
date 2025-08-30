import { useState } from 'react';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import MemeCard from '@/components/MemeCard';
import CategoryFilter from '@/components/CategoryFilter';
import MemeModal from '@/components/MemeModal';
import { mockMemes } from '@/data/mockMemes';
import { Meme, MemeCategory } from '@/types/meme';

const categories: MemeCategory[] = ['All', 'Funny', 'Relatable', 'Trending', 'Random', 'Animals'];

const Index = () => {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [activeCategory, setActiveCategory] = useState<MemeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemes = mockMemes.filter(meme => {
    const matchesCategory = activeCategory === 'All' || meme.category === activeCategory;
    const matchesSearch = meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meme.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              MemeVerse
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover, create, and share the funniest memes on the internet. 
            Your daily dose of laughter awaits!
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for memes, authors, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>{mockMemes.length} Fresh Memes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Memes Grid */}
          {filteredMemes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMemes.map((meme) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  onClick={() => setSelectedMeme(meme)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No memes found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse different categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Meme Modal */}
      <MemeModal
        meme={selectedMeme}
        open={!!selectedMeme}
        onClose={() => setSelectedMeme(null)}
      />
    </div>
  );
};

export default Index;
