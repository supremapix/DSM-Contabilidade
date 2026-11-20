import React from 'react';
import { Link } from 'react-router-dom';
import EnhancedSEO from './EnhancedSEO';
import DsmContactActions from './DsmContactActions';

const title = 'Abertura de empresa em Curitiba | DSM Contabilidade';
const description = 'Entenda como começar a abrir sua empresa em Curitiba, quais informações reunir e a diferença entre a formalização de MEI e o serviço contábil.';
const message = 'Olá, DSM Contabilidade! Vim pelo site e gostaria de conversar sobre a abertura de uma empresa.';
const sources = {
  cpv: 'https://servicos.curitiba.pr.gov.br/consulta-previa-de-viabilidade-cpv-online/199',
  jucepar: 'https://www.juntacomercial.pr.gov.br/Pagina/Tabela-de-precos',
  mei: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei'
};
export default function CompanyOpeningPage() {
  return <div className="dsm-home dsm-inner" data-dsm-page="abertura">
    <EnhancedSEO title={title} description={description} />
    <section className="dsm-hero" aria-labelledby="dsm-opening">
      <div className="dsm-wrap dsm-hero-grid">
        <div className="dsm-hero-copy">
          <span className="dsm-eyebrow">DSM Contabilidade · Bacacheri</span>
          <h1 id="dsm-opening">Abertura de empresa em Curitiba</h1>
          <p>Vai começar um negócio? Converse com o contador Davy Santos Morais para entender quais informações reunir, quais etapas se aplicam e o que pedir no orçamento.</p>
          <DsmContactActions message={message} />
          <a className="dsm-inline-link" href="#dsm-abertura-etapas">Ver o que preparar antes da conversa</a>
        </div>
        <figure className="dsm-hero-art"><img src="/images/dsm-abertura.webp" width="640" height="480" fetchPriority="high" decoding="async" alt="Ilustração de pessoas revisando os documentos para abrir uma empresa" /></figure>
      </div>
    </section>
    <section className="dsm-wrap dsm-section" id="dsm-abertura-etapas" aria-labelledby="dsm-abertura-passos">
      <div className="dsm-section-intro"><span className="dsm-eyebrow">Antes de formalizar</span><h2 id="dsm-abertura-passos">O que ter em mãos na primeira conversa</h2><p>Não envie senhas, fotos de documentos ou dados bancários no primeiro contato.</p></div>
      <ol className="dsm-inner-list">
        <li><h3>Atividade do negócio</h3><p>Descreva o que você pretende vender ou quais serviços vai oferecer.</p></li>
        <li><h3>Endereço pretendido</h3><p>Informe em que cidade pretende atuar e se o negócio terá um local físico. Para Curitiba, consulte a <a href={sources.cpv}>consulta prévia de viabilidade da Prefeitura</a> para saber quando se aplica.</p></li>
        <li><h3>Sócios e equipe</h3><p>Diga se pretende abrir sozinho, com sócios ou contratar funcionários. Isso ajuda a orientar o primeiro atendimento.</p></li>
      </ol>
    </section>
    <section className="dsm-note"><div className="dsm-wrap dsm-note-grid">
      <div><h2>MEI: formalização oficial e assessoria são coisas diferentes</h2><p>Para quem se enquadra nas regras do MEI, a formalização no Portal do Empreendedor é gratuita. Isso não significa que serviços particulares de contabilidade ou outras obrigações da empresa sejam gratuitos.</p></div>
      <div><a className="dsm-btn dsm-btn-outline" href={sources.mei}>Consultar o Portal do Empreendedor</a><p className="dsm-inner-source">Para os atos aplicáveis no Paraná, consulte a <a href={sources.jucepar}>tabela de preços da Junta Comercial</a>. Peça à DSM um orçamento que separe os honorários dos custos de terceiros, quando houver.</p></div>
    </div></section>
    <section className="dsm-wrap dsm-section dsm-faq" aria-labelledby="dsm-abertura-faq">
      <div className="dsm-section-intro"><span className="dsm-eyebrow">Dúvidas frequentes</span><h2 id="dsm-abertura-faq">Antes de abrir seu CNPJ</h2></div>
      <div>
        <details><summary>Quanto custa abrir uma empresa em Curitiba?</summary><p>Os custos dependem da atividade, do tipo de empresa e das etapas aplicáveis. Peça uma proposta com o que está incluído e verifique as taxas oficiais quando forem pertinentes.</p></details>
        <details><summary>Quanto tempo leva o processo?</summary><p>O prazo varia conforme o tipo de empresa, a documentação, a análise dos órgãos e eventuais licenças. Após entender o caso, a DSM pode orientar sobre etapas e estimativas.</p></details>
        <details><summary>Já tenho CNPJ. Posso falar com a DSM?</summary><p>Sim. Diga se precisa organizar documentos, regularizar informações ou trocar de contador. Use o <Link to="/contato">canal de contato da DSM</Link>.</p></details>
      </div>
    </section>
  </div>;
}
