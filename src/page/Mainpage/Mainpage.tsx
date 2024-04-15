import axios from 'axios';
import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { itilUser } from '../../models/itil/itilUser';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import logo from '../../Image/logo.svg'
// import https from 'https'

import '../Mainpage/Mainpage.css'
import UserService from '../../services/UserService';
import Header from '../../Component/Header/Header';

const Mainpage = () => {
    const { store } = useContext(Context) 
    const navigate = useNavigate()

    const [itilUser, setItilUser] = useState<itilUser[]>([])

    async function getItilUser() {
        try {
            const responce = await UserService.getItilUser()

            console.log(responce);
            
            responce.data.map((item) => {
                if (item.email == localStorage.getItem('userEmail')) {
                    localStorage.setItem('UserName', item.name)
                    localStorage.setItem('UserUID', item.uid)

                    console.log(item);
                    

                }
                
                // if (localStorage.getItem('UserName') == "" || localStorage.getItem('UserName') == undefined) {
                //     window.location.reload()
                // }
            })

            // setItilUser(responce.data)
        } catch (e) {
            console.log(e);
        }
    }

    async function getOneCompany() {
        try {
            const responce = await UserService.getCompanyItil()

            // console.log(responce);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getItilUser()
    }, [])
           
    useEffect(() => {
        // setTimeout(() => {
            getOneCompany()
        // }, 10000)
    }, [])

    const navbarObj = {
        firstUl: true,
        secondUl: true,
        manyLink: 2,
        thirdUl: false,
        thirdUlAsBurger: false,
        getOut: true,
        getWelcom: false,
        pageName: 'Mainpage',
        lastLiEmpty: false,
        lastLiIsLogOut: true, 
        linkList: ['Мои задачи /mytask', 'Создать задачу /'],
        changeBurger: null 
    }

    // async function useNavigateFunc() {
    //     () => navigate('/')
    // }

    // if (!store.isAuth) {
    //     useEffect(() => {
    //       useNavigateFunc()
    //     }, [])
    // }
    

  return (
    <div className='MainpageAllContainer'>
        <Header navbarObj={navbarObj} />

        <div className='MainpageContainer'>
            <div className='MainpageNewsBlock'>
                
                <div className='MainpageNewsTitelBlock'>
                    <h1>Добро пожаловать в блок новостей!</h1>
                </div>

                <div className='MainpageNewsInfoBlock'>
                    <h1> К сожалению в данный момент <br />
                              новостей нет </h1>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Mainpage


 