import React, { FC, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../..'
import axios from 'axios'

import { CommentInterface } from './CommentInterface'

import '../DetailsPage/DetailsPage.css'

import logo from '../../Image/logo.svg'
import { observer } from 'mobx-react-lite'
import { OneTaskInterface } from './OneTaskInterface'
import UserService from '../../services/UserService'
import { commentModel } from '../../models/itil/comment-model'
import AuthService from '../../services/AuthService'

const DetailsPage:FC = () => {
    const {uid, tasktype} = useParams()
    const { store } = useContext(Context)

    const [commentArr, setCommentArr] = useState<commentModel[]>([])
    const [oneTask, setOneTask] = useState<OneTaskInterface[]>([])

    const [showDetails, setShowDetaisl] = useState(false)

    const [comment, setComment] = useState("")

    const navigate = useNavigate()

    async function getComment() {
        store.setLoading(true)

        try {

            // const responce = await axios.get(`http://192.168.2.26:35421/itil_att/hs/taskapi/comment/${uid}/${tasktype}`, {
            //     auth: {
            //         username: 'WebInterface',
            //         password: '90nexuB'
            //     }
            // })

            const responce = await UserService.getComment(String(uid), String(tasktype))

            setCommentArr(responce.data)

        } catch (e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }
    }

    async function getOneTask() {
        store.setLoading(true)

        try {
            
            // const responce = await axios.get(`http://192.168.2.26:35421/itil_att/hs/taskapi/getonetask/${uid}/${tasktype}`, {
            //     auth: {
            //         username: 'WebInterface',
            //         password: '90nexuB'
            //     }
            // })

            const responce = await UserService.getOneTask(String(uid), String(tasktype))

            // responce.data.map((item) => {
            //     // setOneTask([item])   
            //     console.log([item[0]]);
                
            // })
            
            // console.log([responce.data[0]]);

            // console.log([responce.data[0]]);
            

            setOneTask([responce.data[0]])

        } catch (e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }
    }

    async function pushComment() {
        store.setLoading(true)
        
        let obj = [{
            Имя: String(localStorage.getItem('UserName')),
            Текст: String(comment)
        }]

        try {

            // const responce = await axios.post(`http://192.168.2.26:35421/itil_att/hs/taskapi/comment/${uid}/${tasktype}`, obj, {
            //     auth: {
            //         username: 'WebInterface',
            //         password: '90nexuB'
            //     }
            // })

            const responce = AuthService.setNewComment(obj, String(uid), String(tasktype))

            console.log(responce);

        } catch(e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }

        setComment('')
    }

    useEffect(() => {
        getComment()
        getOneTask()
    }, [])

    // console.log(commentArr);
    console.log(oneTask);
    

  return (
    <div className='DetailsAllContainer'>
        <div className='DetailsHeader'>
            <div className='DetailsHeaderContainer'>
                <ul className='DetailsNavbar'>
                    <li className='DetailsLogo'><a onClick={() => navigate('/mainpage')}> <img src={logo} /> </a></li>
                    
                    <li className='DetailsLink'>
                        <ul onClick={() => setShowDetaisl(true)}>
                            <li></li>
                             <li></li>
                            <li></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div className='DetailsContainer'>
            <div className='DetailsCommentBlock'>
                {commentArr.map((item, index) => (
                    <ul key={`CommentList${index}`} className={`CommentList ${
                        String(item.username) == String(localStorage.getItem('UserName')) ? 'CommentMyList' : 'CommentNotMyList'
                    }`} >
                        <li key={`CommentItemUsername${index}`} className='CommentItemUsername'>{
                            `${String(item.username).split(' ')[0]}. 
                             ${String(String(item.username).split(' ')[1]).substring(0, 1)}.
                             ${String(String(item.username).split(' ')[2]).substring(0, 1)}.`
                        }</li>
                        <li key={`CommentItemText${index}`} className='CommnetItemText'>{item.text}</li>
                        <li key={`CommentItemDate${index}`} className='CommentItemDate'>{
                            String(item.date).split(' ')[0]
                        }</li>
                    </ul>   
                ))}
            </div>

            <div className='CommentPushContainer'>
                <textarea 
                    className='CommentPustArea' 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                    cols={170}
                    rows={6}
                    placeholder='Оставить комментарий...'></textarea>
                <button className='pushCommentBtn CreateBtn' onClick={() => {
                    pushComment()
                    setTimeout(() => {
                        window.location.reload()
                    }, 100)
                }}>Отправить</button>
            </div> 
        </div> 


        <div className={showDetails ? 'showDetailsBlock' : 'unShowDetailsBlock'}>
            <div className='detailsPreContainer'>
                {oneTask.map((item, index) => (
                    <div key={`detailsContainer${index}`} className='detailsContainer'>
                        <div key={`detialsItemName${index}`} className='detailsItemName'>
                            <h5>Наименование:</h5>
                            <p>{item.TaskName}</p>
                        </div>

                        <div key={`detailsItemService${index}`} className='detailsItemService'>
                            <h5>Услуга:</h5>
                            <p>{item.Service == "" ? ("-") : (item.Service)}</p>
                        </div>

                        <div key={`detialsItemStage${index}`} className='detailsItemStage'>
                            <h5>Этап:</h5>
                            <p>{item.CurrentStage}</p>
                        </div>

                        <div key={`detailsItemInitiator${index}`} className='detialsItemInitiator'>
                            <h5>Инициатор:</h5>
                            <p>{
                                `${String(item.Initiator).split(' ')[0]} 
                                 ${String(String(item.Initiator).split(' ')[1]).substring(0, 1)}.
                                 ${String(String(item.Initiator).split(' ')[2]).substring(0, 1)}.`
                            }</p>
                        </div>

                        <div key={`detailsItemExecutor${index}`} className='detailsItemExecutor'>
                            <h5>Исполнитель:</h5>
                            <p>{
                                item.Executor == "" ? ("-") : (
                                    `${String(item.Executor).split(' ')[0]}
                                     ${String(String(item.Executor).split(' ')[1]).substring(0, 1)}.
                                     ${String(String(item.Executor).split(' ')[2]).substring(0, 1)}.`
                                )    
                            }</p>
                        </div>

                        <div key={`detailsDateOfCreate${index}`} className='detailsDateOfCreate'>
                            <h5>Дата создания:</h5>
                            <p>{String(item.DateOfCreation).split(' ')[0]}</p>
                        </div>

                        <div key={`detailsDateOfCompilet${index}`} className='detailsDateOfCompilet'>
                            <h5>Дата завершения:</h5>
                            <p>{String(item.DateOfCompletion).split(' ')[0] == '01.01.0001' ? ('-') : String(item.DateOfCompletion).split(' ')[0]}</p>
                        </div>

                        <div key={`detailsNumbertask${index}`} className='detailsNumbertask'>
                            <h5>Номер задачи:</h5>
                            <p>{String(item.Number).substring(20, 28)}</p>
                        </div>

                        <div key={`detailsOrganization${index}`} className='detailsOrganization'>
                            <h5>Организация:</h5>
                            <p>{String(item.OrganizationExecutor)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className='CloseBtn' onClick={() => setShowDetaisl(false)}>Закрыть</button>
        </div>

    </div>
  )
}

export default observer(DetailsPage)