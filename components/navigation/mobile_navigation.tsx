"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationMobileItems } from "@/app/data/navigation_data";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {navigationMobileItems.map((item) => {
          const Icon = item.Icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
