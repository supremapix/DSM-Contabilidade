/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Heart, Users, MapPin, Phone, Sparkles, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import EnhancedSEO from './EnhancedSEO';

export default function AboutPage() {
  const dsmAge = new Date().getFullYear() - 1982;

  return (
    <div className="bg-slate-50 py-12 text-slate-800">
      <EnhancedSEO 
        title="Quem Somos — História e Confiança | DSM Contabilidade"
        description="Conheça a história da DSM Contabilidade no Bacacheri, Curitiba. Há mais de 40 anos prestando assessoria contábil de excelência liderada por Davy Santos Morais."
        keywords={["quem somos dsm contabilidade", "historia dsm contabilidade", "contador davy santos morais", "contabilidade curitiba tradicional", "escritorio contabilidade bacacheri"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 font-bold px-3 py-1 rounded-full text-xs sm:text-sm uppercase tracking-widest inline-flex items-center gap-1.5">
            <Award size={14} className="text-blue-700" /> Tradição e Atendimento Humano
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
            Nossa História, Seu <span className="text-blue-700">Crescimento Seguro</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Com sede própria no bairro Bacacheri e fundado em 1982, o escritório DSM Contabilidade une a solidez de {dsmAge} anos de mercado com a agilidade digital que o empresário do século XXI precisa.
          </p>
        </div>

        {/* Feature Hero Image: img-dms.png */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-3 sm:p-4 hover:scale-101 transition-transform duration-300">
          <img 
            src="https://dsmcontabilidade.digital/img/img-dms.png" 
            alt="Sede Própria DSM Contabilidade Curitiba" 
            className="w-full h-auto object-contain rounded-2xl mx-auto shadow-inner"
            referrerPolicy="no-referrer"
          />
          <div className="text-center pt-3 text-xs text-slate-500 font-bold tracking-wide uppercase">
            Sede Própria & Atendimento Presencial Qualificado - Desde 1982
          </div>
        </div>

        {/* History & Executive Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Executive & Legacy column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50 relative group">
                <img 
                  src="https://dsmcontabilidade.digital/img/davi.png" 
                  alt="Davy Santos Morais - Diretor DSM Contabilidade" 
                  className="w-full h-72 object-contain bg-slate-100 p-2 object-center transition-transform group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-xs flex items-center gap-1">
                  <ShieldCheck size={12} /> Contador Responsável
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">Davy Santos Morais</h3>
                <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Bacharel em Ciências Contábeis — CRC/PR</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Lidera a DSM Contabilidade com compromisso de assessoria pautada no zelo legalista e na proximidade de relacionamento. Acredita em uma contabilidade descomplicada, consultiva, onde cada cliente se sente amparado individualmente.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 mt-6">
              <div className="flex items-center gap-2 text-green-600 font-extrabold text-sm sm:text-base">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                <span>Fale direto com o Davy por WhatsApp</span>
              </div>
              <a 
                href="https://api.whatsapp.com/send?phone=5541991430464&text=Ol%C3%A1%20Davy!%20Gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20DSM." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2.5 w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-101 text-sm shadow-md"
              >
                <Phone size={16} /> Contato Pessoal Exclusivo
              </a>
            </div>
          </div>

          {/* Core Values & Milestones */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-900 font-display border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles size={22} className="text-blue-700" />
              <span>Nossos Pilares de Atuação</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Zelo e Conformidade</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rigor absoluto no acompanhamento de normas federais, estaduais e municipais, garantindo proteção jurídica total contra multas e sanções.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center font-bold">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Planejamento Tributário</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enquadramentos inteligentes para Simples Nacional, Fator R, e Lucro Presumido para amortizar seus impostos ao menor patamar legal.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Atendimento Sem Robô</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sem tickets demorados ou menus telefônicos intermináveis. Você fala diretamente através do canal que prefere: WhatsApp ou presencialmente.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <Calendar size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Solidez de {dsmAge} anos</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Um escritório de contabilidade sólido tradicional curitibano no Bacacheri, estruturado em sede física própria com total segurança institucional.
                </p>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-2 text-sm text-slate-700">
              <span className="font-extrabold text-blue-900 flex items-center gap-1.5"><CheckCircle size={16} /> Nosso Compromisso Ético:</span>
              <p className="leading-relaxed text-xs sm:text-sm">
                Proteger o patrimônio dos nossos clientes e dar a eles o discernimento de cada movimentação contábil. Uma empresa só cresce com bases legais bem consolidadas e relatórios gerenciais claros.
              </p>
            </div>
          </div>

        </div>

        {/* Localized stats of Trust */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 text-center space-y-6 shadow-md">
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">Sede Física Própria em Curitiba</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Nossa sede comercial está no coração do Bacacheri, com fácil acesso e estacionamento próprio para receber você para um café e planejar os rumos do seu sucesso empresarial.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {["Zelo Legal", "Atendimento de Contador de Verdade", "Planejamento Especializado", "Constituição em 24h", "CRC/PR Ativo"].map((item) => (
              <span key={item} className="bg-slate-50 text-blue-800 border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
