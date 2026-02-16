"use client";

import React from "react"

import { useRef, useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { CATALOG, filterProducts, searchCatalog } from "@/lib/catalog";
import { extractUserPreferences, getBotResponse } from "@/lib/conversation";
import { Send, Mic, Menu, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  images?: string[];
  products?: any[];
}

interface UserProfile {
  occasion: string | null;
  wedding_type: string | null;
  jewellery_type: string | null;
  metal: string | null;
  dress_color: string | null;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: CATALOG[0] ? `Welcome to **Kalyani Fine Jewellery** ✨\n\nI'm delighted to assist you today. Please take your time — I'm here to help you find jewellery that truly complements your special moments.` : "Welcome!",
    },
  ]);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    occasion: null,
    wedding_type: null,
    jewellery_type: null,
    metal: null,
    dress_color: null,
  });
  const [cart, setCart] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    // Extract preferences from user input
    const preferences = extractUserPreferences(userMessage);
    setProfile((prev) => ({ ...prev, ...preferences }));

    // Simulate bot response delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Search for relevant products
    const searchResults = searchCatalog(userMessage, CATALOG);
    const matchedProducts = filterProducts(
      { ...profile, ...preferences },
      CATALOG,
      preferences.jewellery_type || undefined
    );

    let botContent = "";
    let botImages: string[] = [];

    // Determine bot response based on user input
    // Determine bot response based on user input
    const userLower = userMessage.toLowerCase();

    // 1. Detect constraints
    // 1. Detect constraints
    const detectedTypes: string[] = [];
    if (/necklac/i.test(userLower)) detectedTypes.push("necklace");
    if (/earring/i.test(userLower)) detectedTypes.push("earring");
    if (/\brings?\b/i.test(userLower)) detectedTypes.push("ring");
    if (/bangle|bracelet/i.test(userLower)) detectedTypes.push("bangle");

    const detectedColors = ["green", "maroon", "red", "white", "gold", "silver", "blue", "pink"].filter(c => userLower.includes(c));
    const detectedMetals = ["kundan", "polki", "diamond", "gold", "silver"].filter(m => userLower.includes(m));

    let filtered = CATALOG;

    // 2. Apply Type Filter
    if (detectedTypes.length > 0) {
      filtered = filtered.filter(p => detectedTypes.includes(p.type));
    }

    // 3. Apply Metal/Style Filter
    if (detectedMetals.length > 0) {
      filtered = filtered.filter(p => detectedMetals.some(m =>
        p.metal.toLowerCase().includes(m) ||
        p.stones.some(s => s.toLowerCase().includes(m)) ||
        p.name.toLowerCase().includes(m) ||
        p.description.toLowerCase().includes(m)
      ));
    }

    // 4. Apply Color Filter
    if (detectedColors.length > 0) {
      filtered = filtered.filter(p => detectedColors.some(c =>
        p.primary_color.toLowerCase().includes(c) ||
        p.secondary_color.toLowerCase().includes(c) ||
        p.description.toLowerCase().includes(c) ||
        (c === 'red' && (p.primary_color === 'maroon' || p.description.toLowerCase().includes('ruby'))) ||
        (c === 'maroon' && p.description.toLowerCase().includes('ruby'))
      ));
    }

    let productsFound: any[] = [];

    // 5. Final Selection
    if (filtered.length < CATALOG.length && filtered.length > 0) {
      // We applied some filters and found matches
      productsFound = filtered;
      // Prioritize: if 5 or fewer, show all. If more, slice.
      // For earrings/rings, show up to 5. For others, maybe 3.
      const limit = detectedTypes.some(t => t.includes("earring") || t.includes("ring")) ? 5 : 4;
      botImages = filtered.slice(0, limit).map(p => p.image);
    } else if (searchResults.length > 0) {
      // Fallback to fuzzy search if strict filters failed or no filters applied but search matched
      productsFound = searchResults;
      botImages = searchResults.slice(0, 4).map(p => p.image);
    } else {
      // No matches found
      productsFound = [];
      botImages = [];
    }

    // Special case: If user asks for "rings" explicitly and we have R1/R2, ensure they show if filters didn't exclude them
    if (userLower.includes("ring") && !productsFound.some(p => p.type === 'ring')) {
      const rings = CATALOG.filter(p => p.type === 'ring');
      productsFound = [...productsFound, ...rings];
      botImages = [...botImages, ...rings.map(p => p.image)];
    }

    // Prepare context for LLM
    let systemContext = "";
    if (productsFound.length > 0) {
      systemContext = `Found ${productsFound.length} relevant products based on user rules.
Top matches:
${productsFound.slice(0, 3).map(p => `- ${p.name} (${p.type}, ${p.primary_color}): ${p.description}`).join("\n")}
Images for these have been shown to the user.`;
    } else {
      systemContext = "No specific products matched the strict rules. Answer generally about our collection (necklaces, earrings, bangles, bridal sets in Kundan, Polki, Diamond styles).";
    }

    // Call LLM
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          systemContext,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        botContent = data.content;
      } else {
        console.error("LLM Error:", response.statusText);
        botContent = "I'm having a little trouble connecting to my creative side, but here are some beautiful pieces for you to look at!";
      }
    } catch (error) {
      console.error("LLM request failed", error);
      botContent = "I'm having a little trouble connecting right now. Please check your connection.";
    }

    // Fallback if LLM fails or returns empty
    if (!botContent) {
      botContent = "Here are some exquisite pieces that match your request.";
    }

    newMessages.push({
      role: "assistant",
      content: botContent,
      images: botImages.length > 0 ? botImages : undefined,
    });

    setMessages(newMessages);
    setIsLoading(false);
  };

  const handleAddToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar profile={profile} cart={cart} onClose={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Nav */}
        <header className="flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-30 border-b border-[#f3e7e9] dark:border-[#3a2024]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-primary text-3xl">✨</span>
            <h2 className="text-xl font-bold tracking-tight">Lumina</h2>
          </div>
          <div className="flex gap-4">
            <button className="p-2 text-[#9a4c59] hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="p-2 text-[#9a4c59] hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
                images={msg.images}
                products={msg.products}
                onAddToCart={handleAddToCart}
              />
            ))}
            {isLoading && (
              <div className="flex items-end gap-4 mb-8">
                <div className="size-10 rounded-full flex-shrink-0 border border-gold-accent/30 shadow-sm flex items-center justify-center bg-surface-light dark:bg-surface-dark">
                  <span className="text-primary text-lg font-bold">✨</span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark px-6 py-4 rounded-2xl rounded-bl-none shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#e8d7d9] dark:border-[#4a2e32]">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gold-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gold-accent rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gold-accent rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-40">
          <div className="bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md px-2 py-2 rounded-full shadow-lg border border-[#e8d7d9] dark:border-[#4a2e32] flex gap-2 pointer-events-auto w-full max-w-2xl mx-6">
            <button className="size-10 flex items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-background-dark text-[#1b0d10] dark:text-white transition-colors">
              <Mic size={20} />
            </button>
            <form onSubmit={handleSendMessage} className="flex-1 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell Lumina what you think..."
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-[#1b0d10] dark:text-white placeholder-[#9a4c59]/50 dark:placeholder-[#dcb8be]/50 outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="size-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
