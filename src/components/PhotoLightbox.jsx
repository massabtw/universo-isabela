import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PhotoLightbox({ photos, selectedPhoto, onSelect, onClose, getSrc = photo => photo.src, onImageError }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const [failed, setFailed] = useState(false);
  const index = photos.findIndex(photo => photo.id === selectedPhoto.id);
  const src = getSrc(selectedPhoto);
  const navigate = direction => onSelect(photos[(index + direction + photos.length) % photos.length]);

  useEffect(() => setFailed(false), [src]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const lenis = window.lenisInstance;
    const wasStopped = lenis?.isStopped;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (!wasStopped) lenis?.start();
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(<dialog ref={dialogRef} className="photo-lightbox" aria-labelledby={titleId}
    data-lenis-prevent onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (event.key === 'Tab') {
        const buttons = [...dialogRef.current.querySelectorAll('button:not(:disabled)')];
        const first = buttons[0], last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        navigate(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <div className="photo-lightbox-content">
      <div className="photo-lightbox-toolbar">
        <span aria-live="polite">{index + 1} / {photos.length}</span>
        <button type="button" className="icon-control" aria-label="Foto anterior" title="Foto anterior" onClick={() => navigate(-1)}><ChevronLeft aria-hidden="true" /></button>
        <button type="button" className="icon-control" aria-label="Próxima foto" title="Próxima foto" onClick={() => navigate(1)}><ChevronRight aria-hidden="true" /></button>
        <button ref={closeRef} type="button" className="icon-control" aria-label="Fechar foto" title="Fechar foto" onClick={onClose}><X aria-hidden="true" /></button>
      </div>
      <div className="photo-lightbox-image">
        {failed ? <p role="status">Não foi possível carregar a foto.</p> : <img key={src} src={src} alt={selectedPhoto.title} decoding="async"
          onError={() => { setFailed(true); onImageError?.(selectedPhoto); }} />}
      </div>
      <div className="photo-lightbox-caption">
        <h3 id={titleId}>{selectedPhoto.title}</h3>
        {selectedPhoto.date && <p>{selectedPhoto.date}</p>}
        <p>{selectedPhoto.caption}</p>
      </div>
    </div>
  </dialog>, document.body);
}
