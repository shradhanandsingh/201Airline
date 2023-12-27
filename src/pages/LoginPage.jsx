import { Box, Button, CircularProgress, Stack, TextField, circularProgressClasses, colors } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../assets";
import { useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import axios from "axios";
import toastr from "toastr";
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState({});
  const [isvalid, setisvalid] = useState(true);
  const [formData, setFormdata] = useState({
    email: '',
    password: ''
  })
  
  const InputChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const responseMessage = (response) => {
    console.log(response);
    if(response){
      sessionStorage.setItem('username', response.clientId);
       toastr.success("Login Successfully");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            const interval = setInterval(() => {
              setLoginProgress(prev => prev + 100 / 40);
            }, 50);

            setTimeout(() => {
              clearInterval(interval);
            }, 2000);

            setTimeout(() => {
              setIsLoggedIn(true);
            }, 2100);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  //466958440700-enlhcejbalbilu419rk5q34qi7cte5tg.apps.googleusercontent.com

  const onSignin = (e) => {
    e.preventDefault();
    setOnRequest(true);
    let invalid = true;
    let validators = {};
    if (formData.email === "" || formData === null) {
      invalid = false;
      validators.email = "Email is required"
      setOnRequest(false);
    } else if (!/\S+\.\S+/.test(formData.email)) {
      invalid = false;
      validators.email = "Email is not valid"
      setOnRequest(false);
    }

    if (formData.password === "" || formData.password === null) {
      invalid = false;
      validators.password = "Password is required"
      setOnRequest(false);
    } else if (formData.password.length < 6) {
      validators.password = "Password is too short, must be at least 6 characters"
    }

    axios.get('http://localhost:3000/user').then(result => {
      let logindata = result.data;
      logindata.map(user => {
        if (user.email === formData.email) {
          if (user.password === formData.password) {
            sessionStorage.setItem('username', formData.email);
            toastr.success("Login Successfully");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            const interval = setInterval(() => {
              setLoginProgress(prev => prev + 100 / 40);
            }, 50);

            setTimeout(() => {
              clearInterval(interval);
            }, 2000);

            setTimeout(() => {
              setIsLoggedIn(true);
            }, 2100);
          } else {
            invalid = false;
            validators.password = "wrong password"
          }
        }
      });
      setError(validators);
      setisvalid(invalid);
    }).catch(err => console.log(err))
  };

  useEffect(() => {
    sessionStorage.clear();
  }, [])

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "70%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${images.loginBg})`
      }} />
      {/* background box */}

      {/* Login form */}
      <Box sx={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: isLoggedIn ? "100%" : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
        transition: "all 1s ease-in-out",
        bgcolor: colors.common.white
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={60}></img>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box component="form" maxWidth={400} width="100%" onSubmit={onSignin}>
                <Stack spacing={3}>
                  {isvalid ? "" : <span>
                    {error.email} {error.password}
                  </span>}
                  <TextField label="email" name="email" onChange={(e) => InputChange(e)} fullWidth />
                  <TextField label="password" name="password" type="password" onChange={(e) => InputChange(e)} fullWidth />
                  <Button type="submit" size="large" variant="contained" color="success">
                    sign in
                  </Button>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}

         <div className="googleBtn">
           <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
         </div>

          {/* loading box */}
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: colors.common.white,
                zIndex: 1000
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: colors.grey[200] }}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  value={loginProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round"
                    },
                    position: "absolute",
                    left: 0,
                    color: colors.green[600]
                  }}
                />
              </Box>
            </Stack>
          )}
          {/* loading box */}
        </Box>
      </Box>
      {/* Login form */}
    </Box>
  );
};

export default LoginPage;