import { Config } from '@remotion/cli/config';

/**
 * This sandbox has google-chrome-stable preinstalled at a fixed path, so we
 * point Remotion at it instead of letting it download its own headless
 * Chromium (no outbound download needed, and it's the same binary CI images
 * commonly ship). Override with $REMOTION_BROWSER_EXECUTABLE if your machine
 * has Chrome somewhere else — Remotion falls back to its bundled browser if
 * this path doesn't exist.
 */
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? '/usr/local/bin/google-chrome';

Config.setBrowserExecutable(browserExecutable);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('swangle');
