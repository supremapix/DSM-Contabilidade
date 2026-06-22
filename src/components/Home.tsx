/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, Phone, MessageSquare, ShieldCheck, HelpCircle, Activity, ChevronDown, ChevronRight, Award, Users, Check, Building2, Calendar } from 'lucide-react';
import { getAllLocations } from '../data/locations';
import HomeSlider from './HomeSlider';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const allLocations = getAllLocations();
  
  // Filter top official bairros for quick click list on home page
  const featuredBairros = [
    { name: "Bacacheri", slug: "curitiba/bairro-bacacheri" },
    { name: "Água Verde", slug: "curitiba/bairro-agua-verde" },
    { name: "Batel", slug: "curitiba/bairro-batel" },
    { name: "Boa Vista", slug: "curitiba/bairro-boa-vista" },
    { name: "CIC (Cidade Industrial)", slug: "curitiba/bairro-cidade-industrial-cic" },
    { name: "Pinheirinho", slug: "curitiba/bairro-pinheirinho" },
    { name: "Portão", slug: "curitiba/bairro-portao" },
    { name: "Sítio Cercado", slug: "curitiba/bairro-sitio-cercado" }
  ];

  // Filter 6 metropolitan cities
  const featuredCities = [
    { name: "Pinhais", slug: "regiao-metropolitana/pinhais" },
    { name: "Colombo", slug: "regiao-metropolitana/colombo" },
    { name: "São José dos Pinhais", slug: "regiao-metropolitana/sao-jose-dos-pinhais" },
    { name: "Araucária", slug: "regiao-metropolitana/araucaria" },
    { name: "Fazenda Rio Grande", slug: "regiao-metropolitana/fazenda-rio-grande" },
    { name: "Campo Largo", slug: "regiao-metropolitana/campo-largo" }
  ];

  const filteredSearchLocations = searchQuery.trim() === ''
    ? []
    : allLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSelect = (slug: string) => {
    setSearchQuery('');
    navigate(`/contabilidade-em/${slug}`);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const whats = formData.get('whatsapp') as string;
    const servico = formData.get('servico') as string;
    const dsc = formData.get('mensagem') as string;
    
    const textMsg = `Olá DSM Contabilidade! Acessei o site oficial.\n\n` +
                    `*Nome do Interessante:* ${nome}\n` +
                    `*WhatsApp de retorno:* ${whats}\n` +
                    `*Serviço de Interesse:* ${servico}\n` +
                    `*Atividade / Comentários:* ${dsc}`;
    window.open(`https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // 10 key senior-friendly questions
  const faqs = [
    {
      q: "O que é o serviço de 'Contador Exclusivo' da DSM?",
      a: "Diferente de contabilidades online robotizadas, na DSM Contabilidade você tem um contador de verdade disponível diretamente no seu WhatsApp para responder suas dúvidas. Independente do tamanho de sua empresa, seu atendimento é personalizado."
    },
    {
      q: "Quanto custa o processo de abertura de empresa?",
      a: "Para novos clientes que contratarem nossos pacotes de assessoria ou escrituração mensal, os honorários do escritório sobre o processo de constituição do CNPJ são inteiramente grátis! Você paga apenas as taxas da Junta Comercial do Paraná (JUCEPAR)."
    },
    {
      q: "Quais documentos preciso para abrir uma microempresa?",
      a: "Apenas RG/CPF ou CNH, endereço residencial, título de eleitor ou número do recibo do IRPF, e o endereço pretendido para a empresa (pode ser sua residência, para prestadores de serviços simples)."
    },
    {
      q: "A DSM Contabilidade atende empresas fora de Curitiba?",
      a: "Sim! Por meio de nossos sistemas 100% digitais de despacho e integração nacional, atendemos empresários em toda a região metropolitana (Pinhais, Colombo, S.J. dos Pinhais, etc.), no estado do Paraná (PR), Santa Catarina (SC) e Rio Grande do Sul (RS)."
    },
    {
      q: "A DSM atende MEI (Microempreendedor Individual)?",
      a: "Atendemos sim! Auxiliamos o MEI na formalização, emissão de guias mensais DAS, declarações anuais (DASN-SIMEI) e na transição segura para ME (Microempresa) quando o limite de faturamento for atingido."
    },
    {
      q: "Em quanto tempo meu CNPJ estará ativo?",
      a: "Com nossa consultoria ágil e trâmite eletrônico integrado à JUCEPAR, conseguimos registrar e ativar novos CNPJs em Curitiba e região metropolitana a partir de 24h a 3 dias úteis!"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 bg-white text-[#111111]">
      
      {/* Dynamically Responsive Premium Image Slider */}
      <HomeSlider />
      
      {/* SECTION 1: MASTER AMBIENT HERO */}
      <section className="relative py-6 sm:py-8 bg-white border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Brand Copy */}
            <div className="lg:col-span-7 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#163A8C]/5 via-[#163A8C]/10 to-indigo-50 border border-blue-200/60 text-[#163A8C] font-extrabold px-3.5 py-1.5 rounded-full text-xs md:text-sm tracking-wide uppercase shadow-sm hover:bg-[#163A8C]/10 transition-all duration-300">
                <Award size={15} className="text-amber-500 fill-amber-500 animate-pulse shrink-0" />
                <span className="font-display">Tradição de Confiança desde 1982</span>
                <span className="hidden sm:inline-block bg-[#163A8C] text-white text-[10px] uppercase px-2 py-0.5 rounded-full font-black tracking-widest ml-1 shadow-sm leading-none">
                  {new Date().getFullYear() - 1982} Anos
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] font-display leading-tight tracking-tight text-center lg:text-left">
                Contabilidade com <span className="text-[#163A8C]">Contador Exclusivo</span>
              </h1>

              <p className="text-base sm:text-lg text-[#3A3A3A] max-w-2xl font-normal leading-relaxed text-center lg:text-left">
                Na DSM Contabilidade, aliamos tecnologia inteligente com consultoria próxima para impulsionar seu negócio em Curitiba, Paraná e todo o Brasil. Aqui você fala direto com o responsável!
              </p>

              {/* Accessible Interactive Neighborhood Finder */}
              <div className="bg-[#EAF1FF] p-4 rounded-xl border border-blue-200 shadow-xs space-y-2.5 w-full max-w-xl text-center lg:text-left">
                <label htmlFor="home-bairro-search" className="block text-xs sm:text-sm font-bold text-[#0B255F] uppercase tracking-wider">
                  🔍 Busque seu Bairro ou Cidade:
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input
                    id="home-bairro-search"
                    type="text"
                    placeholder="Digite seu bairro ou cidade (Ex: Água Verde, CIC, Pinhais...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#163A8C] rounded-lg py-2.5 pl-11 pr-4 text-[#111111] font-bold placeholder-slate-400 focus:outline-none focus:ring-0 text-sm"
                  />
                </div>

                {filteredSearchLocations.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 mt-1 max-h-48 overflow-y-auto shadow-sm">
                    {filteredSearchLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => handleSearchSelect(loc.slug)}
                        className="w-full text-left p-2.5 text-xs sm:text-sm text-[#111111] hover:bg-[#EAF1FF] hover:text-[#163A8C] font-bold block cursor-pointer transition-colors flex items-center gap-2"
                      >
                        <MapPin size={14} className="text-[#163A8C] shrink-0" />
                        <span>{loc.name}</span>
                        <span className="text-xs font-normal text-slate-400 ml-auto">Ver regional</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Senior Support Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="text-green-600" size={18} />
                  <span className="text-xs sm:text-sm font-bold text-[#3A3A3A]">CRC/PR Homologado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="text-[#163A8C]" size={18} />
                  <span className="text-xs sm:text-sm font-bold text-[#3A3A3A]">Suporte p/ Idosos & MEI</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Logo/Brand Banner */}
            <div className="lg:col-span-12 xl:col-span-5 flex justify-center w-full mt-4 lg:mt-0 lg:col-span-5">
              <div className="relative w-full max-w-sm rounded-2xl bg-white p-3 border border-slate-200 shadow-md overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 filter blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative rounded-xl bg-slate-50 p-3 text-center space-y-3 border border-slate-100">
                  <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white max-h-[180px] flex items-center justify-center">
                    <img 
                      src="https://dsmcontabilidade.digital/img/cartao-dsm.webp" 
                      alt="Cartão Oficial DSM Contabilidade - CRC/PR Davy Santos Morais" 
                      className="w-full h-auto object-contain max-h-[170px] p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest">Sede Bacacheri</p>
                    <h3 className="text-base font-bold text-[#111111] font-display">DSM Contabilidade</h3>
                    <p className="text-xs text-[#3A3A3A] leading-tight">
                      R. Dep. Atílio de Almeida Barbosa, 76<br />
                      Média de 40 anos de zelo comercial no Paraná
                    </p>
                  </div>

                  <hr className="border-slate-200" />

                  <a 
                    id="hero-whatsapp-direct"
                    href="https://api.whatsapp.com/send?phone=5541991430464&text=Ol%C3%A1%20DSM!%20Gostaria%20de%20um%20atendimento%20humanizado." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer text-sm shadow-sm hover:scale-101"
                  >
                    <MessageSquare size={16} />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display tracking-tight">
            NOSSAS SOLUÇÕES CONTÁBEIS INTEGRADAS
          </h2>
          <p className="text-sm sm:text-base text-[#3A3A3A] max-w-2xl mx-auto">
            Desde 1982 prestando suporte especializado para empresas de todos os portes, unindo a solidez de mais de 40 anos de mercado com a agilidade digital e atendimento próximo e humanizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Open Business */}
          <div className="bg-white border border-slate-200 hover:border-[#163A8C]/50 p-5 rounded-xl space-y-3 transition-all hover:shadow-md flex flex-col justify-between items-center text-center md:items-start md:text-left">
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] flex items-center justify-center text-[#163A8C] border border-[#2E56B3]/20">
                <Building2 size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Abertura de Empresas</h3>
              <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
                Abertura ágil de CNPJ (MEI, ME, EPP, LTDA) com consultoria especialista gratuita para novos clientes na escolha do regime tributário.
              </p>
            </div>
            <Link to="/abrir-empresa" className="text-[#163A8C] hover:text-[#2E56B3] text-xs font-bold inline-flex items-center gap-1 pt-3 border-t border-slate-100 mt-3 w-full justify-center md:justify-start">
              <span>Saiba mais sobre CNPJ</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2: Accounting */}
          <div className="bg-white border border-slate-200 hover:border-[#163A8C]/50 p-5 rounded-xl space-y-3 transition-all hover:shadow-md flex flex-col justify-between items-center text-center md:items-start md:text-left" id="contabilidade-mensal">
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] flex items-center justify-center text-green-700 border border-green-200">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Contabilidade Mensal</h3>
              <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
                Escrituração de livros fiscais, classificação de balanços, relatórios gerenciais e assessoria total sob os padrões CRC.
              </p>
            </div>
            <a href="#contato-principal" className="text-[#163A8C] hover:text-[#2E56B3] text-xs font-bold inline-flex items-center gap-1 pt-3 border-t border-slate-100 mt-3 w-full justify-center md:justify-start">
              <span>Solicitar orçamento</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Card 3: Payroll */}
          <div className="bg-white border border-slate-200 hover:border-[#163A8C]/50 p-5 rounded-xl space-y-3 transition-all hover:shadow-md flex flex-col justify-between items-center text-center md:items-start md:text-left" id="folha-pagamento">
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] flex items-center justify-center text-cyan-700 border border-cyan-200">
                <Users size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Pessoal & Folha</h3>
              <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
                Gestão de folha de pagamento de colaboradores, apuração de pró-labore de sócios, feriados, admissões e rescisões no eSocial.
              </p>
            </div>
            <a href="#contato-principal" className="text-[#163A8C] hover:text-[#2E56B3] text-xs font-bold inline-flex items-center gap-1 pt-3 border-t border-slate-100 mt-3 w-full justify-center md:justify-start">
              <span>Falar com especialista</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Card 4: Taxes */}
          <div className="bg-white border border-slate-200 hover:border-[#163A8C]/50 p-5 rounded-xl space-y-3 transition-all hover:shadow-md flex flex-col justify-between items-center text-center md:items-start md:text-left" id="regularizacao">
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] flex items-center justify-center text-yellow-700 border border-yellow-200">
                <Activity size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Consultoria de Impostos</h3>
              <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
                Regularização de pendências fiscais federais, estaduais e municipais, e enquadramento ideal para economia sustentável.
              </p>
            </div>
            <a href="#contato-principal" className="text-[#163A8C] hover:text-[#2E56B3] text-xs font-bold inline-flex items-center gap-1 pt-3 border-t border-slate-100 mt-3 w-full justify-center md:justify-start">
              <span>Evitar pagar a mais</span>
              <ChevronRight size={14} />
            </a>
          </div>

        </div>
      </section>


      {/* SECTION 3: NEIGHBORHOOD DIRECTORY SELECTION GRID FOR DEEP INDEXING */}
      <section className="bg-[#F2F4F7] py-6 sm:py-8 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="bg-[#EAF1FF] border border-blue-200 text-[#0B255F] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              PRESENÇA DE PONTO EM CURITIBA
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#111111] font-display tracking-tight">
              Bairros de Curitiba & Região Metropolitana Atendidos
            </h2>
            <p className="text-xs sm:text-sm text-[#3A3A3A] max-w-2xl mx-auto">
              Selecione seu bairro ou cidade para ver as facilidades tributárias e de deslocamento.
            </p>
          </div>

          {/* Bairros list */}
          <div className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#163A8C] uppercase tracking-wider border-b border-slate-300 pb-1 flex items-center gap-1.5 justify-center md:justify-start">
              <MapPin size={14} />
              <span>Bairros em Destaque — Curitiba (PR)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {featuredBairros.map((b) => (
                <Link
                  key={b.name}
                  to={`/contabilidade-em/${b.slug}`}
                  className="bg-white hover:bg-[#163A8C] hover:text-white text-[#3A3A3A] border border-slate-200 hover:border-[#163A8C] rounded-lg p-2 text-center text-xs font-semibold transition-all truncate block cursor-pointer flex items-center justify-center gap-1"
                >
                  <MapPin size={12} className="text-red-500 shrink-0" />
                  <span>{b.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Cities list */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs sm:text-sm font-bold text-[#163A8C] uppercase tracking-wider border-b border-slate-300 pb-1 flex items-center gap-1.5 justify-center md:justify-start">
              <Building2 size={14} />
              <span>Cidades Atendidas — Região Metropolitana de Curitiba</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {featuredCities.map((c) => (
                <Link
                  key={c.name}
                  to={`/contabilidade-em/${c.slug}`}
                  className="bg-white hover:bg-[#163A8C] hover:text-white text-[#3A3A3A] border border-slate-200 hover:border-[#163A8C] rounded-lg p-2 text-center text-xs font-semibold transition-all truncate block cursor-pointer flex items-center justify-center gap-1"
                >
                  <Building2 size={12} className="text-blue-500 shrink-0" />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center pt-1">
              <Link to="/calculadora-deslocamento" className="text-xs sm:text-sm text-[#163A8C] font-bold hover:underline">
                → Ver distância das 15 cidades na Calculadora
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 4: CONTACT & SUPPORT REQUEST FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2" id="contato-principal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-[#0B255F] via-[#163A8C] to-[#2E56B3] border border-blue-900/40 rounded-2xl p-5 sm:p-8 shadow-lg">
          
          {/* Info side */}
          <div className="lg:col-span-5 space-y-4 flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-1.5 bg-black/30 border border-slate-700 text-green-400 font-extrabold px-3 py-1 rounded-full text-xs">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
              <span>ATIVO HOJE</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight leading-tight text-center lg:text-left">
              Fale Direto com o Contador
            </h2>
            
            <p className="text-xs sm:text-sm text-blue-100 text-center lg:text-left">
              Entre em contato conosco hoje mesmo para agendar sua avaliação contábil. Respondemos no mesmo dia com clareza técnica.
            </p>

            <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-200 w-full">
              <div className="flex gap-2 justify-center lg:justify-start">
                <MapPin className="text-blue-300 shrink-0 mt-0.5" size={16} />
                <div className="text-center lg:text-left">
                  <span className="text-white font-bold block">Sede Própria</span>
                  <span className="text-slate-300 text-xs">Bacacheri, Curitiba - PR</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center lg:justify-start">
                <Check className="text-green-400 shrink-0 mt-0.5" size={16} />
                <div className="text-center lg:text-left">
                  <span className="text-white font-bold block">Diferencial Único</span>
                  <span className="text-slate-300 text-xs">Contador exclusivo cuidando ativamente de seu faturamento!</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-800/40 w-full text-center lg:text-left">
              <a 
                href="mailto:davysantosmorais@hotmail.com" 
                className="text-blue-100 hover:text-white font-semibold inline-flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <span>Email: davysantosmorais@hotmail.com</span>
              </a>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-7 bg-black/20 backdrop-blur-md rounded-xl p-5 border border-white/10">
            <h3 className="text-base font-bold text-white mb-4 text-center lg:text-left">Solicite Análise Contábil Gratuita</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="home-nome" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">Seu Nome</label>
                  <input 
                    id="home-nome"
                    name="nome"
                    type="text" 
                    required 
                    placeholder="Ex: Seu Bonifácio" 
                    className="w-full bg-slate-900/80 border border-slate-700 focus:border-[#2E56B3] rounded-lg py-1.5 px-3 text-white placeholder-slate-500 font-medium text-sm transition-all focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="home-whatsapp" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">WhatsApp Conectado</label>
                  <input 
                    id="home-whatsapp"
                    name="whatsapp"
                    type="tel" 
                    required 
                    placeholder="Ex: (41) 99143-0464" 
                    className="w-full bg-slate-900/80 border border-slate-700 focus:border-[#2E56B3] rounded-lg py-1.5 px-3 text-white placeholder-slate-500 font-medium text-sm transition-all focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="home-servico" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">O que gostaria de resolver?</label>
                <select 
                  id="home-servico"
                  name="servico"
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-[#2E56B3] rounded-lg py-1.5 px-3 text-white font-medium text-sm cursor-pointer"
                >
                  <option value="Abertura de Empresa">Abrir Empresa em Curitiba ou RMC (JUCEPAR)</option>
                  <option value="Migrar Contabilidade">Migrar Contabilidade Física/Digital para a DSM</option>
                  <option value="Regularizar CNPJ Inativo">Regularizar Cadastro ou Alvará de Funcionamento</option>
                  <option value="Serviços para Autônomos/MEI">Serviços Contábeis e eSocial para MEI</option>
                  <option value="Imposto de Renda">Declaração Anual de Imposto de Renda Pessoa Física</option>
                </select>
              </div>

              <div>
                <label htmlFor="home-mensagem" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">Sobre seu negócio</label>
                <textarea 
                  id="home-mensagem"
                  name="mensagem"
                  rows={3}
                  required
                  placeholder="Atividade comercial ou bairro do seu negócio..." 
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-[#2E56B3] rounded-lg py-1.5 px-3 text-white placeholder-slate-500 font-medium text-sm transition-all focus:outline-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer text-sm transition-transform hover:scale-101 shadow-md"
              >
                <Phone size={16} className="text-[#FFFFFF]" />
                <span>Enviar para o Contador Davy</span>
              </button>
            </form>
          </div>

        </div>
      </section>


      {/* SECTION 5: FAQS (HIGH CONTRAST & VERY CLEAR ACCORDION FOR ELDERLY USERS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 pt-2">
        <div className="text-center space-y-2 mb-4">
          <HelpCircle className="mx-auto text-[#163A8C]" size={28} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] font-display tracking-tight">
            Perguntas Frequentes — Suporte DSM
          </h2>
          <p className="text-xs sm:text-sm text-[#3A3A3A]">
            Dúvidas rápidas sobre planos, burocracia do registro do CNPJ e atendimento.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 font-bold text-[#111111] text-sm sm:text-base hover:bg-slate-50 flex justify-between items-center gap-4 cursor-pointer"
                aria-expanded={activeFaq === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-[#163A8C] shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {activeFaq === idx && (
                <div className="px-4 sm:px-5 pb-4 pt-1 text-[#3A3A3A] text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
