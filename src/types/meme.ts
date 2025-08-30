export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  author: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export type MemeCategory = 'All' | 'Funny' | 'Relatable' | 'Trending' | 'Random' | 'Animals';