import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type LightboxValue = {
  open: (src: string, alt?: string) => void;
};

const LightboxContext = createContext<LightboxValue>({ open: () => {} });

export const useLightbox = () => useContext(LightboxContext);

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 6;
const ZOOM_STEP = 0.25;

export const LightboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>('Enlarged image');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const open = useCallback((nextSrc: string, nextAlt?: string) => {
    setSrc(nextSrc);
    setAlt(nextAlt || 'Enlarged image');
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => setSrc(null), []);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2))), []);
  const resetZoom = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === '+' || e.key === '=') zoomIn();
      else if (e.key === '-' || e.key === '_') zoomOut();
      else if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [src, close, zoomIn, zoomOut, resetZoom]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, +(z + delta).toFixed(2)));
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    });
  };
  const onMouseUp = () => { dragRef.current = null; };

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {src ? (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col select-none"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div
            className="flex-1 overflow-hidden flex items-center justify-center"
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onClick={(e) => { if (zoom === 1) close(); else e.stopPropagation(); }}
            style={{ cursor: zoom > 1 ? (dragRef.current ? 'grabbing' : 'grab') : 'zoom-out' }}
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center',
                transition: dragRef.current ? 'none' : 'transform 0.15s ease-out',
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
              className="object-contain"
            />
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-white/80 font-mono text-xs">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="w-9 h-9 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 flex items-center justify-center text-base"
              aria-label="Zoom out"
            >−</button>
            <span className="tabular-nums min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="w-9 h-9 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 flex items-center justify-center text-base"
              aria-label="Zoom in"
            >+</button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              className="px-3 h-9 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 text-[10px] uppercase tracking-widest"
              aria-label="Reset zoom"
            >1:1</button>
            <button
              type="button"
              onClick={close}
              className="w-9 h-9 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 flex items-center justify-center text-xl leading-none"
              aria-label="Close"
            >×</button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/40 text-center">
            SCROLL TO ZOOM  ·  DRAG TO PAN  ·  ESC TO CLOSE  ·  +/− KEYS
          </div>
        </div>
      ) : null}
    </LightboxContext.Provider>
  );
};
