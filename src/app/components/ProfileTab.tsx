import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Clock, BookOpen, Sparkles, Award, 
  Settings, MessageSquare, Bookmark, Target, History, Gift,
  ChevronDown, ChevronUp, X, Check
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { clsx } from 'clsx';

// --- MOCK DATA ---
const USER_INFO = {
  name: '贾府在逃小厮',
  avatar: 'https://images.unsplash.com/photo-1772371272167-0117a6573d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdXNlciUyMGF2YXRhcnxlbnwxfHx8fDE3NzQzMzgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  stats: {
    time: '128',
    chapters: 45,
    fragments: 3450
  }
};

const TITLES = [
  { id: 1, name: '大观园初客', desc: '默认称号，初入红楼世界', unlocked: true, rarity: 'common' },
  { id: 2, name: '门子小厮', desc: '完成首次签到即可获得', unlocked: true, rarity: 'common' },
  { id: 3, name: '清客相公', desc: '连续登录3天即可解锁', unlocked: true, rarity: 'common' },
  { id: 4, name: '贾府远亲', desc: '累计阅读5回原著文章', unlocked: true, rarity: 'common' },
  { id: 5, name: '塾中蒙童', desc: '题库中累计答对50道题', unlocked: true, rarity: 'common' },
  { id: 6, name: '梨香院伶', desc: '观看红楼梦动画满10回', unlocked: true, rarity: 'rare' },
  { id: 7, name: '荣府管事', desc: '单次拥有的碎片达到500', unlocked: true, rarity: 'rare' },
  { id: 8, name: '潇湘雅客', desc: '读完林黛玉相关的所有重要回目', unlocked: false, rarity: 'rare' },
  { id: 9, name: '蘅芜闲人', desc: '题库模拟考试获得5次100分', unlocked: false, rarity: 'rare' },
  { id: 10, name: '稻香老农', desc: '保持连续学习打卡长达30天', unlocked: false, rarity: 'epic' },
  { id: 11, name: '怡红公子', desc: '在“说红楼”社区累计获得1000个赞', unlocked: false, rarity: 'epic' },
  { id: 12, name: '秋爽斋主', desc: '发布的帖子被官方加精10次', unlocked: false, rarity: 'epic' },
  { id: 13, name: '紫菱洲客', desc: '完整点亮全部红楼人物关系图谱', unlocked: false, rarity: 'epic' },
  { id: 14, name: '芦雪庵诗翁', desc: '诗词飞花令小游戏获得全服第一', unlocked: false, rarity: 'epic' },
  { id: 15, name: '海棠社长', desc: '发起一个阅读量超过10万的话题', unlocked: false, rarity: 'legendary' },
  { id: 16, name: '红学新秀', desc: '完成前80回原著精读与批注', unlocked: false, rarity: 'legendary' },
  { id: 17, name: '脂砚斋门人', desc: '在原文中留下的批注获赞超500次', unlocked: false, rarity: 'legendary' },
  { id: 18, name: '畸笏叟知音', desc: '发现并纠错50处古文校对问题', unlocked: false, rarity: 'legendary' },
  { id: 19, name: '曹公真传', desc: '120回全通关且测试满分', unlocked: false, rarity: 'legendary' },
  { id: 20, name: '太虚幻境仙客', desc: '收集齐应用内所有隐藏彩蛋与成就', unlocked: false, rarity: 'mythic' },
];

