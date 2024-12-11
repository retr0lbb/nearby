import { ActivityIndicator, View, FlatList } from 'react-native'
import { S } from './styles'
import { colors } from '@/styles/theme'
import { Category } from '../category'

export interface CategoriesProps {
  id: string
  name: string
}

interface CategoriesPropsPayload {
  payLoad: CategoriesProps[]
  selected: string
  onSelect: (id: string) => void
}

export function Categories({
  payLoad,
  selected,
  onSelect,
}: CategoriesPropsPayload) {
  return (
    <FlatList
      data={payLoad}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={S.content}
      style={S.container}
    />
  )
}
