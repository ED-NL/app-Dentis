import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const STATUS_COLORS: Record<Appointment['status'], string> = {
  Pendiente: '#e0a800',
  Confirmada: '#3c87f7',
  Completada: '#2e9e5b',
  Cancelada: '#9a9aa0',
};

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildWeeks(year: number, month: number) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

type CalendarProps = {
  appointments: Appointment[];
  selectedDate: string;
  onSelectDate: (key: string) => void;
};

export function Calendar({ appointments, selectedDate, onSelectDate }: CalendarProps) {
  const today = useMemo(() => new Date(), []);

  const [selYear, selMonth, selDay] = selectedDate.split('-').map(Number);
  const year = selYear;
  const month = selMonth - 1;
  const weeks = useMemo(() => buildWeeks(year, month), [year, month]);

  const byDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const appointment of appointments) {
      const list = map.get(appointment.date) ?? [];
      list.push(appointment);
      map.set(appointment.date, list);
    }
    return map;
  }, [appointments]);

  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  const shiftMonth = (delta: number) => {
    const target = new Date(year, month + delta, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    const day = Math.min(selDay, lastDay);
    onSelectDate(toKey(target.getFullYear(), target.getMonth(), day));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mes anterior"
          onPress={() => shiftMonth(-1)}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}>
          <Ionicons name="chevron-back" size={18} color="#000000" />
        </Pressable>

        <Text style={styles.monthLabel}>
          {MONTHS[month]} {year}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mes siguiente"
          onPress={() => shiftMonth(1)}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}>
          <Ionicons name="chevron-forward" size={18} color="#000000" />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => {
            if (day === null) return <View key={dayIndex} style={styles.dayCell} />;

            const key = toKey(year, month, day);
            const dayAppointments = byDate.get(key) ?? [];
            const isSelected = key === selectedDate;
            const isToday = key === todayKey;

            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityLabel={`Día ${day} de ${MONTHS[month]}, ${dayAppointments.length} citas`}
                onPress={() => onSelectDate(key)}
                style={styles.dayCell}>
                <View
                  style={[
                    styles.dayCircle,
                    isSelected && styles.daySelected,
                    isToday && !isSelected && styles.dayToday,
                  ]}>
                  <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>
                    {day}
                  </Text>
                </View>

                <View style={styles.dots}>
                  {dayAppointments.slice(0, 3).map((appointment) => (
                    <View
                      key={appointment.id}
                      style={[
                        styles.dot,
                        { backgroundColor: STATUS_COLORS[appointment.status] },
                      ]}
                    />
                  ))}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export function formatLongDate(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][
    date.getDay()
  ];
  return `${weekday} ${day} de ${MONTHS[month - 1]} de ${year}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    padding: Spacing.three,
    gap: Spacing.one,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  navButton: {
    padding: Spacing.two,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  weekRow: {
    flexDirection: 'row',
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5153',
    paddingBottom: Spacing.one,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 1,
  },
  dayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: '#3C87F7',
  },
  dayToday: {
    borderWidth: 1.5,
    borderColor: '#3C87F7',
  },
  dayNumber: {
    fontSize: 12,
    color: '#000000',
  },
  dayNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dots: {
    flexDirection: 'row',
    gap: 2,
    height: 6,
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
