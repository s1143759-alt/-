import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, BrainCircuit, Target, Star, History } from 'lucide-react';
import { clsx } from 'clsx';

type CategoryItem = {
  id: string;
  title: string;
  desc?: string;
  count: number;
  progress: number;
  icon?: React.ReactNode;
};

type ThemeConfig = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  categories: CategoryItem[];
};

const THEME_DATA: Record<string, ThemeConfig> = {
  character: {
    id: 'character',
    title: '人物专题',
    description: '深入了解金陵十二钗及各色人物的生平、性格、判词与命运走向。',
    icon: <span className="text-3xl">👩‍🦰</span>,
    colorClass: 'bg-rose-50 border-rose-200 text-rose-700',
    categories: [
      { id: 'char_baoyu', title: '贾宝玉', desc: '怡红公子生平与情感轨迹', count: 30, progress: 80, icon: <Star className="w-5 h-5 text-amber-500" /> },
      { id: 'char_daiyu', title: '林黛玉', desc: '潇湘妃子才情与木石前盟', count: 25, progress: 100, icon: <Star className="w-5 h-5 text-amber-500" /> },
      { id: 'char_baochai', title: '薛宝钗', desc: '蘅芜君品格与金玉良缘', count: 25, progress: 40, icon: <Star className="w-5 h-5 text-amber-500" /> },
      { id: 'char_xifeng', title: '王熙凤', desc: '凤辣子手段与荣国府管家', count: 20, progress: 10 },
      { id: 'char_other12', title: '其他十二钗', desc: '探春、湘云、妙玉等正册人物', count: 40, progress: 0 },
      { id: 'char_maids', title: '大丫鬟群像', desc: '晴雯、袭人、紫鹃、平儿等', count: 35, progress: 0 },
    ]
  },
  plot: {
    id: 'plot',
    title: '情节专题',
    description: '梳理红楼梦的经典回目故事、重大事件的起承转合。',
    icon: <span className="text-3xl">📜</span>,
    colorClass: 'bg-blue-50 border-blue-200 text-blue-700',
    categories: [
      { id: 'plot_1_30', title: '第一回至第三十回', desc: '木石前盟结缘、宝黛初会与大观园初建', count: 40, progress: 60, icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
      { id: 'plot_31_60', title: '第三十一回至第六十回', desc: '宝玉挨打、诗社结社与探春理家', count: 45, progress: 20, icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
      { id: 'plot_61_90', title: '第六十一回至第九十回', desc: '抄检大观园、迎春出嫁与晴雯夭亡', count: 50, progress: 0, icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
      { id: 'plot_91_120', title: '第九十一回至第一百二十回', desc: '贾府抄家、黛玉焚稿与宝玉出家', count: 40, progress: 0, icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
    ]
  },
  detail: {
    id: 'detail',
    title: '细节专题',
    description: '诗词曲赋、服饰饮食、医药建筑等红学专精考据。',
    icon: <span className="text-3xl">🔍</span>,
    colorClass: 'bg-amber-50 border-amber-200 text-amber-700',
    categories: [
      { id: 'detail_poetry', title: '诗词曲赋', desc: '海棠诗社、葬花吟及十二支曲解析', count: 50, progress: 30, icon: <Target className="w-5 h-5 text-amber-600" /> },
      { id: 'detail_food', title: '饮食文化', desc: '茄鲞、枫露茶、冷香丸等饮食入药考究', count: 30, progress: 10, icon: <Target className="w-5 h-5 text-amber-600" /> },
      { id: 'detail_clothes', title: '服饰妆容', desc: '雀金裘、软烟罗及各色珠钗服饰', count: 25, progress: 0 },
      { id: 'detail_building', title: '建筑园林', desc: '大观园布局、潇湘馆、蘅芜苑等景致', count: 20, progress: 0 },
      { id: 'detail_customs', title: '习俗礼仪', desc: '古代贵族年节礼节、婚丧嫁娶风俗', count: 30, progress: 0 },
    ]
  },
  gaokao: {
    id: 'gaokao',
    title: '高考真题',
    description: '历年全国各地高考及模考《红楼梦》整本书阅读真题汇总。',
    icon: <span className="text-3xl">🎓</span>,
    colorClass: 'bg-red-50 border-red-200 text-red-700',
    categories: [
      { id: 'gk_2024_2022', title: '2024年 - 2022年', count: 45, progress: 90, icon: <History className="w-5 h-5 text-red-500" /> },
      { id: 'gk_2021_2019', title: '2021年 - 2019年', count: 35, progress: 40, icon: <History className="w-5 h-5 text-red-500" /> },
      { id: 'gk_2018_2016', title: '2018年 - 2016年', count: 25, progress: 0, icon: <History className="w-5 h-5 text-red-500" /> },
    ]
  }
};

export const ThemeCategoryPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const theme = THEME_DATA[themeId || ''];

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper-100)]">
        <button onClick={() => navigate('/main/practice')} className="text-[var(--color-seal-red)] underline">
          返回主页
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif pb-32 selection:bg-[var(--color-seal-red)]/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/main/practice')}
            className="flex items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors p-2 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">返回题库</span>
          </button>
          
          <h1 className="text-base font-bold text-[var(--color-ink-900)] tracking-widest">
            {theme.title}
          </h1>

          <div className="w-16"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl w-full mx-auto p-4 md:p-8 space-y-8">
        
        {/* Theme Hero Info */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx("rounded-[16px] p-6 md:p-8 shadow-sm border relative overflow-hidden flex items-start gap-6", theme.colorClass)}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center shrink-0 shadow-sm border border-white">
            {theme.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 tracking-wide">{theme.title}</h2>
            <p className="text-sm md:text-base opacity-80 leading-relaxed font-sans">{theme.description}</p>
          </div>
        </motion.div>

        {/* Categories List */}
        <div>
          <h3 className="text-xl font-bold text-[var(--color-ink-900)] mb-6 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[var(--color-seal-red)]" />
            选择具体分类
          </h3>

          <div className="space-y-4">
            {theme.categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => navigate(`/quiz/theme/${cat.id}`)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="w-full text-left bg-white/80 border border-[var(--color-paper-300)] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center gap-4 hover:border-[var(--color-seal-red)]/30"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {cat.icon && <span className="shrink-0">{cat.icon}</span>}
                    <h4 className="font-serif font-bold text-lg text-[var(--color-ink-900)] group-hover:text-[var(--color-seal-red)] transition-colors">
                      {cat.title}
                    </h4>
                  </div>
                  {cat.desc && (
                    <p className="text-sm text-[var(--color-ink-600)] font-sans mt-1">
                      {cat.desc}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 md:w-1/3 shrink-0 justify-between md:justify-end">
                  <div className="flex-1 md:w-32 flex flex-col items-end gap-1.5">
                    <span className="text-xs text-[var(--color-ink-500)] font-sans">
                      完成度 {cat.progress}%
                    </span>
                    <div className="w-full h-1.5 bg-[var(--color-paper-300)] rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full rounded-full transition-all duration-1000",
                          cat.progress === 100 ? "bg-green-500" : cat.progress > 0 ? "bg-blue-500" : "bg-transparent"
                        )}
                        style={{ width: `${cat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)] group-hover:text-[var(--color-seal-red)] transition-colors shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
