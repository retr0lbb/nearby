import { View, Text } from 'react-native'
import { IconTicket } from '@tabler/icons-react-native'
import { S } from './styles'
import { colors } from '@/styles/colors'

interface CouponProps {
  code: string
}

export function Coupon({ code }: CouponProps) {
  return (
    <View style={S.container}>
      <Text style={S.title}>Ultilize esse cupom</Text>

      <View style={S.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={S.code}>{code}</Text>
      </View>
    </View>
  )
}
