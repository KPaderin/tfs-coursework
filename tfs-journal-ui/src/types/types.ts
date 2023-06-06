export interface User {
  _id?: string;
  name?: string;
  role?: string[];
  image?: string;
}

export interface CommentType {
  _id?: string;
  image?: string;
  author: {
    _id: string;
    image?: string;
    name?: string;
  };
  value?: string;
  date: string;
}

export interface Post {
  _id: string;
  postTitle: string;
  date: string;
  viewers: number;
  genre: string;
  likes: number;
  comments: CommentType[];
  image?: string;
  value: string;
  author?: User;
  isLiked?: boolean | 'loading';
}

export interface Draft {
  _id: string;
  postTitle: string;
  genre?: string;
  image?: string;
  value: string;
  author?: {
    _id: string;
  };
}

export interface Genre {
  _id?: string;
  genre?: string;
}

export interface Me extends User {
  Authorization?: string;
}

export interface UserProfile {
  _id?: string;
  name?: string;
  image?: string;
  posts?: [
    {
      _id: string;
      postTitle: string;
    }
  ];
  likes?: [
    {
      _id: string;
      postTitle: string;
    }
  ];
  comments?: [
    {
      _id: string;
      value: string;
      post: {
        postTitle: string;
        _id: string;
      };
    }
  ];
}
