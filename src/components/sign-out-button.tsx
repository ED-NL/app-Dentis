import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

type SignOutButtonProps = {
  compact?: boolean;
};

export function SignOutButton({ compact = false }: SignOutButtonProps) {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Cerrar sesión"
      onPress={signOut}
      style={({ pressed }) => [styles.button, compact && styles.compact, pressed && styles.pressed]}>
      <Ionicons name="log-out-outline" size={18} color="#e5484d" />
      <Text style={styles.label}>Cerrar sesión</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#E2E7EA',
    borderWidth: 1,
    borderColor: 'rgba(229,72,77,0.4)',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
  },
  compact: {
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  label: {
    color: '#e5484d',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
