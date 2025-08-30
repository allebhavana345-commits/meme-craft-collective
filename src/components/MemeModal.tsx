import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { Meme, Comment } from '@/types/meme';
import { Badge } from '@/components/ui/badge';

interface MemeModalProps {
  meme: Meme | null;
  open: boolean;
  onClose: () => void;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'MemeExpert',
    content: 'This is absolutely hilarious! 😂',
    createdAt: '2024-03-15T12:00:00Z',
    likes: 24,
  },
  {
    id: '2',
    author: 'LaughMaster',
    content: 'Can relate to this so much!',
    createdAt: '2024-03-15T14:30:00Z',
    likes: 18,
  },
];

const MemeModal = ({ meme, open, onClose }: MemeModalProps) => {
  const [isLiked, setIsLiked] = useState(meme?.isLiked || false);
  const [likes, setLikes] = useState(meme?.likes || 0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);

  if (!meme) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img 
              src={meme.imageUrl} 
              alt={meme.title}
              className="max-w-full max-h-[60vh] md:max-h-full object-contain"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col max-h-[90vh]">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{meme.category}</Badge>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                      isLiked 
                        ? 'bg-red-500/20 text-red-500' 
                        : 'bg-muted hover:bg-red-500/20 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{likes}</span>
                  </button>
                  
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <DialogTitle className="text-left">{meme.title}</DialogTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>by {meme.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
              </div>
            </DialogHeader>
            
            {/* Comments Section */}
            <div className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{comments.length} Comments</span>
              </div>
              
              {/* Add Comment */}
              <div className="flex space-x-2 mb-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[80px] resize-none"
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="btn-gradient self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemeModal;