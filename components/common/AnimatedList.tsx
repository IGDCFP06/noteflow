import { ReactElement, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';

import { EmptyState } from '@/components/common/EmptyState';
import { EstimatedFlashList } from '@/components/common/EstimatedFlashList';
import { Screen } from '@/components/common/Screen';
import { SearchHeader } from '@/components/common/SearchHeader';
import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { AnyNote } from '@/types';

interface AnimatedListProps<T extends AnyNote> {
  title: string;
  data: T[];
  placeholder: string;
  emptyIcon: Parameters<typeof EmptyState>[0]['icon'];
  emptyTitle: string;
  emptyDescription: string;
  estimatedItemSize: number;
  onCreate?: () => void;
  searchText: (item: T) => string;
  renderItem: (item: T) => ReactElement;
}

export function AnimatedList<T extends AnyNote>({
  title,
  data,
  placeholder,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  estimatedItemSize,
  onCreate,
  searchText,
  renderItem,
}: AnimatedListProps<T>) {
  const theme = useGluestackTheme();
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return data;
    }

    return data.filter((item) => searchText(item).toLowerCase().includes(normalized));
  }, [data, search, searchText]);

  return (
    <Screen>
      <SearchHeader title={title} search={search} placeholder={placeholder} onSearchChange={setSearch} onCreate={onCreate} />
      <EstimatedFlashList
        data={filteredData}
        keyExtractor={(item) => item.id}
        estimatedItemSize={estimatedItemSize}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, paddingBottom: 96 }}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
        ListEmptyComponent={<EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(Math.min(index, 8) * 40)} exiting={FadeOutLeft}>
            {renderItem(item)}
          </Animated.View>
        )}
      />
    </Screen>
  );
}
