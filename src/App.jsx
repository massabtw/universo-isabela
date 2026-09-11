import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BIRTHDAY_DATE } from './config';
import CountdownScreen from './components/CountdownScreen';

const Universe = lazy(() => import('./Universe'));
export default function App() {
  const [open, setOpen] = useState(() => new Date() >= new Date(BIRTHDAY_DATE));
  const enter = () => { window.scrollTo({ top: 0, behavior: 'instant' }); setOpen(true); };
  return <div className="min-h-screen bg-midnight-950 text-celestial-starlight">
    <AnimatePresence mode="wait">
      {!open ? <motion.div key="countdown" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
        <CountdownScreen targetDate={BIRTHDAY_DATE} onComplete={enter} />
      </motion.div> : <motion.div key="universe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative">
        <Suspense fallback={<div className="h-svh flex items-center justify-center" role="status">Abrindo seu universo...</div>}>
          <Universe onReturn={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setOpen(false); }} />
        </Suspense>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
