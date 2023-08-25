import { FC } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainLayout from '../components/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '@hoc/PrivateRoute';
import store from '../store/store';
import ROUTES from '@data/routes';
import AppProvider from '@components/AppProvider/AppProvider';

import ChatPage from '../pages/chatPage/ChatPage';
import AuthPage from '../pages/authPage/AuthPage';
import StatPage from '@pages/statPage/StatPage';


const App:FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <AppProvider>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.authPage} element={<AuthPage/>}/>

            <Route path='/' element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
            <Route path={ROUTES.chatPage} element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
            <Route path={ROUTES.statPage} element={<PrivateRoute><StatPage/></PrivateRoute>}/>
          </Routes>
        </MainLayout>
      </AppProvider>
    </Provider>
  )
}

export default App;