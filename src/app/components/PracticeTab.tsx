import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, BrainCircuit, Timer, ChevronDown, ChevronUp, CheckCircle, BarChart3, ChevronRight, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { clsx } from 'clsx';

// Forced HMR reload comment
const generateChapters = () => {
  const chaptersPerGroup = 10;
  const groups: { group: string; chapters: { id: number; title: string; progress: number; accuracy: number; }[] }[] = [];
  
  const toChineseNumeral = (num: number) => {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num <= 10) return chars[num];
    if (num < 20) return `十${num % 10 === 0 ? '' : chars[num % 10]}`;
    if (num < 100) return `${chars[Math.floor(num / 10)]}十${num % 10 === 0 ? '' : chars[num % 10]}`;
    return '一百' + (num % 100 === 0 ? '' : (num % 100 < 10 ? `零${chars[num % 10]}` : (num % 100 === 10 ? '一十' : (num % 100 < 20 ? `十${chars[num % 10]}` : `${chars[Math.floor((num % 100) / 10)]}十${num % 10 === 0 ? '' : chars[num % 10]}`))));
  };

  for (let i = 0; i < 12; i++) {
    const start = i * chaptersPerGroup + 1;
    const end = (i + 1) * chaptersPerGroup;
    const groupName = `第${toChineseNumeral(start)}回至第${toChineseNumeral(end)}回`;
    
    const chapters = [];
    for (let j = start; j <= end; j++) {
      // Mock progress data
      const progress = j <= 5 ? 100 : (j === 6 ? 40 : 0);
      const accuracy = j <= 5 ? Math.floor(Math.random() * 20) + 80 : 0;
      chapters.push({
        id: j,
        title: `第${toChineseNumeral(j)}回`,
        progress,
        accuracy
      });
    }
    groups.push({ group: groupName, chapters });
  }
  return groups;
};

const chaptersData = generateChapters();

