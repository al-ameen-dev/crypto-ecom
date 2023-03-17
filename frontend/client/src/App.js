import { Provider } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "containers/HomePage";
import DashBoardPage from "containers/DashBoardPage";
import RegisterPage from "containers/RegisterPage";
import LoginPage from "containers/LoginPage";
import { store } from 'store';
import NavBar from  "components/NavBar";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { grey, lightBlue } from '@mui/material/colors';

const themeDark = createTheme({
  palette: {
    background: {
      default: grey[900],
    }
  },
});

const App = () =>{
  return(
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Dashboard" element={<DashBoardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  
);}

export default App;


// import CssBaseline from '@mui/material/CssBaseline';
// function App() {
//   return (
//     <div>
//       <CssBaseline />
//       <Header />
//       <Hero />
//       <Section />
//       <AboutUs />
//       <Testimonial />
//       <ContactUs />
//       <Footer />
//     </div>
//   );
// }
 
// export default App;
