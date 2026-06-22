/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, Clock, ShieldCheck, ArrowLeft, Search, Building2, ChevronRight, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { getAllLocations, getLocationBySlug, DSM_COORDS } from '../data/locations';
import EnhancedSEO from './EnhancedSEO';

export default function LocationPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reconstruct the full path slug directly from URL matching
  // Remove "/contabilidade-em/" from the start to yield the pure location slug
  const decodedPath = decodeURIComponent(pathname);
  const fullSlug = decodedPath.replace(/^\/contabilidade-em\//, '').replace(/\/+$/, '');

  let location = getLocationBySlug(fullSlug);
  const allLocations = getAllLocations();

  // Robust fallback: if fullSlug did not match perfectly, match using segments (crucial for SEO crawlers)
  if (!location) {
    const parts = fullSlug.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart) {
      const cleanParam = lastPart.replace(/^bairro-/, '').toLowerCase();
      location = allLocations.find(l => {
        const lClean = l.slug.toLowerCase().replace(/\/+$/, '');
        return lClean === cleanParam || 
               lClean.endsWith(`/${cleanParam}`) || 
               lClean.endsWith(`-${cleanParam}`);
      });
    }
  }

  // Scroll to top on navigation to secondary pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [fullSlug]);

  if (!location) {
    // Elegant fallback page if location not directly indexed in pathing patterns
    const foundSuggestions = searchQuery.trim() === '' 
      ? allLocations.slice(0, 8) 
      : allLocations.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8);

    return (
      <div className="py-16 min-h-[70vh] bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <AlertCircle className="mx-auto text-blue-700" size={64} />
          <h1 className="text-3xl font-black text-slate-900 font-display">Região não encontrada</h1>
          <p className="text-slate-600">
            A DSM Contabilidade atende em <strong>toda Curitiba, região metropolitana, Paraná e sul do Brasil</strong>. Digite seu bairro ou cidade abaixo para abrir seu portal exclusivo.
          </p>
          
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Digite seu bairro ou cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-850 font-bold focus:border-blue-500 scale-100"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {foundSuggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSearchQuery('');
                  navigate(`/contabilidade-em/${s.slug}`);
                }}
                className="text-xs bg-blue-50 border border-blue-100 text-blue-800 font-semibold px-3 py-1.5 rounded-full hover:bg-blue-100 scale-100 cursor-pointer"
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="pt-4">
            <Link to="/" className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle local dynamic form submit directly to WhatsApp
  const handleLocalFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const whats = formData.get('whatsapp') as string;
    const servico = formData.get('servico') as string;
    const msg = formData.get('mensagem') as string;

    const chatText = `Olá DSM Contabilidade! Gostaria de um orçamento/contato exclusivo para minha empresa em *${location.name}*.\n\n` + 
                     `*Nome:* ${nome}\n` + 
                     `*WhatsApp:* ${whats}\n` + 
                     `*Serviço Desejado:* ${servico}\n` + 
                     `*Mensagem:* ${msg}`;

    window.open(`https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(chatText)}`, '_blank');
  };

  const getPageTitle = () => {
    if (location.type === 'estado') {
      return `Contabilidade em ${location.name} | Abertura de Empresa Fácil — DSM`;
    }
    if (location.type === 'cidade_metropolitana') {
      return `Escritório de Contabilidade em ${location.name} / RMC | DSM Contabilidade`;
    }
    return `Contabilidade no Bairro ${location.name} em Curitiba | DSM Contabilidade`;
  };

  const getSubHeading = () => {
    if (location.type === 'estado') {
      return `Atendimento contábil completo e abertura simplificada de empresas para empresários em qualquer município de ${location.name}.`;
    }
    if (location.type === 'cidade_metropolitana') {
      return `Contador exclusivo e processos ágeis de formalização empresarial em ${location.name}. Economize impostos sem sair de sua sede.`;
    }
    return `A DSM Contabilidade se destaca no bairro ${location.name} pelo atendimento humanizado e soluções completas com um contador exclusivo para você.`;
  };

  const formattedWhatsAppContact = `https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(
    `Olá Davy Santos Morais! Vi a página de atendimento exclusivo para *${location.name}* e gostaria de solicitar uma consultoria para abertura ou migração de contabilidade da minha empresa.`
  )}`;

  return (
    <div className="bg-slate-50 text-slate-905">
      
      {/* 1. Enhanced dynamic SEO tags injected dynamically */}
      <EnhancedSEO 
        title={getPageTitle()}
        description={location.description}
        keywords={location.keywords}
        locationName={location.name}
      />

      {/* 2. Cozy Hero segment for custom locations */}
      <div className="relative py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-650 hover:text-blue-800 font-semibold text-sm mb-6 bg-white px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-xs">
            <ArrowLeft size={14} />
            <span>Voltar ao início</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                <MapPin size={12} className="text-red-500 animate-pulse" />
                <span>ATENDIMENTO EXCLUSIVO EM {location.name.toUpperCase()}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
                Escritório de Contabilidade Especializado em <span className="text-blue-700">{location.name}</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-650 max-w-3xl font-light leading-relaxed">
                {getSubHeading()} Aliamos tecnologia de ponta com um acompanhamento próximo para simplificar as rotinas de constituição, folha e impostos de sua marca.
              </p>

              {/* Unique stats bar layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block mb-0.5">Contador Exclusivo:</span>
                  <span className="text-slate-900 font-extrabold text-base block">Sim, Incluso!</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block mb-0.5">Tempo de Abertura:</span>
                  <span className="text-green-700 font-extrabold text-base block">A partir de 24h</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block mb-0.5">Proximidade Bacacheri:</span>
                  <span className="text-blue-700 font-extrabold text-base block">
                    {location.distanceFromDSM === 0 ? 'Sede Própria' : `~${location.distanceFromDSM} km de distância`}
                  </span>
                </div>
              </div>
            </div>

            {/* Side CTA Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 shadow-2xl text-center space-y-4">
              <Building2 className="mx-auto text-blue-300" size={32} />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Abertura Grátis de CNPJ</h3>
              <p className="text-xs text-blue-100">
                Garantimos a constituição acelerada de sua microempresa ou MEI em <strong>{location.name}</strong> contratando qualquer plano de assessoria contábil mensal!
              </p>
              <a
                href={formattedWhatsAppContact}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0052ff] hover:bg-[#003ecc] text-white font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-102 text-sm shadow-md cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Abrir Empresa Agora</span>
              </a>
              <span className="text-[10px] text-slate-300 block">Suporte desde 1982 em Curitiba e Região</span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Deep Local Value Proposition section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Por que a DSM Contabilidade é a escolha correta para {location.name}?
            </h2>

            {/* Localized Semantic SEO Trust Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-3 sm:p-4 shadow-md">
              <img 
                src="https://img.dsmcontabilidade.digital/cartao-dsm.webp" 
                alt={`Davy Santos Morais - Contador de Confiança no bairro ${location.name}`} 
                title={`WhatsApp Contador Davy Santos Morais - Atendimento Completo em ${location.name}`}
                className="w-full h-auto object-contain rounded-xl hover:scale-101 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <p className="text-[11px] text-slate-500 text-center mt-2.5 font-bold uppercase tracking-wider">
                Assessoria Credenciada para empresas em {location.name} — CRC/PR Ouvidoria Ativa
              </p>
            </div>
            
            <p className="text-base text-slate-650 leading-relaxed pt-2">
              O mercado contábil de <strong>{location.name}</strong> e Curitiba exige respostas imediatas e consultores fiscais que conheçam de perto as regras das prefeituras municipais, alvarás locais e obrigações federativas. Na DSM, abolimos as centrais de atendimento automatizado.
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Atendimento Humanizado de Verdade</h4>
                  <p className="text-sm text-slate-600">Você fala com um contador dedicado que estuda o seu negócio e responde suas dúvidas pelo WhatsApp em minutos.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Formalização Sem Custos Desnecessários</h4>
                  <p className="text-sm text-slate-600">Te orientamos a escolher a classificação tributária correta (Simples Nacional, Lucro Presumido) para evitar pagamento excessivo de impostos.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Contabilidade Digital com Suporte Físico</h4>
                  <p className="text-sm text-slate-600">Nossa plataforma digital permite despachar e gerir documentos online, mas nossa sede no Bacacheri, no Edifício Marsala, está sempre de portas abertas para recebê-lo.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form wrapper */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center gap-2.5 mb-2 border-b border-slate-100 pb-3">
              <Phone className="text-blue-700 text-lg shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Solicite um Orçamento sem Compromisso</h3>
                <span className="text-xs text-slate-500">Preencha e fale direto com o Davy</span>
              </div>
            </div>

            <form onSubmit={handleLocalFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="form-nome" className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-1 border-none outline-none">Seu Nome completo</label>
                <input 
                  id="form-nome"
                  type="text" 
                  name="nome"
                  required 
                  placeholder="Ex: Seu Bonifácio / Dona Maria" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg py-2.5 px-3.5 text-slate-800 font-medium scale-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-whatsapp" className="block text-xs font-bold text-slate-755 uppercase tracking-wider mb-1 border-none outline-none">Seu Telefone/WhatsApp</label>
                  <input 
                    id="form-whatsapp"
                    type="tel" 
                    name="whatsapp"
                    required 
                    placeholder="Ex: (41) 99999-9999" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg py-2.5 px-3.5 text-slate-800 font-medium scale-100"
                  />
                </div>
                <div>
                  <label htmlFor="form-servico" className="block text-xs font-bold text-slate-755 uppercase tracking-wider mb-1 border-none outline-none">Serviço Pretendido</label>
                  <select 
                    id="form-servico"
                    name="servico" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg py-2.5 px-3.5 text-slate-800 font-medium scale-100 cursor-pointer"
                  >
                    <option value="Abertura de Empresa">Abrir Nova Empresa</option>
                    <option value="Contabilidade Mensal">Contabilidade Mensal/Assessoria</option>
                    <option value="Migração de Escritório">Trocar de Contador</option>
                    <option value="Regularização / Alvará">Regularizar Empresa / Alvarás</option>
                    <option value="Declaração Imposto de Renda">Imposto de Renda / IRPF</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="form-mensagem" className="block text-xs font-bold text-slate-755 uppercase tracking-wider mb-1 border-none outline-none">Descrição do Seu Negócio</label>
                <textarea 
                  id="form-mensagem"
                  name="mensagem"
                  rows={3}
                  required
                  placeholder="Conte um pouco sobre sua atividade comercial ou dúvidas contábeis..." 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg py-2.5 px-3.5 text-slate-800 font-medium scale-100"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-101 text-base shadow-lg"
              >
                <MessageSquare size={18} />
                <span>Enviar pelo WhatsApp Conectado</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 4. Logistic and neighborhood linking block */}
      <div className="bg-slate-100 py-12 border-t border-b border-slate-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold font-display text-slate-900">Outras Regiões e Cidades Atendidas</h3>
            <p className="text-sm text-slate-650">
              Morando perto de {location.name}? Confira outros portais de apoio exclusivos que preparamos para você ou consulte nossa calculadora de logística metropolitana.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/calculadora-deslocamento" className="text-blue-800 hover:text-blue-900 font-bold text-sm bg-blue-50 px-4 py-2 border border-blue-200 rounded-xl inline-flex items-center gap-1.5 transition-colors">
                <span>Calcular tempo RMC</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
