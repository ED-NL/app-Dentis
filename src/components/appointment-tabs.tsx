import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AllAppointmentsTab } from '@/components/tabs/all-appointments-tab';
import { ByStatusTab } from '@/components/tabs/by-status-tab';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import type { Appointment } from '@/constants/mockPatient';

type AppointmentTabsProps = {
  appointments: Appointment[];
  onSelectDate: (date: string) => void;
  listHeader: React.JSX.Element;
  bottomInset: number;
};

type Tab = {
  id: number;
  label: string;
  Component: (props: AppointmentTabsProps) => React.JSX.Element;
};

// Fuera del componente: si estuviera adentro, React lo recrea en cada render.
const TABS: Tab[] = [
  { id: 1, label: 'Todas', Component: AllAppointmentsTab },
  { id: 2, label: 'Por estado', Component: ByStatusTab },
];

export function AppointmentTabs({
  appointments,
  onSelectDate,
  listHeader,
  bottomInset,
}: AppointmentTabsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { Component } = activeTab;

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isActive && styles.tabActive]}>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.content}>
        <Component
          appointments={appointments}
          onSelectDate={onSelectDate}
          listHeader={listHeader}
          bottomInset={bottomInset}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bar: {
    flexDirection: 'row',
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  tab: {
    paddingVertical: Spacing.one + 1,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.five,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  tabActive: {
    backgroundColor: '#3c87f7',
    borderColor: '#3c87f7',
  },
  tabLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
