# DB & Auth Plan (MVP)

## ステータス

- [x] Drizzle ORM スキーマ定義 (`schema.ts`)
- [x] DB クライアント初期化 (`client.ts`)
- [x] シードスクリプト (`seed.ts`)
- [ ] Supabase プロジェクト作成・接続
- [ ] マイグレーション実行
- [ ] Supabase Auth 設定
- [ ] RLS ポリシー設定

## セットアップ手順

1. Supabase プロジェクトを作成
2. `.env.example` を `.env.local` にコピーし、接続情報を記入
3. `npm run db:push` でスキーマを反映（開発中）
4. `npm run db:seed` でシードデータを投入
5. 本番移行時は `npm run db:generate` → `npm run db:migrate` でマイグレーション管理

## ライブラリ

- **Drizzle ORM** — スキーマ定義・クエリビルダー・マイグレーション
- **postgres** (postgres.js) — PostgreSQL ドライバー
- **@supabase/supabase-js** — Supabase Auth・Realtime クライアント
- **@supabase/ssr** — Next.js SSR でのセッション管理

## テーブル概要

| テーブル | 説明 |
|---------|------|
| `users` | id (uuid), handle (unique), display_name, icon_url, bio, created_at, updated_at |
| `tracks` | id (uuid), title, artist, service, service_track_id, url, thumbnail_url, duration_ms, created_at |
| `posts` | id (uuid), user_id (FK), track_id (FK), comment_text, created_at |
| `listening_activities` | id (uuid), user_id (FK), track_id (FK), started_at, ended_at, source_type, created_at |
| `likes` | id (uuid), user_id (FK), post_id (FK), created_at — unique(user_id, post_id) |
| `follows` | id (uuid), follower_id (FK), followee_id (FK), created_at — unique(follower_id, followee_id) |

## npm scripts

```bash
npm run db:generate  # マイグレーションファイル生成
npm run db:migrate   # マイグレーション実行
npm run db:push      # スキーマを直接 DB に反映（開発用）
npm run db:studio    # Drizzle Studio（DB ブラウザ）起動
npm run db:seed      # シードデータ投入
```
