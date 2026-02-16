"use client";

import { X } from "lucide-react";

interface SidebarProps {
  profile: Record<string, any>;
  cart: any[];
  onClose?: () => void;
  isOpen?: boolean;
}

export function Sidebar({ profile, cart, onClose, isOpen = true }: SidebarProps) {
  if (!isOpen) return null;

  const stages = [
    { label: "Discovery", icon: "diamond" },
    { label: "Refining", icon: "check_circle" },
    { label: "Selection", icon: "diamond" },
    { label: "Finalize", icon: "shopping_bag" },
  ];

  const preferences = [
    profile.occasion && "Wedding",
    profile.wedding_type && profile.wedding_type.charAt(0).toUpperCase() + profile.wedding_type.slice(1),
    profile.jewellery_type && profile.jewellery_type.charAt(0).toUpperCase() + profile.jewellery_type.slice(1),
    profile.metal && profile.metal.charAt(0).toUpperCase() + profile.metal.slice(1),
    profile.dress_color && profile.dress_color.charAt(0).toUpperCase() + profile.dress_color.slice(1),
  ].filter(Boolean);

  return (
    <aside className="hidden w-80 flex-col border-r border-[#e8d7d9] dark:border-[#4a2e32] bg-surface-light dark:bg-surface-dark lg:flex shrink-0 z-20 shadow-sm overflow-y-auto">
      <div className="flex flex-col gap-6 p-6 h-full">
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e8d7d9] dark:border-[#4a2e32]">
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Your Vision</h1>
            <p className="text-gold-accent text-sm font-medium">Wedding • Maroon</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress/Timeline */}
        <div className="flex flex-col gap-2">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg ${
                idx === 2
                  ? "bg-primary/10 dark:bg-primary/20 text-primary"
                  : "text-[#9a4c59] dark:text-[#dcb8be]"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{stage.icon}</span>
              <p className={idx === 2 ? "text-sm font-bold" : "text-sm font-medium"}>{stage.label}</p>
            </div>
          ))}
        </div>

        {/* Preferences Summary */}
        <div className="rounded-xl bg-background-light dark:bg-background-dark p-4 border border-[#e8d7d9] dark:border-[#4a2e32] mt-auto">
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#9a4c59] dark:text-[#dcb8be]">
            Current Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences.length > 0 ? (
              preferences.map((pref, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-surface-light dark:bg-surface-dark rounded border border-[#e8d7d9] dark:border-[#4a2e32] text-xs font-medium"
                >
                  {pref}
                </span>
              ))
            ) : (
              <p className="text-xs text-[#9a4c59] dark:text-[#dcb8be] opacity-60">Start chatting to build preferences...</p>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="rounded-xl bg-primary/5 p-4 border border-primary/20">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-primary">Cart ({cart.length})</h3>
            <div className="flex flex-col gap-2">
              {cart.map((item, idx) => (
                <p key={idx} className="text-xs text-[#6b4c52] dark:text-[#d3c1c4]">
                  • {item.name || item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
