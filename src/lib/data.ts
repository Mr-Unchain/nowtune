export type User = {
  id: string;
  name: string;
  handle: string;
  display_name?: string;
  icon_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  service?: string;
  service_track_id?: string;
  url?: string;
  thumbnail_url?: string;
  duration_ms?: number;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  track_id: string;
  comment_text: string;
  created_at: string;
};

export type ListeningActivity = {
  id: string;
  user_id: string;
  track_id: string;
  started_at: string;
  ended_at: string | null;
  source_type: string;
  created_at: string;
};

export type TrackInput =
  | { track_id: string; track?: never }
  | {
      track_id?: never;
      track: Pick<Track, "title" | "artist"> & Partial<Omit<Track, "id" | "title" | "artist" | "created_at">>;
    };

type TimelineFilter = "all" | "post" | "listening";

type TimelineItem =
  | { type: "post"; post: Post; user: User; track: Track; likes: number; liked: boolean }
  | { type: "listening"; activity: ListeningActivity; user: User; track: Track };

const now = () => new Date().toISOString();

const users = new Map<string, User>();
const tracks = new Map<string, Track>();
const posts: Post[] = [];
const listeningActivities: ListeningActivity[] = [];
const likes = new Map<string, Set<string>>();
const followers = new Map<string, Set<string>>();

let trackCounter = 1;
let postCounter = 1;
let listeningCounter = 1;

const viewerId = "u1";

function seedUsers() {
  if (users.size > 0) return;
  const baseTime = now();
  const baseUsers: User[] = [
    {
      id: viewerId,
      name: "NowTune Prototype",
      handle: "nowtune",
      bio: "Building a cozy feed for music lovers.",
      created_at: baseTime,
      updated_at: baseTime,
    },
    {
      id: "u2",
      name: "Aiko Morita",
      handle: "aikom",
      created_at: baseTime,
      updated_at: baseTime,
    },
    {
      id: "u3",
      name: "Kenji Yamato",
      handle: "kenji",
      created_at: baseTime,
      updated_at: baseTime,
    },
    {
      id: "u4",
      name: "Sara Ito",
      handle: "sara",
      created_at: baseTime,
      updated_at: baseTime,
    },
  ];

  baseUsers.forEach((user) => users.set(user.id, user));
}

function seedTracks() {
  if (tracks.size > 0) return;
  const baseTime = now();
  const baseTracks: Track[] = [
    {
      id: `t${trackCounter++}`,
      title: "Neon Skyline",
      artist: "Shibuya Echo",
      service: "YouTube",
      url: "https://youtube.com/watch?v=neon-skyline",
      created_at: baseTime,
    },
    {
      id: `t${trackCounter++}`,
      title: "Blue Monday",
      artist: "New Order",
      service: "Spotify",
      url: "https://open.spotify.com/track/bluemonday",
      created_at: baseTime,
    },
    {
      id: `t${trackCounter++}`,
      title: "Sunset Rollercoaster",
      artist: "Slow Waves",
      service: "Apple Music",
      url: "https://music.apple.com/slow-waves",
      created_at: baseTime,
    },
  ];

  baseTracks.forEach((track) => tracks.set(track.id, track));
}

function seedActivities() {
  if (posts.length || listeningActivities.length) return;
  const baseTime = now();
  const [track1, track2, track3] = Array.from(tracks.values());

  posts.push(
    {
      id: `p${postCounter++}`,
      user_id: "u2",
      track_id: track1.id,
      comment_text:
        "Rainy night soundtrack. The synths shimmer and the bass line is just perfect for a focus session.",
      created_at: baseTime,
    },
    {
      id: `p${postCounter++}`,
      user_id: "u4",
      track_id: track3.id,
      comment_text: "Breezy guitar riffs. Anyone else into city pop this week?",
      created_at: baseTime,
    },
  );

  listeningActivities.push(
    {
      id: `l${listeningCounter++}`,
      user_id: "u3",
      track_id: track2.id,
      started_at: baseTime,
      ended_at: null,
      source_type: "manual",
      created_at: baseTime,
    },
  );

  likes.set(posts[0].id, new Set([viewerId]));
  followers.set("u2", new Set([viewerId]));
}

seedUsers();
seedTracks();
seedActivities();

function resolveTrack(input: TrackInput): Track {
  if ("track_id" in input && input.track_id) {
    const existing = tracks.get(input.track_id);
    if (!existing) {
      throw new Error("Track not found");
    }
    return existing;
  }

  if (!input.track.title || !input.track.artist) {
    throw new Error("Track title and artist are required");
  }

  const track: Track = {
    id: `t${trackCounter++}`,
    title: input.track.title,
    artist: input.track.artist,
    service: input.track.service,
    service_track_id: input.track.service_track_id,
    url: input.track.url,
    thumbnail_url: input.track.thumbnail_url,
    duration_ms: input.track.duration_ms,
    created_at: now(),
  };
  tracks.set(track.id, track);
  return track;
}

