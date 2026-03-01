import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '../../store/useModalStore';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ModalController() {
  const { isOpen, title, message, type, onConfirm, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel max-w-md w-full p-6 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-tech-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              {type === 'alert' ? (
                <AlertCircle className="text-tech-primary w-6 h-6" />
              ) : (
                <CheckCircle2 className="text-tech-success w-6 h-6" />
              )}
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            
            <p className="text-slate-300 mb-6">{message}</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {type === 'confirm' ? 'Cancel' : 'Close'}
              </button>
              
              {type === 'confirm' && (
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    closeModal();
                  }}
                  className="px-4 py-2 bg-tech-primary hover:bg-orange-500 text-white rounded-lg font-medium shadow-glow-orange transition-all"
                >
                  Confirm
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
