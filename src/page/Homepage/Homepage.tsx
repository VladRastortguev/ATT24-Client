import React, { useContext, useEffect } from 'react'
import { FC } from 'react'

import logosvg from '../../Image/logo.svg'
import searchBtn from '../../Image/SearchBtn.svg'
import flyer from '../../Image/flyer.svg'

import '../Homepage/Homepage.css'
import '../Homepage/HomepageMedia.css'

import { useNavigate } from 'react-router-dom'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import Header from '../../Component/Header/Header'

const Homepage:FC = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context)

    useEffect(() => {
        store.checkAuth()
    }, [])

    console.log(store.isAuth);

    const navbarObj = {
        firstUl: true,
        secondUl: true,
        manyLink: 2,
        thirdUl: false,
        thirdUlAsBurger: false,
        thirdUlAsTaskNews: false,
        thirdUlObjTask: null,
        thirdUlObjTaskInit: null,
        getOut: true,
        getWelcom: true,
        pageName: 'Homepage',
        lastLiEmpty: false,
        lastLiIsLogOut: true, 
        linkList: ['Мои задачи /mytask', 'Новости /mainpage'],
        changeBurger: null 
    } 
    

    return (
        <div className='allContainer'>
            <Header navbarObj={navbarObj} />

            <div className='containerSupportAtt'>
                <div className='supporFooterContainer'>
                    <h3 className="supportTitel">Единое окно АТТ</h3>
                    <p className="supportText">Добро пожаловать! С помощью Единого окна можно подать заявку в службу технической поддержки, службу АХО или анонимное обращение.</p>

                    <p className="sendWeMessage"><img src={flyer} alt="#" /> Свяжитесь с нами</p>
            
                    <ul className='supportList'>
                        {store.isAuth && store.user.admin >= 2 ? (
                            <li className="block1C" onClick={() => navigate(`/create1c`)}>
                                <div className="innerBlock">
                                    <div className="multiInnerblock">
                                        <h5>1C</h5>
                                        <p className="titel1C">Задачи по доработкам или разработке внутри 1С</p>
                                    </div>
                                    <p className="getToTaskBtn">
                                        {">"}
                                    </p>
                                </div>
                            </li>
                        ) : (
                            null
                        )}

                        {/* <li class="blockWeb">
                            <div class="innerBlock">
                                <div class="multiInnerblock">
                                    <h5>Web</h5>
                                    <p class="titel1C">Задачи по доработкам или разработке Web</p>
                                </div>
                                <p class="getToTaskBtn">
                                    {">"}
                                </p>
                            </div>
                        </li> */}

                        <li className="blockDesing" onClick={() => navigate('/createanonym')}>
                            <div className="innerBlock">
                                <div className="multiInnerblock">
                                    <h5>Анонимное письмо</h5>
                                    <p className="titel1C">Вы можете оставить тут анонимное письмо</p>
                                </div>
                                <p className="getToTaskBtn">
                                    {">"}
                                </p>
                            </div>
                        </li>

                        <li className="blockTehSupport" onClick={() => navigate(`/createteh`)}>
                            <div className="innerBlock">
                                <div className="multiInnerblock">
                                    <h5>Техническая поддержка</h5>
                                    <p className="titel1C">Задачи технической поддержке, замена картриджей и т.д.</p>
                                </div>
                                <p className="getToTaskBtn">
                                    {">"}
                                </p>
                            </div>
                        </li>

                        <li className="blockAHO" onClick={() => navigate('/createaho')}>
                            <div className="innerBlock">
                                <div className="multiInnerblock">
                                    <h5>АХО</h5>
                                    <p className="titel1C">Задачи АХО, покупка/замена воды, уборка снега</p>
                                </div>
                                <p className="getToTaskBtn">
                                    {">"}
                                </p>
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
    )
}

export default observer(Homepage)