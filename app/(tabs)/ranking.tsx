import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { Trophy, Medal } from 'lucide-react-native';

const MOCK_RANKING = [
  { id: '1', name: 'Zofia K.', xp: 1250, rank: 1 },
  { id: '2', name: 'Andrzej M.', xp: 1100, rank: 2 },
  { id: '3', name: 'Ty (Strażnik)', xp: 0, rank: 3, isUser: true },
  { id: '4', name: 'Krystyna W.', xp: 950, rank: 4 },
  { id: '5', name: 'Janusz P.', xp: 800, rank: 5 },
];

export default function RankingScreen() {
  const { colors } = useTheme();
  // In a real app we would get user XP here

  const renderItem = ({ item }: { item: any }) => (
    <AppCard
      style={[
        styles.rankItem,
        item.isUser && { borderColor: colors.primary, borderWidth: 2 }
      ]}
    >
      <View style={styles.rankBadge}>
        {item.rank <= 3 ? (
          <Medal color={item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32'} size={32} />
        ) : (
          <AppText size={20} bold color="#666">{item.rank}</AppText>
        )}
      </View>
      <AppText size={20} bold style={styles.name}>{item.name}</AppText>
      <AppText size={18} bold color={colors.primary}>{item.xp} XP</AppText>
    </AppCard>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Trophy color={colors.warning} size={40} />
        <AppText size={28} bold style={{ marginLeft: 15 }}>Liga Strażników</AppText>
      </View>

      <FlatList
        data={MOCK_RANKING}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  listContent: {
    padding: 20,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
  },
  rankBadge: {
    width: 50,
    alignItems: 'center',
  },
  name: {
    flex: 1,
    marginLeft: 15,
  }
});
