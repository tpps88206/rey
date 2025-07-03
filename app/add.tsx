import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tabs = ['建議', '支出', '收入', '轉帳', '應收款項', '應付款項'];
const categories = [
  { name: '公車', color: '#4A90E2' },
  { name: '早餐', color: '#F5C16C' },
  { name: '飲料', color: '#F5C16C' },
  { name: '計程車', color: '#4A90E2' },
  { name: '代墊', color: '#B39DDB' },
  { name: '獎金', color: '#BCA16C' },
  { name: '日常用品', color: '#607D8B' },
  { name: '保險', color: '#BDBDBD' },
  { name: '禮物', color: '#F48FB1' },
  { name: '代墊', color: '#B39DDB' },
];

function NumberPad({ visible, value, onChange, onClose }: { visible: boolean, value: string, onChange: (v: string) => void, onClose: () => void }) {
  const keys = [
    ['÷', '×', '-', '+'],
    ['7', '8', '9', 'C'],
    ['4', '5', '6', '⌫'],
    ['1', '2', '3', ''],
    ['.', '0', '00', '✔'],
  ];
  const handlePress = (key: string) => {
    if (key === 'C') onChange('');
    else if (key === '⌫') onChange(value.slice(0, -1));
    else if (key === '✔') onClose();
    else if ('0123456789.'.includes(key)) onChange(value + key);
    else if (key === '00') onChange(value + '00');
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.padOverlay}>
        <View style={styles.padBox}>
          {keys.map((row, i) => (
            <View key={i} style={styles.padRow}>
              {row.map((k, j) => (
                <TouchableOpacity
                  key={j}
                  style={[styles.padKey, k === '✔' && styles.padKeyOk]}
                  onPress={() => handlePress(k)}
                  disabled={!k}
                >
                  <Text style={[styles.padKeyText, k === '✔' && styles.padKeyOkText]}>{k}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
}

export default function AddRecordScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [padVisible, setPadVisible] = useState(false);
  const [selectedCat, setSelectedCat] = useState(0);
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      {/* 上方多分類 Tab */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)} style={[styles.tab, activeTab === idx && styles.activeTab]}>
            <Text style={{ color: activeTab === idx ? '#3578E5' : '#fff', fontSize: 16 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 分類 icon 選擇區 */}
      <View style={styles.catRow}>
        {categories.map((cat, idx) => (
          <TouchableOpacity key={cat.name + idx} style={[styles.catCircle, { backgroundColor: cat.color, borderWidth: selectedCat === idx ? 3 : 0, borderColor: '#3578E5' }]} onPress={() => setSelectedCat(idx)}>
            <Text style={{ color: '#fff', fontSize: 20 }}>{cat.name[0]}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 金額輸入區 */}
      <TouchableOpacity style={styles.amountBox} onPress={() => setPadVisible(true)}>
        <Text style={styles.amountLabel}>TWD</Text>
        <Text style={styles.amountText}>{amount || '0'}</Text>
        <Text style={styles.amountPlus}>＋</Text>
      </TouchableOpacity>
      {/* 其他欄位 */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.imgBtn}><Text style={{ color: '#888' }}>📷</Text></TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="名稱"
          placeholderTextColor="#888"
        />
      </View>
      {/* 其他欄位可依需求繼續擴充... */}
      <NumberPad visible={padVisible} value={amount} onChange={setAmount} onClose={() => setPadVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 16 },
  tabRow: { flexDirection: 'row', marginBottom: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, marginRight: 8 },
  activeTab: { backgroundColor: '#2C3442' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  catCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', margin: 6 },
  amountBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C3442', borderRadius: 10, padding: 16, marginBottom: 16 },
  amountLabel: { color: '#fff', fontSize: 18, marginRight: 8 },
  amountText: { color: '#fff', fontSize: 32, flex: 1 },
  amountPlus: { color: '#3578E5', fontSize: 28, marginLeft: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  imgBtn: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#2C3442', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  nameInput: { flex: 1, backgroundColor: '#2C3442', borderRadius: 8, color: '#fff', fontSize: 18, paddingHorizontal: 12, height: 40 },
  padOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  padBox: { backgroundColor: '#232936', padding: 12, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  padRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  padKey: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginHorizontal: 2, borderRadius: 8, backgroundColor: '#2C3442' },
  padKeyText: { color: '#fff', fontSize: 28 },
  padKeyOk: { backgroundColor: '#3578E5' },
  padKeyOkText: { color: '#fff' },
}); 