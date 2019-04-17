import React, { Component } from 'react'

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../actions/index";
import { history } from "../history/history";





class Login extends Component {
  state={
    email:"",
    password:""
  }
  register=()=>{
    history.push("/register")
  }

  onChange=(e)=>{
    const {name, value} = e.target
    this.setState({
      [name]:value
    })
  }
  componentWillReceiveProps=(props)=>{
    const authToken=localStorage.getItem('token')
    if(authToken){
      history.push('/')
    }
  }

  render() {
    
    return (
      <div>
        <TextField
          type="email"
          name="email"
          placeholder="email"
          onChange={this.onChange}
          variant="outlined"
          margin="normal"
          label="Email"
        />{" "}
        <TextField
          type="password"
          name="password"
          placeholder="password"
          onChange={this.onChange}
          variant="outlined"
          margin="normal"
          label="Password"
        /><br/>
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.login.bind(this, this.state)}
        >
          Log in
        </Button>&nbsp;
        <Button
          variant="contained"
          color="primary"
          onClick={this.register}
        >
          Register
        </Button><br/>
        <span style={{color:"red"}}>{this.props.data.loginError}</span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.admin
});

const mapDispatchToProps = dispacth =>
  bindActionCreators(
    {
      login:login
    },
    dispacth
  );



export default connect(mapStateToProps,mapDispatchToProps)(Login)