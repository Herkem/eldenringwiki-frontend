// Imports
import { useLocation, Routes, Route } from 'react-router-dom'
import './styles/index.css'

// Importing components
import Header from './components/Header'
import Home from './components/Home'
import Main from './components/Main'
import Footer from './components/Footer'


// Component that manages the basic structure of the page
const App = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <main>
        {
          (location.pathname === '/') ?
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
            :
            <Main />
        }
      </main>
      <Footer />
    </>
  )
}

export default App
