import React, { Component } from 'react'

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register } from "../actions/index";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { history } from "../history/history";

import Select from '@material-ui/core/Select';


class Register extends Component {
    state={
        name:"",
        mobile:"",
        email:"",
        password:"",
        userRole:""
    }
    onChange=(e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }
    register=()=>{
       this.props.register(this.state)
    }
    render() {
      if(this.props.data.successMsg){
        
      history.push('/login')
      }
      return (
        <div>
            <TextField
            type="text"
            name="name"
            placeholder="name"
            onChange={this.onChange}
            variant="outlined"
            margin="normal"
            label="Name"
          />{" "}
          
          <TextField
            type="number"
            name="mobile"
            placeholder="mobile"
            onChange={this.onChange}
            variant="outlined"
            margin="normal"
            label="mobile"
          />{" "}
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
          />{" "}
          <TextField
            type="password"
            name="cpassword"
            placeholder="confirm password"
            //onChange={this.onChange}
            variant="outlined"
            margin="normal"
            label="Confirm Password"
          />
           <Select
            native
            //value={this.state.info.userRole}
            onChange={this.onChange }
            input={
              <OutlinedInput
                name="userRole"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value="client">Client</option>
            <option value="admin">admin</option>
          </Select><br/>
          
          <span style={{color:"red"}}>{this.props.data.errMsg}</span>
          <span style={{color:"green"}}>{this.props.data.successMsg}</span>
          {/* <Button
            variant="contained"
            color="primary"
            //onClick={this.login.bind(this, this.state)}
          >
            Log in
          </Button>&nbsp; */}
          <Button
            variant="contained"
            color="primary"
            onClick={this.register}
          >
            Register
          </Button>
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
          register:register
      },
      dispacth
    );
  
    
export default connect(mapStateToProps,mapDispatchToProps) (Register)