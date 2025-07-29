import dynamic from 'next/dynamic';

// Dynamically import the client component with SSR disabled
export const ThemeToggle = dynamic(() => import('./theme-toggle-client'), {
  ssr: false,
  loading: () => <button className="h-9 w-9" aria-label="Loading theme toggle" />,
});
