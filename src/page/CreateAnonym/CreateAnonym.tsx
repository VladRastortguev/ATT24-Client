import axios from 'axios'
import React, { FC, useContext, useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'
import logo from '../../Image/logo.svg'
import '../Create1C/Create1C.css'
import '../CreateTeh/CreateTeh.css'
import '../CreateAho/CreateAho.css'
import '../CreateAnonym/CreateAnonym.css'

import '../../style.css'
import Header from '../../Component/Header/Header'

const CreateAnonym:FC = () => {
    const [service, setService]               = useState("")
    const [podService, setPodService]         = useState("")
    const [taskName, setTaskName]             = useState("")
    const [username, setUsername]             = useState("")
    const [email, setEmail]                   = useState("")
    const [phone, setPhone]                   = useState("")
    const [company, setCompany]               = useState("")
    const [influence, setInfluence]           = useState("")
    const [influenceDescr, setInfluenceDescr] = useState("")
    const [urgency, setUrgancy]               = useState("")
    const [urgencyDescr, setUrgancyDescr]     = useState("")
    const [description, setDescription]       = useState("")

    const API_TASKS = 'http://192.168.2.26:35421/itil_att/hs/taskapi/settask'

    const { store } = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.checkAuth()
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    async function setStateIsAuth() {
        setUsername(String(localStorage.getItem('UserName')))
        setEmail(String(localStorage.getItem('userEmail')))
        setCompany(String(localStorage.getItem('company')))
    }


    async function setNewTask() {
        
        if (
            !taskName.trim()       ||
            !description.trim()) {
            
            alert("Заполните все поля!")
            return
        }

        let taskObj = [
            {
                ТипЗадачи             : "Анонимное письмо",
                Наименование          : taskName,
                Описание              : description
            }
        ]

        store.setLoading(true)

        try {
            const res = AuthService.setNewTask(taskObj)

            console.log(res);
        } catch (e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }

        alert("Задача создана!")

        setTaskName       ("")
        setDescription    ("")
    }

    console.log(store.isAuth);
    

    // if (store.isLoading) {
    //     return (
    //         <div>
    //             Загрузка...
    //         </div>
    //     )
    // }

    const navbarObj = {
        firstUl: true,
        secondUl: false,
        manyLink: 3,
        thirdUl: false,
        thirdUlAsBurger: false,
        getOut: false,
        getWelcom: false,
        pageName: 'Create',
        lastLiEmpty: false,
        lastLiIsLogOut: false, 
        linkList: ['Мои задачи /mytask', 'Создать задачу /', 'Новости /mainpage'],
        changeBurger: null 
    }

    return (
        <div className='CreateAllContainer'>
            {/* <div className='CreateHeader'>
                <div className='CreateHeaderContainer'>
                    <ul className='CreateNavbar'>
                        <li className='CreateLogo' onClick={() => navigate('/')}><a><img src={logo} /></a></li>
                    </ul>
                </div>
            </div> */}

            <Header navbarObj={navbarObj} />

            <div className='CreateContainer'>
                <div className='CreateBlock'>
                    <div className='CreateTitel'>
                        <p>Анонимное письмо</p>
                    </div>

                    <div className='CreaeteInputs'>
                        <div className={`CreateOnlyTitelBlock ${store.isAuth ? 'CreateTitelBlockAuth' : 'CreateTitelBlockNoAuth'}`}>
                            <div>
                                <p className='CreateTaskNameTitel'>Тема письма:</p>
                            </div>

                            <div>
                                <p className='CreateDescriptionTitel'>Опишите Вашу проблему:</p>
                            </div>
                        </div>

                        <div className={`CreateOnlyInputBlock ${store.isAuth ? 'CreateInputBlockAuth' : 'CreateInputBlockNoAuth'}`}>
                            <div>
                                <input
                                    className='CreateTaskName' 
                                    type="text" 
                                    placeholder='Наименование...'
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}/>
                            </div>                                         
                        
                            <div>
                                <textarea
                                    name="description" 
                                    className='CreateDescription'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>  
                        </div>

                        <div className='CreateButtonBlock'>
                            <button className='CreateSendTaskBtn CreateBtn' onClick={() => setNewTask()}>Отправить</button>
                        </div>                                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(CreateAnonym)