import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { images } from "../../assets";
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import toastr from "toastr";
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Modal from '@mui/material/Modal';
interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const mystyle = {
  color: "#4e3cce",
  marginLeft: "15px",
  textTransform: "uppercase"
};


export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [username, setusername] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={images.logo} alt="logo" height={60}></img>
      </Typography>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to="/flight_list" style={mystyle}>Flight List</Link>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to="/passenger_list" style={mystyle}>Passenger List</Link>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to="/login" style={mystyle}>Login</Link>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Button variant="contained">Log Out</Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  useEffect(() => {
    let isusername = sessionStorage.getItem('username');
    setusername(isusername);

  }, []);
  const logout = () => {
    setTimeout(() => {
      sessionStorage.removeItem('username');
    }, 1000);
    toastr.success("Log out Successfully")
    navigate("/login");
  }
  const toDateFunction = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const WeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  }
  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
      await axios.get(url, {
        params: {
          q: input,
          units: 'metric',
          appid: api_key,
        },
      }).then((res) => {
        console.log('res', res);
        setWeather({ data: res.data, loading: false, error: false });
        setOpenModal(true);
      })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput('');
          console.log('error', error);
          setOpenModal(true);
        });
    }
  }
  const handleClose = () => {
    setOpenModal(false)
  }
  return (
    <Box sx={{ display: 'flex' }} >
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>
              {weather.loading && (
                <>
                  <Oval type="Oval" color="black" height={100} width={100} />
                </>
              )}
              {weather.error && (
                <>
                  <span className="error-message">
                    <FontAwesomeIcon icon={faFrown} />
                    <span style={{ fontSize: '20px' }}>City not found</span>
                  </span>
                </>
              )}
              {weather && weather.data && weather.data.main && (
                <div>
                  <div className="city-name">
                    <h2>
                      {weather.data.name}, <span>{weather.data.sys.country}</span>
                    </h2>
                  </div>
                  <div className="date">
                    <span>{toDateFunction()}</span>
                  </div>
                  <div className="icon-temp">
                    <img
                      className=""
                      src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                      alt={weather.data.weather[0].description}
                    />
                    {Math.round(weather.data.main.temp)}
                    <sup className="deg">°C</sup>
                  </div>
                  <div className="des-wind">
                    <p>{weather.data.weather[0].description.toUpperCase()}</p>
                    <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                  </div>
                </div>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, backgroundColor: '#3953c3' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, paddingTop: '15px' }}
          >
            <img src={images.logo} alt="logo" height={60} ></img>
          </Typography>
          <Typography>
            <TextField id="standard-basic"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={search}
              label="Search City Weather"
              variant="standard" />


          </Typography>
          {
            username === '' || username === null ?
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link to="/login" style={mystyle}>Login</Link>
              </Box> : <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button variant="contained" onClick={logout}>Log Out</Button>
              </Box>
          }


        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}