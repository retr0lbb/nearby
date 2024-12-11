import { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { api } from '@/services/api'
import { Categories, type CategoriesProps } from '@/components/categories'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        payLoad={categories}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />
    </View>
  )
}
