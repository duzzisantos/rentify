import "./App.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./home";
import Admins from "./admin";
import Auth from "./auth/auth";
import Login from "./auth/login";
import Register from "./auth/register";
import Tables from "./tables";
import EditProperty from "./edit-property";
import Booking from "./booking";

function App() {
  return (
    <div className="App">
      <Auth/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login/*" element={<Login />} />
        <Route path="register/*" element={<Register />} />
        <Route path="auth/*" element={<Auth />} />
        <Route path="auth/home/*" element={<Homepage />} />
        <Route path="auth/admin" element={<Admins />} />
        <Route path="auth/tables/*" element={<Tables />} />
        <Route path="auth/admin/edit-property/:ID" element={<EditProperty />} />
        <Route path="booking/:ID" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
