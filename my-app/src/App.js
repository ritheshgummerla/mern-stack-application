import React, { Component } from "react";
import logo from "./loader.gif";
import "./App.css";
import { Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { history } from "../src/history/history";
import Dashboard from "./components/AddUser";
import Admin from "./components/admin";
import UserList from "./components/UserList";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Home from "./components/home"
import Header from "./components/Header";
import Register from './register/register'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Wrapper from "./components/Wrapper";
import { Provider } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import Grid from '@material-ui/core/Grid';
import SideMenu from "./components/sidemenu"
import store from "./store/index"
import {Auth} from "./auth/auth"
import Ifile from './components/ifile'
import TextField from "@material-ui/core/TextField";
import Login from "./login/login"
let token =""
console.log(token)
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

    let userToken =localStorage.getItem('token')
console.log(userToken)
const AuthButton = withRouter(({ history }) =>
  Auth.isAuthenticated ? (
    <p>
      <Button variant="contained"
        onClick={() => {
          Auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </Button>
    </p>
  ) : (
    <div>
    {/* <p>You are not logged in. <Button variant="contained"><Link to ="/login">login</Link></Button></p> */}
    {/* <span style={{border:"1px solid gray",padding:'10px'}}>email: test, password:1234</span> */}
    </div>
  )
);


// class login extends Component {
//   state = {
//     email: "",
//     password: "",
//     redirectToReferrer: false,
//     errMsg: ""
//   };
//   login = credentials => {
//     if (credentials.email === "admin@gmail.com" && credentials.password === "1234") {
//       fakeAuth.authenticate(() => {
//         this.setState(() => ({
//           redirectToReferrer: true
//         }));
//       });
//     } else {
//       fakeAuth.authenticate(() => {
//         this.setState(() => ({
//           redirectToReferrer: false,
//           errMsg: "Invalid Credentials"
//         }));
//       });
//     }
//   };
//   onChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   };
//   render() {
//     const { redirectToReferrer } = this.state;
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     if (redirectToReferrer === true) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <TextField
//           type="email"
//           name="email"
//           placeholder="email"
//           onChange={this.onChange}
//           variant="outlined"
//           margin="normal"
//           label="Email"
//         />{" "}
//         <TextField
//           type="password"
//           name="password"
//           placeholder="password"
//           onChange={this.onChange}
//           variant="outlined"
//           margin="normal"
//           label="Password"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={this.login.bind(this, this.state)}
//         >
//           Log in
//         </Button>
//         <p style={{ color: "red" }}>{this.state.errMsg}</p>
//       </div>
//     );
//   }
// }


class App extends Component {
  render() {
    token=this.props.data.admin.token
    console.log(this.props.data.admin.token)
    const { loading } = this.props.data.admin;
    if (loading) {
      return (
        <div className="App">
          <img src={logo} alt="img" width="200px" height="200px" />
        </div>
      );
    }
    return (
      <Router history={history}>
      

      
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
      <Header />
    <Grid container style={{height:'100%'}}>
    <Grid item md={2}>
    <SideMenu/>
    </Grid>
    <Grid item md={10}>
    
          {/* <AuthButton /> */}
          <h3 />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          {/* <Route exact path="/admin" component={Admin} /> */}
          <PrivateRoute exact path="/userlist" component={UserList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/ifile" component={Ifile} />
          <PrivateRoute exact path="/admin" component={Admin} />
        </Grid>
    </Grid>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>












      </Router>
    );
  }
}
const mapStateToProps = state => ({
  data: state
});

export default connect(mapStateToProps)(App);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? ( 
        
        <Component {...props} />
      ) : (
        <Redirect
          to='/login'
        />
      )
    }
  />
);