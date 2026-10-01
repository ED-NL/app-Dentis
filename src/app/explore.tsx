import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppointmentTabs } from '@/components/appointment-tabs';
import { Calendar, formatLongDate } from '@/components/calendar';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';
import { STATUS_COLORS } from '@/components/pending-row';
import { useAuthStore } from '@/store/auth-store';

const SCREEN_BG = '#4C5D61';


function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={13} color="#3D4446" />
          <Text style={styles.timeText}>{appointment.time}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: STATUS_COLORS[appointment.status] }]}>
          <View
            style={[styles.statusDot, { backgroundColor: STATUS_COLORS[appointment.status] }]}
          />
          <Text style={[styles.statusText, { color: STATUS_COLORS[appointment.status] }]}>
            {appointment.status}
          </Text>
        </View>
      </View>

      <Text style={styles.appointmentReason}>{appointment.reason}</Text>

      <View style={styles.appointmentMeta}>
        <Ionicons name="person-outline" size={14} color="#4B5153" />
        <Text style={styles.appointmentMetaText}>{appointment.dentist}</Text>
      </View>
      <View style={styles.appointmentMeta}>
        <Ionicons name="medical-outline" size={14} color="#4B5153" />
        <Text style={styles.appointmentMetaText}>{appointment.specialty}</Text>
      </View>
    </View>
  );
}

export default function AgendaScreen() {
  const patient = useAuthStore((state) => state.patient);
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(todayKey());

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset,
  };

  const screenPadding = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    default: {
      paddingTop: Spacing.six,
    },
  });

  const pending = useMemo(() => {
    if (!patient) return [];
    const today = todayKey();
    return patient.appointments
      .filter(
        (appointment) =>
          appointment.status === 'Pendiente' || appointment.status === 'Confirmada'
      )
      .filter((appointment) => appointment.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [patient]);

  const selectedAppointments = useMemo(() => {
    if (!patient) return [];
    return patient.appointments
      .filter((appointment) => appointment.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [patient, selectedDate]);

  if (!patient) return <Redirect href="/" />;

  const header = (
    <View style={styles.header}>
      <Text style={styles.screenTitle}>Agenda</Text>
      <Text style={styles.screenSubtitle}>
        Turnos con tu odontólogo. Tocá un día del calendario para ver las citas.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calendario</Text>
        <Calendar
          appointments={patient.appointments}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Citas del {formatLongDate(selectedDate)}</Text>
        {selectedAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={22} color="#4B5153" />
            <Text style={styles.emptyText}>No hay citas para este día</Text>
          </View>
        ) : (
          <View style={styles.appointmentsList}>
            {selectedAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </View>
        )}
      </View>

      <Text style={styles.listTitle}>Próximas citas pendientes ({pending.length})</Text>
    </View>
  );

  return (
    <View style={[styles.screen, screenPadding]}>
      <AppointmentTabs
        appointments={pending}
        onSelectDate={setSelectedDate}
        listHeader={header}
        bottomInset={insets.bottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SCREEN_BG,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  header: {
    width: '100%',
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -Spacing.two,
  },
  separator: {
    height: Spacing.three,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  screenSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.75)',
    marginTop: -Spacing.two,
  },
  section: {
    backgroundColor: '#8B9292',
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  appointmentsList: {
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  appointmentCard: {
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: '#FFFFFF',
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3D4446',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: 1,
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    backgroundColor: '#FFFFFF',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  appointmentReason: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    marginTop: Spacing.one,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  appointmentMetaText: {
    fontSize: 13,
    color: '#000000',
  },
  emptyState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginTop: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  emptyText: {
    fontSize: 14,
    color: '#000000',
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  pendingDateBadge: {
    width: 46,
    height: 46,
    borderRadius: Spacing.two,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pendingDay: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 20,
  },
  pendingMonth: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5153',
  },
  pendingInfo: {
    flex: 1,
    gap: 1,
  },
  pendingReason: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  pendingMeta: {
    fontSize: 12,
    color: '#000000',
  },
  pressed: {
    opacity: 0.7,
  },
});
