/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, HelpCircle, ArrowLeft, Search, FileText, Globe, Landmark, Network } from 'lucide-react';
import { getAllLocations } from '../data/locations';
import EnhancedSEO from './EnhancedSEO';

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allLocations = getAllLocations();

  // Categories definition
  const mainPages = [
    { name: "Início", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Blog da DSM Contabilidade", path: "/blog" },
    { name: "Abrir Empresa", path: "/abrir-empresa" },
    { name: "Calculadora de Deslocamento Metropolitana", path: "/calculadora-deslocamento" },
    { name: "Contato / Falar com o Contador", path: "/contato" }
  ];

  // Group locations
  const officialBairros = allLocations.filter(l => l.type === 'bairro_oficial' && l.id !== 'curitiba-sede');
  const popularBairros = allLocations.filter(l => l.type === 'bairro_popular');
  const metroCities = allLocations.filter(l => l.type === 'cidade_metropolitana');
  const states = allLocations.filter(l => l.type === 'estado');
  const curitibaSede = allLocations.filter(l => l.id === 'curitiba-sede');

  // Filter lists based on search parameter
  const noAccent = (value: string) => value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filterList = (list: typeof allLocations) => {
    if (!searchQuery.trim()) return list;
    return list.filter(item => 
      noAccent(item.name).includes(noAccent(searchQuery)) || 
      noAccent(item.description).includes(noAccent(searchQuery))
    );
  };

  const filteredOfficial = filterList(officialBairros);
  const filteredPopular = filterList(popularBairros);
  const filteredMetro = filterList(metroCities);
  const filteredStates = filterList(states);
  const filteredSede = filterList(curitibaSede);

  const totalResults = 
    (searchQuery.trim() ? mainPages.filter(p => noAccent(p.name).includes(noAccent(searchQuery))).length : mainPages.length) +
    filteredOfficial.length + 
    filteredPopular.length + 
    filteredMetro.length + 
    filteredStates.length +
    filteredSede.length;

  return (
    <div data-dsm-page="mapa" className="dsm-tool dsm-sitemap bg-slate-50 min-h-screen text-slate-800">
      
      {/* Dynamic SEO Configuration */}
      <EnhancedSEO 
        title="Mapa do Site Completo | DSM Contabilidade"
        description="Navegue por todas as páginas oficiais, guias locais, cidades e bairros atendidos pelo escritório DSM Contabilidade."
        keywords={["mapa do site", "sitemap dsm", "paginas dsm contabilidade", "bairros curitiba dsm"]}
      />

      {/* Header Banner */}
      <div className="dsm-tool-banner">
        <div className="dsm-wrap dsm-tool-wrap">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-650 hover:text-blue-800 font-semibold text-sm mb-4 bg-white px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-xs">
            <ArrowLeft size={14} />
            <span>Voltar ao início</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 border border-blue-200 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                <Network size={12} className="animate-pulse" />
                <span>MAPA DE NAVEGAÇÃO COMPLETO</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
                Encontre uma página da DSM
              </h1>
              <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                Procure um serviço, um bairro ou uma cidade. Você também encontra aqui os canais de contato e os links das páginas institucionais.
              </p>
            </div>

            {/* Interactive Local Search Filter */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input 
                type="text"
                aria-label="Procurar páginas, bairros ou cidades" placeholder="Ex.: Bacacheri, Pinhais"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-250 hover:border-slate-350 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold transition-colors shadow-xs"
              />
            </div>
          </div>
          
          {searchQuery.trim() && (
            <div className="mt-4 text-xs font-bold text-blue-800 bg-blue-50/70 inline-block px-3 py-1.5 rounded-lg border border-blue-100">
              Encontrados {totalResults} links para "{searchQuery}"
            </div>
          )}

        </div>
      </div>

      {/* Grid containing links */}
      <div className="dsm-wrap dsm-tool-directory py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Pages column / Left and Central sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Institutional Core */}
            {(!searchQuery.trim() || mainPages.some(p => noAccent(p.name).includes(noAccent(searchQuery)))) && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <FileText className="text-blue-700 shrink-0" size={16} />
                  <span>Canais Principais</span>
                </h3>
                <nav className="flex flex-col gap-2" aria-label="Negação Geral do Site">
                  {mainPages
                    .filter(p => !searchQuery.trim() || noAccent(p.name).includes(noAccent(searchQuery)))
                    .map((p, idx) => (
                      <Link 
                        key={idx} 
                        to={p.path} 
                        className="text-slate-700 hover:text-blue-700 font-bold hover:bg-slate-50 rounded-lg p-2 transition-colors block text-sm"
                      >
                        {p.name}
                      </Link>
                    ))}
                </nav>
              </div>
            )}

            {/* Box 2: States Cover */}
            {filteredStates.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <Landmark className="text-blue-700 shrink-0" size={16} />
                  <span>Estados Atendidos</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {filteredStates.map((st) => (
                    <Link 
                      key={st.id} 
                      to={`/contabilidade-em/${st.slug}`}
                      className="text-slate-700 hover:text-blue-700 font-bold hover:bg-slate-50 rounded-lg p-2 transition-colors block text-sm flex items-center gap-2"
                    >
                      <Globe size={13} className="text-blue-500 shrink-0" />
                      <span>Contabilidade no Estado de {st.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Box 3: headquarters / Curitiba Sede */}
            {filteredSede.length > 0 && (
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest border-b border-blue-800/40 pb-2.5 flex items-center gap-2 text-blue-300">
                  <MapPin className="text-red-400 shrink-0" size={14} />
                  <span>Curitiba — Sede DSM</span>
                </h3>
                {filteredSede.map((sd) => (
                  <div key={sd.id} className="space-y-3">
                    <h4 className="text-base font-black text-white leading-tight">{sd.name}</h4>
                    <p className="text-xs text-blue-100 leading-relaxed">{sd.description}</p>
                    <Link 
                      to={`/contabilidade-em/${sd.slug}`}
                      className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-blue-950 font-extrabold text-xs py-2 px-3.5 rounded-lg transition-all"
                    >
                      <span>Acessar Portal Sede</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: SEO Hyperlinks Bairros and Metropolitan (Complex seo matrix) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Metro cities list */}
            {filteredMetro.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <Building2 className="text-blue-700 shrink-0" size={16} />
                  <span>Região Metropolitana de Curitiba (RMC)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 px-1">
                  {filteredMetro.map((city) => (
                    <Link 
                      key={city.id} 
                      to={`/contabilidade-em/${city.slug}`}
                      className="text-slate-650 hover:text-blue-800 font-bold hover:bg-slate-50 rounded-lg p-1.5 transition-all text-xs truncate flex items-center gap-1.5"
                      title={`Contabilidade em ${city.name}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0"></span>
                      <span>{city.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Official Bairros de Curitiba (IPPUC) */}
            {filteredOfficial.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <MapPin className="text-blue-700 shrink-0" size={16} />
                  <span>Bairros Oficiais de Curitiba</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 px-1">
                  {filteredOfficial.map((b) => (
                    <Link 
                      key={b.id} 
                      to={`/contabilidade-em/${b.slug}`}
                      className="text-slate-650 hover:text-blue-800 font-medium hover:bg-slate-50 rounded-lg p-1.5 transition-all text-xs truncate"
                      title={`Contabilidade no bairro ${b.name} em Curitiba`}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular/Informal Subdivisions of Curitiba */}
            {filteredPopular.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <HelpCircle className="text-blue-700 shrink-0" size={16} />
                  <span>Vilas e Regiões Populares de Curitiba</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 px-1">
                  {filteredPopular.map((b) => (
                    <Link 
                      key={b.id} 
                      to={`/contabilidade-em/${b.slug}`}
                      className="text-slate-650 hover:text-blue-800 font-medium hover:bg-slate-50 rounded-lg p-1.5 transition-all text-xs truncate"
                      title={`Contabilidade em ${b.name}, Curitiba`}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty fallback state if search filter blocks everything */}
            {totalResults === 0 && (
              <div className="bg-blue-50/40 border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center space-y-3">
                <p className="text-slate-600 font-bold text-base">Nenhum link encontrado para a sua busca.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl text-sm"
                >
                  Limpar Filtros e Ver Todos
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
      
    </div>
  );
}
