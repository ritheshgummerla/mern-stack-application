import React, { Component } from "react";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Button from "@material-ui/core/Button";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

export default class ifile extends Component {
  state = {
    columns: [
      { name: "key", title: "Object Key" },
      { name: "Id", title: "Object Type ID" }
    ],
    rows: [],
  };

  fileHandler = event => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      let newRows = [];

      let obj = {};
      if (err) {
        console.log(err);
      } else {
        resp.rows.filter(item => {
          obj = {
            key: item[0],
            Id: item[1]
          };
          //newRows.push([{key:obj[0],Id:obj[1]}])
          newRows.push(obj);
        });
        console.log(newRows);
        this.setState({
          //cols:resp.cols,
          rows: newRows
        });
      }
    });
  };

  render() {
    const { rows, columns } = this.state;
    console.log(this.state.rows);
    return (
      <div>
        <input
          type="file"
          onChange={this.fileHandler}
          style={{ padding: "10px" }}
        />
        {this.state.rows.length!==0 ? (
          <div  style={{width:"500px"}}>
            <Grid rows={rows} columns={columns}>
              <Table />
              <TableHeaderRow />
            </Grid>
            <Button onClick={this.add} variant="contained" color="primary">
              Validate
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
