import React,{useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

const MenuBar = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");

  return (
    <div className='sidebar'>
      <div className='sidemenu_main'>
        <div className='sidemenu_user'>
            <h2>Anik</h2>
        </div>

        <div className='sidemenu_list'>
          <ul>
            <li className={splitLocation[1] == '' ? 'activeMenu':''}>
              <Link to='/'>
                <i class="fa-solid fa-house"></i> Home
              </Link>
            </li>
            <li className={splitLocation[1] == 'today' ? 'activeMenu':''}>
              <Link to='/today'>
                <i class="fa-solid fa-star"></i>Today
              </Link>
            </li>
            <li className={splitLocation[1] == 'complete' ? 'activeMenu':''}>
              <Link to='/complete'>
                <i class="fa-solid fa-circle-check"></i>Complete
              </Link>
            </li>
            <li className={splitLocation[1] == 'planned' ? 'activeMenu':''}>
              <Link to='/planned'>
                <i class="fa-solid fa-clipboard-list"></i> Planned
              </Link>
            </li>
          </ul>
        </div>

        <div className='sidemenu_in_out'>
        {/* <span>
          <i class="fa-solid fa-arrow-right-from-bracket"></i>Sign Out
        </span> */}

        <span>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>Sign In
        </span>
        </div>
      </div>
    </div>
  )
}

export default MenuBar

