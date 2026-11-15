/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, ShieldCheck, Sparkles, MessageSquare, Clock } from 'lucide-react';
import EnhancedSEO from './EnhancedSEO';

export default function ContactPage() {
  const handleCompleteContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('whatsapp') as string;
    const msg = formData.get('mensagem') as string;

    const formattedMessage = `Olá Davy Santos Morais! Solicito um orçamento consultivo especializado para minha empresa.\n\n` + 
                               `*Nome:* ${nome}\n` + 
                               `*E-mail:* ${email}\n` + 
                               `*Telefone/WhatsApp:* ${phone}\n` + 
                               `*Dúvida / Atividade:* ${msg}\n\n` + 
                               `Aguardando retorno do meu plano contábil exclusivo!`;

    window.open(`https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(formattedMessage)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 py-12 text-slate-900">
      <EnhancedSEO 
        title="Fale Conosco — Solicite um Orçamento | DSM Contabilidade"
        description="Entre em contato com o contador Davy Santos Morais da DSM Contabilidade em Curitiba. Atendimento humanizado e exclusivo para sua empresa."
        keywords={["telefone contabilidade curitiba", "whatsapp dsm contabilidade", "escritorio de contabilidade bacacheri", "orcamento contabilidade Parana"]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 font-semibold px-3.5 py-1 rounded-full text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-850" /> Suporte Consultivo Especializado
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Contato & Solicitação de Orçamento
          </h1>
          <p className="text-sm sm:text-base text-slate-650">
            Tem alguma dúvida sobre nossos serviços ou deseja atendimento personalizado para suas necessidades comerciais? Fale direto conosco!
          </p>
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-md">
          
          {/* Info block */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Budget Banner requested */}
            <div className="rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-slate-50 relative group">
              <img 
                src="https://img.dsmcontabilidade.digital/cartao-dsm.webp" 
                alt="Cartão Oficial DSM Contabilidade - CRC/PR Davy Santos Morais" 
                className="w-full h-auto object-contain transition-transform group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="p-3.5 bg-slate-100 border-t border-slate-200 text-center">
                <span className="text-xs font-black text-blue-900">DSM Contabilidade Sindicada — Desde 1982</span>
              </div>
            </div>

            {/* Direct Information list */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-150 pb-2 font-display">DSM Contabilidade</h3>
              
              <ul className="space-y-4 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-700 shrink-0 mt-0.5" size={20} />
                  <div>
                    <span className="text-slate-900 font-extrabold block">Nosso Endereço Físico</span>
                    <span className="text-slate-600 text-xs sm:text-sm">
                      Condomínio do Edifício Marsala<br />
                      R. Dep. Atílio de Almeida Barbosa, 76 - Sala 7<br />
                      Bairro Bacacheri / Boa Vista, Curitiba - PR, 82560-460
                    </span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="text-green-700 shrink-0" size={20} />
                  <div>
                    <span className="text-slate-900 font-extrabold block">Telefone para ligação</span>
                    <a href="tel:41991430464" className="text-green-700 hover:text-green-800 transition-colors border-b border-dashed border-green-600 text-base sm:text-lg font-bold">
                      (41) 99143-0464
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="text-blue-700 shrink-0" size={20} />
                  <div>
                    <span className="text-slate-900 font-extrabold block">E-mail Corporativo</span>
                    <a href="mailto:davysantosmorais@hotmail.com" className="text-slate-600 hover:text-blue-700 transition-colors text-sm">
                      davysantosmorais@hotmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3 text-xs sm:text-sm">
                  <Clock className="text-yellow-600 shrink-0" size={18} />
                  <div>
                    <span className="text-slate-500 block font-semibold">Horário de atendimento</span>
                    <span className="text-slate-800 font-semibold">Segunda a Sexta — das 08h30 às 18h00</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Form block */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Prepare sua mensagem</h3>
            <p className="text-sm text-slate-600 mb-4">O formulário abre o WhatsApp com os dados preenchidos. Revise a mensagem e confirme o envio no aplicativo. Não inclua senhas, documentos ou dados financeiros confidenciais neste primeiro contato.</p>
            
            <form onSubmit={handleCompleteContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="cont-nome" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5 border-none outline-none">Seu Nome Completo</label>
                <input 
                  id="cont-nome"
                  type="text" 
                  name="nome"
                  required
                  placeholder="Ex: Seu Bonifácio de Morais" 
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-800 focus:border-blue-500 placeholder-slate-400 font-medium scale-100"
                />
              </div>

              <div>
                <label htmlFor="cont-mail" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5 border-none outline-none">Seu E-mail (Opcional)</label>
                <input 
                  id="cont-mail"
                  type="email" 
                  name="email"
                  placeholder="Ex: seu-nome@empresa.com.br" 
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-800 focus:border-blue-500 placeholder-slate-400 font-medium scale-100"
                />
              </div>

              <div>
                <label htmlFor="cont-whatsapp" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5 border-none outline-none">Telefone / WhatsApp</label>
                <input 
                  id="cont-whatsapp"
                  type="tel" 
                  name="whatsapp"
                  required
                  placeholder="Ex: (41) 99143-0464" 
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-800 focus:border-blue-500 placeholder-slate-400 font-medium scale-100"
                />
              </div>

              <div>
                <label htmlFor="cont-mensagem" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5 border-none outline-none">Atividade Desejada e Detalhes</label>
                <textarea 
                  id="cont-mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  placeholder="Se possível, descreva se sua empresa é comércio, serviços ou MEI e qual sua maior necessidade de suporte fiscal no momento..." 
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-800 focus:border-blue-500 placeholder-slate-400 font-medium scale-100"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-transform hover:scale-101 cursor-pointer text-base sm:text-lg shadow-lg"
                >
                  <MessageSquare size={20} />
                  <span>Preparar mensagem no WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
