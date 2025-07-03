import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface CategoryChild {
  name: string;
  icon: string;
}
export interface Category {
  name: string;
  color: string;
  icon: string;
  children: CategoryChild[];
}

interface Props {
  categories: Category[];
  selectedCategory: number;
  selectedSub: number;
  onCategorySelect: (idx: number) => void;
  onSubSelect: (idx: number) => void;
}

export default function CategorySelector({ categories, selectedCategory, selectedSub, onCategorySelect, onSubSelect }: Props) {
  const [showSub, setShowSub] = useState(false);
  const current = categories[selectedCategory] || categories[0];

  // 主類別畫面
  if (!showSub) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={cat.name}
            style={[styles.catCircle, { backgroundColor: cat.color, borderWidth: selectedCategory === idx ? 3 : 0, borderColor: '#3578E5' }]}
            onPress={() => {
              onCategorySelect(idx);
              setShowSub(true);
            }}
          >
            <FontAwesome5 name={cat.icon} size={28} color="#fff" style={{ marginBottom: 4 }} />
            <Text style={{ color: '#fff', fontSize: 14 }}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // 子類別畫面
  return (
    <View style={styles.subList}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setShowSub(false)}>
        <FontAwesome5 name="chevron-left" size={18} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 4 }}>返回</Text>
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 12 }}>{current.name}</Text>
      </TouchableOpacity>
      {current.children.map((sub, idx) => (
        <TouchableOpacity
          key={sub.name}
          style={[styles.subRow, { backgroundColor: selectedSub === idx ? current.color : '#2C3442' }]}
          onPress={() => {
            onSubSelect(idx);
            setShowSub(false);
          }}
        >
          <FontAwesome5 name={sub.icon} size={22} color="#fff" style={{ marginRight: 12 }} />
          <Text style={{ color: '#fff', fontSize: 18 }}>{sub.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  catRow: { flexDirection: 'row', marginBottom: 8 },
  catCircle: { width: 80, height: 80, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10, padding: 6 },
  subList: { marginTop: 8 },
  subRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 12, marginBottom: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
}); 