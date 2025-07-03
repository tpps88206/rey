import CategorySelector from '@/components/CategorySelector';
import { categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tabs = ['建議', '支出', '收入', '轉帳', '應收款項', '應付款項'];
const accounts = ['錢包', '中國信託活存', '保留金', '元大銀行證券'];
const projects = ['TWD 每月統計', '生活', '家用', '結婚'];

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

function PickerModal({ visible, options, value, onSelect, onClose, title }: { visible: boolean, options: string[], value: string, onSelect: (v: string) => void, onClose: () => void, title: string }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView>
            {options.map(opt => (
              <TouchableOpacity key={opt} style={styles.modalOption} onPress={() => { onSelect(opt); onClose(); }}>
                <Text style={{ color: value === opt ? Colors.primary : Colors.text, fontSize: 18 }}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.modalCancel} onPress={onClose}><Text style={{ color: Colors.text }}>取消</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function AdvancedPayModal({ visible, mode, setMode, method, setMethod, onClose }: any) {
  const tabs = ['單次', '週期', '分期'];
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.advBox}>
          <Text style={styles.modalTitle}>進階設定</Text>
          <View style={styles.advTabRow}>
            {tabs.map((t, i) => (
              <TouchableOpacity key={t} style={[styles.advTab, mode === i && styles.advTabActive]} onPress={() => setMode(i)}>
                <Text style={{ color: mode === i ? Colors.primary : Colors.text, fontSize: 16 }}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: Colors.text, fontSize: 16 }}>入帳方式</Text>
            <TouchableOpacity style={styles.advMethodBtn} onPress={() => setMethod('立即入帳')}><Text style={{ color: method === '立即入帳' ? Colors.primary : Colors.text }}>立即入帳</Text></TouchableOpacity>
            <TouchableOpacity style={styles.advMethodBtn} onPress={() => setMethod('延後入帳')}><Text style={{ color: method === '延後入帳' ? Colors.primary : Colors.text }}>延後入帳</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 24 }}>
            <TouchableOpacity style={styles.modalCancel} onPress={onClose}><Text style={{ color: Colors.text }}>取消</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOk} onPress={onClose}><Text style={{ color: Colors.primary }}>確定</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function AddRecordScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [padVisible, setPadVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSub, setSelectedSub] = useState(0);
  const [name, setName] = useState('');
  const [img, setImg] = useState<string | null>(null);
  const [account, setAccount] = useState(accounts[0]);
  const [accountPicker, setAccountPicker] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const [projectPicker, setProjectPicker] = useState(false);
  const [shop, setShop] = useState('');
  const [advVisible, setAdvVisible] = useState(false);
  const [advMode, setAdvMode] = useState(0);
  const [advMethod, setAdvMethod] = useState('立即入帳');
  const [date, setDate] = useState('2025-06-01');
  const [time, setTime] = useState('12:05');
  const [invoice, setInvoice] = useState('');
  const [random, setRandom] = useState('');
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  // 圖片選擇
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImg(result.assets[0].uri);
    }
  };

  // 儲存紀錄
  const handleSave = async () => {
    const record = {
      type: tabs[activeTab],
      category: categories[selectedCategory].name,
      subCategory: categories[selectedCategory].children[selectedSub].name,
      amount,
      name,
      img,
      account,
      project,
      shop,
      advMode,
      advMethod,
      date,
      time,
      invoice,
      random,
      tags,
      note,
      createdAt: Date.now(),
    };
    try {
      const prev = await AsyncStorage.getItem('records');
      const arr = prev ? JSON.parse(prev) : [];
      arr.push(record);
      await AsyncStorage.setItem('records', JSON.stringify(arr));
      Alert.alert('已儲存', '記錄已儲存成功');
      router.back();
    } catch (e) {
      Alert.alert('儲存失敗', '請稍後再試');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: Colors.background },
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={{ padding: 8, borderRadius: 8, backgroundColor: Colors.primary, marginRight: 4 }}>
          <FontAwesome5 name="check" size={22} color={Colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <ScrollView style={styles.container}>
      {/* 上方多分類 Tab */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)} style={[styles.tab, activeTab === idx && styles.activeTab]}>
            <FontAwesome5 name={tabIcon(tab)} size={18} color={activeTab === idx ? Colors.primary : Colors.text} style={{ marginBottom: 2 }} />
            <Text style={{ color: activeTab === idx ? Colors.primary : Colors.text, fontSize: 16 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 分類 icon 選擇區 */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSub={selectedSub}
        onCategorySelect={setSelectedCategory}
        onSubSelect={setSelectedSub}
      />
      {/* 金額輸入區 */}
      <TouchableOpacity style={styles.amountBox} onPress={() => setPadVisible(true)}>
        <Text style={styles.amountLabel}>TWD</Text>
        <Text style={styles.amountText}>{amount || '0'}</Text>
      </TouchableOpacity>
      {/* 插入圖片、名稱 */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.imgBtn} onPress={pickImage}>
          {img ? (
            <Image source={{ uri: img }} style={{ width: 36, height: 36, borderRadius: 8 }} />
          ) : (
            <FontAwesome5 name="camera" size={22} color={Colors.text} />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="名稱"
          placeholderTextColor={Colors.text}
        />
      </View>
      {/* 其餘欄位兩兩一排 */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <View style={{ width: '48%' }}>
          <TouchableOpacity style={styles.selectRow} onPress={() => setAccountPicker(true)}>
            <Text style={styles.selectValue}>{account}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '48%' }}>
          <TouchableOpacity style={styles.selectRow} onPress={() => setProjectPicker(true)}>
            <Text style={styles.selectValue}>{project}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={shop} onChangeText={setShop} placeholder="商家" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <TouchableOpacity style={styles.selectRow} onPress={() => setAdvVisible(true)}>
            <Text style={styles.selectValue}>{['單次', '週期', '分期'][advMode]}・{advMethod}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={date} onChangeText={setDate} placeholder="日期" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={time} onChangeText={setTime} placeholder="時間" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={invoice} onChangeText={setInvoice} placeholder="發票號碼" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={random} onChangeText={setRandom} placeholder="隨機碼" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={tags} onChangeText={setTags} placeholder="標籤" placeholderTextColor={Colors.text} />
          </View>
        </View>
        <View style={{ width: '48%' }}>
          <View style={styles.selectRow}>
            <TextInput style={styles.selectValueInput} value={note} onChangeText={setNote} placeholder="備註" placeholderTextColor={Colors.text} />
          </View>
        </View>
      </View>
      {/* Picker Modal */}
      <PickerModal visible={accountPicker} options={accounts} value={account} onSelect={setAccount} onClose={() => setAccountPicker(false)} title="選擇帳戶" />
      <PickerModal visible={projectPicker} options={projects} value={project} onSelect={setProject} onClose={() => setProjectPicker(false)} title="選擇專案" />
      <AdvancedPayModal visible={advVisible} mode={advMode} setMode={setAdvMode} method={advMethod} setMethod={setAdvMethod} onClose={() => setAdvVisible(false)} />
      <NumberPad visible={padVisible} value={amount} onChange={setAmount} onClose={() => setPadVisible(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  tabRow: { flexDirection: 'row', marginBottom: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, marginRight: 8 },
  activeTab: { backgroundColor: Colors.tabActive },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  catCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', margin: 6 },
  amountBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.backgroundSecondary, borderRadius: 10, padding: 16, marginBottom: 16 },
  amountLabel: { color: Colors.text, fontSize: 18, marginRight: 8 },
  amountText: { color: Colors.text, fontSize: 32, flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  imgBtn: { width: 40, height: 40, borderRadius: 8, backgroundColor: Colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  nameInput: { flex: 1, backgroundColor: Colors.backgroundSecondary, borderRadius: 8, color: Colors.text, fontSize: 18, paddingHorizontal: 12, height: 40 },
  selectRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.backgroundSecondary, borderRadius: 8, paddingHorizontal: 12, height: 44, marginBottom: 10 },
  selectLabel: { color: Colors.text, fontSize: 16 },
  selectValue: { color: Colors.text, fontSize: 16 },
  selectValueInput: { color: Colors.text, fontSize: 16, flex: 1, paddingLeft: 8 },
  padOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  padBox: { backgroundColor: Colors.background, padding: 12, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  padRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  padKey: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginHorizontal: 2, borderRadius: 8, backgroundColor: Colors.backgroundSecondary },
  padKeyText: { color: Colors.text, fontSize: 28 },
  padKeyOk: { backgroundColor: Colors.primary },
  padKeyOkText: { color: Colors.text },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: Colors.background, borderRadius: 16, padding: 24, width: 300, alignItems: 'center' },
  modalTitle: { color: Colors.text, fontSize: 20, marginBottom: 16 },
  modalOption: { paddingVertical: 12, alignItems: 'center' },
  modalCancel: { marginTop: 16, backgroundColor: Colors.backgroundSecondary, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 32 },
  modalOk: { marginTop: 16, backgroundColor: Colors.text, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 32 },
  advBox: { backgroundColor: Colors.background, borderRadius: 16, padding: 24, width: 320, alignItems: 'center' },
  advTabRow: { flexDirection: 'row', marginBottom: 12 },
  advTab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, marginRight: 8 },
  advTabActive: { backgroundColor: Colors.backgroundSecondary },
  advMethodBtn: { backgroundColor: Colors.backgroundSecondary, borderRadius: 8, padding: 10, marginTop: 8, alignItems: 'center' },
  backBtn: { padding: 8, borderRadius: 8, backgroundColor: Colors.backgroundSecondary, marginLeft: 4 },
  backBtnText: { color: Colors.text, fontSize: 22 },
  saveBtn: { padding: 8, borderRadius: 8, backgroundColor: Colors.primary, marginRight: 4 },
  saveBtnText: { color: Colors.text, fontSize: 22 },
});

function tabIcon(tab: string) {
  switch(tab) {
    case '建議': return 'star';
    case '支出': return 'minus-circle';
    case '收入': return 'plus-circle';
    case '轉帳': return 'exchange-alt';
    case '應收款項': return 'arrow-down';
    case '應付款項': return 'arrow-up';
    default: return 'circle';
  }
} 