const BADGES = [
  // 简单 / 新手期（引导探索）
  { id: 1, name: '初入贾府', desc: '观看完第1回《红楼》动画', unlocked: true, icon: '🌸' },
  { id: 2, name: '红楼初探', desc: '首次读完一回经典阅读的原文与概要', unlocked: true, icon: '📖' },
  { id: 3, name: '走马观花', desc: '累计观看5回动画内容', unlocked: true, icon: '👀' },
  { id: 4, name: '海棠诗社', desc: '在“说红楼”社区发布首篇帖子', unlocked: true, icon: '✍️' },
  { id: 5, name: '过目不忘', desc: '首次在章节练习中获得满分', unlocked: true, icon: '💯' },
  { id: 6, name: '金玉良缘', desc: '首次在社区关注其他红迷同好', unlocked: true, icon: '📿' },
  
  // 中等 / 进阶期（养成习惯）
  { id: 7, name: '寻根究底', desc: '在经典阅读中查看50条古文考据注释', unlocked: true, icon: '🔍' },
  { id: 8, name: '怡红快绿', desc: '在社区累计点赞50篇帖子', unlocked: true, icon: '🍃' },
  { id: 9, name: '披阅十载', desc: '经典阅读累计时长突破50小时', unlocked: true, icon: '⏳' },
  { id: 10, name: '持之以恒', desc: '连续30天打卡动画或阅读', unlocked: true, icon: '📅' },
  { id: 11, name: '铁画银钩', desc: '在社区发布5篇被加精的长文帖子', unlocked: true, icon: '🖌️' },
  { id: 12, name: '增删五次', desc: '在错题本累计彻底掌握100道错题', unlocked: false, icon: '📝' },
  { id: 13, name: '散财童子', desc: '在聚宝阁累计消耗10,000个碎片', unlocked: false, icon: '💎' },
  { id: 14, name: '舌战群儒', desc: '在社区帖子下方发表20条高质量评论', unlocked: false, icon: '🗣️' },
  { id: 15, name: '绕梁三日', desc: '在社区发布首条超过60秒的语音原声帖子', unlocked: false, icon: '🎵' },
  
  // 困难 / 高阶（深度内容相关）
  { id: 16, name: '满纸荒唐', desc: '观看完全部120回动画且进度>95%', unlocked: false, icon: '🎭' },
  { id: 17, name: '辛酸之泪', desc: '经典阅读120回原文全部通读并打卡', unlocked: false, icon: '💧' },
  { id: 18, name: '红学泰斗', desc: '模拟考试连续5次获得95分以上', unlocked: false, icon: '🎓' },
  { id: 19, name: '脂砚再世', desc: '在经典阅读发表的段落批注累计获赞1000次', unlocked: false, icon: '🖋️' },
  { id: 20, name: '曹公知音', desc: '题库所有“诗词曲赋”类题目正确率达100%', unlocked: false, icon: '📜' },
  { id: 21, name: '木石前盟', desc: '解锁《红楼梦》全部120位核心角色图谱', unlocked: false, icon: '🌱' },
  { id: 22, name: '太虚幻境', desc: '收集齐聚宝阁所有《红楼梦》限定装扮', unlocked: false, icon: '☁️' },

  // 极难 / 隐藏（硬核骨灰级）
  { id: 23, name: '金陵十二钗', desc: '解锁正册十二金钗的全部隐藏番外剧情', unlocked: false, icon: '🦋' },
  { id: 24, name: '护官符', desc: '在题库中找茬并成功反馈50次错题', unlocked: false, icon: '🛡️' },
  { id: 25, name: '风月宝鉴', desc: '洞悉红楼梦所有暗线人物的情感纠葛网', unlocked: false, icon: '🪞' },
  { id: 26, name: '荒唐言', desc: '在阅读与动画中触发全部3个开发者彩蛋', unlocked: false, icon: '🎭' },
  { id: 27, name: '梦游太虚', desc: '不跳过片头片尾完整观看所有动画集数', unlocked: false, icon: '🌌' },
  { id: 28, name: '诗礼簪缨', desc: '在所有与作诗相关的互动中达成完美评级', unlocked: false, icon: '🏮' },
  { id: 29, name: '钟鸣鼎食', desc: '历史累计收集达到100,000个碎片', unlocked: false, icon: '🍲' },
  { id: 30, name: '烈火烹油', desc: '单篇社区帖子获得超过10,000次点赞', unlocked: false, icon: '🔥' },
];

