import React, { useState } from 'react';
import { Share2, Link, Check, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

export default function FloatingShare() {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // Suggested image and page URL assets
  const shareImage = "https://dsmcontabilidade.digital/img/cartao-contador.png";
  const currentUrl = typeof window !== 'undefined' ? window.location.href : "https://dsmcontabilidade.com.br";
  
  // Custom Brazilian descriptive sharing message
  const shareTitle = typeof document !== 'undefined' ? document.title : "DSM Contabilidade | Escritório Contábil em Curitiba e Região Metropolitana";
  const shareText = "DSM Contabilidade - Escritório de Contabilidade de Confiança em Curitiba. Davy Santos Morais - Contador de Confiança especialista em abertura de empresa e assessoria contábil completa.";

  // Target share URLs with exact parameters
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareText)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div 
      className="fixed left-2 sm:left-4 top-[60%] -translate-y-1/2 z-40 transition-all duration-300 pointer-events-none"
      id="floating-share-widget"
    >
      <div className="flex flex-col gap-2 items-start pointer-events-auto">
        {/* Animated Attention Grabber Calling to Action */}
        {isOpen && (
          <div className="relative mb-1 self-center animate-bounce">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-xs opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] sm:text-xs font-bold text-white px-2 py-0.5 rounded-lg shadow-lg border border-blue-400 whitespace-nowrap flex items-center gap-1 select-none">
              <span>Compartilhe!</span>
              <span className="animate-pulse">✨</span>
            </div>
            {/* Tiny accent triangle at bottom */}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-indigo-600"></div>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {/* Toggle Collapse/Expand Button with nice transparency */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/80 text-slate-300 hover:text-white p-1 rounded-r-lg border border-l-0 border-slate-700/30 shadow-md transition-all self-center py-2 flex items-center justify-center cursor-pointer"
            title={isOpen ? "Recolher links de compartilhamento" : "Expandir links de compartilhamento"}
            aria-label="Alternar menu de compartilhamento"
          >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Floating Social Icons Bar - Highly transparent card */}
          <div 
            className={`flex flex-col bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-slate-800/40 p-2 shadow-2xl transition-all duration-300 origin-left ${
              isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'
            }`}
          >
            {/* Section Indicator Label */}
            <div className="text-[9px] uppercase tracking-wider text-slate-400/80 font-extrabold pb-1.5 border-b border-slate-900/40 text-center select-none">
              Divulgar
            </div>

            <div className="flex flex-col gap-2 mt-2">
            {/* 1. WhatsApp */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-950/40 hover:bg-green-600/90 border border-slate-900/40 hover:border-green-500/80 transition-all duration-200"
              title="Compartilhar no WhatsApp"
            >
              {/* Custom High-Fidelity SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.982 4.477-9.982 9.984 0 1.761.458 3.414 1.259 4.864l-1.282 4.675 4.803-1.258a9.923 9.923 0 004.702 1.18c5.508 0 9.982-4.477 9.982-9.984 0-2.656-1.035-5.15-2.916-7.034C17.16 3.034 14.667 2 12.012 2zm6.182 14.286c-.27.755-1.564 1.378-2.146 1.458-.5.068-1.155.101-3.232-.765-2.658-1.107-4.364-3.805-4.496-3.98-.133-.175-1.071-1.424-1.071-2.716 0-1.293.682-1.928.924-2.181.242-.254.53-.317.707-.317.177 0 .354.001.507.009.162.008.381-.061.597.458.224.539.765 1.863.832 1.997.067.135.111.292.02.47-.091.179-.138.29-.272.449-.135.159-.283.356-.404.479-.135.135-.276.282-.12.551.156.269.693 1.144 1.485 1.85.116.104.225.205.326.299 1.019.923 1.875 1.21 2.149 1.348.275.138.432.115.592-.069.16-.183.682-.793.864-1.063.181-.27.363-.225.613-.133.251.092 1.594.751 1.867.887.273.136.455.204.521.319.066.115.066.666-.205 1.421z" />
              </svg>
              {/* Tooltip */}
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                WhatsApp
              </span>
            </a>

            {/* 2. Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-950/40 hover:bg-blue-600/90 border border-slate-900/40 hover:border-blue-500/80 transition-all duration-200"
              title="Compartilhar no Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                Facebook
              </span>
            </a>

            {/* 3. LinkedIn */}
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-950/40 hover:bg-blue-700/90 border border-slate-900/40 hover:border-blue-500/80 transition-all duration-200"
              title="Compartilhar no LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                LinkedIn
              </span>
            </a>

            {/* 4. Twitter / X */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-950/40 hover:bg-slate-900/90 border border-slate-900/40 hover:border-slate-700/80 transition-all duration-200"
              title="Compartilhar no Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                Twitter (X)
              </span>
            </a>

            {/* 5. Pinterest */}
            <a
              href={shareLinks.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-950/40 hover:bg-red-600/90 border border-slate-900/40 hover:border-red-500/80 transition-all duration-200"
              title="Compartilhar no Pinterest"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 0 5.397 0 12.017c0 5.078 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.396-5.918 1.396-5.918s-.356-.715-.356-1.777c0-1.664.966-2.907 2.17-2.907 1.023 0 1.517.769 1.517 1.689 0 1.029-.656 2.568-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.751-7.26 7.929-7.26 4.162 0 7.397 2.965 7.397 6.93 0 4.135-2.607 7.464-6.223 7.464-1.214 0-2.355-.631-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24 18.639 24 24 18.639 24 12.017 24 5.397 18.639 0 12.017 0z" />
              </svg>
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                Pinterest
              </span>
            </a>

            {/* Divider */}
            <div className="h-[1px] bg-slate-900/40 my-1" />

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className={`group relative w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                copied 
                  ? 'bg-blue-600 border-blue-500 text-white animate-pulse' 
                  : 'text-slate-300 hover:text-white bg-slate-950/40 hover:bg-slate-900 border-slate-900/40 hover:border-slate-800'
              }`}
              title="Copiar link da página"
              aria-label="Copiar link para a área de transferência"
            >
              {copied ? <Check size={18} /> : <Link size={18} />}
              <span className="absolute left-14 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                {copied ? "Link Copiado!" : "Copiar Link"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
