import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { NavbarObjmodel } from '../ComponentModels/NavbarObj-model'
import logo from '../../Image/logo.svg'
import { useNavigate } from 'react-router-dom'
import '../Header/Header.css'
import { Context } from '../..'

const Header:FC<NavbarObjmodel> = ( {navbarObj} ) => {
    const navigate = useNavigate()
    const {store} = useContext(Context)

    const [pageNamelink, setPageNameLink] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])  

    useEffect(() => {
        switch(navbarObj.pageName) {
            case 'Homepage':
                setPageNameLink('/')
                break
            case 'Mainpage':
                setPageNameLink('/')
                break
            case 'Create':
                setPageNameLink('/')
                break
            case 'Mytask':
                setPageNameLink('/mainpage')
                break
            case 'Details':
                setPageNameLink('/mytask')
                break
    }}, [navbarObj.pageName])

    console.log(pageNamelink);

    async function lotout() {
        await store.logout()
    }

    return (
        <div className='HeaderContainer'>
            <div className='podHeaderContainer'>
                <ul className='HeaderNavbar'>
                    {navbarObj.firstUl ? (
                        <ul className='FirstHeaderList'>
                            <li className='HeaderLogo' onClick={() => navigate('/mainpage')}><img src={logo} /></li>
                            {navbarObj.pageName == 'Homepage' ? null : (
                                <li className='HeaderGoBack'>
                                    <button id='CreateBtn' onClick={() => navigate(pageNamelink)}>Назад</button>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <li className='HeaderLogo'><img src={logo} /></li>
                    )}

                    {store.isAuth ? (
                        navbarObj.secondUl ? (
                            <ul className={`SecondHeaderList ${navbarObj.thirdUlAsTaskNews? 'taskListSetting' : ''}`}>
                                {navbarObj.linkList.map((item, index) => (
                                    String(String(item).split(' ')[1]).substring(0, 1) == '/' ? (
                                        <li className='HeaderLinkItem' key={`Headeritem${index}`} onClick={() => navigate(`${String(item).split(' ')[1]}`)}>{String(item).split(' ')[0]}</li>
                                    ) : (
                                        <li className='HeaderLinkItem' key={`Headeritem${index}`} onClick={() => navigate(`${String(item).split(' ')[2]}`)}>
                                            {String(String(item).split(' ')[0] + ' ' + String(item).split(' ')[1])}
                                        </li>
                                    ) 
                                ))}
                            </ul>
                        ) : null
                    ) : (null)}

                    {navbarObj.thirdUl ? (
                        <ul className='ThirdHeaderList'>
                            {navbarObj.thirdUlAsBurger ? (
                                <ul className='burgerItem' onClick={() => navbarObj.changeBurger?.(true)}>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            ) : (
                                navbarObj.thirdUl ? (                                    
                                    navbarObj.thirdUlAsTaskNews ? (
                                        <ul className='taskListInit'>
                                            <ul>
                                                <li>Общие количество задач: {navbarObj.thirdUlObjTask?.length}</li>
                                                <li>Количество Ваших задач: {navbarObj.thirdUlObjTaskInit?.length}</li>
                                            </ul>

                                            <li className='GetLogOutLi'><button className='CloseBtn'>Выйти</button></li>
                                        </ul>
                                    ) : (
                                        <li className='GetLogOutLi'><button className='CloseBtn'>Выйти</button></li>                                            
                                    )
                                
                            ) : (
                                <li className='GetLogOutLi'><button className='CloseBtn'>Выйти</button></li>
                            )
                            )}
                        </ul>
                    ) : (
                        navbarObj.lastLiEmpty ? (
                            <li className='LastEmptyLi'></li>
                        ) : (
                            navbarObj.lastLiIsLogOut && !navbarObj.getWelcom ? (
                                <li className='GetLogOutLi'><button className='CloseBtn'>Выйти</button></li>
                            ) : (
                                navbarObj.lastLiIsLogOut && navbarObj.getWelcom ? (
                                    store.isAuth ? (
                                        <li className='GetWelcomLi'>
                                            <button className='logoutBtn CloseBtn' onClick={() => lotout()}>Выход</button>
                                        </li>
                                    ) : (
                                        <li className='GetLogOutLi'>
                                            <button className='loginBtn CreateBtn' onClick={() => navigate('/login')}>Вход</button>
                                        </li>
                                    )
                                ) : (
                                    <li className='LastEmptyLi'></li>
                                )                                
                            )
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default observer(Header)