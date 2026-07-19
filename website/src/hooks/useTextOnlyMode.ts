import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  isTextOnlyFromSearch,
  saveTextOnlyPreference,
  syncTextOnlyUrl,
} from '../lib/readerMode';

/** Text-only reader mode — hides the sticky visual stage for distraction-free reading. */
export function useTextOnlyMode() {
  const [searchParams] = useSearchParams();
  const [textOnly, setTextOnly] = useState(() => isTextOnlyFromSearch(searchParams.toString()));

  useEffect(() => {
    setTextOnly(isTextOnlyFromSearch(searchParams.toString()));
  }, [searchParams]);

  const toggleTextOnly = useCallback(() => {
    setTextOnly((prev) => {
      const next = !prev;
      saveTextOnlyPreference(next);
      syncTextOnlyUrl(next);
      return next;
    });
  }, []);

  const setTextOnlyMode = useCallback((on: boolean) => {
    setTextOnly(on);
    saveTextOnlyPreference(on);
    syncTextOnlyUrl(on);
  }, []);

  return { textOnly, toggleTextOnly, setTextOnlyMode };
}
