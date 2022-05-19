import "./App.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./home";
import Account from "./account";
import Admins from "./admin";
import Auth from "./auth/auth"
// import NavBarComponent from "./navbar";
import Tables from "./tables";
import EditProperty from "./edit-property";
import Booking from "./booking"


function App() {
  return (
    <div className="App">
      {/* <NavBarComponent /> */}
      <Routes>
        <Route path="/*" element={<Account/>} />
        <Route path="account/*" element={<Account/>} />
        <Route path="home/*" element={<Homepage/>} />
        <Route path="admin" element={<Admins />}/>
        <Route path="tables/*" element={<Tables/>} />
        <Route path="edit-property/:ID" element={<EditProperty/>}/>
        <Route path="booking/:ID" element={<Booking/>}/>
      </Routes>
    </div>
  );
}

export default App;
