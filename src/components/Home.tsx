import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Building2, Calculator, CalendarDays, ClipboardCheck, MapPin, MessageSquare, Phone, Search, Users } from 'lucide-react';
import { getAllLocations } from '../data/locations';
import EnhancedSEO from './EnhancedSEO';
import './dsm-home.css';

const whatsapp = 'https://api.whatsapp.com/send?phone=5541991430464';
const talkToDavy = whatsapp + '&text=Ol%C3%A1%20DSM!%20Gostaria%20de%20um%20atendimento%20humanizado.';
const map = 'https://www.google.com/maps/search/?api=1&query=Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2C%2076%20-%20Bacacheri%2C%20Curitiba';
const heading = 'Contabilidade em Curitiba para abrir e cuidar da sua empresa';
const description = 'DSM Contabilidade no Bacacheri, Curitiba: abertura de empresas, contabilidade mensal, consultoria fiscal e folha de pagamento. Fale com Davy Santos Morais.';
const serviceAnchors: Record<string, string> = { contabilidade: 'contabilidade-mensal', fiscal: 'regularizacao', folha: 'folha-pagamento' };
const services = [
  { id: 'abertura', title: 'Abertura de empresas', intro: 'Quer tirar sua empresa do papel? Entenda quais informações reunir e os passos para formalizar o seu negócio.', action: 'Entender a abertura de empresa', url: '/abrir-empresa', alt: 'Ilustração de empreendedor organizando documentos para abrir uma empresa', Icon: Building2 },
  { id: 'contabilidade', title: 'Contabilidade mensal', intro: 'Já tem CNPJ? Organize a rotina de documentos e entregas ou saiba como trocar de contador sem perder o histórico.', action: 'Solicitar contabilidade mensal', url: '#contato-principal', alt: 'Ilustração de calendário e documentos de uma rotina contábil mensal', Icon: CalendarDays },
  { id: 'fiscal', title: 'Consultoria fiscal', intro: 'Converse sobre dúvidas de tributos, enquadramento e obrigações. A orientação depende da atividade e da situação da empresa.', action: 'Conversar sobre tributos', url: '#contato-principal', alt: 'Ilustração de contador explicando informações fiscais a uma cliente', Icon: Calculator },
  { id: 'folha', title: 'Departamento pessoal e folha', intro: 'Planeje admissões e organize as informações da folha, das férias e dos desligamentos da sua equipe.', action: 'Conversar sobre folha de pagamento', url: '#contato-principal', alt: 'Ilustração de profissionais conferindo os registros da equipe', Icon: Users }
];
const places = [
  { label: 'Bairros de Curitiba', items: [
    ['Bacacheri', 'curitiba/bairro-bacacheri'], ['Água Verde', 'curitiba/bairro-agua-verde'], ['Batel', 'curitiba/bairro-batel'], ['Boa Vista', 'curitiba/bairro-boa-vista'], ['CIC (Cidade Industrial)', 'curitiba/bairro-cidade-industrial-cic'], ['Pinheirinho', 'curitiba/bairro-pinheirinho'], ['Portão', 'curitiba/bairro-portao'], ['Sítio Cercado', 'curitiba/bairro-sitio-cercado']
  ] },
  { label: 'Região Metropolitana', items: [
    ['Pinhais', 'regiao-metropolitana/pinhais'], ['Colombo', 'regiao-metropolitana/colombo'], ['São José dos Pinhais', 'regiao-metropolitana/sao-jose-dos-pinhais'], ['Araucária', 'regiao-metropolitana/araucaria'], ['Fazenda Rio Grande', 'regiao-metropolitana/fazenda-rio-grande'], ['Campo Largo', 'regiao-metropolitana/campo-largo']
  ] }
];
const faqs = [
  ['O que eu preciso informar no primeiro contato?', 'Conte qual é a atividade, em que cidade pretende atuar e se já tem CNPJ. Se quer contratar alguém ou tem um prazo importante, mencione isso. Não precisa anexar documentos pessoais nesse primeiro contato.'],
  ['Posso trocar de contador com a empresa em funcionamento?', 'Sim. Para organizar a transição, reúna as informações do seu CNPJ, identifique os próximos vencimentos e consulte quais documentos e registros precisam ser transferidos.'],
  ['Quanto custa abrir uma empresa em Curitiba?', 'O orçamento depende das atividades, do tipo de empresa e das etapas necessárias. Peça a discriminação de honorários e eventuais taxas de registro antes de decidir.'],
  ['A DSM atende quem é MEI?', 'Sim. Informe sua atividade e se a dúvida envolve formalização, guias, declaração anual ou mudança para outra categoria de empresa.'],
  ['Onde fica o escritório da DSM?', 'O escritório fica na Rua Deputado Atílio de Almeida Barbosa, 76, no Bacacheri, em Curitiba. Se prefere conversar à distância, use o WhatsApp.']
];
const normalize = (value: string) => value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function Artwork({ name, alt, priority = false }: { name: string; alt: string; priority?: boolean }) {
  return <img src={'/images/dsm-' + name + '.webp'} alt={alt} width={priority ? 1000 : 640} height={priority ? 750 : 480} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const matches = query.trim() ? getAllLocations().filter(({ name }) => normalize(name).includes(normalize(query))).slice(0, 5) : [];
  const onContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const body = ['Olá, DSM Contabilidade! Acessei o site oficial.', 'Nome: ' + input.get('nome'), 'WhatsApp para retorno: ' + input.get('whatsapp'), 'Serviço: ' + input.get('servico'), input.get('mensagem') ? 'Sobre o negócio: ' + input.get('mensagem') : ''].filter(Boolean).join('\n');
    window.location.assign(whatsapp + '&text=' + encodeURIComponent(body));
  };

  return (
    <div className="dsm-home">
      <EnhancedSEO title="DSM Contabilidade | Escritório de Contabilidade no Bacacheri, Curitiba" description={description} />
      <section className="dsm-hero" aria-labelledby="dsm-hero-heading">
        <div className="dsm-wrap dsm-hero-grid">
          <div className="dsm-hero-copy">
            <span className="dsm-eyebrow"><MapPin aria-hidden="true" size={18} /> Bacacheri · Curitiba</span>
            <h1 id="dsm-hero-heading">{heading}</h1>
            <p>Vai abrir um CNPJ, trocar de contador ou organizar os tributos e a folha? Fale direto com Davy Santos Morais e entenda o próximo passo para o seu negócio.</p>
            <div className="dsm-actions">
              <a className="dsm-btn dsm-btn-whatsapp" id="hero-whatsapp-direct" href={talkToDavy} target="_blank" rel="noopener noreferrer"><MessageSquare aria-hidden="true" size={20} /> Falar no WhatsApp</a>
              <a className="dsm-btn dsm-btn-outline" href="#dsm-servicos"><ArrowDown aria-hidden="true" size={20} /> Ver serviços</a>
            </div>
            <a className="dsm-text-phone" href="tel:+5541991430464"><Phone aria-hidden="true" size={18} /> Prefere ligar? (41) 99143-0464</a>
          </div>
          <figure className="dsm-hero-art">
            <Artwork name="hero" alt="Ilustração de duas pessoas revisando uma lista de documentos em um escritório" priority />
            <figcaption><span aria-hidden="true"><ClipboardCheck size={25} /></span><strong>Atendimento direto com o contador<small>Presencial no Bacacheri ou por WhatsApp</small></strong></figcaption>
          </figure>
        </div>
      </section>
      <section className="dsm-wrap dsm-section" id="dsm-servicos" aria-labelledby="dsm-servicos-heading">
        <div className="dsm-section-intro"><span className="dsm-eyebrow">Serviços contábeis</span><h2 id="dsm-servicos-heading">O que você precisa resolver?</h2><p>Escolha o assunto que quer resolver agora.</p></div>
        <div className="dsm-service-grid">
          {services.map(({ id, title, intro, action, url, alt, Icon }) => (
            <article className="dsm-service" key={id} id={serviceAnchors[id]}>
              <Artwork name={id} alt={alt} />
              <div className="dsm-service-copy">
                <span className="dsm-service-icon"><Icon aria-hidden="true" size={22} /></span>
                <h3>{title}</h3><p>{intro}</p>
                {url.startsWith('/') ? <Link to={url}>{action}<ArrowRight aria-hidden="true" size={19} /></Link> : <a href={url} onClick={() => setSelectedService(title)}>{action}<ArrowRight aria-hidden="true" size={19} /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="dsm-note" aria-labelledby="dsm-primeiro-heading">
        <div className="dsm-wrap dsm-note-grid">
          <div><span className="dsm-eyebrow">Da dúvida ao próximo passo</span><h2 id="dsm-primeiro-heading">Como começar com a DSM</h2><p>Não precisa ter todos os documentos para conversar com o contador.</p></div>
          <ol>
            <li><span aria-hidden="true">01</span><div><h3>Conte o que precisa resolver</h3><p>Informe sua atividade, cidade e se já tem CNPJ.</p></div></li>
            <li><span aria-hidden="true">02</span><div><h3>Entenda o que será necessário</h3><p>Converse sobre documentos, etapas e prazos aplicáveis.</p></div></li>
            <li><span aria-hidden="true">03</span><div><h3>Decida como seguir</h3><p>Peça uma proposta de acordo com o serviço de que precisa.</p></div></li>
          </ol>
        </div>
      </section>
      <section className="dsm-wrap dsm-section dsm-local" aria-labelledby="dsm-local-heading">
        <div className="dsm-section-intro"><span className="dsm-eyebrow">Curitiba e Região Metropolitana</span><h2 id="dsm-local-heading">Escritório de contabilidade no Bacacheri</h2><p>Rua Deputado Atílio de Almeida Barbosa, 76, Bacacheri, Curitiba – PR.</p><a href={map} target="_blank" rel="noopener noreferrer" className="dsm-btn dsm-btn-outline"><MapPin aria-hidden="true" size={20} /> Como chegar</a></div>
        <div className="dsm-places">
          <label htmlFor="home-bairro-search">Encontre seu bairro ou cidade</label>
          <div className="dsm-search"><Search aria-hidden="true" size={20} /><input id="home-bairro-search" placeholder="Ex.: Água Verde ou Pinhais" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          {query.trim() && <div aria-live="polite">{matches.length ? <ul className="dsm-place-list">{matches.map(({id, name, slug}) => <li key={id}><Link to={'/contabilidade-em/' + slug}>{name}</Link></li>)}</ul> : <p>Nenhuma localidade encontrada.</p>}</div>}
          {places.map(({ label, items }) => <div key={label}><h3>{label}</h3><ul className="dsm-place-list">{items.map(([name, slug]) => <li key={slug}><Link to={'/contabilidade-em/' + slug}>{name}</Link></li>)}</ul></div>)}
          <Link className="dsm-inline-link" to="/calculadora-deslocamento">Consultar estimativa de deslocamento <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>
      <section className="dsm-wrap dsm-section dsm-contact-wrap" id="contato-principal" aria-labelledby="dsm-contato-heading">
        <div className="dsm-contact">
          <div><span className="dsm-eyebrow">Fale com o contador</span><h2 id="dsm-contato-heading">Vamos conversar sobre sua empresa?</h2><p>Use o WhatsApp, ligue ou prepare sua mensagem aqui.</p>
          <div className="dsm-actions"><a className="dsm-btn dsm-btn-whatsapp" href={talkToDavy} target="_blank" rel="noopener noreferrer"><MessageSquare aria-hidden="true" size={20} /> Abrir WhatsApp</a><a className="dsm-btn dsm-btn-inverse" href="tel:+5541991430464"><Phone aria-hidden="true" size={20} /> Ligar</a></div>
          <a className="dsm-contact-email" href="mailto:davysantosmorais@hotmail.com">davysantosmorais@hotmail.com</a></div>
          <form className="dsm-form" onSubmit={onContact}>
            <div className="dsm-form-grid">
              <label htmlFor="home-nome">Seu nome<input id="home-nome" name="nome" autoComplete="name" required /></label>
              <label htmlFor="home-whatsapp">Telefone ou WhatsApp<input id="home-whatsapp" name="whatsapp" type="tel" autoComplete="tel" required /></label>
            </div>
            <label htmlFor="home-servico">Como podemos ajudar?<select id="home-servico" name="servico" value={selectedService} onChange={e => setSelectedService(e.target.value)} required><option value="" disabled>Selecione um assunto</option>{services.map(({ title }) => <option key={title}>{title}</option>)}<option>Trocar de contador</option><option>Regularização de empresa</option><option>Serviços para autônomos ou MEI</option><option>Imposto de Renda Pessoa Física</option></select></label>
            <label htmlFor="home-mensagem">Sobre seu negócio (opcional)<textarea id="home-mensagem" name="mensagem" rows={3} placeholder="Ex.: Quero abrir uma empresa de serviços em Curitiba." /></label>
            <p>O WhatsApp abrirá com o texto pronto. Você revisa e decide se quer enviar.</p>
            <button className="dsm-btn dsm-btn-whatsapp" type="submit"><MessageSquare aria-hidden="true" size={20} /> Preparar mensagem no WhatsApp</button>
          </form>
        </div>
      </section>
      <section className="dsm-wrap dsm-section dsm-faq" aria-labelledby="dsm-duvidas-heading"><div className="dsm-section-intro"><span className="dsm-eyebrow">Antes de decidir</span><h2 id="dsm-duvidas-heading">Dúvidas frequentes</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    </div>
  );
}
