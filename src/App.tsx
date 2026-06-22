/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Phone, ArrowUp, MessageSquare, Heart, Check, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CompanyOpeningPage from './components/CompanyOpeningPage';
import TransitCalculator from './components/TransitCalculator';
import ContactPage from './components/ContactPage';
import LocationPage from './components/LocationPage';
import AboutPage from './components/AboutPage';
import SitemapPage from './components/SitemapPage';
import FloatingShare from './components/FloatingShare';

// Scroll to top on route navigate
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 1 = normal, 2 = larger, 3 = extra-large
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor school height to display back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIncreaseFont = () => {
    if (fontSizeLevel < 3) {
      setFontSizeLevel(prev => prev + 1);
    }
  };

  const handleDecreaseFont = () => {
    if (fontSizeLevel > 1) {
      setFontSizeLevel(prev => prev - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute CSS zoom configuration to map font sizing easily for elderly clients
  const getFontSizeClass = () => {
    if (fontSizeLevel === 2) return 'test-fontSize-large text-lg [&_p]:text-lg [&_li]:text-lg [&_input]:text-lg [&_textarea]:text-lg [&_span]:text-base [&_select]:text-lg';
    if (fontSizeLevel === 3) return 'test-fontSize-xl text-xl [&_p]:text-xl [&_li]:text-xl [&_input]:text-xl [&_textarea]:text-xl [&_span]:text-lg [&_select]:text-xl';
    return 'test-fontSize-normal [&_p]:text-sm sm:[&_p]:text-base [&_li]:text-sm sm:[&_li]:text-base';
  };

  const universalWhatsAppMessage = "Olá DSM Contabilidade! Acessei o site oficial e gostaria de conversar com o contador Davy.";
  const floatWhatsAppUrl = `https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(universalWhatsAppMessage)}`;

  return (
    <HelmetProvider>
      <Router>
        {/* Forces viewports to adjust position on path changes */}
        <ScrollToTop />
        
        <div className={`min-h-screen flex flex-col bg-slate-50 transition-all text-slate-800 ${getFontSizeClass()}`}>
          
          {/* Header containing search & accessibility font controllers */}
          <Header 
            fontSizeLevel={fontSizeLevel} 
            onIncreaseFont={handleIncreaseFont} 
            onDecreaseFont={handleDecreaseFont} 
          />

          {/* Main Views Container Router */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Specialized company opening pages */}
              <Route path="/abrir-empresa" element={<CompanyOpeningPage />} />
              
              {/* Institutional page highlighting 40+ years experience */}
              <Route path="/quem-somos" element={<AboutPage />} />
              
              {/* Real-time Metropolitan transport displacement app */}
              <Route path="/calculadora-deslocamento" element={<TransitCalculator />} />
              
              {/* Direct corporate and support request form */}
              <Route path="/contato" element={<ContactPage />} />

              {/* Complete catalog of pages and locations */}
              <Route path="/mapa-do-site" element={<SitemapPage />} />

              {/* Dynamic location routes supporting local SEO indexing - catch-all to route with maximum flexibility */}
              <Route path="/contabilidade-em/*" element={<LocationPage />} />
            </Routes>
          </main>

          {/* Footer showing coordinates and SupremaCredit */}
          <Footer />

          {/* PERSISTENT FLOATING ACCESSIBILITY ACTIONS FOR SENIORS */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
            
            {/* 1. Back to Top Button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="bg-[#0052ff] hover:bg-[#003ecc] text-white font-black p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all scroll-smooth border-2 border-blue-400 group flex items-center gap-2 cursor-pointer"
                aria-label="Subir ao topo da página"
                title="Voltar ao Topo"
              >
                <ArrowUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-xs font-black hidden sm:inline tracking-wider uppercase pr-1">Subir</span>
              </button>
            )}

            {/* 2. Cozy Persistent WhatsApp Bubble Launcher with floating badge */}
            <a
              id="sticky-whatsapp-bubble"
              href={floatWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-black p-4 rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.6)] flex items-center justify-center border-2 border-white hover:scale-108 active:scale-95 transition-all text-xs group relative cursor-pointer"
              aria-label="Chamar contador no WhatsApp"
              title="Fale Direto com Davy"
            >
              {/* Pulsating backplane for emphasis */}
              <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping -z-10"></span>
              
              <MessageSquare size={30} className="shrink-0" />
              
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-slate-950/90 text-white border border-green-500 rounded-xl px-3 py-1.5 font-bold tracking-wide shadow-xl whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hidden xs:block">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0"></span>
                  Falar com Contador
                </span>
              </div>
            </a>

          </div>

          {/* Persistent Floating Share Widget on the left side */}
          <FloatingShare />

        </div>
      </Router>
    </HelmetProvider>
  );
}
