import React from 'react';
import PhoneList from './PhoneList';
import AddNumberModal from '../UI/Modals/AddNumberModal';
import COOBModal from '../UI/Modals/COOBModal';
import TableForPrint from './TableForPrint';
import XLSX from 'xlsx';
import NavBar from '../UI/NavBar';

class HomePage extends React.Component {
  state = {
    data: [],
    error: null,
    fileName: 'contact.xlsx',
    alarmMessage: ''
  };

  customers = () => {
    let customers = this.state.data.map(
      ({
        alert_info_enabled,
        aservicemask_id,
        forward_autoself,
        number,
        language_id,
        notify,
        operator_id,
        number_id,
        id,
        type,
        use_default,
        voiplocation_code,
        company_id,
        whitelist,
        whitelist_mode,
        whitelist_pin_in,
        whitelist_pin_in_enabled,
        whitelist_pin_out,
        whitelist_pin_out_enabled,
        ...item
      }) => item
    );
    customers = customers.map(({ info, short_number }) => ({
      Name: info,
      Number: short_number
    }));
    customers = customers.filter(
      person => person.Name !== 'Opas test IVR number'
    );
    customers = customers.filter(person => person.Name !== 'Call Conference');
    customers.push({ Name: 'Call Conference', Number: '99' });
    customers.push({ Name: 'Palvelu Numero', Number: '034439430' });
    return customers;
  };

  printData = () => {
    const divToPrint = document.getElementById('printTable');
    const newWin = window.open('');
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  };

  exportFile = () => {
    /* convert state.data to worksheet */
    const ws = XLSX.utils.json_to_sheet(this.customers());
    /* build a workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'contact.xlsx');
  };

  loadData() {
    fetch(process.env.url + '/data.php')
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          data: result
        });
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.loadData();
  }

  deleteShortNumberHandler = id => {
    fetch(process.env.url + '/removeShortNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        short_number: id
      })
    })
      .then(() => {
        this.loadData();
      })
      .catch(error => this.setState({ error }));
  };

  deletePublicNumberHandler = id => {
    fetch(process.env.url + '/removePublicNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        number_id: id
      })
    })
      .then(() => {
        this.loadData();
      })
      .catch(error => this.setState({ error }));
  };

  makeAlarmCall = () => {
    this.child.alarmCallAPI();
  };

  showAddNumberModal = () => {
    this.refs.child2.handleShowModal();
  };

  showCOOBModal = () => {
    this.child1.handleShowModal();
  };

  showLog = () => {
    this.child.showLog();
  };

  onChangeMessage = e => {
    this.setState({ alarmMessage: e.target.value });
  };

  render() {
    return (
      <div style={{ paddingBottom: '100px' }}>
        <NavBar />
        {this.state.error ? (
          <div>
            <p>Network error: {this.state.error.message}</p>
          </div>
        ) : (
          <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <div
              className="btn-toolbar mb-3"
              role="toolbar"
              aria-label="Toolbar with button groups"
              style={{
                paddingLeft: '60px',
                paddingTop: '20px',
                marginLeft: '10%',
                marginRight: '10%'
              }}
            >
              <div
                className="btn-group  flex-wrap mr-2 mx-auto"
                style={{ paddingRight: '70px' }}
                role="group"
                aria-label="First group"
              >
                <button
                  className="btn btn-outline-secondary mx-auto"
                  onClick={this.exportFile}
                >
                  <i className="fa fa-download"></i> Export To Excel
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={this.printData}
                >
                  <i className="fa fa-print"></i> Print Table
                </button>
                <button
                  onClick={this.showAddNumberModal}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  <i className="fa fa-address-book"></i> Add Number
                </button>
                <button
                  onClick={this.showCOOBModal}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  <i className="fa fa-calendar"></i> Scheduled Conference Call
                </button>
              </div>
            </div>
            <div
              className="mx-auto"
              style={{
                width: '70%',
                paddingLeft: '30px',
                paddingRight: '50px',
                paddingTop: '20px',
                marginRight: '10%'
              }}
            >
              <div
                className="input-group mb-3"
                style={{
                  paddingLeft: '6.5%'
                }}
              >
                <div className="input-group-prepend" id="button-addon3">
                  <button
                    onClick={this.makeAlarmCall}
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    <i className="fa fa-phone-square"></i> Make Alarm Call
                  </button>
                  <button
                    onClick={this.showLog}
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    <i className="fa fa-history"></i> Alarm Call Log
                  </button>
                </div>
                <input
                  onChange={this.onChangeMessage}
                  type="text"
                  value={this.state.alarmMessage}
                  className="form-control"
                  placeholder="Alarm message"
                  name="name"
                />
              </div>
            </div>
            <div
              style={{
                fontSize: 'large',
                paddingLeft: '10%',
                paddingTop: '10px'
              }}
            >
              <br />
              Palvelu Numero: 034439430
            </div>
            <div style={{ paddingTop: '30px' }}>
              <PhoneList
                childRef={ref => (this.child = ref)}
                onSubmitPN={this.deletePublicNumberHandler}
                onSubmitSN={this.deleteShortNumberHandler}
                data={this.state.data}
                message={this.state.alarmMessage}
              />
            </div>
            <div>
              <TableForPrint data={this.state.data} />
            </div>
            <div>
              <AddNumberModal ref="child2" data={this.state.data} />
            </div>
            <div>
              <COOBModal
                childRef={ref => (this.child1 = ref)}
                data={this.state.data}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default HomePage;
