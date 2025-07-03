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

const mockBarData = [
  { month: '10月', income: 120000, expense: 90000 },
  { month: '11月', income: 100000, expense: 95000 },
  { month: '12月', income: 110000, expense: 100000 },
  { month: '2025/1', income: 300000, expense: 120000 },
  { month: '2月', income: 250000, expense: 110000 },
  { month: '3月', income: 400000, expense: 200000 },
  { month: '4月', income: 180000, expense: 120000 },
  { month: '5月', income: 160000, expense: 130000 },
  { month: '6月', income: 170000, expense: 140000 },
];

function SimpleBarChart() {
  const max = Math.max(...mockBarData.map(d => Math.max(d.income, d.expense)));
  return (
    <View style={barStyles.chartContainer}>
      <View style={barStyles.barsRow}>
        {mockBarData.map((d, i) => (
          <View key={i} style={barStyles.barGroup}>
            {/* 收入長條 */}
            <View style={[barStyles.bar, { height: 80 * d.income / max, backgroundColor: '#9F9' }]} />
            {/* 支出長條 */}
            <View style={[barStyles.bar, { height: 80 * d.expense / max, backgroundColor: '#F77', marginTop: 2 }]} />
            <Text style={barStyles.label}>{d.month}</Text>
          </View>
        ))}
      </View>
      <View style={barStyles.legendRow}>
        <View style={[barStyles.legendDot, { backgroundColor: '#9F9' }]} />
        <Text style={barStyles.legendText}>收入</Text>
        <View style={[barStyles.legendDot, { backgroundColor: '#F77' }]} />
        <Text style={barStyles.legendText}>支出</Text>
      </View>
    </View>
  );
}

const barStyles = StyleSheet.create({
  chartContainer: { marginBottom: 16, marginTop: 8 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 90, paddingHorizontal: 8 },
  barGroup: { alignItems: 'center', marginHorizontal: 4 },
  bar: { width: 12, borderRadius: 4 },
  label: { color: '#aaa', fontSize: 10, marginTop: 2 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, marginLeft: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 4 },
  legendText: { color: '#aaa', fontSize: 12, marginRight: 12 },
});

export default function AccountOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>帳戶總覽</Text>
      <SimpleBarChart />
      <FlatList
        data={mockAccounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
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