export const ProfileTab: React.FC = () => {
  const navigate = useNavigate();
  const [isBadgesExpanded, setIsBadgesExpanded] = useState(false);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(TITLES[0].name);

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] pb-24 font-serif">
      
      {/* Header Info Area */}
      <div className="bg-gradient-to-b from-[var(--color-paper-200)] to-[var(--color-paper-100)] pt-8 pb-6 px-4 md:px-8 border-b border-[var(--color-paper-300)]/50">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ImageWithFallback 
                  src={USER_INFO.avatar} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
                />
                <div className="absolute -bottom-2 -right-2 bg-[var(--color-seal-red)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                  Lv. 5
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-ink-900)] mb-1">{USER_INFO.name}</h1>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsTitleModalOpen(true)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-[var(--color-gold-light)] hover:bg-amber-200 text-[var(--color-ink-700)] text-xs rounded font-medium tracking-widest border border-[var(--color-gold-dark)]/30 transition-colors cursor-pointer group"
                  >
                    {currentTitle} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Core Stats */}
          <div className="grid grid-cols-3 gap-4 bg-white/60 rounded-2xl p-4 shadow-sm border border-[var(--color-paper-300)] backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center border-r border-[var(--color-paper-300)]">
              <span className="text-xs text-[var(--color-ink-500)] font-sans mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" />学习时长(时)</span>
              <span className="text-2xl font-bold font-sans text-[var(--color-ink-900)]">{USER_INFO.stats.time}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-[var(--color-paper-300)]">
              <span className="text-xs text-[var(--color-ink-500)] font-sans mb-1 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />已读回目</span>
              <span className="text-2xl font-bold font-sans text-[var(--color-ink-900)]">{USER_INFO.stats.chapters}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-[var(--color-amber-600)] font-sans mb-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" />我的碎片</span>
              <span className="text-2xl font-bold font-sans text-[var(--color-amber-600)]">{USER_INFO.stats.fragments}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-6 space-y-6">
        
        {/* Mall Entry Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => navigate('/mall')}
          className="bg-gradient-to-r from-amber-100 via-orange-50 to-rose-50 rounded-2xl p-5 border border-amber-200 shadow-sm cursor-pointer relative overflow-hidden flex items-center justify-between"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-[var(--color-ink-900)] tracking-wider">聚宝阁商城</h2>
            </div>
            <p className="text-sm text-[var(--color-ink-600)] font-sans">用平时积累的碎片换取心仪好物吧！</p>
          </div>
          
          <button className="px-4 py-2 bg-[var(--color-seal-red)] text-white text-sm font-bold rounded-full shadow-md flex items-center gap-1 hover:bg-[#a02a22] transition-colors shrink-0">
            去兑换 <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Learning Progress */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-paper-300)]">
          <h3 className="font-bold text-[var(--color-ink-900)] mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--color-seal-red)]" /> 我的进度
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2 font-sans">
                <span className="text-[var(--color-ink-600)]">整本书阅读 (120回)</span>
                <span className="font-bold text-[var(--color-ink-900)]">37.5%</span>
              </div>
              <div className="w-full h-2.5 bg-[var(--color-paper-200)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "37.5%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[var(--color-seal-red)] rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-sans">
                <span className="text-[var(--color-ink-600)]">题库正确率</span>
                <span className="font-bold text-[var(--color-ink-900)]">82%</span>
              </div>
              <div className="w-full h-2.5 bg-[var(--color-paper-200)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Wall */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-paper-300)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-[var(--color-ink-900)] flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> 成就徽章墙
              </h3>
              <span className="text-[10px] text-[var(--color-ink-400)] font-sans mt-1 block">每月定期更新，持续解锁新成就</span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-xs font-bold text-[var(--color-ink-600)] bg-[var(--color-paper-200)] px-2 py-0.5 rounded-md font-sans">
                已解锁 {BADGES.filter(b => b.unlocked).length}/{BADGES.length}
              </span>
              <button 
                onClick={() => setIsBadgesExpanded(!isBadgesExpanded)}
                className="flex items-center gap-0.5 text-xs text-[var(--color-seal-red)] hover:text-[#a02a22] font-bold transition-colors"
              >
                {isBadgesExpanded ? '收起徽章' : '查看全部'} 
                {isBadgesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-6 gap-x-2 overflow-hidden"
          >
            <AnimatePresence>
              {(isBadgesExpanded ? BADGES : BADGES.slice(0, 12)).map((badge) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  key={badge.id} 
                  className="flex flex-col items-center gap-2 group relative"
                >
                  <div className={clsx(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transition-all duration-300 cursor-help",
                    badge.unlocked 
                      ? "bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]" 
                      : "bg-[var(--color-paper-200)] border-2 border-[var(--color-paper-300)] opacity-60 grayscale"
                  )}>
                    {badge.icon}
                  </div>
                  <span className={clsx(
                    "text-[10px] md:text-xs font-bold font-sans text-center line-clamp-1 w-full px-1",
                    badge.unlocked ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-400)]"
                  )}>
                    {badge.name}
                  </span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 w-36 p-2 bg-[var(--color-ink-900)] text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center pointer-events-none shadow-xl">
                    <p className="font-bold mb-0.5 text-xs">{badge.name}</p>
                    <p className="font-normal opacity-80 leading-relaxed">{badge.desc}</p>
                    {badge.unlocked ? (
                      <p className="text-amber-300 mt-1 font-bold">已解锁</p>
                    ) : (
                      <p className="text-[var(--color-ink-400)] mt-1">未解锁</p>
                    )}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-ink-900)] rotate-45"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-paper-300)]">
          {[
            { id: 'favorites', icon: <Bookmark className="w-5 h-5 text-blue-500" />, label: '我的收藏' },
            { id: 'posts', icon: <MessageSquare className="w-5 h-5 text-green-500" />, label: '我的发布' },
            { id: 'history', icon: <History className="w-5 h-5 text-purple-500" />, label: '浏览历史' },
            { id: 'mistakes', icon: <BookOpen className="w-5 h-5 text-rose-500" />, label: '错题本' },
          ].map((item, idx, arr) => (
            <button 
              key={item.id}
              className={clsx(
                "w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left",
                idx !== arr.length - 1 && "border-b border-[var(--color-paper-200)]"
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-bold text-[var(--color-ink-800)]">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)]" />
            </button>
          ))}
        </div>

      </div>

      {/* Title Selection Modal */}
      <AnimatePresence>
        {isTitleModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-end md:items-center justify-center sm:p-4"
            onClick={() => setIsTitleModalOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-paper-100)] w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl border-t md:border border-[var(--color-paper-300)] flex flex-col max-h-[85vh] md:max-h-[80vh]"
            >
              <div className="px-5 py-4 border-b border-[var(--color-paper-300)] flex justify-between items-center bg-white md:rounded-t-2xl rounded-t-2xl">
                <div>
                  <h3 className="font-bold text-[var(--color-ink-900)] text-lg">更换称号</h3>
                  <p className="text-xs text-[var(--color-ink-500)] font-sans mt-0.5">解锁新称号，展示红楼资历</p>
                </div>
                <button 
                  onClick={() => setIsTitleModalOpen(false)}
                  className="p-1.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] text-[var(--color-ink-500)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto space-y-3 font-sans pb-8">
                {TITLES.map((title) => {
                  const isCurrent = currentTitle === title.name;
                  
                  return (
                    <div 
                      key={title.id} 
                      className={clsx(
                        "p-4 rounded-xl border flex justify-between items-center transition-all",
                        title.unlocked 
                          ? isCurrent 
                            ? "bg-amber-50 border-amber-300 shadow-sm" 
                            : "bg-white border-[var(--color-paper-300)] hover:border-amber-300 hover:shadow-sm" 
                          : "bg-[var(--color-paper-200)] border-[var(--color-paper-300)] opacity-70 grayscale"
                      )}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={clsx(
                            "font-bold font-serif text-base",
                            title.unlocked ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-500)]"
                          )}>
                            {title.name}
                          </span>
                          
                          {/* Rarity tags */}
                          {title.rarity === 'mythic' && <span className="text-[9px] bg-gradient-to-r from-purple-500 to-rose-500 text-white px-1.5 py-0.5 rounded shadow-sm">神话</span>}
                          {title.rarity === 'legendary' && <span className="text-[9px] bg-gradient-to-r from-orange-400 to-red-500 text-white px-1.5 py-0.5 rounded shadow-sm">传说</span>}
                          {title.rarity === 'epic' && <span className="text-[9px] bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-1.5 py-0.5 rounded shadow-sm">史诗</span>}
                          {title.rarity === 'rare' && <span className="text-[9px] bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-1.5 py-0.5 rounded shadow-sm">稀有</span>}
                        </div>
                        <p className="text-xs text-[var(--color-ink-500)] leading-snug">{title.desc}</p>
                      </div>
                      
                      {title.unlocked ? (
                        <button 
                          onClick={() => { setCurrentTitle(title.name); setIsTitleModalOpen(false); }}
                          disabled={isCurrent}
                          className={clsx(
                            "px-4 py-1.5 text-xs rounded-full font-bold flex items-center gap-1 shrink-0 transition-colors",
                            isCurrent 
                              ? "bg-[var(--color-seal-red)] text-white" 
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          )}
                        >
                          {isCurrent ? <><Check className="w-3.5 h-3.5"/> 使用中</> : '佩戴'}
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[var(--color-ink-400)] shrink-0 px-2">未解锁</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
