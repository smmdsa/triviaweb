import { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Settings, BarChart3 } from 'lucide-react'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-white border-r border-gray-200 p-4 space-y-4">
        <h1 className="text-xl font-semibold">Trivia Admin</h1>
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/trivias" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <BarChart3 size={18} /> Trivias
          </Link>
          <Link href="/settings" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}