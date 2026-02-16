"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  images?: string[];
  products?: any[];
  onAddToCart?: (product: any) => void;
}

export function ChatMessage({ role, content, images, products, onAddToCart }: ChatMessageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number>(0);
  const [showImages, setShowImages] = useState(false);

  const isAssistant = role === "assistant";
  const paragraphs = content.split("\n").filter(line => line.trim() !== "");

  // Determine items to show (products preferred, fallback to images)
  const itemsToShow = products || (images ? images.map(img => ({ image: img, name: "Jewellery", description: "Beautifully crafted piece.", id: img })) : []);

  useEffect(() => {
    if (!isAssistant) {
      setVisibleParagraphs(paragraphs.length);
      setShowImages(true);
      return;
    }

    // Reset visibility when content changes
    setVisibleParagraphs(0);
    setShowImages(false);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleParagraphs(current);
      if (current >= paragraphs.length) {
        clearInterval(interval);
        setTimeout(() => setShowImages(true), 300); // Show images after text
      }
    }, 600); // 600ms per paragraph

    return () => clearInterval(interval);
  }, [content, isAssistant, paragraphs.length]);

  // Format markdown-style text
  const formatContent = (text: string, index: number) => {
    let formattedLine = text;
    if (text.includes("**")) {
      formattedLine = formattedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }
    return (
      <div
        key={index}
        className={`whitespace-pre-wrap mb-2 transition-all duration-500 ease-out ${index < visibleParagraphs
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 hidden" // hidden to prevent layout jump? No, use opacity/transform
          }`}
        style={{
          display: index < visibleParagraphs ? 'block' : 'none' // Use display:none to effect "typing" feel layout growth
        }}
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      >
      </div>
    );
  };

  return (
    <div className={`flex items-end gap-4 mb-8 ${isAssistant ? "" : "flex-row-reverse justify-end"}`}>
      {/* Avatar */}
      {isAssistant && (
        <div className="size-10 rounded-full flex-shrink-0 border border-gold-accent/30 shadow-sm flex items-center justify-center bg-surface-light dark:bg-surface-dark">
          <span className="text-primary text-lg font-bold">✨</span>
        </div>
      )}

      <div className={`flex-1 max-w-2xl`}>
        {/* Message Bubble */}
        <div
          className={`px-6 py-4 rounded-2xl ${isAssistant
            ? "bg-surface-light dark:bg-surface-dark rounded-bl-none shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#e8d7d9] dark:border-[#4a2e32]"
            : "bg-primary text-white rounded-br-none shadow-md ml-auto w-fit max-w-xl"
            }`}
        >
          <div className="text-base font-medium leading-relaxed text-pretty min-h-[1.5em]">
            {paragraphs.map((line, idx) => formatContent(line, idx))}
            {isAssistant && visibleParagraphs < paragraphs.length && (
              <span className="inline-block w-1.5 h-4 bg-primary/50 ml-1 animate-pulse" />
            )}
          </div>
        </div>

        {/* Images Grid */}
        {itemsToShow.length > 0 && showImages && (
          <div className="mt-4 grid gap-3">
            {itemsToShow.map((item: any, idx: number) => (
              <div
                key={idx}
                className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-transparent hover:border-gold-accent/20 transition-all duration-700 ease-out overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row h-full md:h-[320px]">
                  {/* Image */}
                  <div className="w-full md:w-[55%] relative overflow-hidden bg-[#f0ebec] dark:bg-[#1a0c0e]">
                    <div className="absolute inset-0 m-4 border border-white/40 dark:border-white/10 rounded-lg pointer-events-none z-10"></div>
                    <div className="w-full h-full relative transform group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center">
                      {item.image?.includes('\\') || item.image?.includes('/images/') ? (
                        <div className="text-center text-[#9a4c59] dark:text-[#d3c1c4] p-4">
                          <div className="text-6xl mb-2">💎</div>
                          <p className="text-sm font-semibold">{item.image?.split('\\').pop()?.split('/').pop()}</p>
                          <p className="text-xs mt-1 opacity-70">Local image file</p>
                        </div>
                      ) : (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name || "Jewellery"}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#1b0d10] dark:text-white mb-2">{item.name || "Curated Selection"}</h3>
                    <p className="text-[#6b4c52] dark:text-[#d3c1c4] mb-6 leading-relaxed line-clamp-4">
                      {item.description || "This beautiful piece has been selected based on your preferences."}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="flex items-center gap-2 text-gold-accent hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide group"
                      >
                        <Heart
                          size={20}
                          className={isFavorite ? "fill-current" : ""}
                        />
                        {isFavorite ? "Saved" : "Save for later"}
                      </button>
                      <button
                        onClick={() => onAddToCart && onAddToCart(item)}
                        className="flex items-center gap-2 text-gold-accent hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                      >
                        <ShoppingCart size={20} />
                        Add to collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
