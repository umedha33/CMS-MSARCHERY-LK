import './App.css';
import AdminDash from './Pages/AdminDash';
import EcomDash from './Pages/EcomDash';
import LoginPage from './Pages/LoginPage';
import ManagerDash from './Pages/ManagerDash';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/admin' element={<AdminDash />}></Route>
          <Route path='/manager' element={<ManagerDash />}></Route>
          <Route path='/ecom' element={<EcomDash />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
