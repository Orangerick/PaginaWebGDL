import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ShoppingBag, Edit2, LogOut } from 'lucide-react';

interface AdminQuickMenuProps {
  isVisible: boolean;
  onExit: () => void;
}

export const AdminQuickMenu: React.FC<AdminQuickMenuProps> = ({
  isVisible,
  onExit
}) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 bg-card border border-primary/50 p-4 rounded-sm shadow-[0_0_20px_rgba(0,240,255,0.1)] z-40"
    >
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-display font-bold text-white uppercase tracking-wider">Modo Admin</span>
        <div className="h-4 w-[1px] bg-white/20 mx-2" />
        <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          <Calendar className="w-3 h-3" /> Reservas
        </button>
        <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          <ShoppingBag className="w-3 h-3" /> Ventas
        </button>
        <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          <Edit2 className="w-3 h-3" /> Blog
        </button>
        <button onClick={onExit} className="text-xs text-destructive hover:text-destructive/80 ml-2 flex items-center gap-1">
          <LogOut className="w-3 h-3" /> Salir
        </button>
      </div>
    </motion.div>
  );
};
