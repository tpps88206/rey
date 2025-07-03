import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


// 資料型別定義
interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Record {
  id: string;
  type: 'expense' | 'income' | 'transfer' | 'receivable' | 'payable';
  amount: number;
  categoryId: string;
  accountId: string;
  projectId?: string;
  date: string;
  note?: string;
}

// 假資料
const mockAccounts: Account[] = [
  { id: '1', name: '錢包', type: 'cash', balance: 1779, icon: 'wallet' },
  { id: '2', name: '中國信託活存', type: 'bank', balance: 2329, icon: 'bank' },
];
const mockCategories: Category[] = [
  { id: '1', name: '計程車', icon: 'car', color: '#4A90E2' },
  { id: '2', name: '午餐', icon: 'burger', color: '#F5C16C' },
  { id: '3', name: '飲料', icon: 'coffee', color: '#F5C16C' },
];
const mockRecords: Record[] = [
  { id: '1', type: 'expense', amount: 153, categoryId: '1', accountId: '2', date: '2025-06-01', note: 'JCB 中國信託' },
  { id: '2', type: 'expense', amount: 254, categoryId: '2', accountId: '2', date: '2025-06-01', note: 'JCB 中國信託' },
  { id: '3', type: 'expense', amount: 179, categoryId: '3', accountId: '2', date: '2025-06-01', note: 'JCB 中國信託' },
];

export default function HomeScreen() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    // 先用假資料
    setRecords(mockRecords);
  }, []);

  return (
    <View style={styles.container}>
      {/* 日曆區塊（之後可替換成元件） */}
      <View style={styles.calendarBox}>
        <Text style={styles.dateText}>2025/6/1</Text>
      </View>
      {/* 當月統計區塊 */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>TWD 每月統計</Text>
        <Text style={styles.expenseText}>$586</Text>
        <Text style={styles.incomeText}>$16,000</Text>
      </View>
      {/* 記錄列表 */}
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={{ color: '#fff' }}>{mockCategories.find(c => c.id === item.categoryId)?.name}</Text>
            <Text style={{ color: item.type === 'expense' ? '#F77' : '#9F9' }}>
              {item.type === 'expense' ? '-' : '+'}${item.amount}
            </Text>
            <Text style={{ color: '#aaa', fontSize: 12 }}>{item.note}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  calendarBox: { padding: 10, alignItems: 'center' },
  dateText: { color: '#fff', fontSize: 24 },
  summaryBox: { backgroundColor: '#222', borderRadius: 10, padding: 16, marginVertical: 10 },
  summaryText: { color: '#fff', fontSize: 18 },
  expenseText: { color: '#F77', fontSize: 16 },
  incomeText: { color: '#9F9', fontSize: 16 },
  recordItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 8, padding: 12, marginVertical: 4 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
