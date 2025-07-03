import { FlatList, StyleSheet, Text, View } from 'react-native';

const mockProjects = [
  {
    id: '1',
    name: 'TWD 每月統計',
    icon: 'coin',
    period: '2025/7/1 — 2025/7/31',
    total: 28700,
    color: '#FFD700',
    status: '進行中',
    amount: 28693,
    type: 'expense',
    badge: 24,
  },
  {
    id: '2',
    name: '生活 🐵',
    icon: 'money',
    period: '2025/7/1 — 2025/7/31',
    total: 2200,
    color: '#4AC29A',
    status: '進行中',
    amount: 27834,
    type: 'income',
    badge: 0,
  },
  {
    id: '3',
    name: '家用 🏠',
    icon: 'piggy',
    period: '2025/7/1 — 2025/7/31',
    total: 42493,
    color: '#F5C16C',
    status: '進行中',
    amount: 18107,
    type: 'income',
    badge: 0,
  },
  {
    id: '4',
    name: '結婚',
    icon: 'heart',
    period: '2025/7/1 — 2025/7/31',
    total: 0,
    color: '#F77',
    status: '已結束',
    amount: 0,
    type: 'income',
    badge: 0,
  },
];

export default function ProjectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>12:06</Text>
      <Text style={styles.title}>專案／預算</Text>
      <FlatList
        data={mockProjects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectItem}>
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}/>
            <View style={{ flex: 1 }}>
              <Text style={styles.projectName}>{item.name}</Text>
              <Text style={styles.period}>{item.period}</Text>
              <Text style={styles.total}>專案總額 <Text style={{ color: '#F77' }}>${item.total.toLocaleString()}</Text></Text>
            </View>
            <Text style={[styles.amount, { color: item.type === 'expense' ? '#F77' : '#9F9' }]}>${item.amount.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  time: { color: '#fff', fontSize: 18, alignSelf: 'flex-start' },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
  projectItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 8, padding: 16, marginVertical: 6 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  projectName: { color: '#fff', fontSize: 18 },
  period: { color: '#aaa', fontSize: 12 },
  total: { color: '#fff', fontSize: 12 },
  amount: { fontSize: 18, marginLeft: 12 },
}); 