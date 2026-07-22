"use client";

import { DesktopHeader } from "./desktop_navigation";
import { MobileBottomNavigation } from "./mobile_navigation";

export function ResponsiveNavigation() {
  return (
    <>
      <DesktopHeader />
      <MobileBottomNavigation />
    </>
  );
}
