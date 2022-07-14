import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MenuBar = () => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split("/");

  return (
    <div className='sidebar'>
      <div className='sidemenu_main'>
        <div className='sidemenu_list'>
          <ul>
            <li className={splitLocation[1] === '' ? 'activeMenu':''}>
              <Link to='/'>
                <i class="fa-solid fa-house"></i>Dashboard
              </Link>
            </li>
            <li className={splitLocation[1] === 'today' ? 'activeMenu':''}>
              <Link to='/today'>
                <i class="fa-solid fa-star"></i>Today
              </Link>
            </li>
            <li className={splitLocation[1] === 'complete' ? 'activeMenu':''}>
              <Link to='/complete'>
                <i class="fa-solid fa-circle-check"></i>Complete
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default MenuBar

