import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { 
  Search, Plus, Heart, MessageCircle, Share2, Bookmark, 
  X, Image as ImageIcon, Mic, Video as VideoIcon, 
  Bold, Quote, Eye, Lock, Send, PlayCircle, MoreHorizontal
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { clsx } from 'clsx';

// MOCK DATA
const MOCK_POSTS = [
  {
    id: '1',
    type: 'image',
    title: '仿照林妹妹的穿搭，初试汉服',
    snippet: '今天尝试了一下淡雅的青绿色系，不知道有没有那么一丝潇湘妃子的感觉呀～',
    image: 'https://images.unsplash.com/photo-1700089609262-ec5abded516d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwaGFuZnUlMjBnaXJsfGVufDF8fHx8MTc3NDMzNzQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    user: { name: '青鸟', avatar: 'https://images.unsplash.com/photo-1746911062158-7e15deb1d2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2hpbmVzZSUyMHBvcnRyYWl0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzc0MzM3NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    likes: 342,
    comments: 56,
    isLiked: true,
    tags: ['汉服', '林黛玉', '日常']
  },
  {
    id: '2',
    type: 'text',
    title: '为什么说探春是贾府最有管理才能的人？',
    snippet: '在第五十五回中，探春理家展现出了惊人的魄力和手腕。首先她废除了不合理的重叠开支，其次...',
    user: { name: '红学探索者', avatar: 'https://images.unsplash.com/photo-1546638008-efbe0b62c730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2FsbGlncmFwaHl8ZW58MXx8fHwxNzc0MjUwNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    likes: 890,
    comments: 213,
    isLiked: false,
    tags: ['人物解析', '探春']
  },
  {
    id: '3',
    type: 'video',
    title: '【高燃群像】十二钗命运交响曲',
    snippet: '历时一周剪辑，用一首歌带你回望金陵十二钗的悲欢离合。',
    image: 'https://images.unsplash.com/photo-1687141924868-b56ec9b7edb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2xhc3NpY2FsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NDMzNzQ1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    user: { name: '剪刀手老王', avatar: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjBibG9zc29tfGVufDF8fHx8MTc3NDMzNzQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    likes: 1250,
    comments: 340,
    isLiked: false,
    tags: ['影视剪辑', '群像', '混剪']
  },
  {
    id: '4',
    type: 'image',
    title: '复刻《红楼梦》里的茶点',
    snippet: '今天试着做了老太太爱吃的松瓤鹅油卷，满屋飘香，配上一壶枫露茶，绝了！',
    image: 'https://images.unsplash.com/photo-1717874927261-d8f7225cc81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdGVhJTIwc2V0dXB8ZW58MXx8fHwxNzc0MzM3NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    user: { name: '贪吃的宝玉', avatar: 'https://images.unsplash.com/photo-1546638008-efbe0b62c730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2FsbGlncmFwaHl8ZW58MXx8fHwxNzc0MjUwNDg2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    likes: 567,
    comments: 89,
    isLiked: false,
    tags: ['饮食', '古法复刻']
  }
];

export const CommunityTab: React.FC = () => {
  const [activeSort, setActiveSort] = useState<'recommend' | 'newest' | 'hot'>('recommend');
  const [showPublish, setShowPublish] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] pb-24 md:pb-8 font-serif">
      {/* Header Area */}
      <div className="sticky top-0 z-30 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] px-4 pt-4 pb-2">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-400)]" />
            <input 
              type="text" 
              placeholder="搜索感兴趣的话题、帖子或作者..."
              className="w-full bg-white/60 border border-[var(--color-paper-300)] rounded-full py-2.5 pl-12 pr-4 text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-400)] outline-none focus:border-[var(--color-seal-red)]/50 focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Sort Tabs */}
          <div className="flex items-center gap-6">
            {[
              { id: 'recommend', label: '推荐' },
              { id: 'newest', label: '最新' },
              { id: 'hot', label: '热门' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id as any)}
                className={clsx(
                  "relative pb-2 text-base md:text-lg font-bold transition-colors",
                  activeSort === tab.id ? "text-[var(--color-seal-red)]" : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-800)]"
                )}
              >
                {tab.label}
                {activeSort === tab.id && (
                  <motion.div 
                    layoutId="activeTabCommunity"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[var(--color-seal-red)] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed (Waterfall) */}
      <div className="max-w-4xl mx-auto p-4">
        <ResponsiveMasonry columnsCountBreakPoints={{300: 2, 768: 3}}>
          <Masonry gutter="16px">
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[16px] overflow-hidden shadow-sm border border-[var(--color-paper-300)] flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Media Area */}
                {post.image && (
                  <div className="relative">
                    <ImageWithFallback 
                      src={post.image} 
                      alt={post.title}
                      className={clsx(
                        "w-full object-cover",
                        post.type === 'video' ? "aspect-video" : "max-h-[300px]"
                      )}
                    />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-md" />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Content Area */}
                <div className="p-3 md:p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-[var(--color-ink-900)] text-sm md:text-base line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  {!post.image && (
                    <p className="text-xs md:text-sm text-[var(--color-ink-600)] line-clamp-3 font-sans">
                      {post.snippet}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.slice(0,2).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-500)] text-[10px] rounded-sm font-sans">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta / Footer */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-paper-200)]">
                    <div className="flex items-center gap-1.5">
                      <ImageWithFallback 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="w-5 h-5 rounded-full object-cover border border-[var(--color-paper-300)]"
                      />
                      <span className="text-[10px] md:text-xs text-[var(--color-ink-600)] truncate max-w-[80px]">
                        {post.user.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                        className="flex items-center gap-1 text-[var(--color-ink-500)] hover:text-[var(--color-seal-red)] transition-colors"
                      >
                        <motion.div
                          whileTap={{ scale: 1.3 }}
                          animate={post.isLiked ? { scale: [1, 1.2, 1] } : {}}
                        >
                          <Heart className={clsx("w-3.5 h-3.5", post.isLiked && "fill-[var(--color-seal-red)] text-[var(--color-seal-red)]")} />
                        </motion.div>
                        <span className={clsx("text-[10px] font-sans", post.isLiked && "text-[var(--color-seal-red)]")}>{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Floating Action Button (Publish) */}
      <button
        onClick={() => setShowPublish(true)}
        className="fixed bottom-24 md:bottom-8 right-6 md:right-12 w-14 h-14 bg-[var(--color-seal-red)] text-white rounded-full shadow-[0_4px_12px_rgba(139,38,33,0.3)] flex items-center justify-center hover:bg-[#a02a22] hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Publish Modal Overlay */}
      <AnimatePresence>
        {showPublish && <PublishModal onClose={() => setShowPublish(false)} />}
      </AnimatePresence>
    </div>
  );
};

