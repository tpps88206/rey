import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

export default function Calendar({ selected, onSelect }: { selected: string, onSelect: (date: string) => void }) {
  const today = new Date();
  const [current, setCurrent] = useState(() => {
    const d = selected ? new Date(selected) : today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const daysInMonth = getDaysInMonth(current.year, current.month);
  const firstDay = getFirstDayOfWeek(current.year, current.month);

  // 產生日期陣列
  const days: (number | null)[] = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  while (days.length % 7 !== 0) days.push(null);

  // 處理日期點擊
  const handleSelect = (day: number | null) => {
    if (!day) return;
    const m = (current.month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    onSelect(`${current.year}-${m}-${d}`);
  };

  // 判斷高亮
  const selectedDate = selected ? new Date(selected) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrent(c => ({
          year: c.month === 0 ? c.year - 1 : c.year,
          month: c.month === 0 ? 11 : c.month - 1
        }))}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{current.year}年{current.month + 1}月</Text>
        <TouchableOpacity onPress={() => setCurrent(c => ({
          year: c.month === 11 ? c.year + 1 : c.year,
          month: c.month === 11 ? 0 : c.month + 1
        }))}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {weekDays.map(w => <Text key={w} style={styles.weekDay}>{w}</Text>)}
      </View>
      {Array.from({ length: days.length / 7 }).map((_, row) => (
        <View style={styles.weekRow} key={row}>
          {days.slice(row * 7, row * 7 + 7).map((day, idx) => {
            const isSelected = selectedDate &&
              selectedDate.getFullYear() === current.year &&
              selectedDate.getMonth() === current.month &&
              selectedDate.getDate() === day;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.dayCell, isSelected && styles.selectedDay]}
                onPress={() => handleSelect(day)}
                disabled={!day}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText, !day && styles.dayDim]}>{day ? day : ''}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#232936', borderRadius: 12, padding: 8, marginBottom: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { color: '#fff', fontSize: 18 },
  arrow: { color: '#fff', fontSize: 20, paddingHorizontal: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  weekDay: { color: '#aaa', width: 32, textAlign: 'center', marginVertical: 2 },
  dayCell: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginVertical: 2 },
  dayText: { color: '#fff', fontSize: 16 },
  dayDim: { color: '#555' },
  selectedDay: { backgroundColor: '#4A90E2' },
  selectedDayText: { color: '#fff', fontWeight: 'bold' },
}); 