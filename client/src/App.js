import { React, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Reserve = lazy(() => import('./pages/Reserve/Reserve'));

const App = () => {
  return (
    <div id="main-app">
      <Router>
        <Suspense>
          <Navbar />
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' index element={<Home />} /> */}
            <Route path='/reserve' element={<Reserve />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
