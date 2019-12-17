import React from "react";

class TableForPrint extends React.Component {
  render() {
    const cells = this.props.data.map((item, index) => {
      if (item.number !== "35834439430" && item.number !== "35834439431") {
        return (
          <tr key={index}>
            <td style={{ width: "10%", border: "1px solid #ccc" }}>
              {item.info}
            </td>
            <td style={{ width: "20%", border: "1px solid #ccc" }}>
              {item.short_number}
            </td>
          </tr>
        );
      } else return null;
    });
    //celled
    //collapsing
    return (
      <div style={{ marginLeft: "20%", marginRight: "20%", display: "none" }}>
        <table id="printTable">
          <thead>
            <tr>
              <td style={{ border: "1px solid #ccc" }}>Name</td>
              <td style={{ border: "1px solid #ccc" }}>Number</td>
            </tr>
          </thead>
          <tbody>
            {cells}
            <tr>
              <td style={{ border: "1px solid #ccc" }}>Call Conference</td>
              <td style={{ border: "1px solid #ccc" }}>99</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc" }}>Palvelu Numero</td>
              <td style={{ border: "1px solid #ccc" }}>034439431</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableForPrint;
