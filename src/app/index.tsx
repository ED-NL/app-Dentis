import AccountScreen from '@/components/AccountScreen';

import LoginScreen from '../components/LoginScreen';

import { useAuthStore } from '../store/auth-store';

export default function Index() {
  const patient = useAuthStore((state) => state.patient);

  return patient ? <AccountScreen /> : <LoginScreen />;
}