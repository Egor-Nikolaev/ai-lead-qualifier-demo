import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Pipeline from './pages/Pipeline'
import Result from './pages/Result'
import Metrics from './pages/Metrics'
import HowItWorks from './pages/HowItWorks'

export default function App() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/pipeline/:id" element={<Pipeline />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/how" element={<HowItWorks />} />
        </Routes>
      </main>
      <footer className="mt-24 border-t hairline">
        <div className="mx-auto max-w-[1120px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-ink-4">
          <span>Portfolio demo · AI Lead Qualifier · 2026</span>
          <div className="flex items-center gap-5">
            <a className="hover:text-ink transition-colors" href="https://github.com" target="_blank" rel="noreferrer">Source</a>
            <span>Built with React, Vite, Tailwind, Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
