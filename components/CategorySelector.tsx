import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const ITEM_PER_ROW = 4;
const GAP = 12;
const ITEM_SIZE = Math.floor((Dimensions.get('window').width - GAP * (ITEM_PER_ROW + 1)) / ITEM_PER_ROW);

export default function CategorySelector({ categories, selectedCategory, selectedSub, onCategorySelect, onSubSelect }: Props) {
  const [showSub, setShowSub] = useState(false);
  const current = categories[selectedCategory] || categories[0];

  // 主類別 Grid
  if (!showSub) {
    return (
      <View style={styles.gridWrap}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.gridItem,
              { width: ITEM_SIZE, height: ITEM_SIZE + 24, marginLeft: idx % ITEM_PER_ROW === 0 ? 0 : GAP },
            ]}
            onPress={() => {
              onCategorySelect(idx);
              setShowSub(true);
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: cat.color, borderWidth: selectedCategory === idx ? 3 : 0, borderColor: '#3578E5' }]}> 
              <FontAwesome5 name={cat.icon} size={28} color="#fff" />
            </View>
            <Text style={styles.gridText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // 子類別 Grid
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setShowSub(false)}>
        <FontAwesome5 name="chevron-left" size={18} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 4 }}>返回</Text>
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 12 }}>{current.name}</Text>
      </TouchableOpacity>
      <View style={styles.gridWrap}>
        {current.children.map((sub, idx) => (
          <TouchableOpacity
            key={sub.name}
            style={[
              styles.gridItem,
              { width: ITEM_SIZE, height: ITEM_SIZE + 24, marginLeft: idx % ITEM_PER_ROW === 0 ? 0 : GAP },
            ]}
            onPress={() => {
              onSubSelect(idx);
              setShowSub(false);
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: current.color, borderWidth: selectedSub === idx ? 3 : 0, borderColor: '#3578E5' }]}> 
              <FontAwesome5 name={sub.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.gridText}>{sub.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginTop: 8,
  },
  gridItem: {
    alignItems: 'center',
    marginBottom: GAP,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: '#888',
  },
  gridText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginLeft: 4 },
}); 