import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Text,
  type TextProps,
  ActivityIndicator,
  View,
  useWindowDimensions,
} from 'react-native'
import { S } from './styles'
import { colors } from '@/styles/theme'
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { type PlaceProps, Place } from '../place'
import { useRef } from 'react'

interface PlacesProps {
  data: PlaceProps[]
}
export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={S.indicator}
      backgroundStyle={S.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={S.content}
        ListHeaderComponent={() => (
          <Text style={S.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  )
}
