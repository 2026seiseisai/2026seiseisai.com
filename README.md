# 2026年度 菁々祭 公式ウェブサイト

2026年度に開催される「菁々祭（せいせいさい）」の公式ウェブサイトのリポジトリです。

---

## ローカルでの実行について

以下の手順でローカル環境を構築してください。

1. Node.js と npm をインストールしてください。
2. このリポジトリをクローンしてください。

```bash
git clone https://github.com/2026seiseisai/2026seiseisai.com.git
cd 2026seiseisai.com
```

3. VS Code でクローンしたフォルダを開いてください。
4. 依存関係をインストールしてください。

```bash
npm install
```

5. プロジェクトルートで `.env.example` をコピーして `.env.local` を作成し、必要な値を設定してください。

macOS/Linux:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

6. PostgreSQL を使う機能を動かす場合は、`.env.local` に以下を追記してください。
   Supabase を使用する場合は [こちら](https://supabase.com/docs/guides/database/prisma) も参照してください。

```
DATABASE_URL="PostgreSQLの接続文字列"
DIRECT_URL="PostgreSQLの接続文字列"
```

7. 開発サーバーを起動してください。

```bash
npm run dev
```

8. ブラウザで http://localhost:3000 にアクセスしてください。

補足:

- `.vscode/launch.json` が用意されている環境では、F5 (または Fn+F5) で起動できます。

## 展示賞投票の運用

投票ページは `/exhibition-award`、集計ページは `/exhibition-award/results` です。投票ページを最初に Wi-Fi 接続中に開いておくと、サービスワーカーが画面をキャッシュし、オフライン中の投票を端末内に保存します。再接続時に自動で API へ送信されます。

集計を有効にするには、Cloudflare KV Namespace を作成し、表示された ID を `wrangler.jsonc` の `EXHIBITION_AWARD_VOTES` に設定してください。

```powershell
npx wrangler kv namespace create EXHIBITION_AWARD_VOTES
```

投票データは投票 ID を KV のキーにして保存するため、再送時に同じ投票が重複登録されません。集計ページは KV の保存済み投票を読み込み、展示団体ごとに票数を表示します。
