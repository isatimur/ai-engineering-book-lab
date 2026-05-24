import { createContext, useContext } from 'react';

type GlossaryCtx = {
  open: (termId: string) => void;
};

export const GlossaryContext = createContext<GlossaryCtx>({ open: () => {} });
export const useGlossary = () => useContext(GlossaryContext);
