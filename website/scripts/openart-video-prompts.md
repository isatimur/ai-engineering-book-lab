# OpenArt background videos — Spade hero

Authenticate OpenArt MCP in Cursor first:

1. **Settings → MCP & Integrations**
2. Click **Needs login** next to `openart`
3. Approve OAuth in the browser

Then ask the agent (in this repo):

```
Use OpenArt MCP to generate these three videos for the Spade hero page.
Save URLs to website/src/data/spadeHeroVideos.ts and download MP4s to website/public/videos/spade/.

1. hero-desktop (Seedance 2.0, 5s, 16:9)
Cinematic abstract studio scene, soft sage green (#EAECE9) and charcoal (#1C2E1E) organic glass forms slowly morphing, shallow depth of field, gentle light fluctuations, minimal camera drift right-to-bottom, seamless loop-friendly motion, photoreal, no text, no logos, calm premium agency aesthetic

2. hero-ambient (Wan 2.7, 5s, 16:9)
Ultra-slow ethereal particle drift and soft volumetric light pulses on off-white background, subtle green-grey tones, barely perceptible motion, dreamy bokeh fluctuations, seamless loop, no subjects, abstract atmosphere only

3. hero-mobile (Grok Imagine 1.5, 5s, square-safe)
Vertical-friendly abstract motion: gentle waves of cream and sage mist, soft focus, smooth loop, calm contact-page mood, no typography, composition weight on right
```

After generation:

```bash
# Drop files into public (names must match spadeHeroVideos.ts local paths)
website/public/videos/spade/hero-desktop.mp4
website/public/videos/spade/hero-ambient.mp4
website/public/videos/spade/hero-mobile.mp4
```

Toggle local sources in `BackgroundVideo.tsx` by setting `preferLocal={true}` or updating `resolveVideoSrc` default.
