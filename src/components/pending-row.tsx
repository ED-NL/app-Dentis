import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';

export const STATUS_COLORS: Record<Appointment['status'], string> = {
  Pendiente: '#e0a800',
  Confirmada: '#3c87f7',
  Completada: '#2e9e5b',
  Cancelada: '#9a9aa0',
};

type PendingRowProps = {
  appointment: Appointment;
  onPress: () => void;
};

export function PendingRow({ appointment, onPress }: PendingRowProps) {
  const borderColor = STATUS_COLORS[appointment.status];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.dateBadge, { borderColor }]}>
        <Text style={styles.day}>{appointment.date.split('-')[2]}</Text>
        <Text style={styles.month}>{appointment.date.split('-')[1]}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.reason}>{appointment.reason}</Text>
        <Text style={styles.meta}>
          {appointment.time} · {appointment.dentist}
        </Text>
        <Text style={styles.meta}>{appointment.specialty}</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#4B5153" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  dateBadge: {
    width: 46,
    height: 46,
    borderRadius: Spacing.two,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  day: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 20,
  },
  month: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5153',
  },
  info: {
    flex: 1,
    gap: 1,
  },
  reason: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  meta: {
    fontSize: 12,
    color: '#000000',
  },
  pressed: {
    opacity: 0.7,
  },
});
