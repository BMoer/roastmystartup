import type { ComponentType } from 'react';
import type { PersonaId } from '@/types';
import AvatarFranky from './AvatarFranky';
import AvatarPflichtner from './AvatarPflichtner';
import AvatarSabine from './AvatarSabine';
import AvatarFlorian from './AvatarFlorian';
import AvatarRenate from './AvatarRenate';
import AvatarChad from './AvatarChad';

interface AvatarProps {
  size?: number;
  className?: string;
}

export const AVATAR_MAP: Record<PersonaId, ComponentType<AvatarProps>> = {
  franky: AvatarFranky,
  pflichtner: AvatarPflichtner,
  sabine: AvatarSabine,
  florian: AvatarFlorian,
  renate: AvatarRenate,
  chad: AvatarChad,
};
