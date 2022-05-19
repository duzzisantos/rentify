import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import PropertyListHead from "./table-component";
import Auth from "./auth/auth";
import Footer from "./footer";

const Tables = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/properties");
      console.log(res.statusText);
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:4000/api/properties" + _id)
      .then((res) => {
        console.log(res.statusText);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Auth />
      <div className="list-wrapper">
        <div>
          <h4>Database</h4>
          <input
            type="search"
            id="search-table"
            placeholder="Filter by ID"
            onChange={(e) => setSearch(e.target.value)}
            title="Search by ID"
          />
        </div>
        <div className="table-container">
          <Table striped bordered hover style={{ width: "99%" }}>
            <thead>
              <PropertyListHead />
            </thead>
            <tbody>
              {list
                .filter((item) =>
                  search === ""
                    ? item
                    : search.match(new RegExp(`${item.propertyID}`), "gi")
                    ? item
                    : !item
                )
                .map((item) => (
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
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: "#25D366",
                          border: "1px solid transparent",
                        }}
                        title="Edit row"
                      >
                        <Link
                          to={`/auth/tables/edit-property/${item._id}`}
                          className="link"
                        >
                          Edit
                        </Link>
                      </Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => handleDelete(item._id)}
                        title="Delete row"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tables;
