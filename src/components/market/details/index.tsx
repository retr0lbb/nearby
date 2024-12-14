import { View, Text } from 'react-native'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'
import { S } from './styles'
import { Info } from '../info'

export interface DetailsProps {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

interface Props {
  data: DetailsProps
}
export function Details({ data }: Props) {
  return (
    <View style={S.container}>
      <Text style={S.name}>{data.name}</Text>
      <Text style={S.description}>{data.description}</Text>
      <View style={S.group}>
        <Text style={S.title}>Informacoes</Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponiveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={S.group}>
        <Text style={S.title}>Regulamento</Text>

        {data.rules.map(rule => {
          return (
            <Text key={rule.id} style={S.rules}>
              {`\u2022 ${rule.description}`}
            </Text>
          )
        })}
      </View>
    </View>
  )
}
