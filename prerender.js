/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';

// Helper to normalized slugify text matching src/data/locations.ts
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove repeat hyphens
}

const OFFICIAL_BAIRROS = [
  "Abranches", "Água Verde", "Ahú", "Alto Boqueirão", "Alto da Glória",
  "Alto da Rua XV", "Atuba", "Augusta", "Bacacheri", "Bairro Alto",
  "Barreirinha", "Batel", "Bigorrilho", "Boa Vista", "Bom Retiro",
  "Boqueirão", "Butiatuvinha", "Cabral", "Cachoeira", "Cajuru",
  "Campina do Siqueira", "Campo Comprido", "Campo de Santana", "Capão Raso", "Capão da Imbuia",
  "Cascatinha", "Caximba", "Centro", "Centro Cívico", "Cidade Industrial (CIC)",
  "Cristo Rei", "Fanny", "Fazendinha", "Ganchinho", "Guabirotuba",
  "Guaíra", "Hauer", "Hugo Lange", "Jardim Botânico", "Jardim Social",
  "Jardim das Américas", "Juvevê", "Lamenha Pequena", "Lindóia", "Mercês",
  "Mossunguê", "Novo Mundo", "Orleans", "Parolin", "Pilarzinho",
  "Pinheirinho", "Portão", "Prado Velho", "Rebouças", "Riviera",
  "Santa Cândida", "Santa Felicidade", "Santa Quitéria", "Santo Inácio", "Seminário",
  "Sítio Cercado", "São Braz", "São Francisco", "São João", "São Lourenço",
  "São Miguel", "Taboão", "Tarumã", "Tatuquara", "Tingui",
  "Uberaba", "Umbará", "Vila Izabel", "Vista Alegre", "Xaxim"
];

const POPULAR_BAIRROS = [
  "Vila Sandra", "CIC Central", "Neoville", "Vitória Régia", "Caiuá",
  "Sabará", "Vila Verde", "Nossa Senhora da Luz", "Barigui", "Conquista",
  "Augusta (região)", "Riviera (região)", "São Miguel (região)", "Gabineto", "Itatiaia",
  "Santa Helena", "Atenas", "Osvaldo Cruz", "Vila Pantanal", "Vila Torres",
  "Vila das Torres", "Vila Parolin", "Vila Hauer", "Vila Guaíra", "Vila Oficinas",
  "Vila Osternack", "Vila São Pedro", "Vila Audi", "Pinheirinho Velho", "Portão Velho",
  "Capão Raso Velho", "Sítio Cercado Velho", "Jardim Gabineto", "Jardim Itatiaia", "Jardim Kosmos",
  "Jardim da Ordem", "Jardim Alvorada"
];

const METRO_CITIES = [
  "São José dos Pinhais", "Pinhais", "Colombo", "Araucária", "Almirante Tamandaré",
  "Campo Largo", "Campo Magro", "Fazenda Rio Grande", "Quatro Barras", "Campina Grande do Sul",
  "Mandirituba", "Balsa Nova", "Rio Branco do Sul", "Itaperuçu", "Tijucas do Sul"
];

const TARGET_STATES = [
  { name: "Paraná", code: "PR", desc: "abertura ágil de filiais e matrizes corporativas no Paraná" },
  { name: "Santa Catarina", code: "SC", desc: "planejamento tributário estratégico e assessoria ampla em Santa Catarina" },
  { name: "Rio Grande do Sul", code: "RS", desc: "parceria de negócios, contabilidade ágil e suporte fiscal no Rio Grande do Sul" }
];

