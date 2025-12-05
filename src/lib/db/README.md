# DB & Auth Plan (MVP)

- ライブラリ: Supabase プロジェクト + @supabase/supabase-js クライアント、Drizzle ORM for SQL schema management。
- スキーマ配置: `src/lib/db/schema.ts` にテーブル定義（users, tracks, posts, listening_activities, likes, follows）。
- クライアント配置: `src/lib/db/client.ts` で Supabase クライアント生成と Drizzle 接続を初期化。
- API 実装の順序（想定）:
  1. スキーマを Drizzle で定義し、Supabase にマイグレーション。
  2. 認証: Supabase Auth（メール/パスワード + OAuth）で session を取得。
  3. API ルート: `/api/listening/start|stop`, `/api/posts`, `/api/timeline`, `/api/users/:id`, `/api/users/:id/follow` を実装。
  4. クライアント側: タイムライン/プロフィール/リスニング/投稿ページで API を呼び、SWR/React Query か server actions でデータ取得。
  5. いいね/フォローは RLS と Auth を踏まえて mutation API を追加。

### テーブル概要
- users: id, handle, display_name, icon_url, bio, created_at, updated_at
- tracks: id, title, artist, service, service_track_id, url, thumbnail_url, duration_ms, created_at
- posts: id, user_id (FK users), track_id (FK tracks), comment_text, created_at
- listening_activities: id, user_id (FK users), track_id (FK tracks), started_at, ended_at, source_type, created_at
- likes: id, user_id (FK users), post_id (FK posts), created_at
- follows: follower_id (FK users), followee_id (FK users), created_at

この段階では UI とモックデータのみ。次のステップで上記ファイルに実装を追加します。
