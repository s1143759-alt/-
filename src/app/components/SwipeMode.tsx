import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, List, Star, Feather, BookOpen, Play, Volume2, FastForward, Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockSwipeData = [
  {
    id: 1,
    title: '第一回 · 甄士隐梦幻识通灵',
    videoThumb: 'https://images.unsplash.com/photo-1710171454800-a1ab850a4668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjB2aWRlbyUyMGFydHxlbnwxfHx8fDE3NzQyNTc5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '30-90秒',
    likes: 1254,
  },
  {
    id: 2,
    title: '第二回 · 贾夫人仙逝扬州城',
    videoThumb: 'https://images.unsplash.com/photo-1614765437824-f5433016b7b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMGFyY2hpdGVjdHVyZSUyMHBhdmlsaW9ufGVufDF8fHx8MTc3NDE3MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '30-90秒',
    likes: 850,
  },
  {
    id: 3,
    title: '第三回 · 贾接外孙女',
    videoThumb: 'https://images.unsplash.com/photo-1763225037262-75d0cb46f9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMG1hbnVzY3JpcHQlMjBib29rfGVufDF8fHx8MTc3NDI1Nzk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '30-90秒',
    likes: 3120,
  }
];

export const SwipeMode: React.FC = () => {
  const navigate = useNavigate();
  const [autoPlayNext, setAutoPlayNext] = useState(true);

  return (
    <div className="h-screen w-full bg-[#111] text-white overflow-y-scroll snap-y snap-mandatory relative custom-scrollbar-hide">
      
      {/* Top Fixed Area (Absolute relative to viewport but scrolls with items? No, fixed to viewport) */}
      <div className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-4 lg:px-8 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate('/main')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          <Volume2 className="w-4 h-4 text-white/80" />
          <div className="w-px h-4 bg-white/20"></div>
          <FastForward className="w-4 h-4 text-white/80" />
          <span className="text-xs text-white/80 font-sans">1.5x</span>
        </div>
      </div>

      {mockSwipeData.map((item, index) => (
        <div key={item.id} className="h-screen w-full snap-start snap-always relative flex flex-col items-center justify-center overflow-hidden">
          
          {/* Background Blurred Image */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback src={item.videoThumb} alt="" className="w-full h-full object-cover blur-2xl opacity-40 scale-110" />
          </div>

          {/* Video Placeholder (16:9 ratio in center) */}
          <div className="relative z-10 w-full max-w-[400px] aspect-[9/16] md:aspect-video md:max-w-4xl bg-black rounded-[24px] overflow-hidden shadow-2xl flex items-center justify-center group">
            <ImageWithFallback src={item.videoThumb} alt="Video Thumbnail" className="w-full h-full object-cover opacity-80" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
              </motion.div>
            </div>
            
            {/* Title Overlay inside video */}
            <div className="absolute top-0 inset-x-0 p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
              <h2 className="font-serif text-xl md:text-2xl text-white font-bold drop-shadow-md">
                {item.title}
              </h2>
              <p className="text-white/70 text-sm mt-1 flex items-center gap-2 font-sans">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                动画 {item.duration}
              </p>
            </div>
          </div>

          {/* Right Floating Actions */}
          <div className="absolute right-4 md:right-12 bottom-32 md:bottom-1/4 flex flex-col items-center gap-6 z-20">
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#8B2624]/80 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90 drop-shadow">{item.likes}</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => navigate(`/read/${item.id}`)}>
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#C7A252]/80 transition-colors">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90 drop-shadow font-serif">读原文</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => navigate(`/main/practice`)}>
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#5C4A3D]/80 transition-colors">
                <Feather className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90 drop-shadow font-serif">做练习</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90 drop-shadow font-serif">收藏</span>
            </div>
          </div>

        </div>
      ))}

      {/* Bottom Fixed Area */}
      <div className="fixed bottom-0 inset-x-0 h-20 md:h-24 z-50 flex items-center justify-between px-6 lg:px-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4 bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
          <List className="w-5 h-5 text-white/80" />
          <span className="text-sm font-serif text-white/90 cursor-pointer" onClick={() => navigate('/read')}>
            返回目录
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3 bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
          <span className="text-sm font-serif text-white/90">自动播放下一回</span>
          <div 
            className={clsx(
              "w-10 h-6 rounded-full p-1 cursor-pointer transition-colors",
              autoPlayNext ? "bg-[#8B2624]" : "bg-white/20"
            )}
            onClick={() => setAutoPlayNext(!autoPlayNext)}
          >
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: autoPlayNext ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
