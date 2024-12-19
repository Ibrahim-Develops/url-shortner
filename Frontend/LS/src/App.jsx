import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home'
import UrlShort from './Components/UrlShort';
import UserUrls from './Components/UserUrls';
import AllUrls from './Components/AllUrls';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />}>

          <Route path='shorturl' element={<UrlShort />} />
          <Route path='userurls' element={<UserUrls />} />
          <Route path='allurls' element={<AllUrls />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
