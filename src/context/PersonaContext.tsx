'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { PersonaMode, RoastData } from '@/types';

interface PersonaContextValue {
  mode: PersonaMode;
  setMode: (mode: PersonaMode) => void;
  roastData: RoastData | null;
  setRoastData: (data: RoastData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

const STORAGE_KEY = 'roast-persona-mode';

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PersonaMode>('');
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Restore mode from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'vc' || stored === 'beamter') {
      setModeState(stored);
    }
  }, []);

  // Sync mode to body data attribute + localStorage
  useEffect(() => {
    if (mode) {
      document.body.dataset.annotationMode = mode;
    } else {
      delete document.body.dataset.annotationMode;
    }
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((newMode: PersonaMode) => {
    setModeState(newMode);
  }, []);

  return (
    <PersonaContext.Provider value={{ mode, setMode, roastData, setRoastData, isLoading, setIsLoading }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}
