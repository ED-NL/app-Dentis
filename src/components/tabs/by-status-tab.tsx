import { Ionicons } from '@expo/vector-icons';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { PendingRow, STATUS_COLORS } from '@/components/pending-row';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';

type ByStatusTabProps = {
  appointments: Appointment[];
  onSelectDate: (date: string) => void;
  listHeader: React.JSX.Element;
  bottomInset: number;
};

type StatusSection = {
  status: Appointment['status'];
  title: string;
  data: Appointment[];
};

export function ByStatusTab({
  appointments,
  onSelectDate,
  listHeader,
  bottomInset,
}: ByStatusTabProps) {
  const sections: StatusSection[] = ['Pendiente', 'Confirmada']
    .map((status) => ({
      status: status as Appointment['status'],
      title: status,
      data: appointments.filter((appointment) => appointment.status === status),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(appointment) => appointment.id}
      renderItem={({ item }) => (
        <PendingRow appointment={item} onPress={() => onSelectDate(item.date)} />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <View style={[styles.dot, { backgroundColor: STATUS_COLORS[section.status] }]} />
          <Text style={styles.headerText}>
            {section.title} ({section.data.length})
          </Text>
        </View>
      )}
      renderSectionFooter={() => <View style={styles.divider} />}
      ListHeaderComponent={listHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#2e9e5b" />
          <Text style={styles.emptyText}>No tenés citas pendientes</Text>
        </View>
      }
      contentContainerStyle={[styles.content, styles.column, { paddingBottom: bottomInset + Spacing.four }]}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  divider: {
    height: Spacing.two,
  },
  separator: {
    height: Spacing.three,
  },
  emptyState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  emptyText: {
    fontSize: 14,
    color: '#000000',
  },
});
