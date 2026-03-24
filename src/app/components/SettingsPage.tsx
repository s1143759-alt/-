import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Bell, Trash2, Shield, Info, HelpCircle, LogOut, X, 
  BookOpen, Sparkles, Award
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { clsx } from 'clsx';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [activeModal, setActiveModal] = useState<'fragments' | 'badges' | null>(null);

  const handleClearCache = () => {
    toast.success('已成功清理 23MB 缓存数据');
  };

  const handleLogout = () => {
    toast('已退出登录', { icon: '👋' });
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif pb-12">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors p-2 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          <h1 className="text-base font-bold text-[var(--color-ink-900)] tracking-widest">
            设置
          </h1>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Rules Section */}
        <div className="space-y-2">
          <h2 className="px-4 text-xs font-bold text-[var(--color-ink-500)] tracking-widest font-sans">规则与指南</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-paper-300)]">
            <button 
              onClick={() => setActiveModal('fragments')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left border-b border-[var(--color-paper-200)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <span className="font-bold text-[var(--color-ink-800)]">碎片收集规则</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)]" />
            </button>

            <button 
              onClick={() => setActiveModal('badges')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-blue-500" />
                </div>
                <span className="font-bold text-[var(--color-ink-800)]">徽章解锁规则</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)]" />
            </button>
          </div>
        </div>

        {/* General Section */}
        <div className="space-y-2">
          <h2 className="px-4 text-xs font-bold text-[var(--color-ink-500)] tracking-widest font-sans">通用设置</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-paper-300)]">
            <div className="w-full px-5 py-4 flex items-center justify-between border-b border-[var(--color-paper-200)]">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[var(--color-ink-500)]" />
                <span className="font-bold text-[var(--color-ink-800)]">消息推送</span>
              </div>
              <button 
                onClick={() => setPushEnabled(!pushEnabled)}
                className={clsx(
                  "w-12 h-6 rounded-full p-1 transition-colors relative",
                  pushEnabled ? "bg-[var(--color-seal-red)]" : "bg-[var(--color-ink-300)]"
                )}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: pushEnabled ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <button 
              onClick={handleClearCache}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-[var(--color-ink-500)]" />
                <span className="font-bold text-[var(--color-ink-800)]">清除缓存</span>
              </div>
              <span className="text-sm text-[var(--color-ink-400)] font-sans">23.5 MB <ChevronRight className="w-4 h-4 inline" /></span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h2 className="px-4 text-xs font-bold text-[var(--color-ink-500)] tracking-widest font-sans">关于</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-paper-300)]">
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left border-b border-[var(--color-paper-200)]">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[var(--color-ink-500)]" />
                <span className="font-bold text-[var(--color-ink-800)]">隐私协议</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)]" />
            </button>

            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left border-b border-[var(--color-paper-200)]">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[var(--color-ink-500)]" />
                <span className="font-bold text-[var(--color-ink-800)]">帮助中心</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-ink-400)]" />
            </button>

            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-[var(--color-paper-100)] transition-colors text-left">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[var(--color-ink-500)]" />
                <span className="font-bold text-[var(--color-ink-800)]">关于《练红楼》</span>
              </div>
              <span className="text-sm text-[var(--color-ink-400)] font-sans">v1.0.0 <ChevronRight className="w-4 h-4 inline" /></span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl py-4 mt-6 text-rose-500 font-bold flex items-center justify-center gap-2 shadow-sm border border-[var(--color-paper-300)] hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-5 h-5" /> 退出登录
        </button>

      </main>

      {/* Modals for Rules */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[var(--color-paper-100)] w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[var(--color-paper-300)] flex items-center justify-between bg-white">
                <h3 className="text-lg font-bold text-[var(--color-ink-900)] flex items-center gap-2">
                  {activeModal === 'fragments' ? <><Sparkles className="w-5 h-5 text-amber-500"/> 碎片收集规则</> : <><Award className="w-5 h-5 text-blue-500"/> 徽章解锁规则</>}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-1 text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto font-sans text-sm text-[var(--color-ink-700)] space-y-4">
                {activeModal === 'fragments' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[var(--color-ink-900)] mb-3 flex items-center gap-2 text-base">
                        <Sparkles className="w-4 h-4 text-amber-500" /> 基础获取规则
                      </h4>
                      <div className="overflow-x-auto rounded-lg border border-[var(--color-paper-300)] bg-white">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-[var(--color-paper-200)] text-[var(--color-ink-600)]">
                            <tr>
                              <th className="p-2 font-bold whitespace-nowrap">任务项</th>
                              <th className="p-2 font-bold">奖励</th>
                              <th className="p-2 font-bold whitespace-nowrap">每日上限</th>
                              <th className="p-2 font-bold">备注</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--color-paper-200)] text-[var(--color-ink-800)]">
                            <tr>
                              <td className="p-2">完成一回刷红楼（看完动画）</td>
                              <td className="p-2 text-amber-600 font-bold">15</td>
                              <td className="p-2 text-[var(--color-ink-500)]">300</td>
                              <td className="p-2 text-[var(--color-ink-500)]">必须看完≥80%才算</td>
                            </tr>
                            <tr>
                              <td className="p-2">阅读一回经典阅读（读完概要+原文）</td>
                              <td className="p-2 text-amber-600 font-bold">20</td>
                              <td className="p-2 text-[var(--color-ink-500)]">400</td>
                              <td className="p-2 text-[var(--color-ink-500)]">-</td>
                            </tr>
                            <tr>
                              <td className="p-2">完成一回章节练习（做完所有题）</td>
                              <td className="p-2 text-amber-600 font-bold">25</td>
                              <td className="p-2 text-[var(--color-ink-500)]">300</td>
                              <td className="p-2 text-[var(--color-ink-500)]">-</td>
                            </tr>
                            <tr>
                              <td className="p-2">随机抽题完成一组（10题）</td>
                              <td className="p-2 text-amber-600 font-bold">20</td>
                              <td className="p-2 text-[var(--color-ink-500)]">200</td>
                              <td className="p-2 text-[var(--color-ink-500)]">-</td>
                            </tr>
                            <tr>
                              <td className="p-2">模拟考试交卷（任意时长）</td>
                              <td className="p-2 text-amber-600 font-bold">40</td>
                              <td className="p-2 text-[var(--color-ink-500)]">80</td>
                              <td className="p-2 text-[var(--color-ink-500)]">每天最多2次</td>
                            </tr>
                            <tr>
                              <td className="p-2">在说红楼发布内容（文字/语音/视频）</td>
                              <td className="p-2 text-amber-600 font-bold">30</td>
                              <td className="p-2 text-[var(--color-ink-500)]">150</td>
                              <td className="p-2 text-[var(--color-ink-500)]">每条最多一次</td>
                            </tr>
                            <tr>
                              <td className="p-2">内容获得点赞（每10个赞）</td>
                              <td className="p-2 text-amber-600 font-bold">10</td>
                              <td className="p-2 text-[var(--color-ink-500)]">100</td>
                              <td className="p-2 text-[var(--color-ink-500)]">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[var(--color-ink-900)] mb-3 flex items-center gap-2 text-base">
                        <Award className="w-4 h-4 text-amber-500" /> 额外加成
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-200/50 flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-amber-600 font-bold text-[10px]">7天</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--color-ink-900)] mb-0.5">连续学习7天</p>
                            <p className="text-xs text-amber-700">每日额外 <span className="font-bold">+20%</span> 碎片</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200 shadow-sm flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-orange-700 font-bold text-[10px]">30天</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--color-ink-900)] mb-0.5">连续学习30天</p>
                            <p className="text-xs text-orange-700">每日额外 <span className="font-bold">+50%</span> 碎片 + <span className="font-bold border-b border-orange-300">专属称号</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'badges' && (
                  <>
                    <p className="font-serif text-base text-[var(--color-ink-900)] mb-4">徽章代表了您在《练红楼》中的足迹与成就：</p>
                    <div className="space-y-4">
                      <div className="bg-white p-3 rounded-lg border border-[var(--color-paper-200)]">
                        <h4 className="font-bold text-[var(--color-ink-900)] mb-1 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" /> 自动解锁
                        </h4>
                        <p className="text-xs">当您在应用中的各项数据（阅读时长、答题次数、社区互动等）达到特定里程碑时，对应的徽章将自动点亮。</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-[var(--color-paper-200)]">
                        <h4 className="font-bold text-[var(--color-ink-900)] mb-1 flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-amber-500" /> 额外奖励
                        </h4>
                        <p className="text-xs">每解锁一枚新徽章，系统将额外赠送 <span className="text-amber-600 font-bold">100 个碎片</span> 作为里程碑奖励！</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-[var(--color-paper-200)]">
                        <h4 className="font-bold text-[var(--color-ink-900)] mb-1 flex items-center gap-1">
                          <HelpCircle className="w-4 h-4 text-[var(--color-ink-400)]" /> 隐藏徽章
                        </h4>
                        <p className="text-xs">部分徽章为隐藏成就，它们的获取条件未公开，期待您在探索红楼世界的过程中意外触发惊喜。</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-4 border-t border-[var(--color-paper-300)] bg-[var(--color-paper-200)] text-center">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2 bg-[var(--color-seal-red)] text-white rounded-full font-bold shadow-sm"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CheckCircle = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
