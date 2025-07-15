"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, BarChart3 } from "lucide-react";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="w-5 h-5" />,
    path: "/",
  },
  {
    id: "blog",
    label: "Blog",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/blog",
  },
  {
    id: "stats",
    label: "Stats",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/stats",
  },
];

export default function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize selectedItem based on current pathname to avoid layout shift
  const [selectedItem, setSelectedItem] = useState(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    return currentItem ? currentItem.id : "home";
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const prevHoveredItem = useRef<string | null>(null);

  // Update selected item when pathname changes (for navigation via other means)
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.id);
    }
  }, [pathname]);

  // Preload pages
  useEffect(() => {
    for (const item of navItems) {
      router.prefetch(item.path);
    }
  }, []);

  const getItemPosition = (itemId: string, isHover = false) => {
    const index = navItems.findIndex((item) => item.id === itemId);
    const totalItems = navItems.length;

    // Calculate positions to ensure equal spacing
    // Each item gets equal width with consistent padding
    const itemWidth = 100 / totalItems;
    const basePosition = index * itemWidth;

    // Check if this is a hover pill adjacent to selected pill
    const selectedIndex = navItems.findIndex(
      (item) => item.id === selectedItem
    );
    const isAdjacent = isHover && Math.abs(index - selectedIndex) === 1;
    const gap = 1; // Small gap between adjacent pills

    let position = basePosition;

    // Adjust position if adjacent to avoid overlap
    if (isAdjacent) {
      if (index < selectedIndex) {
        // Hover is to the left of selected - move left
        position = Math.max(position - gap, 0);
      } else {
        // Hover is to the right of selected - move right
        position = Math.min(position + gap, 100 - itemWidth);
      }
    }

    return `${position}%`;
  };

  const handleMouseEnter = (itemId: string) => {
    prevHoveredItem.current = hoveredItem;
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    prevHoveredItem.current = hoveredItem;
    setHoveredItem(null);
  };

  // Determine if this is coming from outside (fade) or moving between items (slide)
  const isComingFromOutside =
    prevHoveredItem.current === null && hoveredItem !== null;
  const shouldSlide = hoveredItem !== null && prevHoveredItem.current !== null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="relative h-14 w-[min(calc(100vw-1.25rem),380px)] bg-card/80 backdrop-blur-xl rounded-full shadow-2xl border border-border/20 overflow-hidden">
        {/* Selection blob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-12 bg-card-foreground rounded-full transition-all duration-500 ease-out"
          style={{
            left: `calc(${getItemPosition(selectedItem)} + 4px)`,
            width: `calc(${100 / navItems.length}% - 8px)`,
          }}
        />

        {/* Hover blob with dynamic transition */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-12 bg-accent/30 rounded-full ease-out ${
            hoveredItem && hoveredItem !== selectedItem
              ? "opacity-100"
              : "opacity-0"
          } ${
            isComingFromOutside
              ? "transition-opacity duration-300"
              : "transition-all duration-300"
          }`}
          style={{
            left: hoveredItem
              ? `calc(${getItemPosition(hoveredItem, true)} + 4px)`
              : prevHoveredItem.current
              ? `calc(${getItemPosition(prevHoveredItem.current, true)} + 4px)`
              : "4px",
            width: `calc(${100 / navItems.length}% - 8px)`,
          }}
        />

        {/* Navigation items */}
        <div className="relative flex h-full">
          {navItems.map((item) => {
            const isSelected = selectedItem === item.id;
            const isHovered = hoveredItem === item.id;
            const showLabel = isSelected || isHovered;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item.id);
                  router.push(item.path);
                }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className="relative flex-1 flex items-center justify-center group transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="flex items-center transition-all duration-300 ease-out px-3 max-w-[140px]">
                  <div
                    className={`transition-all duration-300 ease-out flex-shrink-0 flex items-center justify-center ${
                      isSelected
                        ? "text-card scale-110"
                        : isHovered
                        ? "text-accent-foreground scale-105"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`font-medium text-sm whitespace-nowrap transition-all duration-300 ease-out ${
                      showLabel
                        ? "opacity-100 translate-x-2 max-w-[60px]"
                        : "opacity-0 -translate-x-4 max-w-0"
                    } ${
                      isSelected
                        ? "text-card"
                        : isHovered
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
