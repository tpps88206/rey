import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ProjectScreen() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('records');
      setRecords(data ? JSON.parse(data) : []);
    };
    load();
  }, []);

  // 根據專案分類統計
  const projects = Array.from(new Set(records.map(r => r.project)));

  return (
    <View style={styles.container}>
      <Text style={styles.time}>專案／預算</Text>
      <FlatList
        data={projects}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const projRecords = records.filter(r => r.project === item);
          const total = projRecords.reduce((sum, r) => sum + Number(r.amount || 0), 0);
          return (
            <View style={styles.projectItem}>
              <Text style={styles.projectName}>{item}</Text>
              <Text style={[styles.amount, { color: '#9F9' }]}>${total.toLocaleString()}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 10 },
  time: { color: '#fff', fontSize: 18, alignSelf: 'flex-start' },
  projectItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 8, padding: 16, marginVertical: 6 },
  projectName: { color: '#fff', fontSize: 18 },
  amount: { fontSize: 18, marginLeft: 12 },
}); 