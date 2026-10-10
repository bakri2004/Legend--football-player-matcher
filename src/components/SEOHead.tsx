import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function SEOHead({ title, description, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update og:title
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) {
      metaOgTitle = document.createElement('meta');
      metaOgTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.setAttribute('content', ogTitle || title);

    // Update og:description
    let metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (!metaOgDesc) {
      metaOgDesc = document.createElement('meta');
      metaOgDesc.setAttribute('property', 'og:description');
      document.head.appendChild(metaOgDesc);
    }
    metaOgDesc.setAttribute('content', ogDescription || description);

    // Update twitter:title
    let metaTwTitle = document.querySelector('meta[name="twitter:title"]');
    if (!metaTwTitle) {
      metaTwTitle = document.createElement('meta');
      metaTwTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(metaTwTitle);
    }
    metaTwTitle.setAttribute('content', ogTitle || title);

    // Update twitter:description
    let metaTwDesc = document.querySelector('meta[name="twitter:description"]');
    if (!metaTwDesc) {
      metaTwDesc = document.createElement('meta');
      metaTwDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(metaTwDesc);
    }
    metaTwDesc.setAttribute('content', ogDescription || description);
  }, [title, description, ogTitle, ogDescription]);

  return null;
}
