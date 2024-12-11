import { View, Text } from 'react-native'
import { Welcome } from '@/components/welcome'
import { Steps } from '@/components/steps'
import { Button } from '@/components/button'
import { IconMathFunctionY } from '@tabler/icons-react-native'
export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />
      <Button activeOpacity={0.7}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  )
}
