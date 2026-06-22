/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'localbusiness';
  schema?: Record<string, any>;
  locationName?: string;
}

export default function EnhancedSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  type = 'localbusiness',
  schema,
  locationName
}: EnhancedSEOProps) {
  const currentUrl = canonicalUrl || typeof window !== 'undefined' ? window.location.href : 'https://dsmcontabilidade.com.br';
  const defaultKeywords = [
    "DSM Contabilidade",
    "contabilidade Curitiba",
    "abrir empresa Curitiba",
    "contador Curitiba",
    "escritorio contabilidade Bacacheri",
    "abrir MEI Curitiba",
    "abertura de empresa Parana",
    "contabilidade digital Sul Brasil",
    "Davy Santos Morais",
    "contabilidade humanizada"
  ];
  
  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));
  
  // Determine SEO image based on page context (Location page vs default pages)
  const seoImage = locationName 
    ? "https://dsmcontabilidade.digital/img/cartao-contador.png" 
    : "https://dsmcontabilidade.digital/img/cartao-dsm.webp";

  // Specific local business schema for DSM Contabilidade (Sede Bacacheri)
  const dsmLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "DSM Contabilidade",
    "image": "https://dsmcontabilidade.digital/img/cartao-dsm.webp",
    "@id": "https://dsmcontabilidade.com.br/#identity",
    "url": "https://dsmcontabilidade.com.br",
    "telephone": "+55-41-99143-0464",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Dep. Atílio de Almeida Barbosa, 76, Bacacheri",
      "addressLocality": "Curitiba",
      "addressRegion": "PR",
      "postalCode": "82560-460",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.4024,
      "longitude": -49.2312
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:30",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/davysantosmorais/",
      "https://www.linkedin.com/company/dsm-contabilidade/"
    ]
  };

  // Structured data for specific page routes (LocationPage or standard WebPage)
  const pageSchema = schema || (locationName ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${title} - DSM Contabilidade`,
    "description": description,
    "url": currentUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "DSM Contabilidade",
      "url": "https://dsmcontabilidade.com.br"
    },
    "about": {
      "@type": "AccountingService",
      "name": `Serviço de Contabilidade e Abertura de Empresas em ${locationName}`,
      "description": `DSM Contabilidade atende empresários da região de ${locationName} com contador dedicado, assessoria fiscal, tributos, MEI e ME.`
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DSM Contabilidade",
    "url": "https://dsmcontabilidade.com.br",
    "description": "DSM Contabilidade - Escritório contábil em Curitiba e Região Metropolitana"
  });

  return (
    <Helmet>
      {/* Primeiras tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={currentUrl} />

      {/* Resource Hints (Preload / Prefetch) para Carregamento Ultrarrápido */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.whatsapp.com" />
      <link rel="preconnect" href="https://img.supremamidia.com" />
      
      {/* Preload de Fontes Críticas */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://api.whatsapp.com" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="DSM Contabilidade" />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="DSM Contabilidade Logo Oficial" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />

      {/* Otimização de Métricas Mobile para Idosos */}
      <meta name="theme-color" content="#040c1e" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured data scripting */}
      <script type="application/ld+json">
        {JSON.stringify(dsmLocalBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </script>
    </Helmet>
  );
}
