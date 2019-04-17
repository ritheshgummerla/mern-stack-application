import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAdmin } from "../actions";
import { Link } from "react-router-dom";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Button from "@material-ui/core/Button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableRow
// } from "@material-ui/core";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
class admin extends Component {
  state = {
    rows: "",
    cols: ""
  };
  fileHandler = event => {
    let fileObj = event.target.files[0];
    // //just pass the fileObj as parameter
    console.log(fileObj);
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  };
  add = () => {
    const arr = this.state;
    arr.cols.push({ name: "q", key: 16 });
    this.setState({
      ...arr
    });
  };
  render() {
    const { data, users } = this.props.data.admin;
    const { fetchAdmin } = this.props;
    const { rows, cols } = this.state;

    console.log(this.state);
    return (
      <div>
        <input
          type="file"
          onChange={this.fileHandler}
          style={{ padding: "10px" }}
        />
        {this.state.rows ? (
          <Grid rows={rows} columns={cols}>
            <Table />
            <TableHeaderRow />
          </Grid>
        ) : (
          ""
        )}
      </div>

      // <div>
      //   <div>
      //   <input type="file" onChange={this.fileHandler} style={{"padding":"10px"}} />
      //   {this.state.rows ?
      //   <div>
      //     {/* <OutTable
      //     style={{width:"500px"}}
      //     data={this.state.rows}
      //     columns={this.state.cols}
      //     tableClassName="ExcelTable2007"
      //     tableHeaderRowClass="heading" />  */}
      //     <Grid
      //     rows={rows}
      //     columns={Columns}
      //   >
      //     <Table />
      //     <TableHeaderRow />
      //   </Grid>
      //     <Button onClick={this.add} variant="contained" color="primary">Validate</Button>
      //     </div>
      //     : ""}
      //     <h4>Admin Details</h4>
      //     <Button onClick={fetchAdmin} variant="contained" color="primary">Get Admin Details</Button>
      //     <div>
      //       {/* <Table>
      //         <TableHead>
      //           <TableCell>ID</TableCell>
      //           <TableCell>Name</TableCell>
      //           <TableCell>Email</TableCell>
      //           <TableCell>Phone</TableCell>
      //           <TableCell>WebSite</TableCell>
      //         </TableHead>
      //         <TableBody>
      //           {data &&
      //             data.map((item, i) => (
      //               <tr key={i}>
      //                 <TableCell>{item.id}</TableCell>
      //                 <TableCell>{item.name}</TableCell>
      //                 <TableCell>{item.email}</TableCell>
      //                 <TableCell>{item.phone}</TableCell>
      //                 <TableCell>{item.website}</TableCell>
      //               </tr>
      //             ))}
      //         </TableBody>
      //       </Table> */}
      //     </div>
      //   </div>
      // </div>
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
