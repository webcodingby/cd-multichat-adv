import { FC } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainLayout from '../components/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '@hoc/PrivateRoute';
import store from '../store/store';

import ChatPage from '../pages/chatPage/ChatPage';
import AuthPage from '../pages/authPage/AuthPage';

const App:FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <MainLayout>
        <Routes>
          <Route path='/' element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
          <Route path='/chat' element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
          <Route path='/auth' element={<AuthPage/>}/>
        </Routes>
      </MainLayout>
    </Provider>
  )
}

export default App;