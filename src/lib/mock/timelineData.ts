import { TimelineItem } from "@/lib/domain/types";

export const timelineItems: TimelineItem[] = [
  {
    id: "p1",
    type: "post",
    user: { name: "Aiko Morita", handle: "aikom", avatar: "AM", id: "u2" },
    track: {
      title: "Neon Skyline",
      artist: "Shibuya Echo",
      service: "YouTube",
      url: "https://youtube.com/watch?v=neon-skyline",
    },
    comment: "雨の夜にぴったり。シンセのきらめきとベースラインで集中力が上がる。",
    likes: 32,
    createdAt: "2時間前",
  },
  {
    id: "l1",
    type: "listening",
    user: { name: "Kenji Yamato", handle: "kenji", avatar: "KY", id: "u3" },
    track: {
      title: "Blue Monday",
      artist: "New Order",
      service: "Spotify",
      url: "https://open.spotify.com/track/bluemonday",
    },
    status: "再生中",
    createdAt: "たった今",
  },
  {
    id: "p2",
    type: "post",
    user: { name: "Sara Ito", handle: "sara", avatar: "SI", id: "u4" },
    track: {
      title: "Sunset Rollercoaster",
      artist: "Slow Waves",
      service: "Apple Music",
      url: "https://music.apple.com/slow-waves",
    },
    comment: "風通しのよいギター。今週はシティポップ気分。",
    likes: 18,
    createdAt: "5時間前",
  },
  {
    id: "l2",
    type: "listening",
    user: { name: "Maya Nishida", handle: "maya", avatar: "MN", id: "u5" },
    track: {
      title: "Crystal Dreaming",
      artist: "Night Tempo",
      service: "YouTube",
      url: "https://youtube.com/watch?v=crystal-dreaming",
    },
    status: "再生中",
    createdAt: "1日前",
  },
  {
    id: "p3",
    type: "post",
    user: { name: "Leo Kinoshita", handle: "leo", avatar: "LK", id: "u6" },
    track: {
      title: "Velvet Highway",
      artist: "Tokyo Midnight",
      service: "SoundCloud",
      url: "https://soundcloud.com/velvet-highway",
    },
    comment: "夜のドライブに最高。サックスのエンディングが美しい。",
    likes: 12,
    createdAt: "2日前",
  },
];
