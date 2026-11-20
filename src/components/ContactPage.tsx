import React from 'react';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import EnhancedSEO from './EnhancedSEO';
import DsmContactActions, { dsmWhatsApp } from './DsmContactActions';

const title = 'Contato da DSM Contabilidade no Bacacheri, Curitiba';
const description = 'Fale com o contador Davy Santos Morais por telefone ou WhatsApp. Veja o endereço e o horário da DSM Contabilidade no Bacacheri, Curitiba.';
const address = 'Rua Deputado Atílio de Almeida Barbosa, 76, Bacacheri, Curitiba – PR';
const officeMap = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(address);
const mail = 'davysantosmorais@hotmail.com';
const topics = ['Abertura de empresa', 'Contabilidade mensal', 'Troca de contador', 'Consultoria fiscal', 'Departamento pessoal e folha', 'Outro assunto'];
export default function ContactPage() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    const extra = String(fields.get('mensagem') ?? '').trim();
    const lines = ['Olá, DSM Contabilidade! Vim pelo site.', 'Nome: ' + fields.get('nome'), 'Assunto: ' + fields.get('assunto')];
    if (extra) lines.push('Mensagem: ' + extra);
    window.location.assign(dsmWhatsApp(lines.join('\n')));
  };
  return <div className="dsm-home dsm-inner" data-dsm-page="contato">
    <EnhancedSEO title={title} description={description} />
    <section className="dsm-hero" aria-labelledby="dsm-contact-title">
      <div className="dsm-wrap dsm-hero-grid">
        <div className="dsm-hero-copy">
          <span className="dsm-eyebrow">DSM Contabilidade · Bacacheri</span>
          <h1 id="dsm-contact-title">Fale com a DSM Contabilidade</h1>
          <p>Quer abrir uma empresa, trocar de contador ou tirar uma dúvida? Fale direto com Davy Santos Morais pelo canal que você preferir.</p>
          <DsmContactActions message="Olá, Davy! Vim pelo site da DSM Contabilidade e gostaria de conversar." />
        </div>
        <div className="dsm-places">
          <h2>Visite nosso escritório</h2>
          <p><strong>Edifício Marsala</strong><br />{address}</p>
          <p>Segunda a sexta, das 8h30 às 18h.</p>
          <div className="dsm-actions"><a className="dsm-btn dsm-btn-outline" href={officeMap} target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" /> Como chegar</a></div>
          <a className="dsm-inline-link" href={'mailto:' + mail}><Mail size={20} aria-hidden="true" /> {mail}</a>
          <p><a href="https://www.instagram.com/davysantosmorais/">Instagram</a> · <a href="https://www.linkedin.com/company/dsm-contabilidade/">LinkedIn</a></p>
        </div>
      </div>
    </section>
    <section className="dsm-wrap dsm-section" aria-labelledby="dsm-contato-form">
      <div className="dsm-contact">
        <div><span className="dsm-eyebrow">Primeiro contato</span><h2 id="dsm-contato-form">Prepare sua mensagem</h2><p>Escolha um assunto e conte em poucas palavras o que você precisa. Não inclua CPF, senhas, dados bancários ou fotos de documentos.</p></div>
        <form className="dsm-form" onSubmit={submit}>
          <label htmlFor="dsm-contact-name">Seu nome<input id="dsm-contact-name" name="nome" autoComplete="name" maxLength={100} required /></label>
          <label htmlFor="dsm-contact-topic">Assunto<select id="dsm-contact-topic" name="assunto" defaultValue="" required><option disabled value="">Selecione um assunto</option>{topics.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label htmlFor="dsm-contact-message">Sua mensagem (opcional)<textarea id="dsm-contact-message" name="mensagem" rows={4} maxLength={500} /></label>
          <p>O WhatsApp abrirá com a mensagem pronta. Você revisa o texto antes de decidir se quer enviar.</p>
          <button className="dsm-btn dsm-btn-whatsapp" type="submit"><MessageSquare size={20} aria-hidden="true" /> Preparar mensagem no WhatsApp</button>
        </form>
      </div>
    </section>
  </div>;
}
