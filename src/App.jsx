// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/common/Navbar";
import NavbarHead from "./components/Navbar";
import Footer from "./components/common/Footer";

export default function App() {
  return (
  
    <BrowserRouter>
     <NavbarHead />
         <Navbar />
      
      
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
