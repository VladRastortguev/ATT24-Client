import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Homepage from '../page/Homepage/Homepage.tsx'
import Create1C from '../page/Create1C/Create1C.tsx';
import CreateTeh from '../page/CreateTeh/CreateTeh.tsx';
import Login from '../page/Login/Login.jsx';
import CreateAho from '../page/CreateAho/CreateAho.tsx';
import CreateAnonym from '../page/CreateAnonym/CreateAnonym.tsx';
import Mainpage from '../page/Mainpage/Mainpage.tsx';
import MyTask from '../page/MyTask/MyTask.tsx';
import DetailsPage from '../page/DetailsPage/DetailsPage.tsx';
// import MyTask from '../Pages/MyTaks/MyTask';
// import Detailspage from '../Pages/DetailsPage/Detailspage';


const MainRoutes = () => {
    const PUBLIC_ROUTES = [
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/create1c", element: <Create1C />, id: 2},
        {link: "/createteh", element: <CreateTeh />, id: 3},
        {link: "/login", element: <Login />, id: 4},
        {link: "/createaho", element: <CreateAho />, id: 5},
        {link: "/createanonym", element: <CreateAnonym />, id: 6},
        {link: "/mainpage", element: <Mainpage />, id: 7},
        {link: "/mytask", element: <MyTask />, id: 8},
        {link: `/details/:uid/:tasktype`, element: <DetailsPage />, id: 9},
    ];

    return(
        <Routes>
            {PUBLIC_ROUTES.map(item => (
                <Route path={item.link} element={item.element} key={item.id} />
            ))}
        </Routes>
    )
}

export default MainRoutes;