// --- Publish Modal Component ---
const PublishModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'video'>('text');
  const [isPublic, setIsPublic] = useState(true);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[var(--color-ink-900)]/40 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-x-0 bottom-0 top-12 md:top-24 bg-[var(--color-paper-100)] z-50 rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col font-serif overflow-hidden border-t border-[var(--color-paper-300)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-paper-300)] bg-white/50">
          <button onClick={onClose} className="p-2 -ml-2 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]">
            <X className="w-6 h-6" />
          </button>
          <span className="font-bold text-lg text-[var(--color-ink-900)] tracking-widest">执笔抒臆</span>
          <button 
            onClick={onClose}
            className="px-5 py-1.5 bg-[var(--color-seal-red)] text-white rounded-full text-sm font-bold shadow-sm hover:bg-[#a02a22] transition-colors flex items-center gap-1"
          >
            发布 <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6 space-y-6">
            
            {/* Input Type Selector */}
            <div className="flex items-center gap-4 border-b border-[var(--color-paper-300)] pb-4">
              {[
                { id: 'text', icon: <ImageIcon className="w-4 h-4" />, label: '图文' },
                { id: 'video', icon: <VideoIcon className="w-4 h-4" />, label: '视频' },
                { id: 'audio', icon: <Mic className="w-4 h-4" />, label: '语音' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={clsx(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all",
                    activeTab === tab.id 
                      ? "bg-[var(--color-ink-900)] text-white" 
                      : "bg-[var(--color-paper-200)] text-[var(--color-ink-600)] hover:bg-[var(--color-paper-300)]"
                  )}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Title Input */}
            <div>
              <input 
                type="text" 
                placeholder="填写标题（必填）"
                className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder:text-[var(--color-ink-300)] text-[var(--color-ink-900)] py-2"
              />
            </div>

            {/* Dynamic Input Area */}
            <div className="min-h-[200px]">
              {activeTab === 'text' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 bg-[var(--color-paper-200)]/50 p-2 rounded-lg border border-[var(--color-paper-300)]">
                    <button className="p-1.5 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] rounded hover:bg-black/5"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] rounded hover:bg-black/5"><Quote className="w-4 h-4" /></button>
                    <div className="w-[1px] h-4 bg-[var(--color-paper-300)] mx-1"></div>
                    <button className="flex items-center gap-1 px-2 py-1 text-sm text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] bg-white rounded border border-[var(--color-paper-300)] shadow-sm">
                      <ImageIcon className="w-3.5 h-3.5" /> 插入图片
                    </button>
                  </div>
                  <textarea 
                    placeholder="在此输入正文... 支持添加图片、诗词引用。"
                    className="w-full h-[200px] resize-none bg-transparent border-none outline-none placeholder:text-[var(--color-ink-300)] text-[var(--color-ink-800)] text-base font-sans leading-relaxed"
                  />
                </div>
              )}

              {activeTab === 'video' && (
                <div className="w-full h-[200px] border-2 border-dashed border-[var(--color-paper-400)] rounded-xl flex flex-col items-center justify-center bg-[var(--color-paper-200)]/30 hover:bg-[var(--color-paper-200)]/80 transition-colors cursor-pointer text-[var(--color-ink-500)] group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-[var(--color-seal-red)]" />
                  </div>
                  <p className="font-medium text-[var(--color-ink-700)]">点击或拖拽上传视频</p>
                  <p className="text-xs mt-1">支持 MP4, MOV 格式，最大 50MB</p>
                </div>
              )}

              {activeTab === 'audio' && (
                <div className="w-full h-[200px] border border-[var(--color-paper-300)] rounded-xl flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-paper-100)] to-[var(--color-paper-200)] gap-6">
                  <button className="w-20 h-20 rounded-full bg-[var(--color-seal-red)] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(139,38,33,0.3)] hover:scale-105 active:scale-95 transition-all">
                    <Mic className="w-8 h-8" />
                  </button>
                  <div className="text-center">
                    <p className="font-bold text-[var(--color-ink-900)] mb-1">长按录制语音</p>
                    <p className="text-xs text-[var(--color-ink-500)] font-sans">自动转写为文字并附带语音条</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Options */}
            <div className="mt-8 pt-6 border-t border-[var(--color-paper-300)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-ink-800)] flex items-center gap-2">
                  添加标签 <span className="text-xs font-normal text-[var(--color-ink-400)]">有助于获得更多曝光</span>
                </span>
                <button className="p-1 text-[var(--color-seal-red)]">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                {['考据探讨', '二次创作', '诗词赏析'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[var(--color-paper-200)] text-[var(--color-ink-600)] text-sm rounded-full cursor-pointer hover:bg-[var(--color-paper-300)]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 bg-white p-3 rounded-lg border border-[var(--color-paper-300)]">
                <div className="flex items-center gap-3">
                  <div className={clsx("p-2 rounded-full", isPublic ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600")}>
                    {isPublic ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-ink-900)]">{isPublic ? '公开可见' : '仅自己可见'}</p>
                    <p className="text-xs text-[var(--color-ink-500)] font-sans">{isPublic ? '所有人均可查看和评论' : '作为私密笔记保存'}</p>
                  </div>
                </div>
                {/* Custom Toggle Switch */}
                <button 
                  onClick={() => setIsPublic(!isPublic)}
                  className={clsx(
                    "w-12 h-6 rounded-full p-1 transition-colors relative",
                    isPublic ? "bg-[var(--color-seal-red)]" : "bg-[var(--color-ink-300)]"
                  )}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: isPublic ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};
