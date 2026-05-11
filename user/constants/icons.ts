import {
  faAddressCard,
  faTriangleExclamation,
  faEyeSlash,
  faEye,
  faLock,
  faUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Colors } from './theme';

export const Icons = {
  addressCard: faAddressCard,
  triangleExclamation: faTriangleExclamation,
  eyeSlash: faEyeSlash,
  eye: faEye,
  lock: faLock,
  user: faUser,
  phone: faPhone,
};

export const IconColors = {
  addressCard: { light: Colors.light.primary, dark: Colors.dark.primary },
  triangleExclamation: { light: Colors.light.ditolak, dark: Colors.dark.ditolak },
  eyeSlash: { light: Colors.light.textSecondary, dark: Colors.dark.textSecondary },
  eye: { light: Colors.light.textSecondary, dark: Colors.dark.textSecondary },
  lock: { light: Colors.light.primary, dark: Colors.dark.primary },
  user: { light: Colors.light.primary, dark: Colors.dark.primary },
  phone: { light: Colors.light.primary, dark: Colors.dark.primary },
};

export function getIconColor(
  iconKey: keyof typeof Icons,
  scheme: 'light' | 'dark'
): string {
  return IconColors[iconKey][scheme];
}
