/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LocationInfo {
  id: string;
  name: string;
  slug: string;
  type: 'bairro_oficial' | 'bairro_popular' | 'cidade_metropolitana' | 'estado';
  description: string;
  keywords: string[];
  lat: number; // Approximate coordinates relative to Curitiba for distance calculations
  lng: number;
  distanceFromDSM: number; // in km from Bacacheri (where DSM is located)
}

// 75 Bairros Oficiais de Curitiba (IPPUC)
export const OFFICIAL_BAIRROS: string[] = [
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

// Bairros NÃO oficiais / populares / subdivisões comumente buscados
export const POPULAR_BAIRROS: string[] = [
  "Vila Sandra", "CIC Central", "Neoville", "Vitória Régia", "Caiuá",
  "Sabará", "Vila Verde", "Nossa Senhora da Luz", "Barigui", "Conquista",
  "Augusta (região)", "Riviera (região)", "São Miguel (região)", "Gabineto", "Itatiaia",
  "Santa Helena", "Atenas", "Osvaldo Cruz", "Vila Pantanal", "Vila Torres",
  "Vila das Torres", "Vila Parolin", "Vila Hauer", "Vila Guaíra", "Vila Oficinas",
  "Vila Osternack", "Vila São Pedro", "Vila Audi", "Pinheirinho Velho", "Portão Velho",
  "Capão Raso Velho", "Sítio Cercado Velho", "Jardim Gabineto", "Jardim Itatiaia", "Jardim Kosmos",
  "Jardim da Ordem", "Jardim Alvorada"
];

// Cidades da Região Metropolitana de Curitiba
export interface MetroCityInfo {
  name: string;
  distance: number; // em km do Bacacheri
  travelTimeMin: number; // tempo médio em minutos
  lat: number;
  lng: number;
}

export const METRO_CITIES: MetroCityInfo[] = [
  { name: "São José dos Pinhais", distance: 18.5, travelTimeMin: 22, lat: -25.5348, lng: -49.2069 },
  { name: "Pinhais", distance: 7.2, travelTimeMin: 12, lat: -25.4322, lng: -49.1915 },
  { name: "Colombo", distance: 13.5, travelTimeMin: 18, lat: -25.2923, lng: -49.2248 },
  { name: "Araucária", distance: 31.0, travelTimeMin: 38, lat: -25.5901, lng: -49.4093 },
  { name: "Almirante Tamandaré", distance: 16.0, travelTimeMin: 24, lat: -25.3444, lng: -49.3039 },
  { name: "Campo Largo", distance: 34.2, travelTimeMin: 36, lat: -25.4594, lng: -49.5273 },
  { name: "Campo Magro", distance: 22.8, travelTimeMin: 32, lat: -25.3703, lng: -49.4441 },
  { name: "Fazenda Rio Grande", distance: 31.5, travelTimeMin: 35, lat: -25.6601, lng: -49.3001 },
  { name: "Quatro Barras", distance: 20.3, travelTimeMin: 21, lat: -25.3672, lng: -49.0718 },
  { name: "Campina Grande do Sul", distance: 24.1, travelTimeMin: 24, lat: -25.3056, lng: -49.0736 },
  { name: "Mandirituba", distance: 48.0, travelTimeMin: 49, lat: -25.7797, lng: -49.3245 },
  { name: "Balsa Nova", distance: 54.1, travelTimeMin: 50, lat: -25.5841, lng: -49.6358 },
  { name: "Rio Branco do Sul", distance: 33.5, travelTimeMin: 40, lat: -25.1914, lng: -49.3134 },
  { name: "Itaperuçu", distance: 35.8, travelTimeMin: 42, lat: -25.2198, lng: -49.3496 },
  { name: "Tijucas do Sul", distance: 68.2, travelTimeMin: 58, lat: -25.9286, lng: -49.1951 }
];

// Estados de Foco de Atendimento
export const TARGET_STATES = [
  { name: "Paraná", code: "PR", des: "atendimento completo em todo o estado do Paraná com abertura rápida e simplificada de filiais e matrizes corporativas." },
  { name: "Santa Catarina", code: "SC", des: "suporte contábil consultivo e planejamento tributário estratégico para empresas catarinenses." },
  { name: "Rio Grande do Sul", code: "RS", des: "parceria de negócios, contabilidade ágil e suporte de tributos para empresas gaúchas." }
];

// Coordenadas da DSM no Bacacheri, Curitiba
export const DSM_COORDS = { lat: -25.4024, lng: -49.2312 }; // Bacacheri, Curitiba

// Helper to generate a URL slug
export function slugify(text: string): string {
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

// Generate the master complete list of locations
export function getAllLocations(): LocationInfo[] {
  const list: LocationInfo[] = [];

  // Add DSM Base Location First (Bacacheri / Curitiba Center)
  list.push({
    id: 'curitiba-sede',
    name: "Curitiba (Sede - Bacacheri)",
    slug: "curitiba",
    type: 'bairro_oficial',
    description: "DSM Contabilidade se destaca pelo atendimento humanizado, experiência no mercado curitibano e soluções completas para empresas de todos os portes. Sede no Bacacheri, Curitiba - PR.",
    keywords: ["contabilidade curitiba", "escritorio de contabilidade bacacheri", "contador curitiba", "abrir empresa curitiba", "legalizacao de empresas PR"],
    lat: DSM_COORDS.lat,
    lng: DSM_COORDS.lng,
    distanceFromDSM: 0
  });

  // 1. Add Official Bairros
  OFFICIAL_BAIRROS.forEach(b => {
    if (b.toLowerCase() === 'bacacheri') {
      // already represented as headquarter or let's keep bacacheri specifically
    }
    const slug = `curitiba/bairro-${slugify(b)}`;
    
    // Simulate coordinates spread around Curitiba Core
    const idx = b.charCodeAt(0) + b.charCodeAt(b.length - 1);
    const offsetLat = ((idx % 20) - 10) * 0.012;
    const offsetLng = (((idx * 3) % 20) - 10) * 0.012;
    const lat = DSM_COORDS.lat + offsetLat;
    const lng = DSM_COORDS.lng + offsetLng;
    const dist = Math.sqrt(Math.pow(offsetLat * 111, 2) + Math.pow(offsetLng * 96, 2));

    list.push({
      id: `b_of_${slugify(b)}`,
      name: b,
      slug: slug,
      type: 'bairro_oficial',
      description: `Procurando escritório de contabilidade no bairro ${b} em Curitiba? A DSM Contabilidade oferece contador exclusivo, atendimento consultivo moderno e processos ágeis de abertura de empresa sem burocracia para quem está no ${b}.`,
      keywords: [
        `contabilidade ${b.toLowerCase()}`,
        `escritorio contabilidade ${b.toLowerCase()} curitiba`,
        `abrir empresa ${b.toLowerCase()}`,
        `contador exclusivo ${b.toLowerCase()}`,
        `contabilidade b2b curitiba`
      ],
      lat,
      lng,
      distanceFromDSM: Math.round(dist * 10) / 10
    });
  });

  // 2. Add Popular/Informal Bairros
  POPULAR_BAIRROS.forEach(b => {
    const slug = `curitiba/bairro-${slugify(b)}`;
    
    const idx = b.charCodeAt(0) * 2 + b.charCodeAt(b.length - 1);
    const offsetLat = ((idx % 22) - 11) * 0.013;
    const offsetLng = (((idx * 7) % 22) - 11) * 0.013;
    const lat = DSM_COORDS.lat + offsetLat;
    const lng = DSM_COORDS.lng + offsetLng;
    const dist = Math.sqrt(Math.pow(offsetLat * 111, 2) + Math.pow(offsetLng * 96, 2));

    list.push({
      id: `b_pop_${slugify(b)}`,
      name: b,
      slug: slug,
      type: 'bairro_popular',
      description: `Atendimento contábil exclusivo no bairro ou região popular de ${b} em Curitiba. A DSM Contabilidade alia tecnologia e atendimento humanizado para facilitar a apuração tributária e a abertura de sua empresa no ${b}.`,
      keywords: [
        `contabilidade ${b.toLowerCase()}`,
        `abrir empresa ${b.toLowerCase()} curitiba`,
        `contador no ${b.toLowerCase()}`,
        `servicos contabeis no ${b.toLowerCase()} curitiba`
      ],
      lat,
      lng,
      distanceFromDSM: Math.round(dist * 10) / 10
    });
  });

  // 3. Add Metropolitan Cities
  METRO_CITIES.forEach(c => {
    const slug = `regiao-metropolitana/${slugify(c.name)}`;
    list.push({
      id: `city_${slugify(c.name)}`,
      name: c.name,
      slug: slug,
      type: 'cidade_metropolitana',
      description: `Buscando escritório de contabilidade para sua empresa em ${c.name}, na Região Metropolitana de Curitiba? Atendimento digital ou presencial humanizado pela DSM Contabilidade, desde a abertura rápida ao suporte de folha e impostos.`,
      keywords: [
        `contabilidade ${c.name.toLowerCase()}`,
        `escritorio de contabilidade em ${c.name.toLowerCase()}`,
        `abrir empresa em ${c.name.toLowerCase()}`,
        `contador especializado ${c.name.toLowerCase()}`,
        `abertura de MEI ${c.name.toLowerCase()}`
      ],
      lat: c.lat,
      lng: c.lng,
      distanceFromDSM: c.distance
    });
  });

  // 4. Add Southern States
  TARGET_STATES.forEach(st => {
    const slug = `estados/${slugify(st.name)}`;
    list.push({
      id: `state_${slugify(st.name)}`,
      name: `${st.name} (${st.code})`,
      slug: slug,
      type: 'estado',
      description: `Contabilidade consultiva e digital para empresas no estado de ${st.name}. A DSM Contabilidade destaca-se pela experiência de mercado e ${st.des}`,
      keywords: [
        `contabilidade ${st.name.toLowerCase()}`,
        `abrir empresa em ${st.name.toLowerCase()}`,
        `abertura de empresa facil ${st.code}`,
        `assessoria fiscal ${st.name.toLowerCase()}`,
        `consultor contabil no ${st.name.toLowerCase()}`
      ],
      lat: DSM_COORDS.lat + (st.code === 'SC' ? -1.5 : st.code === 'RS' ? -3.5 : 0),
      lng: DSM_COORDS.lng + (st.code === 'SC' ? -0.5 : st.code === 'RS' ? -1.8 : 0),
      distanceFromDSM: st.code === 'PR' ? 5 : st.code === 'SC' ? 170 : 540
    });
  });

  return list;
}

// Map of locations cached for instant lookup
const locationsCache = getAllLocations();

export function getLocationBySlug(slug: string): LocationInfo | undefined {
  // Normalize slug and remove accents to guarantee matching (e.g. água-verde matches agua-verde)
  const normalizeSlug = (s: string) => 
    s.replace(/^\/+/, '')
     .replace(/\/+$/, '')
     .toLowerCase()
     .normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "");

  const cleanSlug = normalizeSlug(slug);
  
  // Try exact match first
  let found = locationsCache.find(l => normalizeSlug(l.slug) === cleanSlug);
  
  // If not found directly, perform a partial fallback matches (e.g. "curitiba/bairro-batel" matching just "batel" or ending in "batel")
  if (!found) {
    const parts = cleanSlug.split('/');
    const lastPart = parts[parts.length - 1].replace(/^bairro-/, '');
    found = locationsCache.find(l => {
      const lSlugNorm = normalizeSlug(l.slug);
      return lSlugNorm === lastPart || 
             lSlugNorm.endsWith(`/${lastPart}`) || 
             lSlugNorm.endsWith(`-${lastPart}`);
    });
  }
  
  return found;
}
