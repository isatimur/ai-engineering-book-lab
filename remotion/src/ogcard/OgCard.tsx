import { AbsoluteFill } from 'remotion';
import { theme, BOOK_TITLE } from '../theme';

export type OgCardProps = {
  chapterNumber: string;
  title: string;
  promise: string;
};

export const ogCardDefaultProps: OgCardProps = {
  chapterNumber: '01',
  title: 'The Shift: From Assistant to Delegate',
  promise: 'Why the important transition is not better chat UX, but reliable delegated work.',
};

/**
 * A single still frame (1200x630, the standard og:image size) — a legible
 * social-preview card, deliberately NOT the dense whiteboard-style chapter
 * diagram (those read fine full-size but turn to noise at thumbnail scale).
 * Branding matches the live site's dark theme exactly.
 */
export const OgCard = ({ chapterNumber, title, promise }: OgCardProps) => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.ink,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '64px 88px',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: theme.accent,
      }}
    />
    <p
      style={{
        fontFamily: theme.mono,
        fontSize: 22,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: theme.inkFaint,
        margin: 0,
        marginBottom: 28,
      }}
    >
      From Copilot to Colleague · Chapter {chapterNumber}
    </p>
    <h1
      style={{
        fontFamily: theme.serif,
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: 58,
        lineHeight: 1.15,
        color: theme.paper,
        margin: 0,
        maxWidth: 980,
      }}
    >
      {title}
    </h1>
    <p
      style={{
        fontFamily: theme.sans,
        fontWeight: 300,
        fontSize: 27,
        lineHeight: 1.4,
        color: theme.inkMuted,
        marginTop: 28,
        maxWidth: 900,
      }}
    >
      {promise}
    </p>
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 88,
        right: 88,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <p
        style={{
          fontFamily: theme.sans,
          fontWeight: 500,
          fontSize: 22,
          color: theme.paper,
          margin: 0,
        }}
      >
        {BOOK_TITLE}
      </p>
      <p
        style={{
          fontFamily: theme.mono,
          fontSize: 16,
          letterSpacing: 2,
          color: theme.inkFaint,
          margin: 0,
        }}
      >
        fromcopilottocolleague.com
      </p>
    </div>
  </AbsoluteFill>
);
