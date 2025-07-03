import Calendar from '@/components/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function HomeScreen() {
  const [records, setRecords] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState('2025-06-01');

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('records');
      setRecords(data ? JSON.parse(data) : []);
    };
    load();
  }, [selectedDate]); // 每次切換日期都重新讀取

  // 過濾當天記錄
  const filtered = records.filter(r => r.date === selectedDate);

  return (
    <View style={styles.container}>
      {/* 自訂月曆元件 */}
      <Calendar selected={selectedDate} onSelect={setSelectedDate} />
      {/* 當月統計區塊 */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>TWD 每月統計</Text>
        {/* 可根據 records 計算收支統計 */}
      </View>
      {/* 記錄列表 */}
      <FlatList
        data={filtered}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={{ color: '#fff' }}>{item.category}</Text>
            <Text style={{ color: item.type === '支出' ? '#F77' : '#9F9' }}>
              {item.type === '支出' ? '-' : '+'}${item.amount}
            </Text>
            <Text style={{ color: '#aaa', fontSize: 12 }}>{item.note}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 24 }}>當天沒有記錄</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  calendarBox: { padding: 10, alignItems: 'center', marginBottom: 8, backgroundColor: '#232936' },
  timeText: { color: '#fff', fontSize: 18, alignSelf: 'flex-start' },
  dateText: { color: '#fff', fontSize: 24, marginBottom: 8 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 4 },
  monthCircle: { color: '#F77', borderWidth: 2, borderColor: '#4A90E2', borderRadius: 16, paddingHorizontal: 8, paddingVertical: 2, marginRight: 8 },
  calendarDay: { color: '#fff', marginHorizontal: 4 },
  calendarDayDim: { color: '#888', marginHorizontal: 4 },
  calendarDaySat: { color: '#9F9', marginHorizontal: 4 },
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
