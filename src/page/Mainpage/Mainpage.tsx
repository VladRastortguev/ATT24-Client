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

const Mainpage = () => {
    const { store } = useContext(Context) 
    const navigate = useNavigate()

    const [itilUser, setItilUser] = useState<itilUser[]>([])

    async function getItilUser() {
        try {
            const responce = await UserService.getItilUser()

            setItilUser(responce.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getItilUser()

        itilUser.map((item, index) => {
            if (item.email == localStorage.getItem('userEmail')) {
                localStorage.setItem('UserName', item.name)
                localStorage.setItem('UserUID', item.uid)
            }
        })
    }, [])
    

    // login: string


    // async function getItilUser() {
    //     store.setLoading(true)

    //     try {
    //         const response = await axios.get(`http://192.168.2.26:35421/itil_att/hs/taskapi/users`, {
    //             auth: {
    //                 username: 'WebInterface',
    //                 password: '90nexuB'
    //             }
    //         })   
            
    //         

    //     } catch(e) {
    //         console.log(e);            
    //     } finally {
    //         store.setLoading(false)
    //     }
    // }

    // async function getCompany() {
    //     store.setLoading(true)
        
    //     try {

    //         const response = await axios.get(`http://192.168.2.26:35421/itil_att/hs/taskapi/company/${String(localStorage.getItem('UserUID'))}`, {
    //             auth: {
    //                 username: 'WebInterface',
    //                 password: '90nexuB' 
    //             }
    //         })

    //         response.data.map((item, index) => {
    //             localStorage.setItem('company', item.Организация)
    //         })

    //         console.log(response);

    //     } catch(e) {

    //     } finally {
    //         store.setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     getItilUser()
    //     getCompany()
    //     // window.location.reload
    // }, [])

    // console.log(localStorage.getItem('UserName'));

  return (
    <div className='MainpageAllContainer'>
        <div className='MainpageHeader'>
            <div className='MainpageHeaderContainer'>
                <ul className='MainpageNavbar'>
                    <li className='MainpageLogo'> <img src={logo}/></li>

                    <li className='MainpageTasks' onClick={() => navigate('/mytask')}>Мои задачи</li>

                    <li>
                        <button className='logout' onClick={() => {
                            store.logout()
                            navigate("/")
                        }}>Выйти</button> 
                    </li>
                </ul>
            </div>
        </div>

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


 