/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Search, MapPin, Sparkles, ZoomIn, ZoomOut, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllLocations, slugify } from '../data/locations';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  fontSizeLevel: number;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
}

export default function Header({ fontSizeLevel, onIncreaseFont, onDecreaseFont }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideFloatingMenu, setHideFloatingMenu] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // 380px is around the height of the hero/slider
      if (window.scrollY > 380) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allLocations = getAllLocations();

  // Filter locations based on query
  const filteredLocations = searchQuery.trim() === '' 
    ? [] 
    : allLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  const handleSearchSelect = (slug: string) => {
    setSearchQuery('');
    setSearchOpen(false);
    setIsOpen(false);
    navigate(`/contabilidade-em/${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full animate-keyframes" id="dsm-header">
      {/* Top Bar / Ticker - continuous marquee scroll on mobile, static on desktop */}
      <div className="bg-[#0B255F] text-white py-2 px-1 relative overflow-hidden text-sm font-semibold border-b border-blue-900/40">
        
        {/* Mobile Scrolling Letreiro (Continuous Infinite Ticker) */}
        <div className="block lg:hidden w-full overflow-hidden">
          <div className="animate-ticker flex whitespace-nowrap gap-8 items-center py-1">
            {/* Ticker Sequence Part 1 */}
            <div className="flex items-center gap-8 pr-8 select-none">
              <span className="flex items-center gap-2 text-yellow-300 font-extrabold uppercase tracking-widest text-xs sm:text-sm">
                <Sparkles size={16} className="text-yellow-400 animate-spin" />
                ABERTURA DE EMPRESAS & ASSESSORIA COMPLETA!
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Phone size={13} className="text-green-300 inline" /> Fone (Clique p/ Ligar): 
                <a href="tel:41991430464" className="text-green-300 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-lg border border-white/10 font-black">
                  (41) 99143-0464
                </a>
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-white font-semibold flex items-center gap-1">
                <MapPin size={13} className="text-blue-300 inline" /> Endereço Físico (Ver no Mapa): 
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Marsala%20Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2076%20Bacacheri%20Curitiba%20PR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-200 underline font-black"
                >
                  Rua Deputado Atílio de Almeida Barbosa, 76 - Bacacheri, Curitiba
                </a>
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-blue-100">Atendimento Próximo & Contador Sindicado Exclusivo desde 1982!</span>
            </div>

            {/* Ticker Sequence Part 2 (Duplicate for loop) */}
            <div className="flex items-center gap-8 pr-8 select-none">
              <span className="flex items-center gap-2 text-yellow-300 font-extrabold uppercase tracking-widest text-xs sm:text-sm">
                <Sparkles size={16} className="text-yellow-400 animate-spin" />
                ABERTURA DE EMPRESAS & ASSESSORIA COMPLETA!
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Phone size={13} className="text-green-300 inline" /> Fone (Clique p/ Ligar): 
                <a href="tel:41991430464" className="text-green-300 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-lg border border-white/10 font-black">
                  (41) 99143-0464
                </a>
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-white font-semibold flex items-center gap-1">
                <MapPin size={13} className="text-blue-300 inline" /> Endereço Físico (Ver no Mapa): 
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Marsala%20Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2076%20Bacacheri%20Curitiba%20PR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-200 underline font-black"
                >
                  Rua Deputado Atílio de Almeida Barbosa, 76 - Bacacheri, Curitiba
                </a>
              </span>
              <span className="text-blue-200">|</span>
              <span className="text-blue-100">Atendimento Próximo & Contador Sindicado Exclusivo desde 1982!</span>
            </div>
          </div>
        </div>

        {/* Desktop Top Bar View */}
        <div className="hidden lg:flex w-full justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
            <span>Atendimento Consultivo Exclusivo Curitiba e Região</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Font Controls */}
            <div className="flex items-center gap-1 bg-black/20 rounded-lg px-2 py-0.5">
              <span className="text-slate-200 mr-1 text-[11px] font-normal hidden xs:inline">Letra:</span>
              <button 
                onClick={onDecreaseFont} 
                className="p-1 hover:bg-black/30 rounded transition-colors text-white font-bold inline-flex items-center"
                title="Diminuir tamanho da letra"
                aria-label="Diminuir tamanho da letra"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-xs px-1 font-bold">{fontSizeLevel}x</span>
              <button 
                onClick={onIncreaseFont} 
                className="p-1 hover:bg-black/30 rounded transition-colors text-white font-bold inline-flex items-center"
                title="Aumentar tamanho da letra"
                aria-label="Aumentar tamanho da letra"
              >
                <ZoomIn size={14} />
              </button>
            </div>
            
            <a 
              id="header-call-button"
              href="tel:41991430464" 
              className="flex items-center gap-1.5 hover:text-blue-200 transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <Phone size={14} className="text-blue-200 animate-pulse" />
              <span>(41) 99143-0464</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Brand Row - Visible strictly on Desktop (lg size). Hidden on mobile as per request. */}
      <div className="hidden lg:block bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22">
            {/* Logo Brand Title */}
            <Link to="/" className="flex items-center py-1 group shrink-0" id="logo-dsm-link">
              <img 
                src="https://img.dsmcontabilidade.digital/dsm.webp" 
                alt="DSM Contabilidade Logo" 
                className="h-14 xl:h-16 object-contain transition-transform group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-3 xl:gap-6" aria-label="Menu Principal">
              <Link to="/" className="text-slate-700 hover:text-[#163A8C] transition-colors font-bold text-sm xl:text-base py-2">
                Início
              </Link>
              <Link to="/quem-somos" className="text-slate-700 hover:text-[#163A8C] transition-colors font-bold text-sm xl:text-base py-2">
                Quem Somos
              </Link>
              <Link to="/abrir-empresa" className="text-slate-700 hover:text-[#163A8C] transition-colors font-bold text-sm xl:text-base py-2 flex items-center gap-1 shrink-0">
                <Sparkles size={16} className="text-yellow-600 animate-pulse" />
                <span>Abrir Empresa</span>
              </Link>
              <Link to="/calculadora-deslocamento" className="text-slate-700 hover:text-[#163A8C] transition-colors font-bold text-sm xl:text-base py-2 whitespace-nowrap">
                Calculadora Metropolitana
              </Link>
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="text-slate-700 hover:text-[#163A8C] transition-colors font-bold text-sm xl:text-base py-2 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full px-3 py-1 cursor-pointer shrink-0"
                aria-label="Procurar contabilidade por Bairro ou Cidade"
              >
                <Search size={14} className="text-[#163A8C]" />
                <span>Bairros e Cidades</span>
              </button>
              <Link to="/contato" className="bg-[#163A8C] hover:bg-[#2E56B3] text-white font-black px-4 xl:px-5 py-2 rounded-lg hover:scale-103 transition-all inline-flex items-center gap-1.5 shadow-md shrink-0 text-sm xl:text-base whitespace-nowrap">
                <span>Falar com Contador</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

    </header>

    {/* Floating Menu Capsule - Stuck on the right side on Mobile */}
    <div className="lg:hidden fixed bottom-24 right-4 z-40 select-none animate-fountain">
      {/* Dynamic Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#163A8C] hover:bg-[#2e56b3] active:bg-[#0B255F] text-white font-extrabold py-3 px-4 rounded-full border-2 border-white shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all text-xs uppercase"
        aria-label="Menu principal"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span>Menu ☰</span>
      </button>
    </div>

    <AnimatePresence>
      {/* Neighborhood and City Search Overlay as a focused modal outside header for perfect viewport sizing */}
      {searchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex justify-center items-start pt-10 sm:pt-24 px-4 overflow-y-auto select-none"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-3xl bg-[#050d22] border-2 border-blue-500/80 rounded-3xl shadow-[0_20px_50px_rgba(0,82,255,0.3)] p-5 sm:p-7 text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="bairro-search-input" className="text-sm font-black text-blue-400 tracking-wider uppercase block font-display">
                Selecione seu Bairro ou Cidade Metropolitana
              </label>
              <button 
                onClick={() => setSearchOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 cursor-pointer transition-colors"
                aria-label="Fechar busca"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-4 text-slate-400" size={22} />
              <input 
                id="bairro-search-input"
                type="text"
                placeholder="Exemplo: Água Verde, Boqueirão, Colombo, Batel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#0d1c3a] border-2 border-blue-700 focus:border-blue-400 text-white rounded-2xl py-3.5 pl-12 pr-4 text-lg font-bold placeholder-slate-400 focus:outline-none focus:ring-0 shadow-inner"
              />
            </div>
            
            {searchQuery.trim() !== '' && (
              <div className="bg-[#09152b] border border-blue-900/85 rounded-2xl overflow-hidden divide-y divide-blue-900/40 max-h-[280px] overflow-y-auto custom-scrollbar">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSearchSelect(loc.slug)}
                      className="w-full p-3.5 text-left hover:bg-blue-900/45 flex items-center gap-3 transition-colors text-white font-bold text-base cursor-pointer"
                    >
                      <MapPin size={18} className="text-blue-400 shrink-0" />
                      <div>
                        <span className="text-white block">{loc.name}</span>
                        <span className="text-xs text-slate-400 block font-normal">
                          {loc.type === 'bairro_oficial' ? 'Bairro Oficial de Curitiba' : 
                           loc.type === 'bairro_popular' ? 'Vila / Região em Curitiba' : 
                           loc.type === 'cidade_metropolitana' ? 'Região Metropolitana' : 'Atendimento Estadual'}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-450 text-sm">
                    Nenhum resultado encontrado. Mas a DSM Contabilidade atende em toda a região!
                  </div>
                )}
              </div>
            )}

            <div className="mt-5">
              <span className="text-xs text-slate-400 block mb-2 font-bold uppercase tracking-wider">Sugestões rápidas de pesquisa:</span>
              <div className="flex flex-wrap gap-2">
                {["Água Verde", "Batel", "CIC", "Boa Vista", "Pinhais", "Colombo", "São José dos Pinhais"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const found = allLocations.find(l => l.name.toLowerCase() === item.toLowerCase() || l.name.toLowerCase().includes(item.toLowerCase()));
                      if (found) handleSearchSelect(found.slug);
                    }}
                    className="text-xs bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 font-bold px-3 py-1.5 rounded-full border border-blue-900/40 cursor-pointer transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile Navigation Drawer - Slide-In from Right to Left using Framer Motion */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-sm flex justify-end select-none"
          id="mobile-menu"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-md bg-white h-full overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top drawer header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-xl font-black text-[#163A8C] block font-display">DSM CONTABILIDADE</span>
                  <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Suporte Próximo desde 1982</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 font-extrabold px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1 cursor-pointer text-xs"
                  aria-label="Fechar menu"
                >
                  <X size={16} />
                  <span>FECHAR</span>
                </button>
              </div>

              {/* Senior-focused Accessibility Font Size Controls inside menu */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col gap-2.5">
                <span className="text-xs text-slate-650 font-extrabold uppercase tracking-wide block">Tamanho da Letra</span>
                <div className="flex justify-between items-center bg-white border border-slate-250 rounded-xl p-2.5 shadow-xs">
                  <span className="text-sm font-semibold text-slate-800">Atual: <strong>{fontSizeLevel}x</strong></span>
                  <div className="flex gap-1.55">
                    <button
                      onClick={onDecreaseFont}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer border border-slate-300"
                      title="Diminuir o tamanho das letras"
                    >
                      <ZoomOut size={14} /> Menor
                    </button>
                    <button
                      onClick={onIncreaseFont}
                      className="bg-[#163A8C] hover:bg-[#2E56B3] text-white font-black px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                      title="Aumentar o tamanho das letras"
                    >
                      <ZoomIn size={14} /> Maior
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation links structured with large borders & descriptions */}
              <div className="space-y-3.5">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest block pl-1">Escolha a Página Desejada</span>
                
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-4 block transition-all group"
                >
                  <span className="text-lg font-black text-slate-900 group-hover:text-blue-800 block text-left">Página Inicial (Início)</span>
                  <span className="text-xs text-slate-600 block text-left mt-0.5">Voltar para a tela principal da DSM</span>
                </Link>

                <Link 
                  to="/quem-somos" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-4 block transition-all group"
                >
                  <span className="text-lg font-black text-slate-900 group-hover:text-blue-800 block text-left">Nossa História (Quem Somos)</span>
                  <span className="text-xs text-slate-600 block text-left mt-0.5">Mais de 40 anos de tradição e ética contábil</span>
                </Link>

                <Link 
                  to="/abrir-empresa" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-4 block transition-all group"
                >
                  <span className="text-lg font-black text-slate-900 group-hover:text-blue-800 flex items-center gap-1.5 text-left">
                    <Sparkles size={18} className="text-yellow-650 shrink-0" />
                    <span>Abrir Empresa Grátis</span>
                  </span>
                  <span className="text-xs text-slate-600 block text-left mt-0.5">Nós fazemos toda a burocracia sem sair de casa</span>
                </Link>

                <Link 
                  to="/calculadora-deslocamento" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left bg-[#F2F4F7] hover:bg-[#EAF1FF] border border-slate-200 hover:border-[#163A8C] rounded-xl p-3 block transition-all group"
                >
                  <span className="text-base font-bold text-slate-900 group-hover:text-[#163A8C] block text-left">Calculadora de Distância (RMC)</span>
                  <span className="text-xs text-slate-600 block text-left mt-0.5">Tempo de viagem até nós</span>
                </Link>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setSearchOpen(true);
                  }} 
                  className="w-full text-left bg-[#F2F4F7] hover:bg-[#EAF1FF] border border-slate-200 hover:border-[#163A8C] rounded-xl p-3 block transition-all group cursor-pointer"
                >
                  <span className="text-base font-bold text-slate-900 group-hover:text-[#163A8C] flex items-center gap-1.5 text-left">
                    <Search size={16} className="text-[#163A8C] shrink-0" />
                    <span>Filiais nos Bairros & Cidades</span>
                  </span>
                  <span className="text-xs text-slate-600 block text-left mt-0.5">Buscar regiões oficiais de Curitiba</span>
                </button>
              </div>
            </div>

            {/* Direct Quick Contacts Section for elderly support */}
            <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest block pl-1 text-center">Fale Conosco</span>
              
              {/* Direct call button - shortened */}
              <a
                href="tel:41991430464"
                className="w-full bg-[#163A8C] hover:bg-[#2E56B3] text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
              >
                <Phone size={18} className="shrink-0 text-white animate-pulse" />
                <span>Ligar Telefone: <strong>(41) 99143-0464</strong></span>
              </a>

              {/* Direct WhatsApp button - shortened */}
              <a
                href="https://api.whatsapp.com/send?phone=5541991430464&text=Ol%C3%A1%20DSM%20Contabilidade!%20Gostaria%20de%20um%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
              >
                <MessageSquare size={18} className="shrink-0 text-white" />
                <span>WhatsApp: <strong>(41) 99143-0464</strong></span>
              </a>

              {/* Sede Physical Address with map routing link */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Marsala%20Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2076%20Bacacheri%20Curitiba%20PR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#EAF1FF] border border-blue-200 text-[#0B255F] font-bold py-2.5 px-3 rounded-lg flex items-start gap-2 shadow-xs text-xs"
              >
                <MapPin size={18} className="shrink-0 text-[#163A8C] mt-0.5" />
                <span>
                  <strong className="block text-[#0B255F] font-black">Endereço (Bacacheri):</strong>
                  R. Deputado Atílio de Almeida Barbosa, 76 - Ed. Marsala
                </span>
              </a>

              {/* Slogan */}
              <span className="text-[10px] text-center text-slate-500 block">
                DSM Contabilidade - Tradição e Confiança desde 1982.
              </span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
}
