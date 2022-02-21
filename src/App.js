import "./App.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./home";
import Account from "./account";
import Admins from "./admin";
import Listings from "./listings"
import NavBarComponent from "./navbar";

function App() {
  return (
    <div className="App">
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Account></Account>} />
        <Route path="account" element={<Account></Account>} />
        <Route path="home" element={<Homepage></Homepage>} />
        <Route path="admin" element={<Admins></Admins>} />
        <Route path="listings" element={<Listings></Listings>} />
      </Routes>
    </div>
  );
}

export default App;
