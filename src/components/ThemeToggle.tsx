
import React from 'react';

type Theme = 'light' | 'dark';

export const ThemeToggle: React.FC<{ theme: Theme, onToggle: () => void }> = ({ theme, onToggle }) => (
  <button
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    onClick={onToggle}
    className="rounded-full border bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-700 p-2 shadow hover:scale-110 transition"
  >
    {theme === 'dark' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 1121.75 12c0 .941-.129 1.856-.375 2.726a.75.75 0 01-.995.513.759.759 0 01-.628-.751.75.75 0 01.389-.687z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2m0 18v2m8.485-8.485l-1.415 1.414m-12.728 0l-1.415-1.414M23 12h-2M3 12H1m16.97-6.364l-1.414 1.414M6.343 17.657l-1.414-1.414" />
      </svg>
    )}
  </button>
);
