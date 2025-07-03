import { StyleSheet, Text, View } from 'react-native';

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>更多功能</Text>
      <Text style={styles.item}>備份 / 還原</Text>
      <Text style={styles.item}>電子發票（台灣限定）</Text>
      <Text style={styles.item}>設定</Text>
      <Text style={styles.item}>週期事件</Text>
      <Text style={styles.item}>分期事件</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232936', padding: 16 },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
  item: { color: '#fff', fontSize: 18, marginVertical: 8 },
}); 