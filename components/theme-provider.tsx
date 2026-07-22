"use client";

import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContext = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const ThemeCtx = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

export const useTheme = () => useContext(ThemeCtx);

const STORAGE_KEY = "theme";
const THEMES: Theme[] = ["light", "dark", "system"];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(t: Theme): "light" | "dark" {
  return t === "system" ? getSystemTheme() : t;
}

function applyTheme(t: Theme) {
  const r = resolveTheme(t);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(r);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const t = stored && THEMES.includes(stored) ? stored : "system";
    setThemeState(t);
    const r = resolveTheme(t);
    setResolvedTheme(r);
    applyTheme(t);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const r = getSystemTheme();
        setResolvedTheme(r);
        applyTheme("system");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mounted, theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolvedTheme(resolveTheme(t));
    applyTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, resolvedTheme }}>
      <Script id="theme-init" strategy="beforeInteractive">
        {`!function(){try{var t=localStorage.getItem("${STORAGE_KEY}")||"system",r=t==="system"?(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):t;document.documentElement.classList.add(r)}catch(e){}}()`}
      </Script>
      {children}
    </ThemeCtx.Provider>
  );
}
