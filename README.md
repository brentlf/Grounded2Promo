# Birthday Supply Drop 🎁

An interactive, mobile-friendly birthday gift reveal website. Your brother unwraps a present step-by-step before revealing a Grounded 2 voucher code.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customize Before Sharing

Edit **`src/config.js`** at the top of the file:

```js
export const BROTHER_NAME = 'Brother'        // ← Change to his name
export const VOUCHER_CODE = 'ABCD-1234-EFGH-5678'  // ← Paste the real code
export const LETS_GO_URL = 'https://store.steampowered.com/app/2661300/Grounded_2/'
```

That's it — save the file and redeploy.

## How It Works

1. **Remove Tape** — Drag each clear tape strip off the package
2. **Untie Ribbon** — Pull the green ribbon end downward
3. **Unwrap** — Peel all four wrapping paper flaps away
4. **Open** — Tap or drag the box lid up to reveal the voucher

A **"Skip to reveal"** link at the bottom jumps straight to the voucher if drag interactions aren't working.

## Sound

Sound is **muted by default**. Tap the speaker icon (top-left) to enable synthesized placeholder sound effects. To use real audio files, add MP3s to `public/sounds/` and update `src/hooks/useSound.js`.

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New → Project** and import your repo
4. Vercel auto-detects Vite — no config needed
5. Click **Deploy**

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

Your live link will be ready in about a minute.

## Deploy to Netlify

```bash
npm run build
```

Drag the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo with build command `npm run build` and publish directory `dist`.

## Tech Stack

- React + Vite
- Framer Motion (drag & animations)
- Tailwind CSS v4
- No backend required

## License

Personal birthday gift project — original artwork only, no copyrighted game assets included.
