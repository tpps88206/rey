import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: string;
}

const mockAccounts: Account[] = [
  { id: '1', name: '錢包', type: 'cash', balance: 1779, icon: 'wallet' },
  { id: '2', name: '中國信託活存', type: 'bank', balance: 2329, icon: 'bank' },
  { id: '3', name: '保留金', type: 'safe', balance: 60000, icon: 'safe' },
  { id: '4', name: '元大銀行證券', type: 'stock', balance: 370000, icon: 'stock' },
];

export default function AccountOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>帳戶總覽</Text>
      <FlatList<Account>
        data={mockAccounts}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: Account }) => (
          <View style={styles.accountItem}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: '#9F9', fontSize: 18 }}>{item.balance.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
  accountItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 8, padding: 16, marginVertical: 6 },
});
