import React, {FC, useEffect, useContext, useState} from 'react';
import { Context } from './index';
import {observer} from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import MainRoutes from './Route/MainRoutes'
  
const App: FC = () => {

  // const {store} = useContext(Context)
  // const [users, setUsers] = useState<IUser[]>([]);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     store.checkAuth()
  //   }
  // }, [])  

  // async function getUsers() {
  //   try{
  //     const response = await UserService.fetchUsers();
  //     setUsers(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // if (store.isLoading) {
  //   return <div>...Загрузка</div>
  // }

  // if (!store.isAuth) {
  //   return (
  //     <div>
  //       <LoginForm />

  //       <button onClick={getUsers}>Получить Пользователей</button>
  //     </div>
  //   )
  // } 

  return (
    <MainRoutes />
  )
}

export default observer(App);
