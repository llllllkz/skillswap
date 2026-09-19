import { Routes, Route } from 'react-router'
import { Navbar } from '@/components/Navbar'
import Home from '@/pages/Home'
import Square from '@/pages/Square'
import Publish from '@/pages/Publish'
import Match from '@/pages/Match'
import Swaps from '@/pages/Swaps'
import Profile from '@/pages/Profile'
import Product from '@/pages/Product'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/square" element={<Square />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/match" element={<Match />} />
          <Route path="/swaps" element={<Swaps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<Product />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="border-t bg-slate-50 py-6 text-center text-xs text-slate-400">
        技换 SkillSwap · 用你会的，换你想学的 · 课程设计原型演示
      </footer>
    </div>
  )
}
