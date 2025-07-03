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
  const current = categories[selectedCategory] || categories[0];
  return (
    <View>
      {/* 大類別橫向選擇 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={cat.name}
            style={[styles.catCircle, { backgroundColor: cat.color, borderWidth: selectedCategory === idx ? 3 : 0, borderColor: '#3578E5' }]}
            onPress={() => onCategorySelect(idx)}
          >
            {/* 這裡可用 icon 套件替換 */}
            <Text style={{ color: '#fff', fontSize: 20 }}>{cat.icon ? '🍔' : cat.name[0]}</Text>
            <Text style={{ color: '#fff', fontSize: 14, marginTop: 2 }}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 子類別直向選擇 */}
      <View style={styles.subList}>
        {current.children.map((sub, idx) => (
          <TouchableOpacity
            key={sub.name}
            style={[styles.subRow, { backgroundColor: selectedSub === idx ? current.color : '#2C3442' }]}
            onPress={() => onSubSelect(idx)}
          >
            {/* 這裡可用 icon 套件替換 */}
            <Text style={{ color: '#fff', fontSize: 20, marginRight: 12 }}>{sub.icon ? '🍕' : sub.name[0]}</Text>
            <Text style={{ color: '#fff', fontSize: 18 }}>{sub.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catRow: { flexDirection: 'row', marginBottom: 8 },
  catCircle: { width: 80, height: 80, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10, padding: 6 },
  subList: { marginTop: 8 },
  subRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 12, marginBottom: 8 },
}); 