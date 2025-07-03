import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

function CenterTabButton({ children }: any) {
  const router = useRouter();
  const segments = useSegments();
  const isHome = segments.length === 1 && segments[0] === '';
  return (
    <TouchableOpacity
      onPress={() => {
        if (isHome) {
          router.push('/add');
        } else {
          router.navigate('/');
        }
      }}
      style={{ alignItems: 'center', justifyContent: 'center', top: -16 }}
      activeOpacity={0.85}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4A90E2',
        tabBarStyle: { backgroundColor: '#232936', borderTopColor: '#232936' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: '帳戶',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="wallet-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: '專案/預算',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="wallet-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="add-circle" size={48} color="#3578E5" />
          ),
          tabBarButton: (props: any) => <CenterTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: '報表',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="stats-chart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: '更多',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="menu-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
