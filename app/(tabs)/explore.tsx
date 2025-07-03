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

function SimpleLineChart() {
  const max = Math.max(...mockBarData.map(d => Math.max(d.income, d.expense)));
  const min = Math.min(...mockBarData.map(d => Math.min(d.income, d.expense)));
  const chartHeight = 120;
  const chartWidth = 320; // 可用 Dimensions.get('window').width 取代
  const padding = 24;
  const points = mockBarData.map((d, i) => {
    const x = padding + i * ((chartWidth - 2 * padding) / (mockBarData.length - 1));
    const y = padding + (chartHeight - 2 * padding) * (1 - (d.income - min) / (max - min || 1));
    return { x, y };
  });
  return (
    <View style={[barStyles.lineChartBox, { height: chartHeight }]}> 
      {/* 折線 */}
      {points.map((pt, i) =>
        i > 0 ? (
          <View
            key={i}
            style={[
              barStyles.line,
              {
                left: points[i - 1].x,
                top: points[i - 1].y,
                width: Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y),
                transform: [
                  { rotateZ: `${Math.atan2(points[i].y - points[i - 1].y, points[i].x - points[i - 1].x)}rad` },
                ],
              },
            ]}
          />
        ) : null
      )}
      {/* 資料點 */}
      {points.map((pt, i) => (
        <View
          key={i}
          style={[
            barStyles.dot,
            { left: pt.x - 5, top: pt.y - 5 },
          ]}
        />
      ))}
      {/* X 軸標籤 */}
      <View style={[barStyles.xLabelsRow, { width: chartWidth, left: 0, top: chartHeight - padding + 4 }]}> 
        {mockBarData.map((d, i) => (
          <Text key={i} style={barStyles.label}>{d.month}</Text>
        ))}
      </View>
    </View>
  );
}

const barStyles = StyleSheet.create({
  chartContainer: { marginBottom: 16, marginTop: 8 },
  lineChartBox: { width: '100%', maxWidth: 400, alignSelf: 'center', backgroundColor: '#232936', position: 'relative', marginBottom: 16 },
  line: { position: 'absolute', height: 2, backgroundColor: '#4A90E2', borderRadius: 2 },
  dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A90E2', borderWidth: 2, borderColor: '#fff' },
  label: { color: '#aaa', fontSize: 10, marginTop: 2 },
  xLabelsRow: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between' },
});

export default function AccountOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>帳戶總覽</Text>
      <SimpleLineChart />
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
