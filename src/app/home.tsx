import { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { api } from '@/services/api'
import { Categories, type CategoriesProps } from '@/components/categories'
import type { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

interface MarketProps extends PlaceProps {}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [markets, setMarkets] = useState<MarketProps[]>([])

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

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <Categories
        payLoad={categories}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />

      <Places data={markets} />
    </View>
  )
}
