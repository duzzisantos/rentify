import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import PropertyListHead from "./table-component";
import { Link, Routes, Route } from "react-router-dom";
import EditProperty from "./edit-property";
const Listings = () => {
  const [list, setList] = useState([]);

  const [search, setSearch] = useState("");
  
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/properties");
      console.log(res.status);
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:4000/api/properties/${_id}`)
      .then((res) => {
        console.log(res.statusText);
        console.log(res.status);
        fetchData();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  //add delete functionality
  return (
    <div className="list-wrapper">
      <h4>Administrator Database</h4>
      <input
        type="search"
        id="search"
        placeholder="Filter by ID"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <PropertyListHead />
        </thead>
        <tbody>
          {list
            .filter((item) =>
              search === ""
                ? item
                : search.match(new RegExp(`${item.propertyID}`, "i"))
                ? item
                : !item
            )
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.propertyID}</td>
                  <td>{item.propertyName}</td>
                  <td>{item.address}</td>
                  <td>{item.district}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.photos1} alt=""></img>
                  </td>
                  <td>
                    {" "}
                    <img src={item.photos2} alt=""></img>
                  </td>
                  <td>
                    {" "}
                    <img src={item.photos3} alt=""></img>
                  </td>
                  <td>
                    {" "}
                    <img src={item.photos4} alt=""></img>
                  </td>
                  <td>
                    {" "}
                    <img src={item.photos5} alt=""></img>
                  </td>
                  <td>
                    {" "}
                    <img src={item.photos6} alt=""></img>
                  </td>
                  <td>{item.wifi}</td>
                  <td>{item.parking}</td>
                  <td>{item.disabledParking}</td>
                  <td>{item.bouncers}</td>
                  <td>
                    <Button size="sm" variant="primary" key={item._id}>
                      <Link to={`edit-property/${item._id}`} className="link">
                        Edit
                      </Link>
                    </Button>
                    <Routes>
                      <Route
                        path={`edit-property/${item._id}`}
                        element={<EditProperty />}
                      />
                    </Routes>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Listings;

