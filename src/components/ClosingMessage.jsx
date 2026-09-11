import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Moon, Undo2 } from 'lucide-react';
import { LETTER, PERSON_NAME } from '../config';

export default function ClosingMessage() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <section id="mensagem" className="letter-section">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div key="envelope" className="letter-invitation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -20 }} onAnimationComplete={() => {
            if (document.activeElement === document.body && location.hash === '#mensagem') document.querySelector('.letter-envelope')?.focus({ preventScroll: true });
          }}>
            <h2>Algumas palavras, só para você.</h2>
            <button className="letter-envelope" aria-label="Abrir a carta da galáxia" onClick={() => setOpen(true)}>
              <span className="envelope-fold" />
              <span className="letter-seal"><Moon size={30} aria-hidden="true" /></span>
              <span className="envelope-recipient">Para {PERSON_NAME}</span>
            </button>
            <button className="text-command" onClick={() => setOpen(true)}><Mail size={18} aria-hidden="true" /> Abrir a carta</button>
          </motion.div>
        ) : (
          <motion.article key="letter" id="carta-aberta" tabIndex={-1} className="personal-letter" initial={{ opacity: 0, y: reduced ? 0 : 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.8 }} onAnimationComplete={() => {
            const letter = document.getElementById('carta-aberta');
            letter?.focus({ preventScroll: true });
            letter?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
          }}>
            <h3>{LETTER.greeting}</h3>
            {LETTER.body.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <p className="letter-signature">{LETTER.signature}</p>
            <button className="text-command" onClick={() => { history.replaceState(null, '', '#mensagem'); setOpen(false); }}><Undo2 size={18} aria-hidden="true" /> Guardar a Carta no Envelope</button>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
