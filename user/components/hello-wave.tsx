import Animated from "react-native-reanimated";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Icons } from '@/constants/icons';

export function HelloWave() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <Animated.View
      style={{
        marginTop: -6,
        animationName: {
          "50%": { transform: [{ rotate: "25deg" }] },
        },
        animationIterationCount: 4,
        animationDuration: "300ms",
      }}
    >
      <FontAwesomeIcon icon={Icons.hand} size={28} color={c.text} />
    </Animated.View>
  );
}
