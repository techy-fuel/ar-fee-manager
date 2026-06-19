# Al Rehman Fee Manager — Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com and sign up (free)
2. Click **New Project**, give it a name, set a password
3. Wait ~2 minutes for the project to spin up
4. Go to **Settings → API** and copy:
   - Project URL
   - `anon` public key

## 2. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire contents of `supabase/schema.sql`
3. Click **Run** — this creates all tables, policies, and triggers

## 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 → Sign up with your academy details.

## 5. Deploy to Netlify

### Option A — Drag & Drop (fastest)
1. Run `npm run build` locally
2. Go to https://netlify.com → drag the `dist/` folder onto the dashboard
3. Done — live URL mil jaye ga turant

### Option B — GitHub se Auto Deploy
1. Code GitHub pe push karo
2. Netlify → **Add new site → Import from Git**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. **Site settings → Environment variables** mein add karo:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy — har git push pe automatically deploy hoga

Your app will be live at `https://your-site.netlify.app`.

---

## WhatsApp Integration (optional, later)

1. Apply for Meta Business API at https://developers.facebook.com
2. Once approved, add to `.env.local`:
   ```
   VITE_WA_PHONE_ID=your-phone-id
   VITE_WA_TOKEN=your-access-token
   ```
3. The Reminders screen "Send Reminder" button will call the API
