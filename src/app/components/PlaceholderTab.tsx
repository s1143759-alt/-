import React from 'react';

export const PlaceholderTab: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-[var(--color-ink-600)] space-y-4 font-serif">
      <div className="w-16 h-16 border-2 border-[var(--color-gold-dark)] rounded-full flex items-center justify-center mb-2 shadow-sm">
        <span className="text-[var(--color-seal-red)] text-2xl font-bold">待</span>
      </div>
      <h2 className="text-2xl font-bold text-[var(--color-ink-900)] tracking-widest">{title}</h2>
      <p className="text-lg text-[var(--color-ink-600)]">此版块正在建设中，敬请期待...</p>
    </div>
  );
};
