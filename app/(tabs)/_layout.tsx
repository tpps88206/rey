import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

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
        name="index"
        options={{
          title: '個人',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '帳戶',
          tabBarIcon: ({ color, size }: any) => <Ionicons name="wallet-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="add-circle" size={48} color="#3578E5" style={{ marginTop: -16 }} />
          ),
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
