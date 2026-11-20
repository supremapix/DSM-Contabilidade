/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Truck, Bus, Locate, Phone, Clock, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { METRO_CITIES, DSM_COORDS, LocationInfo } from '../data/locations';
import EnhancedSEO from './EnhancedSEO';

// Haversine formula to compute great-circle distance in kilometers
function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function TransitCalculator() {
  const [selectedCity, setSelectedCity] = useState(METRO_CITIES[0]);
  const [transportMode, setTransportMode] = useState<'carro' | 'caminhao' | 'onibus'>('carro');
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number, name: string } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [calculatedTime, setCalculatedTime] = useState<number | null>(null);

  // Recalculate distance and time based on variables
  useEffect(() => {
    let rawDistance = selectedCity.distance;
    let baseTime = selectedCity.travelTimeMin;

    if (userLocation) {
      // Calculate real user distance to DSM
      const dist = getHaversineDistance(userLocation.lat, userLocation.lng, DSM_COORDS.lat, DSM_COORDS.lng);
      rawDistance = Math.round(dist * 10) / 10;
      
      // Calculate estimated time based on distance (average speed 60 km/h)
      // Car: 60km/h average in city/metro, Truck: 45km/h, Bus: 35km/h
      let speed = 60;
      if (transportMode === 'caminhao') speed = 45;
      if (transportMode === 'onibus') speed = 30;
      
      baseTime = Math.round((rawDistance / speed) * 60);
    } else {
      // Adjust standard city baseTime based on transport choice
      if (transportMode === 'caminhao') {
        baseTime = Math.round(selectedCity.travelTimeMin * 1.3);
      } else if (transportMode === 'onibus') {
        baseTime = Math.round(selectedCity.travelTimeMin * 1.8 + 10); // add wait times
      }
    }

    setCalculatedDistance(rawDistance);
    setCalculatedTime(Math.round(baseTime * trafficMultiplier));
  }, [selectedCity, transportMode, trafficMultiplier, userLocation]);

  // Request browser location
  const handleRequestGeolocation = () => {
    setGeoLoading(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError("Seu navegador não suporta geolocalização.");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          name: "Sua Localização Atual"
        });
        setGeoLoading(false);
      },
      (error) => {
        console.error("Erro geolocalização:", error);
        let errorMsg = "Não foi possível obter sua localização.";
        if (error.code === 1) errorMsg = "Permissão de localização negada pelo usuário.";
        else if (error.code === 2) errorMsg = "Posição indisponível no momento.";
        else if (error.code === 3) errorMsg = "Tempo de requisição esgotado.";
        
        setGeoError(errorMsg);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleResetLocation = () => {
    setUserLocation(null);
    setGeoError(null);
  };

  const getWhatsAppLink = () => {
    const locName = userLocation ? "minha localização atual" : selectedCity.name;
    const distanceText = calculatedDistance ? `${calculatedDistance} km` : '';
    const modeText = transportMode === 'carro' ? 'Carro' : transportMode === 'caminhao' ? 'Caminhão' : 'Ônibus/Transporte Público';
    const textMsg = `Olá DSM Contabilidade! Acessei a Calculadora Metropolitana. Gostaria de abrir uma empresa/ter suporte contábil. Estou em: ${locName} (referência ilustrativa de ${distanceText}, não é rota calculada). Escolhi transporte de: ${modeText}. Gostaria de um atendimento contábil exclusivo!`;
    return `https://api.whatsapp.com/send?phone=5541991430464&text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div data-dsm-page="deslocamento" className="dsm-tool dsm-transit bg-slate-50 text-slate-800" id="transit-calculator-app">
      <EnhancedSEO 
        title="Calculadora Metropolitana de Deslocamento RMC - DSM Contabilidade"
        description="Simule uma estimativa de deslocamento até a DSM Contabilidade no Bacacheri. Valores ilustrativos, sem trânsito ao vivo; confirme o trajeto em um aplicativo de mapas."
        keywords={["calculadora deslocamento curitiba", "logistica RMC", "transporte Pinhais Curitiba", "distancia Colombo Bacacheri", "abrir empresa regiao metropolitana"]}
      />

      <div className="dsm-wrap dsm-tool-wrap dsm-tool-narrow">
        
        {/* Header Block */}
        <div className="dsm-tool-intro mb-8">
          <span className="bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-full border border-blue-200 text-xs sm:text-sm uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
            <Sparkles size={14} className="text-blue-900" /> Atendimento de Curitiba a Região
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Como chegar à DSM no Bacacheri
          </h1>
          <p className="text-base sm:text-lg text-slate-650 max-w-2xl mx-auto leading-relaxed">
            Estime o deslocamento até o escritório da DSM, em Curitiba. Escolha a origem e o meio de transporte. A estimativa não usa trânsito em tempo real; confirme o trajeto antes de sair.
          </p>
        </div>

        {/* Main Interface Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md">
          
          {/* Controls Column */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Step 1: Destination Selection */}
            <div>
              <span className="text-blue-800 text-xs font-black uppercase tracking-wider block mb-2 font-display">
                Etapa 1: Escolha a Origem do Deslocamento
              </span>
              
              {!userLocation ? (
                <>
                  <label htmlFor="city-select" className="sr-only">Selecione uma Cidade Metropolitana</label>
                  <select
                    id="city-select"
                    value={selectedCity.name}
                    onChange={(e) => {
                      const found = METRO_CITIES.find(c => c.name === e.target.value);
                      if (found) setSelectedCity(found);
                    }}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 text-slate-800 rounded-xl py-3 px-4 text-base sm:text-lg font-bold focus:outline-none shadow-xs cursor-pointer mb-3"
                  >
                    {METRO_CITIES.map((city) => (
                      <option key={city.name} value={city.name} className="bg-white text-slate-800">
                        {city.name} ({city.distance} km)
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-between mb-3 animate-keyframes">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-green-600 animate-bounce" size={20} />
                    <div>
                      <span className="text-green-950 font-extrabold text-sm block">Localização Ativada!</span>
                      <span className="text-xs text-green-700 block mt-0.5">Distância em linha reta até a sede. Não representa o percurso pelas ruas.</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleResetLocation}
                    className="text-xs text-red-650 hover:text-red-800 font-bold hover:underline"
                  >
                    Alterar
                  </button>
                </div>
              )}

              {/* Geolocation Trigger Button */}
              {!userLocation && (
                <button
                  onClick={handleRequestGeolocation}
                  disabled={geoLoading}
                  className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Locate size={16} className={`text-blue-700 ${geoLoading ? 'animate-spin' : ''}`} />
                  <span>{geoLoading ? 'Obtendo GPS...' : 'Estimar distância com minha localização'}</span>
                </button>
              )}

              {geoError && (
                <p className="text-xs text-red-800 mt-2 flex items-center gap-1.5 font-semibold bg-red-50 px-3 py-1.5 rounded border border-red-200">
                  <AlertTriangle size={14} />
                  <span>{geoError}</span>
                </p>
              )}
            </div>

            {/* Step 2: Transport Selection with BIG easy clicks for elderly */}
            <div>
              <span className="text-blue-800 text-xs font-black uppercase tracking-wider block mb-3 font-display">
                Etapa 2: Escolha o Tipo de Transporte
              </span>
              <div className="dsm-transit-modes grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTransportMode('carro')}
                  className={`py-3 px-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    transportMode === 'carro' 
                      ? 'bg-blue-50 border-blue-500 text-blue-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                  }`}
                >
                  <Car size={26} className={transportMode === 'carro' ? 'text-blue-700' : ''} />
                  <span>Carro</span>
                </button>
                
                <button
                  onClick={() => setTransportMode('caminhao')}
                  className={`py-3 px-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    transportMode === 'caminhao' 
                      ? 'bg-orange-50 border-orange-500 text-orange-950' 
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                  }`}
                >
                  <Truck size={26} className={transportMode === 'caminhao' ? 'text-orange-600' : ''} />
                  <span>Carga/MEI</span>
                </button>

                <button
                  onClick={() => setTransportMode('onibus')}
                  className={`py-3 px-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    transportMode === 'onibus' 
                      ? 'bg-cyan-50 border-cyan-500 text-cyan-950' 
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                  }`}
                >
                  <Bus size={26} className={transportMode === 'onibus' ? 'text-cyan-700' : ''} />
                  <span>Ônibus</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-sm">
              <label htmlFor="simulation-delay" className="block font-bold text-slate-800 mb-2">Margem de tempo para simular</label>
              <select id="simulation-delay" value={trafficMultiplier} onChange={e => setTrafficMultiplier(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 bg-white p-3">
                <option value={1}>Sem margem adicional</option>
                <option value={1.2}>Acrescentar 20% de tempo</option>
                <option value={1.45}>Acrescentar 45% de tempo</option>
              </select>
              <p className="mt-3 text-slate-700">Simulação ilustrativa, sem consulta ao trânsito ou às linhas de ônibus. A margem é escolhida por você, não uma medição das condições atuais.</p>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="md:col-span-6 bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-sm font-bold text-slate-550 uppercase tracking-widest font-display">Tempo de Viagem Estimado</span>
                <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></div>
              </div>

              {/* Huge Readability layout for times */}
              <div className="text-center py-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-blue-800 inline-flex items-center justify-center gap-2 mb-1">
                  <Clock size={20} />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Duração aproximada</span>
                </div>
                
                <p className="text-4xl sm:text-5xl font-black text-slate-900 font-display leading-tight">
                  {calculatedTime} <span className="text-xl sm:text-2xl font-normal text-slate-500">minutos</span>
                </p>

                <p className="text-xs text-slate-500 mt-2 px-3">
                  {userLocation ? 'Distância em linha reta:' : 'Distância de referência:'} <strong className="text-slate-900">{calculatedDistance} km</strong>
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-800">
                <h2 className="font-bold mb-2">Antes de sair</h2>
                <p>Os valores por cidade são referências fixas. Com a localização ativada, a distância é em linha reta e o tempo usa velocidades médias hipotéticas: carro 60 km/h, carga 45 km/h e ônibus 30 km/h. Não são considerados ruas, paradas, espera, acessibilidade ou trânsito real.</p>
                <p className="mt-2">Confirme o atendimento com a DSM e consulte o trajeto e a duração em um aplicativo de mapas antes de viajar.</p>
                <a className="inline-block mt-3 font-bold text-blue-800 underline" href="https://www.google.com/maps/dir/?api=1&destination=Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Marsala%20Rua%20Deputado%20At%C3%ADlio%20de%20Almeida%20Barbosa%2076%20Bacacheri%20Curitiba%20PR" target="_blank" rel="noopener noreferrer">Conferir trajeto no Google Maps</a>
              </div>

              {/* Accessibility/Senior Advice Box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-650 space-y-2 shadow-xs">
                <div className="flex gap-2 items-start">
                  <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={16} />
                  <p>
                    <strong>Não precisa sair de casa!</strong> Nós da DSM fazemos todo o processo de abertura de empresa, envio de documentos e folhas online. Você ganha tempo e conforto.
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <Navigation className="text-blue-700 shrink-0 mt-0.5" size={16} />
                  <p>
                    <strong>Sede de fácil acesso:</strong> Use um aplicativo de mapas para confirmar o trajeto. Se preferir reuniões físicas ou consultoria com café, o Edifício Marsala fica no coração do Bacacheri com estacionamento terceirizado na frente.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Call for custom support WhatsApp */}
            <div className="pt-6 mt-6 border-t border-slate-200">
              <a
                id="transit-whatsapp-cta"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-center py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-102 text-base sm:text-lg shadow-lg cursor-pointer animate-keyframes"
              >
                <Phone size={24} className="text-white" />
                <span>Conversar no WhatsApp Gratuitamente</span>
              </a>
              <span className="text-[11px] text-center text-slate-500 block mt-2">
                Exclusividade: Fale diretamente com o contador, sem burocracia ou intermediários.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
