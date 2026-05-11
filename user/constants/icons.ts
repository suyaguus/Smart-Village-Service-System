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
  addressCard: { icon: faAddressCard, color: Colors.light.primary, colorDark: Colors.dark.primary },
  triangleExclamation: { icon: faTriangleExclamation, color: Colors.light.ditolak, colorDark: Colors.dark.ditolak },
  eyeSlash: { icon: faEyeSlash, color: Colors.light.textSecondary, colorDark: Colors.dark.textSecondary },
  eye: { icon: faEye, color: Colors.light.textSecondary, colorDark: Colors.dark.textSecondary },
  lock: { icon: faLock, color: Colors.light.primary, colorDark: Colors.dark.primary },
  user: { icon: faUser, color: Colors.light.primary, colorDark: Colors.dark.primary },
  phone: { icon: faPhone, color: Colors.light.primary, colorDark: Colors.dark.primary },
};
