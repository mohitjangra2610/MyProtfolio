"use client";

import Image from "next/image";
import Link from "next/link";
import { navigationDesktopItems } from "@/app/data/navigation_data";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md hidden md:flex sm:flex justify-center items-center">
      <div className="max-w-7xl w-full flex items-center justify-between py-4 h-16">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/mj_logo.svg" alt="My Logo" width={100} height={36} priority />
          </Link>
        </div>
        {/* Navigation */}
        <div className="flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navigationDesktopItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link
                    href={item.href}
                    className="group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button>Let&apos;s Connect</Button>
        </div>
      </div>
    </header>
  );
}
