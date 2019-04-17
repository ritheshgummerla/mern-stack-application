import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

class Input extends Component {
  state = {
    isValid: false,
    errorMessage: ""
  };
  handleChange = e => {
    this.validate(e);
    this.props.onChange(e);
  };
  validate = e => {
    if (e.target.value === "") {
      this.setState({
        isValid: true,
        errorMessage: `${e.target.placeholder} is required`
      });
    } 
    else if (e.target.type === "number" && e.target.value.length >= this.props.maxLength&&e.target.value.length >= this.props.minLength) {
      this.setState({
        isValid: true,
        errorMessage: `${e.target.placeholder} should be less than ${
          this.props.maxLength
        }`
      });
    } else {
      this.setState({
        isValid: false,
        errorMessage: ""
      });
    }
  };

  render() {
    return (
      <div>
        <form>
          <TextField
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            value={this.props.value}
            onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            label={this.props.name}
            
          />
        </form>
        {this.state.isValid ? (
          <span style={{ color: "red" }}>{this.state.errorMessage}</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Input;
