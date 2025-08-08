import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
}

export function useSEO({ title, description, canonicalPath }: SEOOptions) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    const path = canonicalPath ?? window.location.pathname;
    if (path) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      const origin = window.location.origin;
      link.setAttribute('href', origin + path);
    }
  }, [title, description, canonicalPath]);
}
