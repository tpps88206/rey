import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tabs = ['支出', '收入', '轉帳', '應收款', '應付款'];

export default function AddRecordScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)} style={[styles.tab, activeTab === idx && styles.activeTab]}>
            <Text style={{ color: activeTab === idx ? '#3578E5' : '#fff' }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputBox}>
        <Text style={{ color: '#fff', fontSize: 18 }}>金額</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 16 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  activeTab: { backgroundColor: '#2C3442' },
  inputBox: { backgroundColor: '#2C3442', borderRadius: 10, padding: 16 },
  input: { color: '#fff', fontSize: 32, marginTop: 8 },
}); 