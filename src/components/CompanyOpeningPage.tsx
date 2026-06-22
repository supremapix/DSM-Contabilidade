/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Building2, ShieldCheck, CheckSquare, Clock, MapPin, Phone, HelpCircle, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedSEO from './EnhancedSEO';

export default function CompanyOpeningPage() {
  const handleOpeningSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const zap = formData.get('whatsapp') as string;
    const cidade = formData.get('cidade') as string;
    const ramo = formData.get('ramo') as string;
    const faturamento = formData.get('faturamento') as string;

    const msgText = `Olá DSM Contabilidade! Gostaria de abrir um CNPJ de forma ágil.\n\n` + 
                    `*Empreendedor:* ${nome}\n` + 
                    `*WhatsApp:* ${zap}\n` + 
                    `*Cidade/Bairro:* ${cidade}\n` + 
                    `*Ramo de Negócio:* ${ramo}\n` + 
                    `*Previsão de Faturamento:* ${faturamento}\n\n` + 
                    `Solicito auxílio no planejamento tributário e viabilização na JUCEPAR!`;

    window.open(`https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(msgText)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 py-12 text-slate-900">
      <EnhancedSEO 
        title="Abertura de Empresa Acelerada - CNPJ Grátis | DSM Contabilidade"
        description="Abra seu CNPJ em Curitiba, cidades metropolitanas do Paraná, Santa Catarina e Rio Grande do Sul sem pagar honorários. Processo ágil em até 24h!"
        keywords={["abrir empresa curitiba", "abrir CNPJ JUCEPAR", "desburocratizacao de empresa PR", "abrir MEI Parana", "legalizar microempresa santa catarina", "contabilidade rio grande do sul"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 font-bold px-3 py-1 rounded-full text-xs sm:text-sm uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-800" /> Consultoria Especializada e Ágil
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            Abra Seu CNPJ com Honorários <span className="text-blue-700">100% Gratuitos</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Focamos em processos ágeis de formalização e planejamento tributário protetivo para pequenos empreendedores em Curitiba, Paraná, Santa Catarina e Rio Grande do Sul.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Steps walk-through */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display border-b border-slate-200 pb-3 flex items-center gap-2">
              <Building2 size={22} className="text-blue-750" />
              <span>O Passo a Passo da Formalização Ágil</span>
            </h2>

            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0052ff] text-white font-black flex items-center justify-center shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Consulta de Viabilidade Prévia</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Análise do endereço pretendido e do nome da sociedade junto à prefeitura de sua cidade (Curitiba, Pinhais, Colombo, etc.) para garantir que sua activity comercial é permitida na localidade.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0052ff] text-white font-black flex items-center justify-center shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Confecção do Contrato Social Especializado</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Desenho das cláusulas societárias e enquadramento nos CNAEs (Cód. de Atividade Econômica) corretos para que você pague a menor parcela de imposto legal prevista pelo Simples Nacional ou Lucro Presumido.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0052ff] text-white font-black flex items-center justify-center shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">CNPJ e Inscrições na Receita e Junta Comercial</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Trâmite eletrônico imediato do registro na JUCEPAR (ou JUCESC/JUCISRS), obtendo seu CNPJ ativo, Inscrição Estadual (ICMS para comércio) ou Inscrição Municipal (ISS para prestação de serviços).
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0052ff] text-white font-black flex items-center justify-center shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Alvarás de Funcionamento & Licenciamentos</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Emissão e acompanhamento de alvará de funcionamento no portal da prefeitura local da sua empresa. Rápido, profissional e sem complicação.
                  </p>
                </div>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-3">
              <span className="text-blue-950 font-bold block flex items-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-600 shrink-0" />
                <span>Atenção Microempreendedor & ME:</span>
              </span>
              <p className="text-slate-700">
                A DSM Contabilidade cuida de todo o suporte burocrático e nós <strong>não cobramos honorários</strong> para abrir sua empresa se você assinar nosso plano contábil mensal! Você arca apenas com as taxas de protocolo público exigidas pelo governo federal e municipal.
              </p>
            </div>
          </div>

          {/* Opening lead form tailored */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="text-center">
              <h3 className="text-xl font-extrabold text-white">Comece sua empresa agora</h3>
              <p className="text-xs text-blue-200 mt-1">Insira suas informações e fale direto com o Davy</p>
            </div>

            <form onSubmit={handleOpeningSubmit} className="space-y-4">
              <div>
                <label htmlFor="op-nome" className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-1 border-none outline-none">Seu Nome completo</label>
                <input 
                  id="op-nome"
                  type="text" 
                  name="nome"
                  required
                  placeholder="Ex: Pedro de Souza Morais" 
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg p-3 text-white focus:border-blue-400 placeholder-slate-500 font-medium scale-100"
                />
              </div>

              <div>
                <label htmlFor="op-whatsapp" className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-1 border-none outline-none">WhatsApp para Contato</label>
                <input 
                  id="op-whatsapp"
                  type="tel" 
                  name="whatsapp"
                  required
                  placeholder="Ex: (41) 99143-0464" 
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg p-3 text-white focus:border-blue-400 placeholder-slate-500 font-medium scale-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="op-cidade" className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-1 border-none outline-none">Cidade / Bairro</label>
                  <input 
                    id="op-cidade"
                    type="text" 
                    name="cidade"
                    required
                    placeholder="Ex: Bacacheri, Curitiba" 
                    className="w-full bg-slate-900 border border-slate-850 rounded-lg p-3 text-white focus:border-blue-400 placeholder-slate-500 font-medium scale-100"
                  />
                </div>
                <div>
                  <label htmlFor="op-ramo" className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-1 border-none outline-none">Área / Ramo</label>
                  <input 
                    id="op-ramo"
                    type="text" 
                    name="ramo"
                    required
                    placeholder="Ex: Ti, Salão, Advogado" 
                    className="w-full bg-slate-900 border border-slate-850 rounded-lg p-3 text-white focus:border-blue-400 placeholder-slate-500 font-medium scale-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="op-faturamento" className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-1 border-none outline-none">Previsão Faturamento Mensal</label>
                <select 
                  id="op-faturamento"
                  name="faturamento" 
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg p-3 text-white focus:border-blue-400 cursor-pointer font-medium scale-100"
                >
                  <option value="Até R$ 6.700 (MEI)" className="text-slate-900 bg-white">Até R$ 6.700 (Modelo MEI)</option>
                  <option value="Até R$ 30.000 (ME)" className="text-slate-900 bg-white">Até R$ 30.000 / mês (Microempresa)</option>
                  <option value="Acima de R$ 30.000" className="text-slate-900 bg-white">Acima de R$ 30.000 / mês (Médio Porte)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-101 cursor-pointer text-base shadow-lg"
              >
                <Phone size={18} />
                <span>Solicitar CNPJ pelo WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

        {/* Projections states */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 text-center space-y-6 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">Atendimento e Abertura em Todo o Sul do Brasil</h3>
          <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Nossos processos digitais de constituição estão homologados nas Juntas Comerciais do <strong>Paraná (PR)</strong>, <strong>Santa Catarina (SC)</strong> e <strong>Rio Grande do Sul (RS)</strong>. Garantimos conformidade e segurança fiscal ampla para que seu negócio comece da forma certa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {["Curitiba", "Pinhais", "Colombo", "Florianópolis", "Porto Alegre", "Joinville", "Caxias do Sul"].map((city) => (
              <span key={city} className="bg-slate-100 text-blue-900 border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-xs">
                ✅ Contabilidade {city}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
