'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Tags, 
  Image as ImageIcon, 
  Globe, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { logout } from './login/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Add Blog', href: '/admin/blogs/new', icon: PlusCircle },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden bg-charcoal-900 text-white flex items-center justify-between p-4 sticky top-0 z-50">
        <span className="font-serif font-bold text-lg">Yasoda Builders CMS</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-charcoal-900 text-gray-300 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-white/10 hidden md:flex">
          <span className="font-serif font-bold text-xl text-white">Yasoda Builders CMS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center px-3 py-2.5 rounded-[2px] text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-forest-800 text-white' 
                    : 'hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center px-3 py-2.5 rounded-[2px] text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
          >
            <Globe className="mr-3 h-5 w-5 text-gray-400" />
            View Website
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center w-full px-3 py-2.5 rounded-[2px] text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="hidden md:flex bg-white h-16 border-b border-gray-200 items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-serif text-charcoal-900 font-semibold">
            {navigation.find(n => pathname === n.href || (pathname.startsWith(n.href) && n.href !== '/admin'))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">Admin Session Active</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-stone-50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
