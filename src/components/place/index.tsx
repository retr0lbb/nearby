import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native'
import { S } from './styles'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

export interface PlaceProps {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

interface Props extends TouchableOpacityProps {
  data: PlaceProps
}

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={S.container} {...rest}>
      <Image style={S.image} source={{ uri: data.cover }} />
      <View style={S.content}>
        <Text style={S.name}>{data.name}</Text>
        <Text style={S.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={S.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={S.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
