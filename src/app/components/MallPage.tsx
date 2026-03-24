import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { clsx } from 'clsx';
import confetti from 'canvas-confetti';

const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: '《红楼梦》联名发圈礼盒',
    desc: '实体商品 / 限量',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1630081757603-a46d414be089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2NydW5jaGllfGVufDF8fHx8MTc3NDMzODA1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 50,
  },
  {
    id: 'p2',
    name: '热门手游通用兑换码(20元)',
    desc: '虚拟道具 / 兑换码',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1708032564910-fb5bb0a59a68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzc0MzM4MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 200,
  },
  {
    id: 'p3',
    name: '某茶全场通用代金券',
    desc: '电子券 / 全国可用',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2JhJTIwdGVhfGVufDF8fHx8MTc3NDI1NjQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 120,
  },
  {
    id: 'p4',
    name: '品牌真无线蓝牙耳机',
    desc: '实体商品 / 满包邮',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzc0MjMyNjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 5,
  },
  {
    id: 'p5',
    name: '专属动态App主题皮肤',
    desc: '虚拟装扮 / 永久有效',
    price: 800,
    image: 'https://images.unsplash.com/photo-1755441823940-be1c18d1ff64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3NDMzODA2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 999,
  }
];

export const MallPage: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(3450);
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);

  const handleExchange = () => {
    if (!selectedProduct) return;
    
    // Deduct balance
    setBalance(prev => prev - selectedProduct.price);
    
    // Fire confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B2621', '#F59E0B', '#FDE68A']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B2621', '#F59E0B', '#FDE68A']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif pb-12">
      
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
            聚宝阁
          </h1>

          <div className="flex items-center gap-1.5 text-amber-600 font-sans font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-4 h-4" />
            {balance}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Banner/Hint */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="font-sans">
            <p className="text-sm font-bold text-amber-900 mb-1">如何获取更多碎片？</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              坚持每日签到、完成章节阅读打卡、参与社区互动（发帖/点赞）以及在“练红楼”中获得高分，均可获得碎片奖励。碎片可用于兑换以下全部商品。
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((product) => {
            const canAfford = balance >= product.price;

            return (
              <motion.div 
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden border border-[var(--color-paper-300)] shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--color-paper-200)]">
                  <ImageWithFallback 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.stock < 50 && (
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-sans">
                      仅剩 {product.stock} 件
                    </div>
                  )}
                </div>
                
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[var(--color-ink-900)] text-sm md:text-base line-clamp-2 leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--color-ink-500)] font-sans">{product.desc}</p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-[var(--color-paper-200)] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-600 font-sans">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-bold">{product.price}</span>
                    </div>
                    <button
                      onClick={() => canAfford && setSelectedProduct(product)}
                      disabled={!canAfford}
                      className={clsx(
                        "px-3 py-1.5 rounded text-xs font-bold transition-colors",
                        canAfford 
                          ? "bg-[var(--color-seal-red)] text-white hover:bg-[#a02a22]" 
                          : "bg-[var(--color-paper-300)] text-[var(--color-ink-400)] cursor-not-allowed"
                      )}
                    >
                      {canAfford ? '兑换' : '碎片不足'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Exchange Confirmation Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--color-paper-100)] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-[var(--color-paper-300)]"
              >
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-4">
                    <Gift className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-ink-900)] mb-2">确认兑换</h3>
                  <p className="text-[var(--color-ink-600)] text-sm mb-4 font-sans">
                    将消耗 <span className="text-amber-600 font-bold">{selectedProduct.price}</span> 碎片兑换：<br/>
                    <span className="font-bold text-[var(--color-ink-900)]">{selectedProduct.name}</span>
                  </p>
                  
                  <div className="bg-[var(--color-paper-200)] p-3 rounded-lg flex justify-between items-center text-sm font-sans mb-6">
                    <span className="text-[var(--color-ink-600)]">兑换后余额</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {balance - selectedProduct.price}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-2.5 rounded-full border border-[var(--color-paper-300)] text-[var(--color-ink-600)] font-bold hover:bg-[var(--color-paper-200)] transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleExchange}
                      className="flex-1 py-2.5 rounded-full bg-[var(--color-seal-red)] text-white font-bold hover:bg-[#a02a22] transition-colors shadow-sm"
                    >
                      确认兑换
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
