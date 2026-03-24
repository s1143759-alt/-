import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // 3.5秒后显示“进入大观园”按钮
    const btnTimer = setTimeout(() => setShowButton(true), 3500);
    // 8秒后自动跳转
    const navTimer = setTimeout(() => navigate('/main'), 8000);
    
    return () => {
      clearTimeout(btnTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#fcfaf7] overflow-hidden flex flex-col items-center font-serif relative z-50">
      
      {/* 极简纸张底纹 - 降低透明度，避免视觉干扰 */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 顶部留白，采用 Flex 垂直布局彻底杜绝元素重叠 */}
      <div className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col items-center justify-between py-20 px-6">
        
        {/* 上半部分：标题与印章 */}
        <div className="flex flex-col items-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="mb-6 w-12 h-12 border-[2px] border-[var(--color-seal-red)] text-[var(--color-seal-red)] flex items-center justify-center rounded-sm bg-transparent relative"
          >
            <span className="font-bold text-2xl font-serif">印</span>
            <div className="absolute inset-0 border border-[var(--color-seal-red)] m-[2px]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-[var(--color-ink-900)] tracking-[0.2em] ml-3 mb-4"
          >
            红楼梦
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[10px] md:text-xs text-[var(--color-gold-dark)] tracking-[0.4em] uppercase font-sans font-medium ml-1">
              Dream of the Red Chamber
            </h2>
          </motion.div>
        </div>

        {/* 中间部分：诗句（居中竖排，两列） */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="flex gap-8 h-[200px]"
          style={{ writingMode: 'vertical-rl' }}
        >
          {/* 从右向左阅读，第一句在右边 */}
          <p className="text-[var(--color-ink-600)] text-base md:text-lg tracking-[0.5em] font-serif font-medium">
            满纸荒唐言，一把辛酸泪。
          </p>
          <p className="text-[var(--color-ink-600)] text-base md:text-lg tracking-[0.5em] font-serif font-medium mt-8">
            都云作者痴，谁解其中味？
          </p>
        </motion.div>

        {/* 底部部分：加载与进入按钮 */}
        <div className="h-16 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {showButton ? (
              <motion.button
                key="enter-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/main')}
                className="group px-8 py-3 bg-transparent text-[var(--color-seal-red)] text-sm font-bold tracking-[0.2em] rounded-full border border-[var(--color-seal-red)] flex items-center gap-2 hover:bg-[var(--color-seal-red)] hover:text-white transition-all pl-10"
              >
                入梦观园 
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            ) : (
              <motion.div 
                key="loading"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-dark)]"
                      animate={{ 
                        opacity: [0.2, 1, 0.2]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-[var(--color-ink-400)] tracking-[0.3em] font-medium ml-1">
                  正在煮茶候客
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
};
