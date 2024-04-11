import React, { useContext, useEffect, useState } from 'react'
import logo from '../../Image/logo.svg'
import '../MyTask/MyTask.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../..'
import axios from 'axios'
import UserService from '../../services/UserService'
import { OneTaskInterface } from '../DetailsPage/OneTaskInterface'
import '../Homepage/Homepage.css'
import '../Mainpage/Mainpage.css'
import '../MyTask/MyTask.css'

const MyTask = () => {
    const navigate = useNavigate()
    const { store } = useContext(Context)

    const [taskFilter, setTaskFilter] = useState("Я постановщик")
    const [showFilter, setShowFilter] = useState(false)
    const [taskArr, setTaskArr] = useState<OneTaskInterface[]>([])

    async function MytaskGetTask() {
        store.setLoading(true)

        const userEmail = localStorage.getItem('userEmail')

        try {
            // const response = await axios.get(`http://192.168.2.26:35421/itil_att/hs/taskapi/tasksget/${userEmail}`, {
            //     auth: {
            //         username: 'WebInterface',
            //         password: '90nexuB'
            //     }

            // })

            const responce = await UserService.getAllTask(String(userEmail))

            // console.log(responce);

            console.log(responce);

            setTaskArr(responce.data)
        } catch (e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }
    }

    useEffect(() => {
        MytaskGetTask()
    }, [])

    return (
        <div className='MytaskAllContainer'>
            <div className='MytaskHeader'>
                <div className='MytaskHeaderContainer'>
                    <ul className='MytaskNavbar'>
                        <ul className='logoBack'>
                            <li className="logo"><a onClick={() => navigate('/mainpage') }><img src={logo} alt="Logo" /></a></li>
                            <li><button className='CreateBtn' onClick={() => navigate('/mainpage')}>Назад</button></li>
                        </ul>

                        <ul className='pageNavigateList MyTaskNavigation'>
                            <li className='MainpageTasks' onClick={() => navigate('/')}>Создать задачу</li>
                            <li className='CreateTask' onClick={() => navigate('/mainpage')}>Новости</li>
                        </ul>

                        <li></li>
                    </ul>
                </div>
            </div>

            <div className='MytaskContainer'>
                <div className='MytaskTaskBlock'>
                    {/* <div className='MytaskDopInfo'>

                    </div> */}

                    <div className='MytaskNameList'>
                        <ul className='TaskNameList'>
                            <li>№</li>
                            <li>Задача</li>
                            <li>Дата создания</li>
                            <li>Инициатор</li>
                            <li>Статус</li>
                        </ul>
                    </div>

                    <div className='MytaskTaskList'>
                        {taskArr.map((item, index) => (
                            <ul className='TaskList' key={index} onClick={() => navigate(`/details/${item.UID}/${item.TaskType}`)}>
                                <li key={`taskNumber${index}`} className='MyTaskTaskNumber'>{`№${String(item.Number).substring(20)}`}</li>
                                <li key={`taskName${index}`} className='MyTaskTaskName'>{`${String(item.TaskName).split(' ')[0]}
                                    ${String(item.TaskName).split(' ')[1] == undefined ? "" : String(item.TaskName).split(' ')[1]}`}</li>
                                <li key={`dateOfCreation${index}`} className='MyTaskDateOfCreation'>{String(item.DateOfCreation).split(' ')[0]}</li>
                                <li key={`initiator${index}`} className='MyTaskInitiator'>{`${String(item.Initiator).split(' ')[0]} 
                                    ${String(String(item.Initiator).split(' ')[1]).substring(0, 1)}.
                                    ${String(String(item.Initiator).split(' ')[2]).substring(0, 1)}.`}</li>
                                <li key={`currentStage${index}`} className='MyTaskCurrentStage'>{item.CurrentStage == "" ? "-" : item.CurrentStage}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MyTask