import { ImageBackground, View } from 'react-native'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { S } from './styles'
import { Button } from '@/components/button'

interface CoverProps {
  uri: string
}

export function Cover({ uri }: CoverProps) {
  return (
    <ImageBackground source={{ uri }} style={S.container}>
      <View style={S.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
