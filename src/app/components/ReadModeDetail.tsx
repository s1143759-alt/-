import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Maximize2, Headphones, Edit3, Star, MoreVertical, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ReadMode = 'classical' | 'mixed' | 'modern';

export const ReadModeDetail: React.FC = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [readMode, setReadMode] = useState<ReadMode>('classical');
  const [miniVideoExpanded, setMiniVideoExpanded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  // Helpers to format chapters correctly
  const knownTitles: Record<string, { title: string, subtitle: string, summary: string }> = {
    '1': {
      title: '第一回',
      subtitle: '甄士隐梦幻识通灵 贾雨村风尘怀闺秀',
      summary: '白话提要：\n僧道点化顽石为通灵宝玉，降入凡间。姑苏乡宦甄士隐梦见一僧一道携通灵宝玉去幻境，醒后遇见穷儒贾雨村。士隐在中秋之夜资助雨村进京赶考。不久元宵佳节，士隐独女英莲被拐，家遭火灾，无奈投奔岳父，最后随跛足道人出家。贾雨村考中进士，任知府后因贪酷被革职。'
    },
    '15': {
      title: '第十五回',
      subtitle: '王凤姐弄权铁槛寺 秦鲸卿得趣馒头庵',
      summary: '白话提要：\n王熙凤来到铁槛寺，老尼净虚请她帮忙退掉张金哥与守备之子的婚事。凤姐贪图三千两银子，通过长安节度使云光逼退婚事，结果导致张金哥和守备之子双双殉情。与此同时，秦钟在馒头庵与小尼姑智能儿私会，两人暗生情愫。此回展现了凤姐弄权的狠毒以及封建社会的腐败与悲剧。'
    }
  };

  const toChineseNumeral = (num: number) => {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num <= 10) return chars[num];
    if (num < 20) return `十${num % 10 === 0 ? '' : chars[num % 10]}`;
    if (num < 100) return `${chars[Math.floor(num / 10)]}十${num % 10 === 0 ? '' : chars[num % 10]}`;
    return '一百' + (num % 100 === 0 ? '' : (num % 100 < 10 ? `零${chars[num % 10]}` : (num % 100 === 10 ? '一十' : (num % 100 < 20 ? `十${chars[num % 10]}` : `${chars[Math.floor((num % 100) / 10)]}十${num % 10 === 0 ? '' : chars[num % 10]}`))));
  };

  const getChapterData = (id: string | undefined) => {
    const cid = id || '1';
    if (knownTitles[cid]) {
      return knownTitles[cid];
    }
    const num = parseInt(cid, 10);
    return {
      title: `第${isNaN(num) ? '?' : toChineseNumeral(num)}回`,
      subtitle: '虚位以待 敬请期待',
      summary: '白话提要：\n此章节内容正在整理与翻译中，敬请期待后续更新。'
    };
  };

  const currentChapter = getChapterData(chapterId);

  // Mock text for Chapters
  const chapterData = {
    ...currentChapter,
    paragraphs: [
      {
        id: 'p1',
        classical: '话说凤姐儿正与平儿说话，只见有人来回说：“瑞大爷来了。”凤姐儿急忙命人请进来。',
        mixed: '（话说凤姐儿正与平儿说话，只见有人来回说：“瑞大爷来了。”凤姐儿急忙命人请进来。）【白话：凤姐正和平儿说话，下人通报贾瑞来了。凤姐赶忙让人请进。】',
        modern: '凤姐正和平儿说话，下人通报贾瑞来了。凤姐赶忙让人请进。',
        hasVideo: true,
      },
      {
        id: 'p2',
        classical: '贾瑞见了凤姐，满面陪笑，连连请安。凤姐儿笑道：“瑞大爷为何这等闲暇？”贾瑞道：“听见嫂子病了，特来请安。”',
        mixed: '（贾瑞见了凤姐，满面陪笑，连连请安。凤姐儿笑道：“瑞大爷为何这等闲暇？”贾瑞道：“听见嫂子病了，特来请安。”）【白话：贾瑞见了凤姐，满脸堆笑地请安。凤姐笑着问他怎么这么闲，贾瑞回答说是听说嫂子病了，特意来探望。】',
        modern: '贾瑞见了凤姐，满脸堆笑地请安。凤姐笑着问他怎么这么闲，贾瑞回答说是听说嫂子病了，特意来探望。',
        hasVideo: false,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif relative pb-32 selection:bg-[var(--color-seal-red)]/20">
      
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1710171454800-a1ab850a4668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjB2aWRlbyUyMGFydHxlbnwxfHx8fDE3NzQyNTc5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Intro Animation"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/90" />
            
            <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-seal-red)]/90 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(186,51,41,0.6)] cursor-pointer"
                onClick={() => setShowIntro(false)}
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white text-3xl md:text-5xl font-serif font-bold tracking-widest mb-4 drop-shadow-md"
              >
                {chapterData?.title} · {chapterData?.subtitle?.split(' ')[0] || ''}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[var(--color-paper-200)] text-lg md:text-xl font-sans mb-12 max-w-xl opacity-90"
              >
                精美动画带你沉浸式体验本回核心剧情
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setShowIntro(false)}
                className="text-white/60 hover:text-white border border-white/30 hover:border-white/60 px-8 py-3 rounded-full font-sans text-sm transition-all shadow-sm bg-white/5 backdrop-blur-sm"
              >
                跳过观看，直接阅读
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[var(--color-paper-100)]/80 backdrop-blur-md border-b border-[var(--color-paper-300)] transition-all">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/read')}
            className="flex items-center gap-1 text-[var(--color-ink-800)] hover:text-[var(--color-seal-red)] transition-colors p-2 -ml-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex bg-[var(--color-paper-200)] p-1 rounded-full border border-[var(--color-gold-dark)]/30 shadow-inner">
            {[
              { id: 'classical', label: '纯古文' },
              { id: 'mixed', label: '中外对照' }, // Using "中外" as a placeholder for 古白话对照 just to keep it short, actually let's use '双语' or '对照'
              { id: 'modern', label: '纯白话' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setReadMode(mode.id as ReadMode)}
                className={clsx(
                  "px-4 py-1.5 text-sm rounded-full transition-all whitespace-nowrap",
                  readMode === mode.id 
                    ? "bg-[var(--color-seal-red)] text-white shadow-md font-bold" 
                    : "text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]"
                )}
              >
                {mode.label === '中外对照' ? '对照阅读' : mode.label}
              </button>
            ))}
          </div>

          <button className="p-2 -mr-2 rounded-full text-[var(--color-ink-800)] hover:bg-[var(--color-paper-200)] transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Reading Area */}
      <main className="max-w-3xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        
        {/* Title */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-ink-900)] tracking-widest">{chapterData?.title}</h1>
          <h2 className="text-xl md:text-2xl text-[var(--color-ink-600)] tracking-widest">{chapterData?.subtitle}</h2>
          <div className="w-24 h-0.5 bg-[var(--color-seal-red)] mx-auto mt-6 opacity-60"></div>
        </div>

        {/* Chapter Summary (First Screen Element) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-paper-200)]/70 border border-[var(--color-gold-dark)]/20 rounded-lg p-6 md:p-8 mb-16 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] rotate-12 -mr-8 -mt-8 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C77.6 0 100 22.4 100 50C100 77.6 77.6 100 50 100C22.4 100 0 77.6 0 50C0 22.4 22.4 0 50 0ZM50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 27.9 72.1 10 50 10Z" />
            </svg>
          </div>
          <p className="font-sans text-[var(--color-ink-800)] text-lg leading-relaxed whitespace-pre-wrap">
            {chapterData?.summary}
          </p>
        </motion.div>

        {/* Text Paragraphs */}
        <div className="space-y-10 text-xl leading-[2.2] md:leading-[2.5] text-[var(--color-ink-900)] text-justify">
          {chapterData?.paragraphs?.map((p, index) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group"
            >
              <p className={clsx(
                readMode === 'modern' ? 'font-sans text-lg text-[var(--color-ink-800)]' : 'font-serif',
              )}>
                {p[readMode]}
              </p>

              {/* Mini Video Animation Window */}
              {p.hasVideo && (
                <div className={clsx(
                  "mt-6 float-right ml-6 mb-4 relative z-10 transition-all duration-500 overflow-hidden shadow-md border border-[var(--color-gold-dark)]/30 rounded-lg bg-black",
                  miniVideoExpanded ? "w-full aspect-video float-none mx-0" : "w-48 aspect-video cursor-pointer hover:shadow-lg group-hover:border-[var(--color-seal-red)]/50"
                )}>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1710171454800-a1ab850a4668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjB2aWRlbyUyMGFydHxlbnwxfHx8fDE3NzQyNTc5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Animation clip" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  {!miniVideoExpanded && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors"
                      onClick={() => setMiniVideoExpanded(true)}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  {miniVideoExpanded && (
                    <div 
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors z-20"
                      onClick={() => setMiniVideoExpanded(false)}
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {miniVideoExpanded && (
                    <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-sans z-10 drop-shadow-md bg-black/40 p-2 rounded">
                      [动画旁白] 凤姐贪图这三千两银子，便应下了老尼的嘱托...
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* Bottom Toolbar */}
      <footer className="fixed bottom-0 inset-x-0 h-16 bg-[var(--color-paper-100)]/90 backdrop-blur-md border-t border-[var(--color-paper-300)] z-40 flex items-center justify-around px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        <button className="flex flex-col items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors w-16">
          <Headphones className="w-5 h-5" />
          <span className="text-xs font-sans">朗读</span>
        </button>
        
        <div className="flex-1 max-w-sm px-4">
          <button className="w-full h-10 bg-[var(--color-paper-200)] border border-[var(--color-gold-dark)]/30 rounded-full flex items-center justify-center gap-2 text-[var(--color-ink-600)] hover:bg-white transition-colors text-sm font-sans shadow-inner">
            <Edit3 className="w-4 h-4" />
            写下你的感悟...
          </button>
        </div>
        
        <button className="flex flex-col items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-gold-dark)] transition-colors w-16">
          <Star className="w-5 h-5" />
          <span className="text-xs font-sans">收藏</span>
        </button>
      </footer>

    </div>
  );
};
