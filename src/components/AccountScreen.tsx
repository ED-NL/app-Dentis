import { Ionicons } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import type { ClinicalRecord } from '@/constants/mockPatient';
import { useAuthStore } from '@/store/auth-store';

import { SignOutButton } from './sign-out-button';
import { Odontogram, OdontogramSummary } from './odontogram';

const SCREEN_BG = '#4C5D61';

const statusColors: Record<ClinicalRecord['status'], string> = {
  Completado: '#2e9e5b',
  'En progreso': '#e0a800',
  Programado: '#3c87f7',
  Pendiente: '#9a9aa0',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function InfoRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color="#6B7280" style={styles.infoIcon} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function RecordCard({ record }: { record: ClinicalRecord }) {
  return (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>{record.date}</Text>
        <View style={[styles.statusBadge, { borderColor: statusColors[record.status] }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColors[record.status] }]} />
          <Text style={[styles.statusText, { color: statusColors[record.status] }]}>
            {record.status}
          </Text>
        </View>
      </View>
      <Text style={styles.recordTreatment}>{record.treatment}</Text>
      <View style={styles.recordDentist}>
        <Ionicons name="medkit-outline" size={13} color="#6B7280" />
        <Text style={styles.recordDentistText}>{record.dentist}</Text>
      </View>
      <Text style={styles.recordNotes}>{record.notes}</Text>
    </View>
  );
}

export default function AccountScreen() {
  const patient = useAuthStore((state) => state.patient);
  const safeAreaInsets = useSafeAreaInsets();

  if (!patient) {
    return null;
  }

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={styles.scrollView}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(patient.fullName)}</Text>
          </View>
          <Text style={styles.profileName}>{patient.fullName}</Text>
          <Text style={styles.profileSub}>{patient.email}</Text>
          <Text style={styles.profileSub}>ID: {patient.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos personales</Text>
          <InfoRow icon="card-outline" label="DNI" value={patient.dni} />
          <InfoRow icon="calendar-outline" label="Nacimiento" value={patient.birthDate} />
          <InfoRow icon="call-outline" label="Teléfono" value={patient.phone} />
          <InfoRow icon="location-outline" label="Domicilio" value={patient.address} />
          <InfoRow icon="heart-outline" label="Sangre" value={patient.bloodType} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alergias y antecedentes</Text>
          <Text style={styles.bodyText}>
            {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'Sin alergias registradas'}
          </Text>
          <Text style={styles.bodyMutedText}>{patient.medicalNotes}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Historial clínico ({patient.clinicalHistory.length})
          </Text>

          <Text style={styles.subSectionTitle}>Odontograma</Text>
          <Odontogram chart={patient.dentalChart} />

          <Text style={styles.subSectionTitle}>Resumen por pieza</Text>
          <OdontogramSummary chart={patient.dentalChart} />

          <View style={styles.recordsList}>
            {patient.clinicalHistory.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </View>
        </View>

        {Platform.OS !== 'web' && <SignOutButton />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  contentContainer: {
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.three,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#3C87F7',
    borderRadius: Spacing.four,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: Spacing.one,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  profileSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
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
    marginBottom: Spacing.one,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  bodyMutedText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: Spacing.two,
    width: 20,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    textAlign: 'right',
  },
  recordsList: {
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  recordCard: {
    backgroundColor: '#C7CDCD',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  recordDate: {
    fontSize: 13,
    color: '#000000',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  recordTreatment: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  recordDentist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  recordDentistText: {
    fontSize: 13,
    color: '#000000',
  },
  recordNotes: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    marginTop: Spacing.one,
  },
});