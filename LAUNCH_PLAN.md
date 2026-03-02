# NowTune ローンチ計画

## 現状サマリー

| レイヤー | 完成度 | 状態 |
|---------|-------|------|
| UI / ページ | ~80% | タイムライン、投稿、リスニング、プロフィールの各ページが実装済み。ダークテーマ適用済み |
| API ルート | ~60% | 全エンドポイントのハンドラが存在するが、インメモリモックデータを使用 |
| フロントエンド ↔ API 接続 | ~0% | フォームからAPIへの実際のHTTPコールが未実装 |
| データベース | 0% | スキーマ定義ファイルが空（TODO コメントのみ） |
| 認証 | 0% | ハードコード `viewerId = "u1"` で全ユーザーを固定 |
| テスト | 0% | テストフレームワーク未導入 |
| デプロイ | 0% | CI/CD・本番環境未構築 |

---

## Phase 1: データベース基盤 (優先度: 最高)

モックデータからの脱却が全ての前提条件。

### 1-1. Supabase プロジェクトセットアップ
- Supabase プロジェクト作成
- 環境変数ファイル (`.env.local`) の作成
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`（サーバーサイド用）

### 1-2. Drizzle ORM + スキーマ定義
- `drizzle-orm`, `drizzle-kit`, `postgres` パッケージのインストール
- `src/lib/db/schema.ts` に全テーブル定義
  - `users` — id, handle, display_name, icon_url, bio, created_at, updated_at
  - `tracks` — id, title, artist, service, service_track_id, url, thumbnail_url, duration_ms, created_at
  - `posts` — id, user_id (FK), track_id (FK), comment_text, created_at
  - `listening_activities` — id, user_id (FK), track_id (FK), started_at, ended_at, source_type, created_at
  - `likes` — id, user_id (FK), post_id (FK), created_at（ユニーク制約: user_id + post_id）
  - `follows` — id, follower_id (FK), followee_id (FK), created_at（ユニーク制約: follower_id + followee_id）
- インデックス設定（timeline用の created_at DESC など）

### 1-3. Supabase クライアント初期化
- `src/lib/db/client.ts` に Drizzle + Supabase 接続を実装
- サーバーサイド用クライアントとブラウザ用クライアントの分離

### 1-4. マイグレーション
- `drizzle-kit` で初回マイグレーション生成・実行
- シードデータスクリプトの作成（開発用）

---

## Phase 2: 認証 (優先度: 最高)

データベースと並行してユーザー認証の基盤を構築する。

### 2-1. Supabase Auth 設定
- `@supabase/supabase-js`, `@supabase/ssr` パッケージのインストール
- Supabase Auth クライアントの初期化（サーバー・ブラウザ用）

### 2-2. 認証ページ実装
- `/login` — ログインフォーム（メール/パスワード）
- `/signup` — サインアップフォーム（ハンドル名、表示名、メール、パスワード）
- メール確認フロー（Supabase Auth のデフォルト機能を利用）

### 2-3. セッション管理
- Next.js Middleware でのセッション検証
- 未認証ユーザーのリダイレクト設定
- `currentUserId` をセッションから取得するヘルパー関数の実装
- ハードコードの `viewerId = "u1"` を全箇所で置き換え

### 2-4. Row Level Security (RLS)
- Supabase RLS ポリシーの設定
  - 自分のデータは読み書き可能
  - 他ユーザーのプロフィールは読み取りのみ
  - Like / Follow は認証ユーザーのみ作成・削除可能

---

## Phase 3: API → DB 接続 (優先度: 高)

現在のインメモリ実装を実際のDB操作に置き換える。

### 3-1. データアクセス層の実装
`src/lib/data.ts` のインメモリ関数を Drizzle クエリに書き換える:
- `getTimeline()` → posts + listening_activities を JOIN して取得
- `createPost()` → tracks テーブルに upsert → posts テーブルに INSERT
- `startListening()` / `stopListening()` → listening_activities の INSERT / UPDATE
- `toggleLike()` → likes テーブルの INSERT / DELETE
- `toggleFollow()` → follows テーブルの INSERT / DELETE
- `getUserProfile()` → users + 関連データを JOIN で取得

### 3-2. タイムラインのフォロー絞り込み
- 現状: 全ユーザーのアクティビティを表示
- 変更: フォロー中のユーザー + 自分のアクティビティのみ表示
- ページネーション（カーソルベース）の実装

---

## Phase 4: フロントエンド ↔ API 統合 (優先度: 高)

### 4-1. API クライアントの作成
- `src/lib/api.ts` に fetch ラッパーを作成（エラーハンドリング込み）
- または Server Actions を活用してクライアント・サーバー間の通信を簡素化

### 4-2. 各ページのAPI接続
- **タイムライン (`/`)**: `getTimeline()` を Server Component で呼び出し、クライアントでフィルタ切替時に再フェッチ
- **投稿 (`/post`)**: フォーム送信 → `POST /api/posts` → 成功時にタイムラインへリダイレクト
- **リスニング (`/listening`)**: 開始/停止ボタン → `POST /api/listening/start|stop`
- **プロフィール (`/profile/[id]`)**: Server Component でプロフィール取得、フォロー/アンフォローはクライアントアクション
- **いいね**: タイムライン上のボタンクリック → `POST /api/posts/[id]/like` → 楽観的UI更新

### 4-3. ローディング・エラー状態
- 各ページに `loading.tsx` / `error.tsx` を追加
- フォーム送信中の disabled 状態・スピナー表示
- API エラー時のユーザーフレンドリーなメッセージ表示

---

## Phase 5: UI 改善・UX 仕上げ (優先度: 中)

### 5-1. レスポンシブ対応の強化
- モバイルファースト最適化（現在のUIがモバイルで問題ないか確認・修正）
- ナビゲーションのモバイル対応（ハンバーガーメニューまたはボトムナビ）

### 5-2. 楽観的UI更新
- いいね/フォローの即時反映（APIレスポンスを待たずにUI更新）
- 投稿作成後のタイムラインへの即時反映

### 5-3. 相対時間表示
- 「3分前」「1時間前」「昨日」などの表示（`date-fns` or `dayjs`）

### 5-4. Empty State / Onboarding
- タイムラインが空の場合のガイド表示
- 初回ログイン時のオンボーディング（おすすめユーザーのフォロー提案など）

### 5-5. トースト通知
- 投稿成功、いいね、フォローなどの操作結果をトーストで通知

---

## Phase 6: テスト (優先度: 中)

### 6-1. テスト基盤のセットアップ
- Vitest のインストール・設定
- テスト用の DB セットアップ（テスト専用 Supabase プロジェクト or ローカル Docker）

### 6-2. ユニットテスト
- データアクセス層の各関数のテスト
- ユーティリティ関数のテスト

### 6-3. API 統合テスト
- 各エンドポイントの正常系・異常系テスト
- 認証が必要なエンドポイントの未認証アクセステスト

### 6-4. E2E テスト（任意）
- Playwright で主要フロー（サインアップ → 投稿 → いいね → プロフィール確認）をテスト

---

## Phase 7: デプロイ・インフラ (優先度: 高)

### 7-1. Vercel デプロイ設定
- Vercel プロジェクト作成・GitHub リポジトリ連携
- 環境変数の設定（Supabase キー等）
- ビルド確認

### 7-2. CI/CD
- GitHub Actions で以下を自動実行:
  - lint (`eslint`)
  - 型チェック (`tsc --noEmit`)
  - テスト (`vitest run`)
  - ビルド確認 (`next build`)
- PR マージ時に Vercel へ自動デプロイ

### 7-3. 本番環境の準備
- Supabase 本番プロジェクトの作成（開発環境と分離）
- カスタムドメインの設定（任意）
- エラーモニタリング（Sentry 等、任意）

---

## 推奨実施順序

```
Phase 1 (DB基盤) ──┐
                    ├── 並行可能 ──→ Phase 3 (API→DB) → Phase 4 (FE↔API統合)
