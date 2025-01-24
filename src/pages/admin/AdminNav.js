import {
  AppBar, Box, IconButton, Toolbar, Typography, Drawer, Divider, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText
}
  from '@mui/material';
import React from 'react'
import logo from '../images/swarnsutra_logo.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EditIcon from '@mui/icons-material/Edit';
// import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../store/slices/UserSlice';

const drawerWidth = 280;
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: 'rgba(145, 158, 171, 0.12)',
//   '&:hover': {
//     backgroundColor: 'rgba(145, 158, 171, 0.06)',
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'rgb(99, 115, 129)',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

const navConfig = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'All Products', path: '/dashboard/allproducts', icon: <ShoppingBasketIcon /> },
  { title: 'Orders', path: '/dashboard/orders', icon: <InboxIcon /> },
  { title: 'Users', path: '/dashboard/users', icon: <PersonIcon /> },
  { title: 'Edit Bill Number', path: '/dashboard/editBill', icon: <EditIcon /> },
  { title: 'Coupon', path: '/dashboard/coupon', icon: <EditIcon /> },
  { title: 'Logout', path: '/', icon: <LogoutIcon /> },

]
const AdminNav = (props) => {

  const { window } = props;
  const { userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Logout = (title) => {
    if(title === "Dashboard"){
         navigate('/dashboard');
    }
    else if (title === "All Products") {
      navigate('/dashboard/allproducts');
    }
    else if(title === "Orders"){
         navigate('/dashboard/orders')
    }
    else if(title === "Users"){
      navigate('/dashboard/users')
    }
    else if(title === "Edit Bill Number"){
      navigate('/dashboard/editBill')
    }
    else if(title === "Coupon"){
      navigate('/dashboard/coupon');
    }
    else if (title === "Logout") {
      dispatch(userLogOut())
      localStorage.removeItem("userInfo")
      navigate('/');
    }
  }
  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Box padding='10px 20px'>
        <Link to='/dashboard'>
          <img src={logo}
            style={{ width: '80px', objectFit: 'cover', color: 'transparent', borderRadius: '50%' }}
          />
        </Link>
      </Box>
      <Box margin='20px 20px 40px 20px' padding='16px 20px' bgcolor='rgba(145, 158, 171, 0.12)' borderRadius='9px' display='flex' alignItems='center'>
        <Box width='40px' height='40px'>
          <img src='https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_25.jpg'
            style={{ width: '100%', height: '100%', objectFit: 'cover', textAlign: 'center', color: 'transparent', borderRadius: '50%' }}
          />
        </Box>
        <Box ml='16px'>
          <Typography variant='h6' fontSize='0.875rem' color='rgb(33, 43, 54)' fontWeight={600}>{userName}</Typography>
        </Box>
      </Box>
      <Divider />

      <Box>
        <List>
          {navConfig.map(({ title, path, icon }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton  onClick={() => Logout(title)} sx={{
                bgcolor: '#fff',

                '&.active': {
                  color: 'rgb(33, 43, 54)',
                  bgcolor: 'rgba(145, 158, 171, 0.16)',
                  fontWeight: '700',
                },
              }}
              >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText disableTypography primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgb(248,250,255)',
          boxShadow: 'none',
          backdropFilter: `blur(6px)`,
          backgroundColor: 'rgba(249, 250, 251, 0.8)',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
          >
            <MenuIcon sx={{ color: "rgb(99, 115, 129)" }} />
          </IconButton>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "rgb(99, 115, 129)" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ color: 'rgb(99, 115, 129)' }}>Admin Panel</Typography>
          </Box>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        position='fixed'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, backgroundColor: 'rgb(249, 250, 255)', height: '100%', zIndex: '1200', overflow: { sm: '', md: 'hidden scroll' } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>

  )
}

export default AdminNav;