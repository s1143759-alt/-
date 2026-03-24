import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Play, Book, Film, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const HomeTab: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 lg:space-y-8 pb-20">
      
      {/* Recommended Chapter Card */}
      <motion.div 
        className="relative w-full h-[400px] md:h-[480px] rounded-[12px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/read/15')} // E.g., next chapter to read
      >
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1614765437824-f5433016b7b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMGFyY2hpdGVjdHVyZSUyMHBhdmlsaW9ufGVufDF8fHx8MTc3NDE3MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Recommended Chapter Background"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)]/80 via-[var(--color-ink-900)]/30 to-transparent" />
        
        {/* Recommend Badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[var(--color-seal-red)] text-[var(--color-paper-100)] px-3 py-1 rounded text-sm font-serif tracking-widest shadow-lg">
          今日推荐 · 继续阅读
        </div>

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 text-[var(--color-paper-100)] z-10">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            第十五回 · 王凤姐弄权铁槛寺
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-[var(--color-paper-200)]/90 mb-6 font-sans line-clamp-2 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            凤姐在此回展现了极强的权谋与手腕，通过老尼的请托，三千两银子拆散了一段姻缘。同时也揭示了封建家族中权力的腐蚀性。
          </motion.p>
          <motion.button 
            className="flex items-center gap-2 bg-[var(--color-gold-dark)] text-[#2C231E] px-6 py-2.5 rounded-full font-serif font-bold hover:bg-[var(--color-gold-light)] transition-colors shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/read/15');
            }}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>开始之旅</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Grid for Modes: 60:40 split on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Mode 1: Swipe Mode (60%) */}
        <motion.div 
          className="lg:col-span-3 relative h-[320px] rounded-[12px] overflow-hidden shadow-sm group cursor-pointer border border-[var(--color-paper-300)] bg-white"
          whileHover={{ scale: 1.02, y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/swipe')}
        >
          <div className="absolute inset-y-0 right-0 w-1/2">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1710171454800-a1ab850a4668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjB2aWRlbyUyMGFydHxlbnwxfHx8fDE3NzQyNTc5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Swipe Mode Mockup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient for smooth blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center p-8 w-[60%] lg:w-[65%]">
            <div className="flex items-center gap-2 text-[var(--color-seal-red)] mb-4 bg-[#F5E6E6] w-max px-3 py-1 rounded-full text-xs font-serif font-bold">
              <Film className="w-4 h-4" />
              <span>刷红楼模式</span>
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[var(--color-ink-900)] mb-3 leading-snug">
              你看过虾仁红楼吗？
            </h3>
            <p className="text-[var(--color-ink-600)] mb-8 font-sans">
              像刷短视频一样刷红楼梦。<br/>竖屏滑动，让你对红楼梦上瘾。
            </p>
            
            <div className="mt-auto flex items-center text-[var(--color-seal-red)] font-serif gap-2 group-hover:gap-4 transition-all">
              <span>立即体验</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Mode 2: Classic Reading (40%) */}
        <motion.div 
          className="lg:col-span-2 relative h-[320px] rounded-[12px] overflow-hidden shadow-sm group cursor-pointer border border-[var(--color-paper-300)] bg-[var(--color-paper-200)]"
          whileHover={{ scale: 1.02, y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/read')}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-multiply group-hover:opacity-50 transition-opacity">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1763225037262-75d0cb46f9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMG1hbnVzY3JpcHQlMjBib29rfGVufDF8fHx8MTc3NDI1Nzk4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Classic Reading Mockup"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center p-8">
            <div className="flex items-center gap-2 text-[var(--color-gold-dark)] mb-4 bg-[#3E322A] w-max px-3 py-1 rounded-full text-xs font-serif font-bold shadow-md">
              <Book className="w-4 h-4" />
              <span>经典阅读</span>
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[var(--color-ink-900)] mb-3 shadow-[var(--color-paper-200)] drop-shadow-md">
              静心细读
            </h3>
            <p className="text-[var(--color-ink-800)] font-sans mb-8 max-w-[200px] drop-shadow-md bg-[var(--color-paper-200)]/70 p-2 rounded">
              原文逐章细读 + 白话对照。提供沉浸式的阅读体验，配有详细批注。
            </p>
            
            <div className="mt-auto flex items-center text-[var(--color-ink-900)] font-serif gap-2 group-hover:gap-4 transition-all bg-[var(--color-gold-light)]/80 w-max px-4 py-2 rounded-full shadow-sm">
              <span>浏览目录</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
