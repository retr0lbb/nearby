import { useEffect, useRef, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { api } from '@/services/api'
import { Categories, type CategoriesProps } from '@/components/categories'
import type { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { colors, fontFamily } from '@/styles/theme'

interface MarketProps extends PlaceProps {
  latitude: number
  longitude: number
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [markets, setMarkets] = useState<MarketProps[]>([])

  const mapRef = useRef<MapView>(null)

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync({})
        console.log(location)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setSelectedCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Nao foi possivel buscar as categorias')
    }
  }

  async function fetchMarkets() {
    try {
      if (!selectedCategory) {
        return
      }
      const { data } = await api.get(`/markets/category/${selectedCategory}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Lugares', 'Nao foi possivel buscar os lugares')
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchCategories()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchMarkets()
  }, [selectedCategory])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        zoom: 16,
      })
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <Categories
        payLoad={categories}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {markets.map(item => {
          return (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require('@/assets/pin.png')}
            >
              <Callout>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.gray[600],
                      fontFamily: fontFamily.medium,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.gray[600],
                      fontFamily: fontFamily.regular,
                    }}
                  >
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
