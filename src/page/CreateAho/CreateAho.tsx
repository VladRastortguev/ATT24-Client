import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'
import logo from '../../Image/logo.svg'
import { observer } from 'mobx-react-lite'
import AuthService from '../../services/AuthService'

const CreateAho = () => {
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

    useEffect(() => {
        store.setLoading(true)
        const setEmptyInput = async () => {
            try {
                if (store.isAuth) {
                    await setStateIsAuth()
                } 
            } catch(e) {
                console.log(e);
            } finally {
                store.setLoading(false)
            }
        }

        setEmptyInput()
    }, [])

    async function setNewTask() {
        
        if (
            !podService.trim()     ||
            !taskName.trim()       ||
            // !username.trim()       ||
            // !email.trim()          ||
            // !phone.trim()          ||
            // !company.trim()        ||
            !influence.trim()      ||
            !influenceDescr.trim() ||
            !urgency.trim()        ||
            !urgencyDescr.trim()   ||
            !description.trim()) {
            
            alert("Заполните все поля!")
            return
        }

        let taskObj = [
            {
                ТипЗадачи             : "Задача АХО",
                ПодтипЗадачи          : podService,
                Наименование          : taskName,
                ИмяПользователя       : username,
                email                 : email,
                Телефон               : phone,
                КомпанияЗаказчик      : company,
                ВлияниеЗадачи         : influence,
                ВлияниеЗадачиПодробно : influenceDescr,
                Срочность             : urgency,
                СрочностьПодробно     : urgencyDescr,
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

        setPodService     ("")
        setTaskName       ("")
        setUsername       ("")
        setEmail          ("")
        setPhone          ("")
        setCompany        ("")
        setInfluence      ("")
        setInfluenceDescr ("")
        setUrgancy        ("")
        setUrgancyDescr   ("")
        setDescription    ("")
    }

    console.log(store.isAuth);
    

    if (store.isLoading) {
        return (
            <div>
                Загрузка...
            </div>
        )
    }

    return (
        <div className='CreateAllContainer'>
            <div className='CreateHeader'>
                <div className='CreateHeaderContainer'>
                    <ul className='CreateNavbar'>
                        <li className='CreateLogo' onClick={() => navigate('/')}><a><img src={logo} /></a></li>
                    </ul>
                </div>
            </div>

            <div className='CreateContainer'>
                <div className='CreateBlock'>
                    <div className='CreateTitel'>
                        <p>Задача АХО</p>
                    </div>

                    <div className='CreaeteInputs'>
                        <div className={`CreateOnlyTitelBlock ${store.isAuth ? 'CreateTitelBlockAuth' : 'CreateTitelBlockNoAuth'}`}>
                            <div>
                                <p className='CreatePodServiceTitel'>Тип задачи:</p>
                            </div>

                            <div>
                                <p className='CreateTaskNameTitel'>Наименование задачи:</p>
                            </div>

                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? '' : <p className='CreateUserNameTitel'>Ваше имя:</p>}
                            </div>

                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? '' : <p className='CreateEmailTitel'>Ваша почта:</p>}
                            </div>

                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? '' : <p className="CreateCompanyTitel">Выберите Вашу компанию:</p>}
                            </div>

                            <div>
                                <p className="CreateInfluenceTitel">Влияние Вашей задачи на бизнес:</p>
                            </div>

                            <div>
                                <p className="CreateInfluenceDescrTitel">Опишите влияние задачи на бизнес:</p>
                            </div>

                            <div>
                                <p className="CreateUrgencyTitel">Cрочность выполнения задачи:</p>
                            </div>

                            <div>
                                <p className="CreateUrgencyDescrTitel">Обоснование срочности задачи:</p>
                            </div>

                            <div>
                                <p className='CreateDescriptionTitel'>Опишите Вашу задачи:</p>
                            </div>
                        </div>

                        <div className={`CreateOnlyInputBlock ${store.isAuth ? 'CreateInputBlockAuth' : 'CreateInputBlockNoAuth'}`}>
                            <div>
                                <select 
                                    className='CreatePodService'
                                    value={podService}
                                    onChange={(e) => setPodService(e.target.value)}>
                            
                                    <option value=""></option>
                                    <option value="Уборка снега">Уборка снега</option>
                                    <option value="Заказ воды">Заказ воды</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    className='CreateTaskName' 
                                    type="text" 
                                    placeholder='Наименование...'
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}/>
                            </div>

                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? (() => {
                                    // setUsername(String(localStorage.getItem('UserName')))
                                    return ''
                                })() : <input 
                                            className='CreateUserName' 
                                            type="text" 
                                            placeholder='Ваше имя...'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}/>}
                            </div>
                        
                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? (() => {
                                    // setEmail(String(localStorage.getItem('userEmail')))
                                    return ''
                                })() : <input 
                                            className='CreateEmail' 
                                            type="text" 
                                            placeholder='Ваша почта...'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>}
                            </div>

                            <div className={`${store.isAuth ? 'CreateDivAuth' : 'CreateDivNoAuth'}`}>
                                {store.isAuth ? '' : (
                                    <select 
                                        name="company" 
                                        id="" 
                                        className="CreateCompany"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}>
                            
                                        <option value=""></option>
                                        <option value="Алтын Тулпар">Алтын Тулпар</option>
                                        <option value="Джи Моторс">Джи Моторс</option>
                                        <option value="ДТ Техник">ДТ Техник</option>
                                        <option value="БАКР">БАКР</option>
                                        <option value="Киа Моторс">Киа Моторс</option>
                                        <option value="ПрофПерспектива">ПрофПерспектива</option>
                                        <option value="Тойота Центр">Тойота Центр</option>
                                        <option value="Форвард Трейд">Форвард Трейд</option>
                                        <option value="Эстокада">Эстокадаы</option>
                                    </select>
                                )}
                            </div>

                            <div>
                                <select 
                                    name="influence" 
                                    id="" 
                                    className="CreateInfluence"
                                    value={influence}
                                    onChange={(e) => setInfluence(e.target.value)}>
                        
                                    <option value=""></option>
                                    <option value="Низкое">Низкое</option>
                                    <option value="Среднее">Среднее</option>
                                    <option value="Высокое">Высокое</option>
                                    <option value="Критическое">Критическое</option>
                                </select>
                            </div>

                            <div>
                                <textarea 
                                    name="influenceDescr" 
                                    className="CreateInfluenceDescrTitel" 
                                    id="" 
                                    value={influenceDescr}
                                    onChange={(e) => setInfluenceDescr(e.target.value)}
                                ></textarea>
                            </div>  
                        
                            <div>
                                <select 
                                    name="Urgency" 
                                    id="" 
                                    className="CreateUrgency"
                                    value={urgency}
                                    onChange={(e) => setUrgancy(e.target.value)}>

                                    <option value=""></option>    
                                    <option value="Низкая">Низкая</option>
                                    <option value="Средняя">Средняя</option>
                                    <option value="Высокая">Высокая</option>
                                    <option value="Критическая">Критическая</option>
                                </select>
                            </div>
                        
                            <div>
                                <textarea 
                                    name="UrgencyDescr" 
                                    className="CreateUrgencyDescrTitel" 
                                    id="" 
                                    value={urgencyDescr}
                                    onChange={(e) => setUrgancyDescr(e.target.value)}
                                ></textarea>
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

export default observer(CreateAho)