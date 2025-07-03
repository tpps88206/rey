import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const GAP = 10;
const MIN_ITEM_SIZE = 64;

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
              { backgroundColor: 'transparent' },
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

  // 子類別 Grid，第一個為返回
  return (
      <View style={styles.gridWrap}>
        <TouchableOpacity
            style={[styles.gridItem, { backgroundColor: 'transparent' }]}
            onPress={() => setShowSub(false)}
            activeOpacity={0.8}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#444', borderWidth: 0 }]}>
            <FontAwesome5 name="chevron-left" size={24} color="#fff" />
          </View>
          <Text style={styles.gridText}>返回</Text>
        </TouchableOpacity>
        {current.children.map((sub, idx) => (
            <TouchableOpacity
                key={sub.name}
                style={[
                  styles.gridItem,
                  { backgroundColor: 'transparent' },
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
  );
}

const styles = StyleSheet.create({
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  gridItem: {
    alignItems: 'center',
    marginBottom: GAP,
    marginRight: GAP,
    flexBasis: 'auto',
    flexGrow: 1,
    minWidth: MIN_ITEM_SIZE,
    maxWidth: MIN_ITEM_SIZE,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: '#888',
  },
  gridText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
}); 