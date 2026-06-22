import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    pc: 'https://img.dsmcontabilidade.digital/dsm-slider.png',
    mobile: 'https://img.dsmcontabilidade.digital/slider-dsm-movel.png',
    alt: 'DSM Contabilidade Slider 1'
  },
  {
    id: 2,
    pc: 'https://img.dsmcontabilidade.digital/slider-2.png',
    mobile: 'https://img.dsmcontabilidade.digital/slider-dsm-movel-pr.png',
    alt: 'DSM Contabilidade Slider 2'
  }
];

export default function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoplay) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000); // cycle every 6 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Drag handlers or touch swipes via framer-motion props
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Motion variants for slide transition
  const sliderVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.02
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };

  return (
    <div 
      id="home-image-slider"
      className="relative w-full overflow-hidden bg-slate-100 border-b border-slate-200"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Aspect Ratio Sized Layout Container for absolute responsiveness - perfect fit on mobile */}
      <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] lg:h-[560px] xl:h-[620px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
          >
            {/* Desktop Slide (Visible on medium upwards) */}
            <img
              src={SLIDES[currentIndex].pc}
              alt={SLIDES[currentIndex].alt}
              className="hidden md:block w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Mobile Slide (Visible on mobile) */}
            <img
              src={SLIDES[currentIndex].mobile}
              alt={SLIDES[currentIndex].alt}
              className="block md:hidden w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6 z-10 pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/75 border border-white/10 flex items-center justify-center text-white transition-all scale-100 hover:scale-105 active:scale-95 shadow-md group cursor-pointer"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/75 border border-white/10 flex items-center justify-center text-white transition-all scale-100 hover:scale-105 active:scale-95 shadow-md group cursor-pointer"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Bottom Panel: Indicators and Auto-Play indicator */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-center gap-4 z-10">
          {/* Autoplay status button */}
          <button
            onClick={() => setIsAutoplay(prev => !prev)}
            className="w-7 h-7 rounded-full bg-slate-900/40 hover:bg-slate-900/75 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer text-xs"
            title={isAutoplay ? "Pausar rotação automática" : "Iniciar rotação automática"}
          >
            {isAutoplay ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5 bg-slate-900/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleSelect(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-7 h-2 bg-blue-500' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
