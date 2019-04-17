import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { Link} from "react-router-dom";
import { logout} from "../actions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

const styles = {
  grow: {
    flexGrow: 1
  }
};

class  Header extends React.Component{
  state={
    isAuth:false
  }
logout=()=>{
  this.props.logout()
  this.setState({
    isAuth:true
  })
}
  render(){

  
  const { classes } = this.props;
  const name = "Mern Stack";
  const userRole= this.props.data.login.userRole;
  const authToken=localStorage.getItem('token')
  console.log(authToken)
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} Application
        </Typography>{userRole}{userRole ? <Button variant="contained" onClick={this.logout}><Link to ="/login">logout</Link></Button>: <Button variant="contained"><Link to ="/login">login</Link></Button> }
        {/* {userRole && this.state.isAuth  ? <Button variant="contained" onClick={this.logout}><Link to ="/login">logout</Link></Button> : ""} */}
      </Toolbar>
    </AppBar>
  );
}
}


const mapStateToProps = state => ({
  data: state.admin
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout:logout
    },
    dispatch
  );


export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));
