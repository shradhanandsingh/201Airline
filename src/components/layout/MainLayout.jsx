import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../common/Header';

const sidebarWidth = 350;

const MainLayout = () => {
  let navigate = useNavigate();
  useEffect(()=>{
    let username = sessionStorage.getItem('username');
    if(username === '' || username === null){
      navigate("/login");
    }
  },[]);
  return (
    <Box display="flex">
      {/* sidebar */}
      <Sidebar sidebarWidth={sidebarWidth} />
      <Header />
      {/* sidebar */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          width: { sm: `calc(100% - ${sidebarWidth}px)` }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;