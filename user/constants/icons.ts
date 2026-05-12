import {
  faAddressCard,
  faTriangleExclamation,
  faEyeSlash,
  faEye,
  faLock,
  faUser,
  faPhone,
  faHouse,
  faList,
  faSagittarius,
  faMagnifyingGlass,
  faFlag,
  faNoteSticky,
  faCircleInfo,
  faBell,
  faFaceSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "./theme";

export const Icons = {
  addressCard: faAddressCard,
  triangleExclamation: faTriangleExclamation,
  eyeSlash: faEyeSlash,
  eye: faEye,
  lock: faLock,
  user: faUser,
  phone: faPhone,
  home: faHouse,
  service: faList,
  status: faSagittarius,
  magnifyingGlass: faMagnifyingGlass,
  flag: faFlag,
  note: faNoteSticky,
  info: faCircleInfo,
  bell: faBell,
  smile: faFaceSmileBeam,
};

export const IconColors = {
  addressCard: { light: Colors.light.primary, dark: Colors.dark.primary },
  triangleExclamation: {
    light: Colors.light.ditolak,
    dark: Colors.dark.ditolak,
  },
  eyeSlash: {
    light: Colors.light.textSecondary,
    dark: Colors.dark.textSecondary,
  },
  eye: { light: Colors.light.textSecondary, dark: Colors.dark.textSecondary },
  lock: { light: Colors.light.primary, dark: Colors.dark.primary },
  user: { light: Colors.light.primary, dark: Colors.dark.primary },
  phone: { light: Colors.light.primary, dark: Colors.dark.primary },
  home: { light: Colors.light.primary, dark: Colors.dark.primary },
  service: { light: Colors.light.primary, dark: Colors.dark.primary },
  status: { light: Colors.light.primary, dark: Colors.dark.primary },
  magnifyingGlass: { light: Colors.light.primary, dark: Colors.dark.primary },
  flag: { light: Colors.light.primary, dark: Colors.dark.primary },
  note: { light: Colors.light.primary, dark: Colors.dark.primary },
  info: { light: Colors.light.primary, dark: Colors.dark.primary },
  bell: { light: Colors.light.primary, dark: Colors.dark.primary },
  face: { light: Colors.light.primary, dark: Colors.dark.primary },
};

export function getIconColor(
  iconKey: keyof typeof Icons,
  scheme: "light" | "dark",
): string {
  return IconColors[iconKey][scheme];
}
