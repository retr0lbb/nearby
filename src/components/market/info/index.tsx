import { Text, View } from 'react-native'
import type { IconProps } from '@tabler/icons-react-native'
import { S } from './styles'
import { colors } from '@/styles/theme'

interface InfoProps {
  description: string
  icon: React.ComponentType<IconProps>
}

export function Info({ description, icon: Icon }: InfoProps) {
  return (
    <View style={S.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={S.text}>{description}</Text>
    </View>
  )
}
