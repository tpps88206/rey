import { StyleSheet, Text, View } from 'react-native';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>年度報表</Text>
      <Text style={styles.section}>總覽</Text>
      <Text style={styles.stat}>支出：$1,241,924</Text>
      <Text style={styles.stat}>收入：$1,748,033</Text>
      <Text style={styles.section}>類別圓餅圖（模擬）</Text>
      <Text style={styles.pie}>家居 43.9% | 飲食 13.1% | 其他 11.8%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 16 },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
  section: { color: '#fff', fontSize: 18, marginTop: 16 },
  stat: { color: '#9F9', fontSize: 16, marginTop: 8 },
  pie: { color: '#F5C16C', fontSize: 16, marginTop: 8 },
}); 