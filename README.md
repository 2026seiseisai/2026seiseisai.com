# 2026年度 菁々祭 公式ウェブサイト

2026年度に開催される「菁々祭（せいせいさい）」の公式ウェブサイトのリポジトリです。

---

## ローカルでの実行について

以下の手順でローカル環境を構築してください。
### 1. 前提条件
以下のツールがインストールされていることを確認してください。
- Node.js (v18.x 以上推奨)
- npm (Node.js に同梱)
### 2. リポジトリのクローン
```bash
git clone https://github.com/2026seiseisai/2026seiseisai.com.git
cd 2026seiseisai.com
```
### 3. 依存関係のインストール
```bash
npm install
```
### 4. 環境変数の設定
プロジェクトのルートディレクトリにある `.env.example` をコピーして `.env.local` を作成し、必要な値を設定してください。
```bash
cp .env.example .env.local
```
### 5. ローカルでの実行
開発用サーバーを起動します。
```bash
npm run dev
```
起動後、ブラウザで http://localhost:3000 にアクセスすると、現在のサイトを確認できます。