export const PracticeTab: React.FC = () => {
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<number[]>([0]);
  const [seasonalMode, setSeasonalMode] = useState<boolean>(false);
  const [randomMode, setRandomMode] = useState<boolean>(false);
  const [examMode, setExamMode] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<boolean>(false);
  const [activeBankTab, setActiveBankTab] = useState<'chapter' | 'theme'>('theme');

  const toggleGroup = (index: number) => {
    if (expandedGroups.includes(index)) {
      setExpandedGroups(expandedGroups.filter(i => i !== index));
    } else {
      setExpandedGroups([...expandedGroups, index]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 lg:space-y-8 pb-32">
      
      {/* Learning Progress Overview */}
      <motion.div 
        className="bg-gradient-to-br from-[var(--color-paper-200)] to-[var(--color-paper-100)] rounded-[16px] p-6 md:p-8 shadow-sm border border-[var(--color-gold-dark)]/20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Subtle decorative background */}
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1699003790261-b43b3f5c8cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2xhc3NpY2FsJTIwYXJ0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzc0MzM0ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Classical Background"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none mix-blend-multiply"
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-seal-red)]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-ink-900)]/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <h2 className="text-xl font-serif font-bold text-[var(--color-ink-900)] mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[var(--color-seal-red)]" />
          本周修习概览
        </h2>
        
        <div className="grid grid-cols-3 gap-4 md:gap-8 relative z-10">
          <div className="flex flex-col items-center text-center p-4 bg-white/40 rounded-xl backdrop-blur-sm border border-white/60">
            <span className="text-sm text-[var(--color-ink-600)] mb-1">已答题数</span>
            <span className="text-3xl md:text-4xl font-bold font-serif text-[var(--color-seal-red)]">128</span>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/40 rounded-xl backdrop-blur-sm border border-white/60">
            <span className="text-sm text-[var(--color-ink-600)] mb-1">正确率</span>
            <span className="text-3xl md:text-4xl font-bold font-serif text-[var(--color-ink-900)]">86<span className="text-xl">%</span></span>
          </div>
          <div 
            className="flex flex-col items-center text-center p-4 bg-[var(--color-seal-red)]/5 rounded-xl backdrop-blur-sm border border-[var(--color-seal-red)]/20 cursor-pointer hover:bg-[var(--color-seal-red)]/10 transition-colors" 
            onClick={() => {
              setActiveBankTab('chapter');
              setExpandedGroups([2]);
              document.getElementById('bank-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-sm text-[var(--color-ink-600)] mb-1">建议练习</span>
            <span className="text-lg md:text-xl font-bold font-serif text-[var(--color-seal-red)] flex items-center gap-1 mt-1">
              第二十四回 <Play className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Middle Three Entry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Seasonal Mock Exams */}
        <motion.div 
          className="min-h-[160px] bg-[var(--color-paper-100)] rounded-[12px] p-5 shadow-md border border-[var(--color-paper-300)] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
          whileHover={{ y: -2 }}
          onClick={() => setSeasonalMode(!seasonalMode)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">进阶</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[var(--color-ink-900)] mb-1">当季模拟题</h3>
            <p className="text-sm text-[var(--color-ink-600)]">真题模拟 冲刺拔高</p>
          </div>

          <AnimatePresence>
            {seasonalMode && (
              <motion.div 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="absolute inset-0 bg-blue-600 p-4 flex flex-col justify-center items-center text-white z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-serif mb-3 text-sm font-bold">精选模拟卷</p>
                <div className="flex flex-col gap-2 w-full px-1">
                  <button 
                    onClick={() => alert('请先解锁完整版')}
                    className="w-full text-left px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="truncate">金考卷真题汇编</span>
                    <div className="flex items-center gap-1 shrink-0 bg-black/30 px-1.5 py-0.5 rounded ml-2">
                      <Lock className="w-3 h-3 text-amber-300" />
                      <span className="text-[10px] text-amber-300">Pro</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => alert('请先解锁完整版')}
                    className="w-full text-left px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="truncate">53模拟题系列</span>
                    <div className="flex items-center gap-1 shrink-0 bg-black/30 px-1.5 py-0.5 rounded ml-2">
                      <Lock className="w-3 h-3 text-amber-300" />
                      <span className="text-[10px] text-amber-300">Pro</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => navigate('/quiz/seasonal/trial')}
                    className="w-full text-left px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="truncate">名校联考体验卷</span>
                    <span className="text-[10px] bg-green-500/80 px-1.5 py-0.5 rounded ml-2 shrink-0">免费体验</span>
                  </button>
                </div>
                <button 
                  className="absolute top-2 right-2 text-white/60 hover:text-white p-1"
                  onClick={(e) => { e.stopPropagation(); setSeasonalMode(false); }}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Random Questions */}
        <motion.div 
          className="min-h-[160px] bg-[var(--color-paper-100)] rounded-[12px] p-5 shadow-md border border-[var(--color-paper-300)] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
          whileHover={{ y: -2 }}
          onClick={() => setRandomMode(!randomMode)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[var(--color-ink-900)] mb-1">来一发随机题</h3>
            <p className="text-sm text-[var(--color-ink-600)]">温故知新 随机查验</p>
          </div>

          <AnimatePresence>
            {randomMode && (
              <motion.div 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="absolute inset-0 bg-purple-600 p-4 flex flex-col justify-center items-center text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-serif mb-3">请选择题目数量</p>
                <div className="flex gap-2">
                  {[10, 20, 30].map(num => (
                    <button 
                      key={num}
                      onClick={() => navigate(`/quiz/random/${num}`)}
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors"
                    >
                      {num}题
                    </button>
                  ))}
                </div>
                <button 
                  className="absolute top-2 right-2 text-white/60 hover:text-white p-1"
                  onClick={(e) => { e.stopPropagation(); setRandomMode(false); }}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mock Exam */}
        <motion.div 
          className="min-h-[160px] bg-[var(--color-paper-100)] rounded-[12px] p-5 shadow-md border border-[var(--color-paper-300)] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
          whileHover={{ y: -2 }}
          onClick={() => setExamMode(!examMode)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-seal-red)]/10 flex items-center justify-center text-[var(--color-seal-red)]">
              <Timer className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-[var(--color-seal-red)] bg-[var(--color-seal-red)]/10 px-2 py-1 rounded">挑战</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[var(--color-ink-900)] mb-1">模拟大考</h3>
            <p className="text-sm text-[var(--color-ink-600)]">全真模拟 限时挑战</p>
          </div>

          <AnimatePresence>
            {examMode && (
              <motion.div 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="absolute inset-0 bg-[var(--color-seal-red)] p-4 flex flex-col justify-center items-center text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-serif mb-3">请选择考试时长</p>
                <div className="flex gap-2">
                  {[10, 20, 30].map(time => (
                    <button 
                      key={time}
                      onClick={() => navigate(`/quiz/exam/${time}`)}
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors flex items-center gap-1"
                    >
                      {time}分
                    </button>
                  ))}
                </div>
                <button 
                  className="absolute top-2 right-2 text-white/60 hover:text-white p-1"
                  onClick={(e) => { e.stopPropagation(); setExamMode(false); }}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Chapter Practice List */}
      <div className="mt-8" id="bank-section">
        <div className="flex items-center gap-6 mb-6 border-b border-[var(--color-paper-300)]">
          <button 
            className={`pb-3 text-xl font-bold font-serif transition-colors relative ${activeBankTab === 'theme' ? 'text-[var(--color-seal-red)]' : 'text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'}`}
            onClick={() => setActiveBankTab('theme')}
          >
            专题题库
            {activeBankTab === 'theme' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-seal-red)] rounded-t-full"></span>
            )}
          </button>
          <button 
            className={`pb-3 text-xl font-bold font-serif transition-colors relative ${activeBankTab === 'chapter' ? 'text-[var(--color-seal-red)]' : 'text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'}`}
            onClick={() => setActiveBankTab('chapter')}
          >
            章回题库
            {activeBankTab === 'chapter' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-seal-red)] rounded-t-full"></span>
            )}
          </button>
        </div>

        {activeBankTab === 'chapter' ? (
          <div className="space-y-4">
            {chaptersData.map((group, groupIndex) => (
              <div key={group.group} className="bg-white/80 border border-[var(--color-paper-300)] rounded-[12px] shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleGroup(groupIndex)}
                className="w-full px-5 py-4 flex items-center justify-between bg-[var(--color-paper-200)]/50 hover:bg-[var(--color-paper-200)] transition-colors"
              >
                <h3 className="text-lg font-bold font-serif text-[var(--color-ink-900)]">
                  {group.group}
                </h3>
                {expandedGroups.includes(groupIndex) ? (
                  <ChevronUp className="w-5 h-5 text-[var(--color-ink-600)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--color-ink-600)]" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {expandedGroups.includes(groupIndex) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="divide-y divide-[var(--color-paper-300)]/50">
                      {group.chapters.map((chapter) => (
                        <div 
                          key={chapter.id}
                          className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-black/5 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-serif font-bold text-[var(--color-ink-900)] mb-2 flex items-center gap-2">
                              {chapter.title}专项练
                              {chapter.progress === 100 && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </h4>
                            <div className="flex items-center gap-4 text-sm font-sans">
                              <div className="flex-1 max-w-[200px] flex items-center gap-2">
                                <div className="h-1.5 flex-1 bg-[var(--color-paper-300)] rounded-full overflow-hidden">
                                  <div 
                                    className={clsx(
                                      "h-full rounded-full transition-all duration-1000",
                                      chapter.progress === 100 ? "bg-green-500" : "bg-blue-500"
                                    )}
                                    style={{ width: `${chapter.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-[var(--color-ink-600)] w-10">{chapter.progress}%</span>
                              </div>
                              {chapter.progress > 0 && (
                                <span className="text-[var(--color-ink-600)] border-l border-[var(--color-paper-300)] pl-4">
                                  正确率: <span className="text-[var(--color-seal-red)] font-medium">{chapter.accuracy}%</span>
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => navigate(`/quiz/chapter/${chapter.id}`)}
                            className={clsx(
                              "px-6 py-2 rounded-full font-serif text-sm border transition-colors whitespace-nowrap",
                              chapter.progress === 100 
                                ? "bg-white border-[var(--color-paper-300)] text-[var(--color-ink-600)] hover:bg-[var(--color-paper-200)]" 
                                : "bg-[var(--color-seal-red)] border-transparent text-white hover:bg-[#a02a22] shadow-sm"
                            )}
                          >
                            {chapter.progress === 100 ? "重新练习" : (chapter.progress > 0 ? "继续练习" : "开始练习")}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'character', title: '人物专题', desc: '金陵十二钗及各色人物生平、性格、判词解析', count: 120, progress: 45, icon: '👩‍🦰', color: 'bg-rose-50 text-rose-600' },
              { id: 'plot', title: '情节专题', desc: '红楼梦经典回目故事、事件起承转合', count: 85, progress: 12, icon: '📜', color: 'bg-blue-50 text-blue-600' },
              { id: 'detail', title: '细节专题', desc: '诗词曲赋、服饰饮食、医药建筑等专精考据', count: 200, progress: 0, icon: '🔍', color: 'bg-amber-50 text-amber-600' },
              { id: 'gaokao', title: '高考真题', desc: '历年全国各地高考及模考红楼梦真题汇总', count: 68, progress: 80, icon: '🎓', color: 'bg-[var(--color-seal-red)]/10 text-[var(--color-seal-red)]' }
            ].map((theme) => (
              <div 
                key={theme.id}
                className="bg-white/80 border border-[var(--color-paper-300)] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                onClick={() => navigate(`/theme/${theme.id}`)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${theme.color}`}>
                    {theme.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-lg text-[var(--color-ink-900)] mb-1 group-hover:text-[var(--color-seal-red)] transition-colors">{theme.title}</h3>
                    <p className="text-sm text-[var(--color-ink-600)] line-clamp-2">{theme.desc}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-paper-300)]/50">
                  <div className="flex items-center gap-3 w-2/3">
                    <div className="h-1.5 flex-1 bg-[var(--color-paper-300)] rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full rounded-full transition-all duration-1000",
                          theme.progress === 100 ? "bg-green-500" : theme.progress > 0 ? "bg-blue-500" : "bg-transparent"
                        )}
                        style={{ width: `${theme.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[var(--color-ink-600)] whitespace-nowrap">{theme.progress}% ({Math.round(theme.count * theme.progress / 100)}/{theme.count}题)</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--color-ink-600)] group-hover:text-[var(--color-seal-red)] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

