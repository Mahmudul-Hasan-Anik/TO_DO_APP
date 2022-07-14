import React,{useState,useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Store } from '../Store'
import { useNavigate, Link } from 'react-router-dom';
import { MenuItem, Menu, Box, Toolbar, AppBar, IconButton, Typography,Stack} from '@mui/material';

const Header = () =>{
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const {state,dispatch} = useContext(Store)
  const {user} = state

  const handleLogout = ()=>{
    dispatch({
      type: 'USER_LOGOUT'
    })
    navigate('/login')
    // localStorage.removeItem('user')
    setAnchorEl(null);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{background:'white',color:'black'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span span style={{color:'red'}}>Planner</span>
          </Typography>
       
            {user?
            
            <div>
                <Stack direction="row" spacing={2} onClick={handleMenu}>
                  <Avatar alt="Remy Sharp" src="../image/Anik.jpg" />

               <p style={{cursor:'pointer',fontSize:'20px'}}>{user.name }</p>
                </Stack>
              <Menu
                id="menu-appbar"
                className='header_design'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            :

            <div>

              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
               >
                 <AccountCircle />
               </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem><Link to='/login'>Login</Link></MenuItem>
              </Menu>
            </div>
            }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header
