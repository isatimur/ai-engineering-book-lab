import { Link } from 'wouter';

export const Catalogue = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#1F1D1B] text-white font-serif">
    <div className="text-center space-y-4">
      <h1 className="text-5xl italic">Catalogue (placeholder)</h1>
      <p className="text-white/60">From Copilot to Colleague</p>
      <Link href="/read" className="underline">→ Open the Reader</Link>
    </div>
  </div>
);
