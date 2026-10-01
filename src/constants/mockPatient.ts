export type ClinicalRecord = {
  id: string;
  date: string;
  treatment: string;
  dentist: string;
  notes: string;
  status: 'Completado' | 'Pendiente' | 'En progreso' | 'Programado';
};

export type ToothCondition =
  | 'sano'
  | 'obturado'
  | 'endodoncado'
  | 'corona'
  | 'sellante'
  | 'implante'
  | 'ausente'
  | 'pendiente';

export type DentalChart = Partial<Record<number, ToothCondition>>;

export type Appointment = {
  id: string;
  date: string;
  time: string;
  dentist: string;
  specialty: string;
  reason: string;
  status: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
};

export type Patient = {
  id: string;
  email: string;
  fullName: string;
  dni: string;
  birthDate: string;
  phone: string;
  address: string;
  bloodType: string;
  allergies: string[];
  medicalNotes: string;
  clinicalHistory: ClinicalRecord[];
  dentalChart: DentalChart;
  appointments: Appointment[];
};

export const mockPatient: Patient = {
  id: 'PAT-0001',
  email: 'maria@gmail.com',
  fullName: 'María González López',
  dni: '36.584.210',
  birthDate: '12/03/1990',
  phone: '+54 11 5555-1234',
  address: 'Av. Corrientes 1234, Buenos Aires',
  bloodType: 'O+',
  allergies: ['Penicilina', 'Ibuprofeno'],
  medicalNotes: 'Hipertensión controlada con medicación. Consultar antes de usar anestesia con adrenalina.',
  clinicalHistory: [
    {
      id: 'R-2026-007',
      date: '15/09/2026',
      treatment: 'Limpieza dental profunda',
      dentist: 'Dra. Lucía Ferreyra',
      notes: 'Profilaxis y destartraje. Recomendado control en 6 meses.',
      status: 'Completado',
    },
    {
      id: 'R-2026-004',
      date: '02/08/2026',
      treatment: 'Endodoncia diente 26',
      dentist: 'Dr. Pablo Sosa',
      notes: 'Tratamiento de conducto finalizado sin complicaciones.',
      status: 'Completado',
    },
    {
      id: 'R-2026-002',
      date: '20/07/2026',
      treatment: 'Tratamiento de caries',
      dentist: 'Dra. Lucía Ferreyra',
      notes: 'Objetación de amalgama en pieza 16. Evaluar corona en próximo control.',
      status: 'En progreso',
    },
    {
      id: 'R-2026-001',
      date: '02/07/2026',
      treatment: 'Radiografía panorámica',
      dentist: 'Dr. Pablo Sosa',
      notes: 'Muela del juicio inferior derecha retenida. Evaluar extracción.',
      status: 'Completado',
    },
    {
      id: 'R-2026-009',
      date: '10/10/2026',
      treatment: 'Control y evaluación de muela del juicio',
      dentist: 'Dra. Lucía Ferreyra',
      notes: 'Evaluación para posible extracción de pieza 48.',
      status: 'Programado',
    },
  ],
  dentalChart: {
    16: 'obturado',
    18: 'ausente',
    26: 'endodoncado',
    28: 'ausente',
    36: 'obturado',
    38: 'sellante',
    46: 'corona',
    47: 'implante',
    48: 'pendiente',
  },
  appointments: [
    {
      id: 'C-2026-031',
      date: '2026-09-15',
      time: '10:00',
      dentist: 'Dra. Lucía Ferreyra',
      specialty: 'Odontología general',
      reason: 'Limpieza dental profunda',
      status: 'Completada',
    },
    {
      id: 'C-2026-034',
      date: '2026-10-10',
      time: '09:30',
      dentist: 'Dra. Lucía Ferreyra',
      specialty: 'Cirugía',
      reason: 'Evaluación de muela del juicio (pieza 48)',
      status: 'Pendiente',
    },
    {
      id: 'C-2026-037',
      date: '2026-10-10',
      time: '11:15',
      dentist: 'Dr. Pablo Sosa',
      specialty: 'Endodoncia',
      reason: 'Control de endodoncia pieza 26',
      status: 'Confirmada',
    },
    {
      id: 'C-2026-041',
      date: '2026-11-05',
      time: '16:00',
      dentist: 'Dra. Lucía Ferreyra',
      specialty: 'Prótesis',
      reason: 'Evaluación de corona en pieza 16',
      status: 'Pendiente',
    },
    {
      id: 'C-2026-045',
      date: '2026-11-28',
      time: '08:45',
      dentist: 'Dr. Pablo Sosa',
      specialty: 'Odontología general',
      reason: 'Control preventivo semestral',
      status: 'Pendiente',
    },
    {
      id: 'C-2026-048',
      date: '2026-12-12',
      time: '14:30',
      dentist: 'Dra. Lucía Ferreyra',
      specialty: 'Cirugía',
      reason: 'Extracción de pieza 48 (si se confirma evaluación)',
      status: 'Pendiente',
    },
  ],
};