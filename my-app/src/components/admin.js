import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAdmin } from "../actions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";

class admin extends Component {
  render() {
    const { data, users } = this.props.data.admin;
    const { fetchAdmin } = this.props;
    return (
      <div>
        <div>
          <h4>Admin Details</h4>
          <Button onClick={fetchAdmin} variant="contained" color="primary">
            Get Admin Details
          </Button>
          <div>
            <Table>
              <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>WebSite</TableCell>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((item, i) => (
                    <tr key={i}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.website}</TableCell>
                    </tr>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
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
      fetchAdmin: fetchAdmin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(admin);
