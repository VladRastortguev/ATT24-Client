import React, { useContext, useEffect, useState } from 'react'
import '../Login/Login.css'
import { Context } from '../../index'
import { useNavigate } from 'react-router-dom'

import logo from '../../Image/logo.svg'

const Login = () => {

  const [singIn, setSingIn] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailReg, setEmailReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const navigate = useNavigate()

  const {store} = useContext(Context)

  async function chechNormalizeAuth() {
      const res = await store.login(email, password)
    
      if (res == '200') {
        navigate('/mainpage')
      } else {
        alert('Ошибка! Логин или пароль указаны не правильно!')
      }
  }

  async function checkNormalizeReg() {
      const res = await store.registration(emailReg, passwordReg)
  
      if (res == '200') {
        navigate('/mainpage')
      } else {
        alert('Ошибка!')
      }
  }

  return (
    // <div className='loginContainer'>

    //   <div className='loginFrame'>

    //     <div className='loginChecbox'>
    //       <ul>
    //         <li><a onClick={() => setSingIn(true)} className={singIn ? 'singInActive' : 'singUpActive'}>Вход</a></li>
    //         <li><a onClick={() => setSingIn(false)} className={singIn ? 'singUpActive' : 'singInActive'}>Регистрация</a></li>
    //       </ul>
    //     </div>
        

    //     {singIn ? 
    //       <div className='singIn'>
    //         <div className='singContainer'>
    //           <p>Email:</p>
    //           <input 
    //             type="text" 
    //             // placeholder='Email' 
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}/>
          
    //           <p>Пароль:</p>
    //           <input 
    //             type="password" 
    //             // placeholder='Пароль'
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}/>

    //           <a onClick={() => {store.login(email, password)
    //                   navigate("/mainpage")}}>
    //               Войти</a>
    //         </div>
    //       </div> 
    //         : 
    //       <div className='singUp'>
    //         <div className='singContainer'>
    //           <p>Введите вашу почту:</p>
    //           <input 
    //             type="text" 
    //             // placeholder='email' 
    //             value={emailReg} 
    //             onChange={(e) => setEmailReg(e.target.value)}/>

    //           <p>Придумайте ваш пароль:</p>
    //           <input 
    //             type="password" 
    //             // placeholder='Пароль' 
    //             value={passwordReg} 
    //             onChange={(e) => setPasswordReg(e.target.value)}/>

    //           <a onClick={() => {
    //             store.registration(emailReg, passwordReg)
    //             navigate("/mainpage")}
    //           }>Зарегестрироваться</a>
    //         </div>
    //       </div>}


    //   </div>

    // </div>
    
    <div className='LoginAllContainer'>
        <div className='LoginHeader'>
            <div className='LoginHeaderContainer'>
                <ul>
                  <li className='LoginLogo' onClick={() => navigate('/')}><a> <img src={logo} onClick={() => navigate('/')}/> </a></li>
                </ul>
            </div>
        </div>
        
        <div className='LoginContainer'>
            <div className='LoginLoginBlock'>
                <div className='LoginCheckbox'>
                  <ul>
                    <li><a onClick={() => setSingIn(true)} className={singIn ? 'singInActive' : 'singUpActive'}>Вход</a></li>
                    <li><a onClick={() => setSingIn(false)} className={singIn ? 'singUpActive' : 'singInActive'}>Регистрация</a></li>
                  </ul>
                </div>

                {singIn ? 
                    <div className='singIn'>
                      <div className='singContainer'>
                        <p>Email:</p>
                        <input 
                          type="text" 
                          placeholder='Email' 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}/>
          
                        <p>Пароль:</p>
                        <input 
                          type="password" 
                          placeholder='Пароль'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}/>

                        <div className='LoginButtonContainer '>
                            <button className='CreateBtn' onClick={() => {chechNormalizeAuth()}}>
                              Войти</button>
                        </div>
                      </div>
                    </div> 
                  : 
                    <div className='singUp'>
                      <div className='singContainer'>
                        <p>Введите вашу почту:</p>
                        <input 
                        type="text" 
                        placeholder='email' 
                        value={emailReg} 
                        onChange={(e) => setEmailReg(e.target.value)}/>

                        <p>Придумайте ваш пароль:</p>
                        <input 
                          type="password" 
                          placeholder='Пароль' 
                          value={passwordReg} 
                          onChange={(e) => setPasswordReg(e.target.value)}/>

                        <div className='LoginButtonContainer'>
                          <button className='CreateBtn regBtn' onClick={() => {checkNormalizeReg()}
                          }>Зарегистрироваться</button>
                        </div>          
                      </div>
                    </div>}
            </div>
        </div>
    </div>
  
  )
}

export default Login