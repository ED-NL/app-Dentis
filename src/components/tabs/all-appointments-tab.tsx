import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PendingRow } from '@/components/pending-row';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';

type AllAppointmentsTabProps = {
  appointments: Appointment[];
  onSelectDate: (date: string) => void;
  listHeader: React.JSX.Element;
  bottomInset: number;
};

export function AllAppointmentsTab({
  appointments,
  onSelectDate,
  listHeader,
  bottomInset,
}: AllAppointmentsTabProps) {
  return (
    <FlatList
      data={appointments}
      keyExtractor={(appointment) => appointment.id}
      renderItem={({ item }) => (
        <PendingRow appointment={item} onPress={() => onSelectDate(item.date)} />
      )}
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
