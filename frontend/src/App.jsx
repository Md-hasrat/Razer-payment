import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home'
import PaymentSuccess from './PaymentSuccess'

function App() {
  

  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
