import React, { useState } from 'react';
import { Save, Edit2 } from 'lucide-react';

interface EditablePriceProps {
  value: number;
  onSave: (val: number) => void;
  isAdmin: boolean;
}

export const EditablePrice: React.FC<EditablePriceProps> = ({ 
  value, 
  onSave, 
  isAdmin 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value);

  if (!isAdmin) return <span className="text-4xl font-display font-bold text-white">${value.toLocaleString()}</span>;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 inline-flex">
        <span className="text-2xl font-bold text-primary">$</span>
        <input 
          type="number" 
          value={tempVal} 
          onChange={e => setTempVal(Number(e.target.value))}
          className="bg-black border border-primary text-white text-2xl font-display font-bold w-32 px-2 py-1 rounded-sm focus:outline-none"
        />
        <button onClick={() => { onSave(tempVal); setIsEditing(false); }} className="p-2 bg-primary/20 text-primary hover:bg-primary/40 rounded-sm">
          <Save className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 inline-flex group cursor-pointer" onClick={() => setIsEditing(true)}>
      <span className="text-4xl font-display font-bold text-white group-hover:text-primary transition-colors">${value.toLocaleString()}</span>
      <Edit2 className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
