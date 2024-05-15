import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { Signup } from './pages/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import { MyOrder } from './pages/MyOrder.jsx';
import { Succcess } from './components/Succcess.jsx';
import { Failed } from './components/Failed.jsx';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/createuser" element={<Signup />}></Route>
            <Route exact path="/myorder" element={<MyOrder />}></Route>
            <Route exact path="/success" element={<Succcess />}></Route>
            <Route exact path="/failed" element={<Failed />}></Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
