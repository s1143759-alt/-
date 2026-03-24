import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Search, Library, Feather, MessageSquare, User, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const MainLayout: React.FC = () => {
  const navItems = [
    { name: '识红楼', path: '/main', icon: Library },
    { name: '练红楼', path: '/main/practice', icon: Feather },
    { name: '说红楼', path: '/main/community', icon: MessageSquare },
    { name: '我与红楼', path: '/main/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] flex flex-col font-sans text-[var(--color-ink-800)] relative">
      {/* Top Fixed Navbar */}
      <header className="fixed top-0 inset-x-0 h-16 bg-[var(--color-paper-200)] shadow-[0_1px_8px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[var(--color-seal-red)] flex items-center justify-center text-[var(--color-seal-red)] font-serif font-bold bg-[#FDFBF7]">
              红
            </div>
            <span className="font-serif font-bold text-xl hidden sm:block">红楼探秘</span>
          </div>

          <nav className="flex-1 flex justify-center gap-1 md:gap-6 lg:gap-8 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  twMerge(
                    "relative flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                    isActive 
                      ? "text-[var(--color-seal-red)] font-medium" 
                      : "text-[var(--color-ink-600)] hover:text-[var(--color-ink-800)] hover:bg-[var(--color-paper-300)]/30"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-seal-red)] mx-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-[var(--color-paper-300)]/50 transition-colors">
              <Search className="w-5 h-5 text-[var(--color-ink-600)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-16 pb-16">
        <Outlet />
      </main>

      {/* Bottom Fixed Progress Bar */}
      <footer className="fixed bottom-0 inset-x-0 h-14 bg-[var(--color-paper-100)] border-t border-[var(--color-paper-300)] z-40 flex items-center justify-center shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-6xl w-full mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[var(--color-gold-dark)]" />
            <span className="text-sm text-[var(--color-ink-600)] hidden sm:block">当前进度</span>
          </div>
          
          <div className="flex-1 max-w-lg">
            <div className="flex justify-between text-xs mb-1 font-serif text-[var(--color-ink-600)]">
              <span>已解锁 15 / 120 回</span>
              <span>12.5%</span>
            </div>
            <div className="h-2 w-full bg-[var(--color-paper-300)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-seal-red)]"
                initial={{ width: 0 }}
                animate={{ width: '12.5%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          
          <div className="text-sm text-[var(--color-ink-600)] flex items-center gap-2 font-serif min-w-max">
            <span>今日学习</span>
            <span className="text-[var(--color-seal-red)] font-medium">45分钟</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
