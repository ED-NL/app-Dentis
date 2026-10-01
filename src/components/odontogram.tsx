import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { DentalChart, ToothCondition } from '@/constants/mockPatient';

const TOOTH_COLORS: Record<ToothCondition, string> = {
  sano: '#E9EEEE',
  obturado: '#3C87F7',
  endodoncado: '#2E9E5B',
  corona: '#E0A800',
  sellante: '#4EC0C8',
  implante: '#8A63D2',
  ausente: '#6B7280',
  pendiente: '#E5484D',
};

const TOOTH_LABELS: Record<ToothCondition, string> = {
  sano: 'Sano',
  obturado: 'Obturado',
  endodoncado: 'Endodoncado',
  corona: 'Corona',
  sellante: 'Sellante',
  implante: 'Implante',
  ausente: 'Ausente',
  pendiente: 'Pendiente',
};

const UPPER_TEETH = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

function isPrimaryTooth(tooth: number) {
  return String(tooth).startsWith('5');
}

function ToothShape({ tooth, condition }: { tooth: number; condition: ToothCondition }) {
  const color = TOOTH_COLORS[condition];
  const isAbsent = condition === 'ausente';

  return (
    <View style={styles.toothCell}>
      <View
        style={[
          styles.tooth,
          isPrimaryTooth(tooth) && styles.toothPrimary,
          { backgroundColor: isAbsent ? 'transparent' : color, borderColor: color },
        ]}>
        <Text style={[styles.toothNumber, { color: isAbsent ? color : '#FFFFFF' }]}>
          {isAbsent ? '—' : tooth}
        </Text>
        {condition === 'pendiente' && <View style={styles.pendingDot} />}
      </View>
    </View>
  );
}

export function Odontogram({ chart }: { chart: DentalChart }) {
  const renderArch = (teeth: number[]) => (
    <View style={styles.arch}>
      {teeth.map((tooth) => (
        <ToothShape key={tooth} tooth={tooth} condition={chart[tooth] ?? 'sano'} />
      ))}
    </View>
  );

  const usedConditions = Array.from(
    new Set(Object.values(chart).filter((c): c is ToothCondition => Boolean(c)))
  );

  return (
    <View style={styles.container}>
      <View style={styles.midline} />

      <Text style={styles.archLabel}>Superior</Text>
      {renderArch(UPPER_TEETH)}

      <View style={styles.separator} />

      <Text style={styles.archLabel}>Inferior</Text>
      {renderArch(LOWER_TEETH)}

      <View style={styles.legend}>
        {usedConditions.map((condition) => (
          <View key={condition} style={styles.legendItem}>
            <View style={[styles.legendSwatch, { backgroundColor: TOOTH_COLORS[condition] }]} />
            <Text style={styles.legendLabel}>{TOOTH_LABELS[condition]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function OdontogramSummary({ chart }: { chart: DentalChart }) {
  const entries = Object.entries(chart).filter(([, condition]) => condition !== 'sano');
  if (entries.length === 0) {
    return (
      <View style={styles.summaryRow}>
        <Ionicons name="checkmark-circle" size={16} color="#2E9E5B" />
        <Text style={styles.summaryText}>Sin hallazgos registrados</Text>
      </View>
    );
  }

  return (
    <View style={styles.summaryList}>
      {entries.map(([tooth, condition]) => (
        <View key={tooth} style={styles.summaryRow}>
          <View style={[styles.summarySwatch, { backgroundColor: TOOTH_COLORS[condition!] }]} />
          <Text style={styles.summaryText}>
            Pieza {tooth} — {TOOTH_LABELS[condition!]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    padding: Spacing.three,
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  midline: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginBottom: Spacing.one,
  },
  arch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
  },
  archLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  toothCell: {
    flex: 1,
  },
  tooth: {
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toothPrimary: {
    borderRadius: 12,
  },
  toothNumber: {
    fontSize: 8,
    fontWeight: '700',
  },
  pendingDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginVertical: Spacing.one,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 11,
    color: '#000000',
  },
  summaryList: {
    gap: Spacing.one,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  summarySwatch: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  summaryText: {
    fontSize: 13,
    color: '#000000',
  },
});
