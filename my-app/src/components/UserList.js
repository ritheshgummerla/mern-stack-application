import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAdmin, onDelete,getUsers } from "../actions";
import { Link } from "react-router-dom";
import { history } from "../history/history";
import Button from '@material-ui/core/Button';
import "../App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";

const Users =()=>{
  return (
    <div>
      No Users Found <br />
      <Link to="/">
      <Button variant="contained">Home</Button>
      </Link>&nbsp;
      <Link to="/dashboard">
        <Button variant="contained">Add User</Button>
      </Link>
    </div>
  );
  }
class admin extends Component {
  onEdit = (item, i) => {
    item.id = i;
    history.push({ pathname: "/dashboard", params: item.id, data: item, onEdit: true });
  };
  onDelete = i => {
    this.props.onDelete(i);
  };
  componentDidMount=()=>{
    console.log(this.props.data.admin.token)
    this.props.getUsers(this.props.data.admin.token);
  }
  render() {
    const { users } = this.props.data.admin;
    
    if (users.length == 0) {
     return <Users />
    }
    return (
      <div>
        <Link to="/dashboard">
          <Button variant="contained">Add User</Button>
        </Link>
        <h4>User List</h4>
        <Table>
          <TableHead>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
          </TableHead>
          <TableBody>
            {users &&
              users.map((item, i) => (
                <tr key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell style={{color:item.status==="active" ? "green":"red"}}>{item.status}</TableCell>
                  <TableCell >
                    <Link to="/dashboard" />
                    <Button variant="contained" color="primary" className={item.status==="inactive" ? "inactive":""} onClick={e => this.onEdit(item, i)}>Edit</Button>
                  </TableCell> 
                  <TableCell>
                    <Button variant="contained"color="secondary"  onClick={e => this.onDelete(item._id)}>Delete</Button>
                  </TableCell>
                </tr>
              ))}
          </TableBody>
        </Table>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers:getUsers,
      fetchAdmin: fetchAdmin,
      onDelete: onDelete
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(admin);