Phase 2 (認証)   ──┘                                          │
                                                               ▼
                                              Phase 5 (UI/UX仕上げ)
                                                               │
                                                               ▼
                                              Phase 6 (テスト)
                                                               │
                                                               ▼
                                              Phase 7 (デプロイ)
```

- **Phase 1 + 2** はローンチの絶対条件。まずここから着手。
- **Phase 3 + 4** は DB と認証が揃い次第、順に実施。
- **Phase 5** は Phase 4 完了後に UX を磨く。
- **Phase 6** は Phase 4 と並行で開始可能（テスト対象が増え次第）。
- **Phase 7** は Phase 4 完了後に実施。早めにステージング環境だけ用意しておくのも有効。

---

## MVP ローンチ最小要件チェックリスト

- [ ] ユーザーがサインアップ・ログインできる
- [ ] ログインユーザーが投稿（Track + コメント）を作成できる
- [ ] ログインユーザーが「今聴いている」を開始・停止できる
- [ ] タイムラインにフォロー中ユーザーの投稿・リスニングが表示される
- [ ] 投稿にいいねできる
- [ ] 他ユーザーをフォロー/アンフォローできる
- [ ] プロフィールページで自分・他ユーザーの情報が見える
- [ ] データがサーバー再起動後も永続化される
- [ ] 本番環境にデプロイされ、URLでアクセスできる
