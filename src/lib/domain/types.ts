export type User = {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
};

export type Track = {
  title: string;
  artist: string;
  service: string;
  url: string;
};

export type Post = {
  type: "post";
  id: string;
  user: User;
  track: Track;
  comment: string;
  likes: number;
  createdAt: string;
};

export type ListeningActivity = {
  type: "listening";
  id: string;
  user: User;
  track: Track;
  status: string;
  createdAt: string;
};

export type TimelineItem = Post | ListeningActivity;

export type TimelineFilter = "all" | "post" | "listening";
