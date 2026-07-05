import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { m } from "framer-motion";

const subscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div
        className="h-9 w-[4.5rem] rounded-full border border-card-border bg-card"
        aria-hidden
      />
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass group/toggle relative flex h-9 w-[4.5rem] items-center rounded-full p-1 transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_var(--glow)]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <m.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`absolute top-1 h-7 w-7 rounded-full shadow-md transition-shadow duration-300 group-hover/toggle:shadow-[0_0_16px_-2px_var(--glow)] ${
          isDark
            ? "left-[calc(100%-2rem)] bg-gradient-to-br from-indigo-400 to-violet-400"
            : "left-1 bg-gradient-to-br from-indigo-500 to-violet-500"
        }`}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1.5">
        <Sun
          className={`h-3.5 w-3.5 transition-colors ${
            !isDark ? "text-white" : "text-muted"
          }`}
        />
        <Moon
          className={`h-3.5 w-3.5 transition-colors ${
            isDark ? "text-[#0f0f14]" : "text-muted"
          }`}
        />
      </span>
    </button>
  );
}
