export interface PostData {
  id: string;
  authorId: string; 
  title: string;
  description: string;
  imageUri: string;
  createdAt: Date;

  address?: string;
  category?: string;
  status?: "kommende" | "pågående" | "tidligere";
  spots?: number;  
  tasks?: string[];  
  participants?: string[];

  isLiked: boolean;
  likes: number;
  comments: string[];
  commentCount: number
  isFavorited?: boolean;
}

export interface PostComment {
  id: string;
  authorId: string;
  author: string;
  comment: string;
}

export interface UserFavorite {
  userId: string;
  postId: string;
}