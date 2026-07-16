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
