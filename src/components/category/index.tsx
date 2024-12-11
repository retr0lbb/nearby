import { Text, Pressable, type PressableProps } from 'react-native'
import { S } from './styles'
import { categoriesIcons } from '@/utils/categories-icons'
import { colors } from '@/styles/colors'

interface CategoryProps extends PressableProps {
  iconId: string
  isSelected?: boolean
  name: string
}

export function Category({
  name,
  iconId,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const Icon = categoriesIcons[iconId]
  return (
    <Pressable
      style={[S.container, isSelected && S.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[S.name, isSelected && S.nameSelected]}>{name}</Text>
    </Pressable>
  )
}
