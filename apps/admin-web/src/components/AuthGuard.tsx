import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <p>Checking auth…</p>
  return <>{children}</>
}