import { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

interface Trivia {
  id: string
  title: string
  questions: { id: string; text: string; options: string[] }[]
}

export default function Home() {
  const [trivia, setTrivia] = useState<Trivia | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const load = async () => {
      const cached = await SecureStore.getItemAsync('trivia')
      if (cached) {
        setTrivia(JSON.parse(cached))
      }
      const res = await fetch(`${Constants.expoConfig?.extra?.API_URL}/trivias/demo/embed`)
      const json = await res.json()
      setTrivia(json)
      await SecureStore.setItemAsync('trivia', JSON.stringify(json))
    }
    load()
  }, [])

  if (!trivia) return <ActivityIndicator style={{ flex: 1 }} />

  const q = trivia.questions[index]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trivia.title}</Text>
      <Text style={styles.question}>{q.text}</Text>
      {q.options.map((opt) => (
        <Pressable key={opt} style={styles.option} onPress={() => setIndex(index + 1)}>
          <Text>{opt}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  question: { fontSize: 18, marginBottom: 12 },
  option: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8 },
})