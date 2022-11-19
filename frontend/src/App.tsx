import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import {useAppDispatch} from './hooks/hooks';
import {init} from './store/tokenSlice';

/**
 *
 * @return {JSX.Element} root application component
 */
function App() {
  const dispatch = useAppDispatch();
  dispatch(init());

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Index/>}
        />
        <Route path='/login' element={
          <Login/>}
        />
        <Route path='/register' element={
          <Register/>}
        />
        <Route path='/dashboard' element={
          <RequireAuth><Dashboard/></RequireAuth>}
        />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
