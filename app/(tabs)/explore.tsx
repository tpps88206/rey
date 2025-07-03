import * as scale from 'd3-scale';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { G, Rect } from 'react-native-svg';
import { BarChart, LineChart, XAxis } from 'react-native-svg-charts';

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

const mockChartData = [
  { month: '10月', income: 120000, expense: 90000, total: 200000 },
  { month: '11月', income: 100000, expense: 95000, total: 210000 },
  { month: '12月', income: 110000, expense: 100000, total: 220000 },
  { month: '2025/1', income: 300000, expense: 120000, total: 400000 },
  { month: '2月', income: 250000, expense: 110000, total: 500000 },
  { month: '3月', income: 400000, expense: 200000, total: 700000 },
  { month: '4月', income: 180000, expense: 120000, total: 750000 },
  { month: '5月', income: 160000, expense: 130000, total: 770000 },
  { month: '6月', income: 170000, expense: 140000, total: 800000 },
];

function CombinedSVGChart() {
  const chartHeight = 120;
  const chartWidth = 340;
  const incomeData = mockChartData.map(d => d.income);
  const expenseData = mockChartData.map(d => d.expense);
  const totalData = mockChartData.map(d => d.total);
  const months = mockChartData.map(d => d.month);
  const contentInset = { top: 16, bottom: 16 };

  // 疊加兩組 BarChart
  return (
    <>
      <BarChart
        style={{ height: chartHeight, width: chartWidth, position: 'absolute' }}
        data={incomeData}
        svg={{ fill: '#9F9' }}
        spacingInner={0.4}
        contentInset={contentInset}
        yAccessor={({ item }) => item}
        gridMin={0}
      />
      <BarChart
        style={{ height: chartHeight, width: chartWidth }}
        data={expenseData}
        svg={{ fill: '#F77' }}
        spacingInner={0.4}
        contentInset={contentInset}
        yAccessor={({ item }) => item}
        gridMin={0}
      >
        {/* 疊加折線圖 */}
        <LineChart
          style={{ height: chartHeight, width: chartWidth }}
          data={totalData}
          svg={{ stroke: '#4A90E2', strokeWidth: 2 }}
          contentInset={contentInset}
          yMin={0}
        >
          {/* 資料點 */}
          {({ line }) => (
            <G>
              {totalData.map((value, index) => {
                const x = (chartWidth / (totalData.length - 1)) * index;
                const y = line.y(value);
                return (
                  <G key={index}>
                    <Rect x={x - 5} y={y - 5} width={10} height={10} rx={5} fill="#4A90E2" />
                  </G>
                );
              })}
            </G>
          )}
        </LineChart>
      </BarChart>
      {/* X 軸月份標籤 */}
      <XAxis
        style={{ marginTop: 4, width: chartWidth, alignSelf: 'center' }}
        data={months}
        formatLabel={(_, i) => months[i]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 12, fill: '#aaa' }}
        scale={scale.scaleBand}
      />
    </>
  );
}

const barStyles = StyleSheet.create({
  combinedChartBox: { width: '100%', maxWidth: 400, alignSelf: 'center', backgroundColor: '#232936', position: 'relative', marginBottom: 16 },
  barRow: { position: 'absolute', flexDirection: 'row', width: '100%', bottom: 0, left: 0 },
  barGroup: { position: 'absolute', flexDirection: 'row', alignItems: 'flex-end' },
  bar: { borderRadius: 3 },
  line: { position: 'absolute', height: 2, backgroundColor: '#4A90E2', borderRadius: 2 },
  dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A90E2', borderWidth: 2, borderColor: '#fff' },
  label: { color: '#aaa', fontSize: 10, marginTop: 2 },
  xLabelsRow: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between' },
});

export default function AccountOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>帳戶總覽</Text>
      {/* SVG 專業圖表 */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <CombinedSVGChart />
      </View>
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
