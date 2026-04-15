import './App.css'
import { BuilderPage } from './pages/BuilderPage'
import { Home } from './pages/Home'
import { ReviewPage } from './pages/ReviewPage'
import {Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/review' element={<BuilderPage/>}/>
      <Route path='/buidler' element={<ReviewPage/>}/>
    </Routes>

    <Home/>
    </>
  )
}

export default App
