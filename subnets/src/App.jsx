import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './contexts/ProgressContext'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home'
import Module from './pages/Module'
import Progress from './pages/Progress'
import './App.css'

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module/:id" element={<Module />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </Layout>
      </Router>
    </ProgressProvider>
  )
}

export default App