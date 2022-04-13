import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import PropertyTableRow from "./listings";

export default class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/properties/")
      .then((res) => {
        this.setState({
          students: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  DataTable() {
    return this.state.students.map((res, i) => {
      return <PropertyTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>District</th>
              <th>Price</th>
              <th>Photos1</th>
              <th>Photos2</th>
              <th>Photos3</th>
              <th>Photos4</th>
              <th>Photos5</th>
              <th>Photos6</th>
              <th>Wifi</th>
              <th>Parking</th>
              <th>D Parking</th>
              <th>Bouncers</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
