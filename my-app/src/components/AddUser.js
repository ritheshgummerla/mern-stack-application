import React, { Component } from "react";
import Input from "./Input";
import "../App.css";
import { Link } from "react-router-dom";
import { history } from "../history/history";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUser, updateUser } from "../actions";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

class AddUser extends Component {
  state = {
    info: {
      name: "",
      age: "",
      mobile: "",
      status:"false"
    },
    errMsg: "",
    successMsg: "",
    showAdmin: false,
    userInfo: [],
    list: []
  };

  handleChange = e => {
    console.log(e.target.value)
    const { name, value } = e.target;
    this.setState({
      info: {
        ...this.state.info,
        [name]: value,
      },
      successMsg: ""
    });
  };
  onSubmit = () => {
    if(this.state.info===undefined){
      return;
    }
    console.log(this.state.info.status)
    this.props.addUser(this.state.info);
    this.setState({
      successMsg: "User Added Successfully"
    });
    history.push("/userlist");
  };
  onUpdate = () => {
    this.props.updateUser(this.state.info);
    history.push("/userlist");
  };
  componentDidMount = () => {
    const { data } = this.props.location;
    this.state.info = data;
    this.setState(this.state.info);
  };
  render() {
    return (
      <div className="App">
      {/* <Link to="/">
      <Button variant="contained">Home</Button>
      </Link>&nbsp; */}
        <Link to="/userlist">
          <Button variant="contained">Back</Button>
        </Link>&nbsp;
        {/* <Link to="/admin">
        <Button variant="contained">Admin List</Button>
        </Link> */}
        <h4>Add User</h4>
        <Input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={this.handleChange}
          value={this.state.info.name}
        />
        <span style={{ color: "red" }}>{this.state.errMsg}</span>
        <Input
          type="number"
          name="age"
          placeholder="age"
          maxLength="3"
          onChange={this.handleChange}
          value={this.state.info.age}
        />
        <Input
          type="number"
          name="mobile"
          placeholder="mobile"
          maxLength="12"
          minLrnght="10"
          onChange={this.handleChange}
          value={this.state.info.mobile}
        />
          <Select
            native
            value={this.state.info.status}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                name="status"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select><br />
        {this.props.location.onEdit ? (
          <Button onClick={e => this.onUpdate()} variant="contained" color="primary">update</Button>
        ) : (
          <Button onClick={this.onSubmit} variant="contained" color="primary">Submit</Button>
        )}
        <span style={{ color: "green" }}>{this.state.successMsg}</span>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.admin
});

const mapDispatchToProps = dispacth =>
  bindActionCreators(
    {
      addUser: addUser,
      updateUser: updateUser
    },
    dispacth
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
