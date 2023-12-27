import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip, BarElement } from "chart.js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip, BarElement);

function App() {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none"
    }
  };

  return (
    <>
       <GoogleOAuthProvider clientId="466958440700-un3vfa4je9vejult4289v4pfff09932f.apps.googleusercontent.com">
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </>
  );
}

export default App;
