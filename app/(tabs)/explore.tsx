import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function AccountOverview() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('records');
      setRecords(data ? JSON.parse(data) : []);
    };
    load();
  }, []);

  // 根據帳戶分類統計
  const accounts = Array.from(new Set(records.map(r => r.account)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>帳戶總覽</Text>
      <FlatList
        data={accounts}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const accRecords = records.filter(r => r.account === item);
          const total = accRecords.reduce((sum, r) => sum + Number(r.amount || 0), 0);
          return (
            <View style={styles.accountItem}>
              <Text style={{ color: '#fff', fontSize: 18 }}>{item}</Text>
              <Text style={{ color: '#9F9', fontSize: 18 }}>{total.toLocaleString()}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
  accountItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 8, padding: 16, marginVertical: 6 },
});