async function runPrerender() {
  console.log("🚀 Iniciando Pipeline de Pré-renderização Estática e Geração de SEO...");

  const distPath = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error("❌ Erro: dist/index.html não encontrado! Por favor execute 'vite build' antes.");
    process.exit(1);
  }

  // Read base html template built by Vite
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // Master URL collections
  const routes = [];

  // 1. Add static views
  routes.push({
    path: '',
    title: 'DSM Contabilidade | Escritório de Contabilidade no Bacacheri, Curitiba',
    description: 'DSM Contabilidade no Bacacheri, Curitiba: abertura de empresas, contabilidade mensal, consultoria fiscal e folha de pagamento. Fale com Davy Santos Morais.',
    keywords: 'contabilidade curitiba, abrir empresa curitiba, contador bacacheri, dsm contabilidade',
    bodyTitle: 'Contabilidade em Curitiba para abrir e cuidar da sua empresa',
    priority: '1.0'
  });

  routes.push({
    path: 'abrir-empresa',
    title: 'Abertura de empresa em Curitiba | DSM Contabilidade',
    description: 'Entenda como começar a abrir sua empresa em Curitiba, quais informações reunir e a diferença entre a formalização de MEI e o serviço contábil.',
    keywords: 'abertura de empresa em Curitiba, abrir CNPJ Curitiba, consulta prévia Curitiba, Jucepar, formalização MEI',
    bodyTitle: 'Abertura de empresa em Curitiba',
    priority: '0.9'
  });

  routes.push({
    path: 'calculadora-deslocamento',
    title: 'Calculadora Metropolitana de Deslocamento RMC — DSM Contabilidade',
    description: 'Simule uma estimativa de deslocamento até a DSM Contabilidade no Bacacheri. Valores ilustrativos, sem trânsito ao vivo; confirme o trajeto em um aplicativo de mapas.',
    keywords: 'calculadora deslocamento curitiba, distancia pinhais curitiba, transito RMC, logistica bacacheri',
    bodyTitle: 'Como chegar à DSM no Bacacheri',
    priority: '0.8'
  });

  routes.push({
    path: 'contato',
    title: 'Contato da DSM Contabilidade no Bacacheri, Curitiba',
    description: 'Fale com o contador Davy Santos Morais por telefone ou WhatsApp. Veja o endereço e o horário da DSM Contabilidade no Bacacheri, Curitiba.',
    keywords: 'telefone dsm contabilidade, whatsapp contador curitiba, davy santos morais, atendimento contabil',
    bodyTitle: 'Fale com a DSM Contabilidade',
    priority: '0.8'
  });

  routes.push({
    path: 'quem-somos',
    title: 'Quem Somos — Nossa História desde 1982 | DSM Contabilidade',
    description: 'Conheça a nossa trajetória! Liderada por Davy Santos Morais, a DSM Contabilidade se orgulha de fornecer atendimento próximo, ágil e contador exclusivo para cada cliente.',
    keywords: 'historia dsm contabilidade, quem e davy santos morais, contabilidade tradicional curitiba, fundacao dsm curitiba',
    bodyTitle: 'Conheça a DSM Contabilidade no Bacacheri',
    priority: '0.8'
  });

  // 2. Add Official neighborhoods (Curitiba)
  OFFICIAL_BAIRROS.forEach(b => {
    routes.push({
      path: `contabilidade-em/curitiba/bairro-${slugify(b)}`,
      title: `Contabilidade e Abertura de Empresa no Bairro ${b} em Curitiba | DSM`,
      description: `Buscando escritório de contabilidade qualificado no bairro ${b} em Curitiba PR? Atendimento próximo de contador exclusivo e abertura ágil de CNPJ pela DSM.`,
      keywords: `contabilidade ${b.toLowerCase()}, escritorio contabilidade ${b.toLowerCase()}, abrir empresa ${b.toLowerCase()}, contador ${b.toLowerCase()}`,
      bodyTitle: `Atendimento Contábil Consultivo Exclusivo no Bairro ${b}`,
      priority: '0.7'
    });
  });

  // 3. Add Popular/Vila neighborhoods (Curitiba)
  POPULAR_BAIRROS.forEach(b => {
    routes.push({
      path: `contabilidade-em/curitiba/bairro-${slugify(b)}`,
      title: `Contadores e Serviços Contábeis na Região de ${b}, Curitiba | DSM`,
      description: `Seu negócio na região de ${b} merece um contador dedicado! DSM Contabilidade alia tecnologia e atendimento humanizado para apuração fiscal no ${b}.`,
      keywords: `contabilidade ${b.toLowerCase()}, abrir empresa ${b.toLowerCase()} curitiba, assessoria fiscal ${b.toLowerCase()}`,
      bodyTitle: `Suporte Contábil e Registro de CNPJ em ${b}`,
      priority: '0.6'
    });
  });

  // 4. Add Metropolitan Cities
  METRO_CITIES.forEach(c => {
    routes.push({
      path: `contabilidade-em/regiao-metropolitana/${slugify(c)}`,
      title: `Escritório de Contabilidade em ${c} — RMC Paraná | DSM Contabilidade`,
      description: `Atendimento contábil completo e regularização tributária para microempresas localizadas em ${c}, Paraná. Abrimos seu CNPJ sem burocracia excessiva!`,
      keywords: `contabilidade ${c.toLowerCase()}, escritorio de contabilidade em ${c.toLowerCase()}, abrir empresa em ${c.toLowerCase()}, contador ${c.toLowerCase()}`,
      bodyTitle: `Serviços Contábeis Premium e Consultoria em ${c}`,
      priority: '0.7'
    });
  });

  // 5. Add Southern States
  TARGET_STATES.forEach(st => {
    routes.push({
      path: `contabilidade-em/estados/${slugify(st.name)}`,
      title: `Contabilidade Consultiva no Estado de ${st.name} | DSM Contabilidade`,
      description: `Parceria contábil, auditoria e assessoria empresarial para estabelecimentos em ${st.name}. Destacamo-nos pela experiência e ${st.desc}.`,
      keywords: `contabilidade ${st.name.toLowerCase()}, contabilidade ${st.code.toLowerCase()}, abrir empresa ${st.name.toLowerCase()}`,
      bodyTitle: `Planejamento Fiscal e Suporte Contábil no Estado de ${st.name}`,
      priority: '0.8'
    });
  });

  // Pre-render pages loop
  routes.forEach(route => {
    const routeDirPath = path.join(distPath, route.path);
    if (route.path !== '') {
      fs.mkdirSync(routeDirPath, { recursive: true });
    }

    const outputFilePath = path.join(routeDirPath, 'index.html');
    const canonicalUrl = `https://www.dsmcontabilidade.digital/${route.path}`;

    // Schema LocalBusiness DSM
    const schemaIdentity = {
      "@context": "https://schema.org",
      "@type": "AccountingService",
      "name": "DSM Contabilidade",
      "image": "https://xyxpexbankcbwidpobzb.supabase.co/storage/v1/object/public/assets/sites/89f806ee-d5a5-4d80-a00f-0e93b7f72c72/1769611656134-3hvsbk.jfif",
      "@id": "https://www.dsmcontabilidade.digital/#identity",
      "url": "https://www.dsmcontabilidade.digital",
      "telephone": "+55-41-99143-0464",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "R. Dep. Atílio de Almeida Barbosa, 76, Bacacheri",
        "addressLocality": "Curitiba",
        "addressRegion": "PR",
        "postalCode": "82560-460",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -25.4024,
        "longitude": -49.2312
      },
      "sameAs": [
        "https://www.instagram.com/davysantosmorais/",
        "https://www.linkedin.com/company/dsm-contabilidade/"
      ]
    };

    // Custom Webpage schemas
    const schemaPageDetails = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": route.title,
      "description": route.description,
      "url": canonicalUrl
    };

    const seoImage = 'https://img.dsmcontabilidade.digital/cartao-contador.png';

    // Compile customized head insertions
    const customHead = `
  <title>${route.title}</title>
  <meta name="description" content="${route.description}" />
  <meta name="keywords" content="${route.keywords}" />
  <link rel="canonical" href="${canonicalUrl}" />
  
  <!-- RealFaviconGenerator standard icons -->
  <link rel="icon" type="image/png" href="https://contadoremcuritiba.dsmcontabilidade.digital/assets/images/dsm-contabilidade-bacacheri-em-curitiba-96x96.png" sizes="96x96" />
  <link rel="apple-touch-icon" href="https://contadoremcuritiba.dsmcontabilidade.digital/assets/images/dsm-contabilidade-bacacheri-em-curitiba-96x96.png" />
  <link rel="shortcut icon" href="https://contadoremcuritiba.dsmcontabilidade.digital/assets/images/dsm-contabilidade-bacacheri-em-curitiba-96x96.png" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${route.title}" />
  <meta property="og:description" content="${route.description}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="DSM Contabilidade" />
  <meta property="og:image" content="${seoImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${route.title}" />
  <meta name="twitter:description" content="${route.description}" />
  <meta name="twitter:image" content="${seoImage}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="preconnect" href="https://api.whatsapp.com" />
  <script type="application/ld+json">${JSON.stringify(schemaIdentity)}</script>
  <script type="application/ld+json">${JSON.stringify(schemaPageDetails)}</script>
`;

    const internalDetails = route.path === 'abrir-empresa' ? `
      <h2>O que ter em mãos na primeira conversa</h2>
      <p>Descreva a atividade, a cidade e o endereço pretendido. Informe se haverá sócios ou empregados. Não envie documentos pessoais no primeiro contato.</p>
      <p>Em Curitiba, veja quando se aplica a <a href="https://servicos.curitiba.pr.gov.br/consulta-previa-de-viabilidade-cpv-online/199">Consulta Prévia de Viabilidade</a>.</p>
      <h2>Formalização do MEI e serviços contábeis</h2>
      <p>Quem se enquadra pode se formalizar gratuitamente no <a href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei">Portal do Empreendedor</a>. Isso é diferente de contratar assessoria contábil. Para os atos aplicáveis no Paraná, consulte a <a href="https://www.juntacomercial.pr.gov.br/Pagina/Tabela-de-precos">tabela da Junta Comercial</a>.</p>
      <h2>Qual o prazo para abrir a empresa?</h2>
      <p>O prazo varia conforme o tipo de empresa, a documentação e a análise dos órgãos envolvidos. Converse com a DSM sobre a sua situação.</p>
      ` : route.path === 'contato' ? `
      <h2>Telefone, e-mail e como chegar</h2>
      <p><a href="tel:+5541991430464">(41) 99143-0464</a> · <a href="mailto:davysantosmorais@hotmail.com">davysantosmorais@hotmail.com</a></p>
      <p>Edifício Marsala. Rua Deputado Atílio de Almeida Barbosa, 76, Bacacheri, Curitiba – PR. Segunda a sexta, das 8h30 às 18h.</p>
      ` : '';
    // Static body to put inside <div id="root"> so bots see content on Ctrl+U
    const staticBodyText = route.path === '' ? `
    <main id="root-static" style="color:#12234a;background:#f7faff;padding:clamp(1.25rem,5vw,5rem);font-family:system-ui,sans-serif;line-height:1.6">
      <p>Bacacheri · Curitiba</p>
      <h1 style="font-size:clamp(2rem,5.2vw,4.35rem);line-height:1.05;max-width:14ch">${route.bodyTitle}</h1>
      <p>Vai abrir um CNPJ, trocar de contador ou organizar os tributos e a folha? Fale direto com Davy Santos Morais e entenda o próximo passo para o seu negócio.</p>
      <p><a href="https://api.whatsapp.com/send?phone=5541991430464">Falar no WhatsApp</a> · <a href="tel:+5541991430464">(41) 99143-0464</a></p>
      <section>
        <h2>O que você precisa resolver?</h2>
        <ul>
          <li><a href="/abrir-empresa">Abertura de empresas</a>: saiba quais informações reunir antes de formalizar o negócio.</li>
          <li><a href="/contato">Contabilidade mensal</a>: organize documentos e entregas, ou converse sobre trocar de contador.</li>
          <li><a href="/contato">Consultoria fiscal</a>: esclareça dúvidas sobre tributos, enquadramento e obrigações.</li>
          <li><a href="/contato">Departamento pessoal e folha</a>: organize admissões, férias e informações da equipe.</li>
        </ul>
      </section>
      <section>
        <h2>Escritório de contabilidade no Bacacheri</h2>
        <p>Rua Deputado Atílio de Almeida Barbosa, 76, Bacacheri, Curitiba – PR.</p>
        <p>Consulte o atendimento em <a href="/contabilidade-em/curitiba/bairro-bacacheri">Bacacheri</a>, <a href="/contabilidade-em/curitiba/bairro-agua-verde">Água Verde</a>, <a href="/contabilidade-em/curitiba/bairro-batel">Batel</a> ou confira o <a href="/mapa-do-site">mapa do site</a>.</p>
      </section>
      <section>
        <h2>Dúvidas frequentes</h2>
        <h3>O que eu preciso informar no primeiro contato?</h3>
        <p>Conte qual é a atividade, em que cidade pretende atuar e se já tem CNPJ. Não precisa anexar documentos pessoais nesse primeiro contato.</p>
        <h3>Quanto custa abrir uma empresa em Curitiba?</h3>
        <p>O orçamento depende das atividades, do tipo de empresa e das etapas necessárias. Peça a discriminação de honorários e eventuais taxas de registro antes de decidir.</p>
      </section>
    </main>
    ` : `
    <div id="root-static" style="background-color: #f8fafc; color: #0f172a; font-family: sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
      <header style="border-bottom: 2px solid #0b3fa3; padding-bottom: 20px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 24px; font-weight: bold; color: #0f172a;">DSM Contabilidade</span>
        <span style="font-size: 14px; color: #0b3fa3; font-weight: bold;">Desde 1982</span>
      </header>
      
      <main>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h1 style="color: #0d1e3d; font-size: 32px; margin-top: 0; margin-bottom: 15px;">${route.bodyTitle}</h1>
          <p style="font-size: 16px; color: #334155; margin-bottom: 25px;">${route.description}</p>
          <a href="https://api.whatsapp.com/send?phone=5541991430464" style="background-color: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Falar com o Contador no WhatsApp: (41) 99143-0464</a>
        </div>
        
        ${internalDetails || `<h2>Zelo, Credibilidade e Experiência</h2>
        <p>A DSM Contabilidade se destaca em Curitiba e Região Metropolitana pelo atendimento humanizado de contador exclusivo, planejamento tributário protetivo e suporte total para constituição e regularização de empresas de todos os portes.</p>`}
        
        <h3>Contato & Sede Física</h3>
        <p>Visite-nos no Condomínio do Edifício Marsala, R. Dep. Atílio de Almeida Barbosa, 76 - CEP 82560-460 - Bairro Bacacheri / Boa Vista, Curitiba - PR. Telefone Comercial: (41) 99143-0464.</p>
      </main>

      <footer style="margin-top: 50px; border-t: 1px solid #1e293b; padding-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
        <p>© DSM Contabilidade — Todos os direitos reservados. Desenvolvido por Suprema Sites Express.</p>
      </footer>
    </div>
    `;

    // Inject head before </head>, inject static body instead of <div id="root"></div> (React mounts and swaps it dynamically in client)
    let finalHtml = templateHtml;
    
    // Remove original title if present so it doesn't double
    finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/, '');
    
    // Swap Head
    finalHtml = finalHtml.replace('</head>', `${customHead}\n</head>`);
    
    // Swap Root Div with our offline pre-rendered version so that bots see content instantly
    finalHtml = finalHtml.replace('<div id="root"></div>', `<div id="root">${staticBodyText}</div>`);

    // Write file
    fs.writeFileSync(outputFilePath, finalHtml, 'utf8');
  });

  console.log(`✅ Sucesso! ${routes.length} Páginas Pré-renderizadas Estaticamente.`);

  // ----------------------------------------------------
  // SITEMAP COMPILING SECTION
  // ----------------------------------------------------
  console.log("⚙️ Geração dinâmica do sitemap.xml...");
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach(route => {
    const loc = `https://www.dsmcontabilidade.digital/${route.path}`;
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${loc}</loc>\n`;
    sitemapXml += `    <changefreq>weekly</changefreq>\n`;
    sitemapXml += `    <priority>${route.priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
  });

  sitemapXml += `</urlset>\n`;

  const sitemapOutputPath = path.join(distPath, 'sitemap.xml');
  fs.writeFileSync(sitemapOutputPath, sitemapXml, 'utf8');
  console.log(`✅ sitemap.xml compilado com sucesso com ${routes.length} URLs!`);

  // ----------------------------------------------------
  // NETLIFY REDIRECTS GENERATION
  // ----------------------------------------------------
  console.log("⚙️ Criando arquivo _redirects para hospedagem Netlify...");
  const redirectsContent = `/*    /index.html   200\n`;
  const redirectsOutputPath = path.join(distPath, '_redirects');
  fs.writeFileSync(redirectsOutputPath, redirectsContent, 'utf8');
  console.log("✅ Arquivo _redirects criado com sucesso!");
}

runPrerender().catch(err => {
  console.error("❌ Ocorreu um erro no pipeline de pré-renderização:", err);
  process.exit(1);
});
