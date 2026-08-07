import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import TargetCursor from './components/TargetCursor'

import Hero from './pages/Hero'
import Minds from './pages/Minds'
import MindDetail from './pages/MindDetail'
import Events from './pages/Events'
import Blitz from './pages/Blitz'
import BlitzChallenge from './pages/BlitzChallenge'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isChallenge = location.pathname.match(/^\/blitz\/.+/)
  const hideNavAndFooter = location.pathname.startsWith('/minds/') || isChallenge
  
  return (
    <SmoothScroll>
      {!isChallenge && <TargetCursor />}
      {!hideNavAndFooter && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/minds" element={<Minds />} />
          <Route path="/minds/:slug" element={<MindDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blitz" element={<Blitz />} />
          <Route path="/blitz/:slug" element={<BlitzChallenge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!hideNavAndFooter && <Footer />}
    </SmoothScroll>
  )
}

export default App
