import { Alert, Text, View, Modal, StatusBar, ScrollView } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { api } from '@/services/api'
import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { useEffect, useRef, useState } from 'react'
import { Details, type DetailsProps } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'
import { useCameraPermissions, CameraView } from 'expo-camera'

interface dataProps extends DetailsProps {
  cover: string
}
export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  console.log(params.id)
  const [marketData, setMarketData] = useState<dataProps>()
  const [isPending, setIsPending] = useState(true)
  const [coupon, setCoupons] = useState<string | null>(null)
  const [couponIsFetching, setCouponIsFetching] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [_, requstPermission] = useCameraPermissions()
  const qrcodeLock = useRef(false)

  async function handleOpenModalCamera() {
    try {
      const { granted } = await requstPermission()

      if (!granted) {
        Alert.alert('Erro', 'sem permisao de camera')
      }

      qrcodeLock.current = false

      setIsModalOpen(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Nao foi possivel abrir a camera')
    }
  }

  async function fetchMarket() {
    try {
      setIsPending(true)
      const { data } = await api.get(`/markets/${params.id}`)
      setMarketData(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro ao buscar local especificado', [
        { text: 'Ok', onPress: () => router.back() },
      ])
    } finally {
      setIsPending(false)
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch(`/coupons/${id}`)
      Alert.alert('Cupom', data.coupon)
      setCoupons(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'nao foi possivel ler o qrcode')
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsModalOpen(false)
    Alert.alert(
      'Cupom',
      'Nao e possivel reultilizar um cupom resgatado. Deseja resgatar o cupon?',
      [
        { style: 'cancel', text: 'Nao' },
        { text: 'Sim', onPress: () => getCoupon(id) },
      ]
    )
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isPending) {
    return <Loading />
  }

  if (!marketData) {
    return <Redirect href={'/home'} />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} hidden={isModalOpen} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={marketData.cover} />
        <Details data={marketData} />
        {coupon !== null && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32, flex: 1, justifyContent: 'flex-end' }}>
        <Button onPress={handleOpenModalCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isModalOpen}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrcodeLock.current) {
              qrcodeLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />
        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsModalOpen(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
