import "./App.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./home";
import Admins from "./admin";
import Auth from "./auth/auth"
import Login from "./auth/login";
import Register from "./auth/signup";
import Tables from "./tables";
import EditProperty from "./edit-property";
import Booking from "./booking"


function App() {
  return (
    <div className="App">
      {/* <NavBarComponent /> */}
      <Routes>
        <Route path="auth/*" element={<Auth/>}/>
        <Route path="auth/login" element={<Login/>} />
        <Route path="auth/signup" element={<Register/>} />
        <Route path="auth/home/*" element={<Homepage/>} />
        <Route path="auth/admin" element={<Admins />}/>
        <Route path="auth/tables/*" element={<Tables/>} />
        <Route path="edit-property/:ID" element={<EditProperty/>}/>
        <Route path="booking/:ID" element={<Booking/>}/>
      </Routes>
    </div>
  );
}

export default App;
