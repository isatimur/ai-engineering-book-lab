import { Link } from 'react-router-dom';

type Props = { en: string; ru?: string; current: 'en' | 'ru' };

/** EN · RU toggle. Renders nothing when the page has no Russian version. */
export const LangSwitch = ({ en, ru, current }: Props) => {
  if (!ru) return null;
  const item = (code: 'en' | 'ru', to: string, label: string) =>
    code === current ? (
      <span aria-current="page" className="text-[var(--color-ink)]">{label}</span>
    ) : (
      <Link to={to} hrefLang={code} lang={code} className="hover:text-[var(--color-ink)]">{label}</Link>
    );
  return (
    <nav aria-label="Language" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
      {item('en', en, 'EN')}
      <span aria-hidden>·</span>
      {item('ru', ru, 'RU')}
    </nav>
  );
};
