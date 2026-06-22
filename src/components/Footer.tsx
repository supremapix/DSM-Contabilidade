/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Linkedin, ArrowUp, Calendar, ShieldCheck, Award, Building2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SupremaCredit() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-slate-800/50 flex justify-center items-center">
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-full px-6 py-2.5 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <p className="text-slate-200 hover:text-white transition-colors duration-200 text-sm sm:text-base font-bold flex flex-wrap items-center justify-center gap-2">
          <span className="opacity-90">Desenvolvido com</span> 
          
          {/* Coração pulsante com efeito de sombra */}
          <Heart 
            size={14} 
            className="text-red-500 animate-[pulse_1.5s_infinite] shrink-0 filter drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]" 
          /> 
          
          <span className="opacity-90">por</span>
          
          {/* Link para o site da Suprema */}
          <a 
            id="developer-suprema-link"
            href="https://supremasite.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-yellow-400 hover:text-yellow-300 transition-all font-black inline-flex items-center gap-2 cursor-pointer border-b border-dashed border-yellow-400/50 hover:border-yellow-300"
          >
            Suprema Sites Express
            
            {/* Logotipo oficial com efeito de iluminação */}
            <img 
              src="https://img.supremamidia.com/suprema-img.png" 
              alt="Suprema" 
              className="h-[18px] w-auto inline select-none shrink-0 filter drop-shadow-[0_0_2px_rgba(250,204,21,0.5)] transition-transform duration-300 hover:scale-110" 
              referrerPolicy="no-referrer"
            />
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020712] text-slate-300 pt-16 pb-8 border-t border-blue-900/30" id="dsm-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Core Identity & Bio */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-block hover:scale-102 transition-transform">
              <img 
                src="https://img.dsmcontabilidade.digital/dsm.webp" 
                alt="DSM Contabilidade Logo" 
                className="h-16 object-contain bg-white rounded-xl p-1.5 shadow-md"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              Desde 1982 prestando serviços de constituição e regularização de empresas, folha de pagamento, apuração de tributos e contabilidade mensal com ética e atendimento humanizado.
            </p>
            <div className="flex items-center gap-3 pt-2 justify-center md:justify-start">
              <a 
                href="https://www.instagram.com/davysantosmorais/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-950/80 hover:bg-magenta hover:text-white flex items-center justify-center border border-blue-800/40 text-blue-400 transition-all cursor-pointer"
                aria-label="Instagram DSM Contabilidade"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/dsm-contabilidade/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-950/80 hover:text-white flex items-center justify-center border border-blue-800/40 text-blue-400 transition-all cursor-pointer"
                aria-label="LinkedIn DSM Contabilidade"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links / Navigation */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-5 tracking-tight border-b border-blue-900/50 pb-2 flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              <Award size={16} className="text-blue-400" />
              <span>Nossos Serviços</span>
            </h3>
            <ul className="space-y-3.5 text-sm w-full">
              <li>
                <Link to="/quem-somos" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Quem Somos & História d'DSM
                </Link>
              </li>
              <li>
                <Link to="/abrir-empresa" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Abertura Rápida de Empresas
                </Link>
              </li>
              <li>
                <a href="#contabilidade-mensal" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Contabilidade Geral e Mensal
                </a>
              </li>
              <li>
                <a href="#folha-pagamento" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Departamento Pessoal e Folha
                </a>
              </li>
              <li>
                <a href="#regularizacao" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Regularização Fiscal & Impostos
                </a>
              </li>
              <li>
                <Link to="/calculadora-deslocamento" className="hover:text-blue-400 text-slate-200 transition-colors block text-base font-semibold">
                  Calculadora Logística Metropolitana
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Local SEO Quick Linking Directories */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-5 tracking-tight border-b border-blue-900/50 pb-2 flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              <MapPin size={16} className="text-blue-400" />
              <span>Atendimento em Foco</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs w-full text-left">
              <Link to="/contabilidade-em/curitiba/bairro-agua-verde" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> Água Verde</Link>
              <Link to="/contabilidade-em/curitiba/bairro-batel" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> Batel</Link>
              <Link to="/contabilidade-em/curitiba/bairro-cidade-industrial-cic" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> CIC</Link>
              <Link to="/contabilidade-em/curitiba/bairro-boa-vista" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> Boa Vista</Link>
              <Link to="/contabilidade-em/curitiba/bairro-portao" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> Portão</Link>
              <Link to="/contabilidade-em/curitiba/bairro-sitio-cercado" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><MapPin size={12} className="text-blue-400 shrink-0" /> Sítio Cercado</Link>
              <Link to="/contabilidade-em/regiao-metropolitana/pinhais" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><Building2 size={12} className="text-blue-400 shrink-0" /> Pinhais</Link>
              <Link to="/contabilidade-em/regiao-metropolitana/colombo" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><Building2 size={12} className="text-blue-400 shrink-0" /> Colombo</Link>
              <Link to="/contabilidade-em/regiao-metropolitana/sao-jose-dos-pinhais" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><Building2 size={12} className="text-blue-400 shrink-0" /> S. J. Pinhais</Link>
              <Link to="/contabilidade-em/estados/parana" className="text-slate-200 hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"><Award size={12} className="text-blue-400 shrink-0" /> Paraná (PR)</Link>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-tight w-full">
              DSM Contabilidade atende em todos os 75 bairros e vilas de Curitiba e região metropolitana com assessoria profissional online.
            </p>
          </div>

          {/* Column 4: Contact & Access details for seniors (Massive easy action targets) */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-blue-900/40 space-y-4 flex flex-col items-center md:items-stretch text-center md:text-left">
            <h3 className="text-xl font-black text-white tracking-tight border-b border-blue-800 pb-2 flex items-center justify-center md:justify-start gap-2 w-full">
              <ShieldCheck size={20} className="text-blue-400" />
              <span>Contatos Úteis</span>
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Feito para facilitar a sua vida! Clique nos botões coloridos abaixo para ligar do seu celular ou ver onde fica a nossa sede:
            </p>

            <div className="space-y-3">
              {/* Direct call card */}
              <a 
                href="tel:41991430464"
                className="w-full bg-green-700 hover:bg-green-600 text-white font-black py-3 px-3 rounded-xl flex items-center gap-2.5 shadow-md hover:scale-102 transition-transform cursor-pointer text-sm"
              >
                <Phone size={22} className="text-white shrink-0 animate-pulse" />
                <div className="text-left leading-tight">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-green-200">Clique para Ligar:</span>
                  <span className="text-base font-black font-mono">(41) 99143-0464</span>
                </div>
              </a>

              {/* Direct WhatsApp card */}
              <a 
                href="https://api.whatsapp.com/send?phone=5541991430464&text=Ol%C3%A1%20DSM%20Contabilidade!%20Gostaria%20de%20um%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-black py-3 px-3 rounded-xl flex items-center gap-2.5 shadow-md hover:scale-102 transition-transform cursor-pointer text-sm"
              >
                <div className="bg-white/10 p-1.5 rounded-lg shrink-0">
                  <MessageSquare size={22} className="text-green-300 animate-pulse" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-blue-200">Zap d'DSM Contador:</span>
                  <span className="text-base font-black font-mono">(41) 99143-0464</span>
                </div>
              </a>

              {/* Maps route map pin */}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Marsala%20Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2076%20Bacacheri%20Curitiba%20PR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 py-3.5 px-3 rounded-xl flex items-start gap-2 cursor-pointer transition-colors text-xs"
              >
                <MapPin size={24} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="leading-tight text-left">
                  <strong className="block text-white font-black flex items-center gap-1">
                    <Building2 size={15} className="text-blue-400 shrink-0" />
                    <span>Ver Rota no Mapa:</span>
                  </strong>
                  R. Dep. Atílio de Almeida Barbosa, 76 - Bacacheri (Edifício Marsala)
                </div>
              </a>
            </div>

            <div className="text-[11px] text-slate-550 pt-1 flex items-center gap-1.5 justify-center font-bold">
              <Calendar size={13} className="text-slate-500 shrink-0" />
              <span>Aberto: Segunda a Sexta — 08h30 às 18h</span>
            </div>
          </div>

        </div>

        {/* Corporate Legal & Suprema Credit block */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          <p className="mb-2">
            © {currentYear} DSM Contabilidade - CRC/PR. Todos os direitos reservados. • <Link to="/mapa-do-site" className="hover:text-blue-500 transition-colors text-[11px] opacity-40 hover:opacity-100 uppercase tracking-wider font-semibold">Mapa do Site</Link>
          </p>
          <p className="mb-4">
            Contador Davy Santos Morais — Atendimento Humanizado & Suporte Especializado Consultivo.
          </p>
          
          {/* Required Credit Component */}
          <SupremaCredit />
        </div>
      </div>
    </footer>
  );
}

// Minimal logo icon renderer
function ImgLogo() {
  return (
    <div className="w-9 h-9 rounded bg-blue-900/30 overflow-hidden border border-blue-500/40 flex items-center justify-center shrink-0">
      <img 
        src="https://xyxpexbankcbwidpobzb.supabase.co/storage/v1/object/public/assets/sites/89f806ee-d5a5-4d80-a00f-0e93b7f72c72/1769611656134-3hvsbk.jfif" 
        alt="DSM Contabilidade Mini Logo" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
