'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Phase, RoastData } from '@/types';

interface PersonaContextValue {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  roastData: RoastData | null;
  setRoastData: (data: RoastData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [phase, setPhaseState] = useState<Phase>('loading');
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync phase to body data attribute for CSS theming
  useEffect(() => {
    document.body.dataset.phase = phase;
    return () => {
      delete document.body.dataset.phase;
    };
  }, [phase]);

  const setPhase = useCallback((newPhase: Phase) => {
    setPhaseState(newPhase);
  }, []);

  return (
    <PersonaContext.Provider value={{ phase, setPhase, roastData, setRoastData, isLoading, setIsLoading }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}
