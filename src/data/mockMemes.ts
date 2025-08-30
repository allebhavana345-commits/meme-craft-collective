import { Meme } from '@/types/meme';
import meme1 from '@/assets/meme1.jpg';
import meme2 from '@/assets/meme2.jpg';
import meme3 from '@/assets/meme3.jpg';
import meme4 from '@/assets/meme4.jpg';
import meme5 from '@/assets/meme5.jpg';
import meme6 from '@/assets/meme6.jpg';

export const mockMemes: Meme[] = [
  {
    id: '1',
    title: 'When you see vegetables on your plate',
    imageUrl: meme1,
    category: 'Animals',
    likes: 1234,
    comments: 89,
    shares: 234,
    createdAt: '2024-03-15T10:30:00Z',
    author: 'CatLover2024',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Me working late again',
    imageUrl: meme2,
    category: 'Relatable',
    likes: 2156,
    comments: 345,
    shares: 678,
    createdAt: '2024-03-14T22:15:00Z',
    author: 'NightOwlDev',
    isLiked: true,
  },
  {
    id: '3',
    title: 'When you are the CEO of good vibes',
    imageUrl: meme3,
    category: 'Trending',
    likes: 5678,
    comments: 432,
    shares: 1234,
    createdAt: '2024-03-16T14:20:00Z',
    author: 'DogeBoss',
    isLiked: false,
  },
  {
    id: '4',
    title: 'Social media notifications be like',
    imageUrl: meme4,
    category: 'Relatable',
    likes: 3421,
    comments: 267,
    shares: 543,
    createdAt: '2024-03-13T18:45:00Z',
    author: 'TechMemer',
    isLiked: true,
  },
  {
    id: '5',
    title: 'Surprised Pikachu strikes again',
    imageUrl: meme5,
    category: 'Funny',
    likes: 8765,
    comments: 654,
    shares: 2345,
    createdAt: '2024-03-17T09:10:00Z',
    author: 'PokeMaster',
    isLiked: false,
  },
  {
    id: '6',
    title: 'When the code actually works',
    imageUrl: meme6,
    category: 'Relatable',
    likes: 4567,
    comments: 389,
    shares: 876,
    createdAt: '2024-03-12T16:30:00Z',
    author: 'CodeWarrior',
    isLiked: true,
  },
];