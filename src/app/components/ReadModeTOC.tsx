import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, ChevronDown, ChevronUp, Book } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageWithFallback } from './figma/ImageWithFallback';

const generate120Chapters = () => {
  const chaptersPerGroup = 10;
  const groups: { group: string; chapters: { id: number; title: string; desc: string; }[] }[] = [];
  
  // Explicitly defined titles for specific chapters, others will fallback
  const knownTitles: Record<number, string> = {
    1: '甄士隐梦幻识通灵 贾雨村风尘怀闺秀',
    2: '贾夫人仙逝扬州城 冷子兴演说荣国府',
    3: '贾接外孙女 林黛玉进贾府',
    4: '薄命女偏逢薄命郎 葫芦僧乱判葫芦案',
    5: '游幻境指迷十二钗 饮仙醪曲演红楼梦',
    11: '庆寿辰宁府排家宴 见熙凤贾瑞起淫心',
    12: '王熙凤毒设相思局 贾天祥正照风月鉴',
    15: '王凤姐弄权铁槛寺 秦鲸卿得趣馒头庵',
  };

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
      chapters.push({
        id: j,
        title: `第${toChineseNumeral(j)}回`,
        desc: knownTitles[j] || '虚位以待 敬请期待',
      });
    }
    groups.push({ group: groupName, chapters });
  }
  return groups;
};

const tocData = generate120Chapters();

export const ReadModeTOC: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<number[]>([0]);

  const toggleGroup = (index: number) => {
    if (expandedGroups.includes(index)) {
      setExpandedGroups(expandedGroups.filter(i => i !== index));
    } else {
      setExpandedGroups([...expandedGroups, index]);
    }
  };

  const filteredData = tocData.map(group => ({
    ...group,
    chapters: group.chapters.filter(ch => 
      ch.title.includes(searchQuery) || ch.desc.includes(searchQuery)
    )
  })).filter(group => group.chapters.length > 0);

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif relative overflow-hidden">
      
      {/* Texture Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1763225037262-75d0cb46f9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMG1hbnVzY3JpcHQlMjBib29rfGVufDF8fHx8MTc3NDI1Nzk4Nnww&ixlib=rb-4.1.0&q=80&w=1080')`, backgroundSize: 'cover' }}
      ></div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/main')}
            className="flex items-center gap-2 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-lg">返回</span>
          </button>
          
          <h1 className="text-2xl font-bold tracking-widest text-[var(--color-ink-900)] flex items-center gap-3">
            <Book className="w-5 h-5 text-[var(--color-seal-red)]" />
            红楼梦百廿回
          </h1>
          
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pb-4 pt-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索章节名或回目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--color-paper-100)] border border-[var(--color-gold-dark)]/40 rounded-full py-2.5 pl-12 pr-4 text-[var(--color-ink-800)] focus:outline-none focus:border-[var(--color-seal-red)] transition-colors shadow-inner font-sans"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-600)]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8 relative z-10 pb-32">
        
        {filteredData.map((group, groupIndex) => (
          <div key={group.group} className="mb-6 bg-white/60 border border-[var(--color-paper-300)] rounded-[12px] shadow-sm overflow-hidden backdrop-blur-sm">
            
            {/* Group Header */}
            <button 
              onClick={() => toggleGroup(groupIndex)}
              className="w-full px-6 py-4 flex items-center justify-between bg-[var(--color-paper-200)]/50 hover:bg-[var(--color-paper-200)] transition-colors"
            >
              <h2 className="text-xl font-bold text-[var(--color-ink-900)] tracking-wider">
                {group.group}
              </h2>
              {expandedGroups.includes(groupIndex) ? (
                <ChevronUp className="w-6 h-6 text-[var(--color-ink-600)]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[var(--color-ink-600)]" />
              )}
            </button>

            {/* Group Chapters */}
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
                        onClick={() => navigate(`/read/${chapter.id}`)}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 cursor-pointer hover:bg-white/90 group transition-all"
                      >
                        <span className="text-lg font-bold text-[var(--color-seal-red)] min-w-[80px]">
                          {chapter.title}
                        </span>
                        <span className="text-[var(--color-ink-800)] text-base md:text-lg group-hover:text-[var(--color-ink-900)] transition-colors line-clamp-1">
                          {chapter.desc}
                        </span>
                        <div className="mt-2 sm:mt-0 sm:ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-[var(--color-gold-dark)] text-sm">
                          <span>开始阅读</span>
                          <ChevronLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-20 text-[var(--color-ink-600)]">
            <p>未找到匹配的章节</p>
          </div>
        )}
      </main>

    </div>
  );
};
