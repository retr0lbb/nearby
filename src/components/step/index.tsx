import { Text, View } from 'react-native'
import { S } from './styles'
import { colors } from '@/styles/theme'
import type { IconProps } from '@tabler/icons-react-native'

interface StepProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export function Step({ description, title, icon: Icon }: StepProps) {
  return (
    <View style={S.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}
      <View style={S.details}>
        <Text style={S.title}>{title}</Text>
        <Text style={S.description}>{description}</Text>
      </View>
    </View>
  )
}
