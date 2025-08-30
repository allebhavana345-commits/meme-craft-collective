import { useState } from 'react';
import { Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Meme } from '@/types/meme';
import { Badge } from '@/components/ui/badge';

interface MemeCardProps {
  meme: Meme;
  onClick: () => void;
}

const MemeCard = ({ meme, onClick }: MemeCardProps) => {
  const [isLiked, setIsLiked] = useState(meme.isLiked || false);
  const [likes, setLikes] = useState(meme.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: meme.title,
        text: `Check out this hilarious meme: ${meme.title}`,
        url: window.location.origin + `/meme/${meme.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/meme/${meme.id}`);
    }
  };

  return (
    <div 
      className="group cursor-pointer card-glow bg-card rounded-lg overflow-hidden border border-border"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={meme.imageUrl} 
          alt={meme.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {meme.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {meme.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>by {meme.author}</span>
          <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likes}</span>
            </button>
            
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{meme.comments}</span>
            </div>
          </div>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs">{meme.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;