export function getTimeline(type: TimelineFilter = "all"): TimelineItem[] {
  const items: TimelineItem[] = [];

  if (type === "all" || type === "post") {
    posts.forEach((post) => {
      const track = tracks.get(post.track_id);
      const user = users.get(post.user_id);
      if (!track || !user) return;
      const postLikes = likes.get(post.id) ?? new Set();
      items.push({
        type: "post",
        post,
        track,
        user,
        likes: postLikes.size,
        liked: postLikes.has(viewerId),
      });
    });
  }

  if (type === "all" || type === "listening") {
    listeningActivities.forEach((activity) => {
      const track = tracks.get(activity.track_id);
      const user = users.get(activity.user_id);
      if (!track || !user) return;
      items.push({ type: "listening", activity, track, user });
    });
  }

  return items.sort((a, b) => {
    const aTime =
      a.type === "post" ? a.post.created_at : a.activity.created_at ?? a.activity.started_at;
    const bTime =
      b.type === "post" ? b.post.created_at : b.activity.created_at ?? b.activity.started_at;
    return bTime.localeCompare(aTime);
  });
}

export function createPost(input: { user_id: string; track: TrackInput; comment_text: string }) {
  const track = resolveTrack(input.track);
  const user = users.get(input.user_id);
  if (!user) throw new Error("User not found");

  const post: Post = {
    id: `p${postCounter++}`,
    user_id: input.user_id,
    track_id: track.id,
    comment_text: input.comment_text,
    created_at: now(),
  };

  posts.unshift(post);

  return { post, track, user, likes: 0, liked: false } as const;
}

export function startListening(input: { user_id: string; track: TrackInput }) {
  const track = resolveTrack(input.track);
  const user = users.get(input.user_id);
  if (!user) throw new Error("User not found");

  const active = listeningActivities.find(
    (activity) => activity.user_id === input.user_id && activity.ended_at === null,
  );
  if (active) {
    active.ended_at = now();
  }

  const activity: ListeningActivity = {
    id: `l${listeningCounter++}`,
    user_id: input.user_id,
    track_id: track.id,
    started_at: now(),
    ended_at: null,
    source_type: "manual",
    created_at: now(),
  };

  listeningActivities.unshift(activity);
  return { activity, track, user } as const;
}

export function stopListening(userId: string) {
  const active = listeningActivities.find(
    (activity) => activity.user_id === userId && activity.ended_at === null,
  );

  if (!active) return null;
  active.ended_at = now();
  return active;
}

export function toggleLike(postId: string, userId: string) {
  const post = posts.find((item) => item.id === postId);
  if (!post) throw new Error("Post not found");
  const set = likes.get(postId) ?? new Set<string>();

  if (set.has(userId)) {
    set.delete(userId);
  } else {
    set.add(userId);
  }

  likes.set(postId, set);

  return { liked: set.has(userId), likes: set.size };
}

export function toggleFollow(targetUserId: string, followerId: string) {
  const target = users.get(targetUserId);
  const follower = users.get(followerId);
  if (!target || !follower) {
    throw new Error("User not found");
  }

  const set = followers.get(targetUserId) ?? new Set<string>();
  if (set.has(followerId)) {
    set.delete(followerId);
  } else {
    set.add(followerId);
  }
  followers.set(targetUserId, set);

  return { following: set.has(followerId), followers: set.size };
}

export function getUserProfile(userId: string) {
  const user = users.get(userId) ?? users.get(viewerId);
  if (!user) throw new Error("User not found");

  const userFollowers = followers.get(user.id) ?? new Set<string>();

  const recentPosts = posts
    .filter((post) => post.user_id === user.id)
    .map((post) => {
      const track = tracks.get(post.track_id);
      return { post, track } as const;
    })
    .filter((entry): entry is { post: Post; track: Track } => Boolean(entry.track));

  const recentListening = listeningActivities
    .filter((activity) => activity.user_id === user.id)
    .map((activity) => {
      const track = tracks.get(activity.track_id);
      return { activity, track } as const;
    })
    .filter((entry): entry is { activity: ListeningActivity; track: Track } => Boolean(entry.track));

  return {
    user,
    followers: userFollowers.size,
    following: Array.from(followers.entries()).filter(([, set]) => set.has(user.id)).length,
    posts: recentPosts,
    listening: recentListening,
  } as const;
}

export const currentUserId = viewerId;
