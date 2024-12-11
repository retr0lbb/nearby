import { Image, Text, View } from 'react-native'
import { S } from './styles'

export function Welcome() {
  return (
    <View>
      <Image source={require('@/assets/logo.png')} style={S.logo} />

      <Text style={S.title}>Boas vindas ao Nearby!</Text>

      <Text style={S.subtitle}>
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
      </Text>
    </View>
  )
}
