import { Seo } from '../components/Seo';

const LAB_SRC = '/marketing-skills-study-lab/index.html';

export const StudyLab = () => (
  <>
    <Seo
      title="Marketing Skills Study Lab"
      description="Interactive drills for marketing-skills routers, loop factory, paid-ads ops, X algorithm, prospecting, and more."
      path="/study-lab"
    />
    <div className="flex min-h-screen flex-col bg-[#0b1020]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/70 sm:px-6">
        <a href="/" className="hover:text-white">
          ← Catalogue
        </a>
        <span>Marketing Skills Study Lab</span>
        <a href={LAB_SRC} target="_blank" rel="noreferrer" className="hover:text-white">
          Open full page ↗
        </a>
      </header>
      <iframe
        title="Marketing Skills Study Lab"
        src={LAB_SRC}
        className="min-h-[calc(100vh-52px)] w-full flex-1 border-0"
      />
    </div>
  </>
);
