import React from 'react';
import './PhoneList.css';
import EditNameModal from '../UI/Modals/EditNameModal';
import EditShortNumberModal from '../UI/Modals/EditShortNumberModal';
import Checkbox from '../UI/Checkbox';
import DeleteNumberModal from '../UI/Modals/DeleteNumberModal';
import CallLogModal from '../UI/Modals/CallLogModal';
import AlarmNotiModal from '../UI/Modals/AlarmNotiModal';
import { connect } from 'react-redux';

class PhoneList extends React.Component {
  state = {
    openShortNumber: false,
    openPublicNumber: false,
    openAlarmLog: false,
    openAlarmNoti: false,
    id: '',
    alarmNumbers: [],
    conferenceNumbers: [],
    alarmItemsChecked: false,
    conferenceItemsChecked: false,
    error: '',
    items: [],
    message: '',
    alarmCallAPITitle: ''
  };

  openAlarmNoti = () => this.setState({ openAlarmNoti: true });
  closeAlarmNoti = () => this.setState({ openAlarmNoti: false });

  openAlarmLog = () => this.setState({ openAlarmLog: true });
  closeAlarmLog = () => this.setState({ openAlarmLog: false });

  openShortNumber = () => this.setState({ openShortNumber: true });
  closeShortNumber = () => this.setState({ openShortNumber: false });

  openPublicNumber = () => this.setState({ openPublicNumber: true });
  closePublicNumber = () => this.setState({ openPublicNumber: false });

  deleteShortNumberModal = e => {
    this.openShortNumber();
    this.setState({ id: e.target.id });
  };

  deletePublicNumberModal = e => {
    this.openPublicNumber();
    this.setState({ id: e.target.id });
  };

  deleteShortNumberHandler = () => {
    this.props.onSubmitSN(this.state.id);
    this.closeShortNumber();
  };

  deletePublicNumberHandler = e => {
    this.props.onSubmitPN(this.state.id);
    this.closePublicNumber();
  };

  alarmSelectAll = e => {
    const { checked } = e.target;
    let collection = [];

    if (checked) {
      collection = this.getAllItems();
    }
    this.setState(
      {
        alarmNumbers: collection,
        alarmItemsChecked: checked
      },
      () => {
        console.log(this.state.alarmNumbers);
      }
    );
  };

  conferenceSelectAll = e => {
    const { checked } = e.target;
    let collection = [];

    if (checked) {
      collection = this.getAllItems();
    }
    this.setState(
      {
        conferenceNumbers: collection,
        conferenceItemsChecked: checked
      },
      () => {
        console.log(this.state.conferenceNumbers);
      }
    );
  };

  getAllItems = () => {
    const items = this.props.data;
    let collection = [];
    for (const item of items) {
      collection.push(item.number);
    }
    collection = collection.filter(item => item !== '35834439430');
    collection = collection.filter(item => item !== '35834439431');
    return collection;
  };

  showLog = () => {
    this.fetchLog();
    this.openAlarmLog();
  };

  alarmCallAPI = () => {
    if (this.state.alarmNumbers.length === 0 && this.props.message === '') {
      this.setState({
        openAlarmNoti: true,
        message: 'Please choose at least a number and enter a message',
        alarmCallAPITitle: 'Error!'
      });
      this.openAlarmNoti();
    } else if (this.state.alarmNumbers.length === 0) {
      this.setState({
        openAlarmNoti: true,
        message: 'Please choose at least a number',
        alarmCallAPITitle: 'Error!'
      });
      this.openAlarmNoti();
    } else if (this.props.message === '') {
      this.setState({
        openAlarmNoti: true,
        message: 'Please enter a message',
        alarmCallAPITitle: 'Error!'
      });
      this.openAlarmNoti();
    } else {
      this.setState({
        openAlarmNoti: true,
        message: 'Call is going on, see call log for more information',
        alarmCallAPITitle: 'Successful!'
      });
      this.openAlarmNoti();
      this.state.alarmNumbers.forEach(number => {
        fetch(process.env.url + '/alarmCallAPI.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: JSON.stringify({
            answerNumber: number,
            message: this.props.message
          })
        });
      });
    }
  };

  fetchLog = () => {
    fetch(process.env.url + '/fetchAlarmCall.php')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            items: result
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  handleAlarmCheckboxClick = e => {
    const { value, checked } = e.target;
    if (checked) {
      const oldList = [...this.state.alarmNumbers];
      oldList.push(e.target.value);
      const collection = this.getAllItems();
      this.setState(
        {
          alarmNumbers: oldList,
          alarmItemsChecked:
            collection.length === this.state.alarmNumbers.length + 1
        },
        () => {
          console.log(this.state.alarmNumbers);
        }
      );
    } else {
      let oldList = [...this.state.alarmNumbers];
      oldList = oldList.filter(item => item !== value);
      this.setState({ alarmNumbers: oldList, alarmItemsChecked: false }, () => {
        console.log(this.state.alarmNumbers);
      });
    }
  };

  handleConferenceCheckboxClick = e => {
    const { value, checked } = e.target;
    if (checked) {
      const oldList = [...this.state.conferenceNumbers];
      oldList.push(e.target.value);
      const collection = this.getAllItems();
      this.setState(
        {
          conferenceNumbers: oldList,
          conferenceItemsChecked:
            collection.length === this.state.conferenceNumbers.length + 1
        },
        () => {
          this.props.onAddConferenceNumbers(this.state.conferenceNumbers);
        }
      );
    } else {
      let oldList = [...this.state.conferenceNumbers];
      oldList = oldList.filter(item => item !== value);
      this.setState(
        { conferenceNumbers: oldList, conferenceItemsChecked: false },
        () => {
          this.props.onAddConferenceNumbers(this.state.conferenceNumbers);
        }
      );
    }
  };

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  render() {
    const cells = this.props.data.map((item, index) => {
      if (item.number !== '35834439430' && item.number !== '35834439431') {
        return (
          <tr key={index}>
            <td
              className="align-middle"
              style={{
                width: '10%',
                border: '1px solid #ccc',
                borderRightColor: 'transparent'
              }}
            >
              {item.info}
            </td>
            <td
              className="text-center align-middle"
              style={{ width: '10%', border: '1px solid #ccc' }}
            >
              <EditNameModal id={item.id} />
            </td>
            <td
              className="text-center align-middle"
              style={{
                width: '30%',
                border: '1px solid #ccc',
                borderRightColor: 'transparent'
              }}
            >
              {item.number}
            </td>
            <td
              className="text-center align-middle"
              style={{ width: '10%', border: '1px solid #ccc' }}
            >
              <button
                id={item.id}
                onClick={this.deletePublicNumberModal}
                className="btn bg-transparent"
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <td
              className="text-center align-middle"
              style={{
                width: '5%',
                border: '1px solid #ccc',
                borderRightColor: 'transparent'
              }}
            >
              {item.short_number}
            </td>
            <td
              className="text-center align-middle"
              style={{
                width: '10%',
                border: '1px solid #ccc',
                borderRightColor: 'transparent'
              }}
            >
              {item.short_number !== undefined ? (
                <EditShortNumberModal
                  short_number={item.short_number}
                  id={item.id}
                />
              ) : null}
            </td>
            <td
              className="text-center align-middle"
              style={{ width: '10%', border: '1px solid #ccc' }}
            >
              {item.short_number !== undefined ? (
                <button
                  id={item.short_number}
                  onClick={this.deleteShortNumberModal}
                  className="btn bg-transparent"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              ) : null}
            </td>
            <td
              className="text-center align-middle"
              style={{
                width: '10%',
                border: '1px solid #ccc'
              }}
            >
              <div className="form-check">
                <Checkbox
                  className="form-check-input position-static"
                  handleCheckboxClick={this.handleAlarmCheckboxClick}
                  isChecked={this.state.alarmNumbers.includes(item.number)}
                  type="checkbox"
                  id="blankCheckbox"
                  value={item.number}
                  aria-label="..."
                />
              </div>
            </td>
            <td
              className="text-center align-middle"
              style={{
                width: '10%',
                border: '1px solid #ccc'
              }}
            >
              <div className="form-check">
                <Checkbox
                  className="form-check-input position-static"
                  handleCheckboxClick={this.handleConferenceCheckboxClick}
                  isChecked={this.state.conferenceNumbers.includes(item.number)}
                  type="checkbox"
                  id="blankCheckbox"
                  value={item.number}
                  aria-label="..."
                />
              </div>
            </td>
          </tr>
        );
      } else return null;
    });
    const mainTable = (
      <div>
        <div style={{ marginLeft: '10%', marginRight: '10%' }}>
          <table className="table table-bordered table-responsive table-striped ">
            <thead className="thead-dark">
              <tr>
                <th
                  className="text-center align-middle"
                  style={{ border: '1px solid #ccc' }}
                  colSpan="2"
                >
                  Name
                </th>
                <th
                  className="text-center align-middle"
                  style={{ border: '1px solid #ccc' }}
                  colSpan="2"
                >
                  Public Number
                </th>
                <th
                  className="text-center align-middle"
                  style={{ border: '1px solid #ccc' }}
                  colSpan="3"
                >
                  Short Number
                </th>
                <th
                  className="text-center align-middle"
                  style={{ border: '1px solid #ccc' }}
                >
                  Alarm Call
                  <div className="form-check">
                    <input
                      className="form-check-input position-static"
                      type="checkbox"
                      checked={this.state.alarmItemsChecked}
                      onChange={this.alarmSelectAll}
                    />
                  </div>
                </th>
                <th
                  className="text-center align-middle"
                  style={{ border: '1px solid #ccc' }}
                >
                  Conference Call
                  <div className="form-check">
                    <input
                      className="form-check-input position-static"
                      type="checkbox"
                      checked={this.state.conferenceItemsChecked}
                      onChange={this.conferenceSelectAll}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cells}
              <tr>
                <td
                  className="text-center align-middle"
                  style={{ width: '10%', border: '1px solid #ccc' }}
                  colSpan="2"
                >
                  Call Conference
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    width: '30%',
                    border: '1px solid #ccc',
                    borderRightColor: 'transparent'
                  }}
                >
                  034439431
                </td>
                <td
                  className="text-center align-middle"
                  style={{ width: '10%', border: '1px solid #ccc' }}
                >
                  <button
                    style={{ display: 'none' }}
                    className="btn bg-transparent"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    width: '20%',
                    border: '1px solid #ccc',
                    borderRightColor: 'transparent'
                  }}
                >
                  99
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    width: '10%',
                    border: '1px solid #ccc',
                    borderRightColor: 'transparent'
                  }}
                >
                  <button
                    style={{ display: 'none' }}
                    className="ui icon button"
                  >
                    <i aria-hidden="true" className="trash alternate icon"></i>
                  </button>
                </td>
                <td
                  className="text-center align-middle"
                  style={{ width: '10%', border: '1px solid #ccc' }}
                >
                  <button
                    style={{ display: 'none' }}
                    className="btn bg-transparent"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    width: '10%',
                    border: '1px solid #ccc',
                    borderRightColor: 'transparent'
                  }}
                ></td>
                <td
                  className="text-center align-middle"
                  style={{ width: '10%', border: '1px solid #ccc' }}
                ></td>
              </tr>
            </tbody>
          </table>

          <DeleteNumberModal
            show={this.state.openShortNumber}
            onHide={this.closeShortNumber}
            close={this.closeShortNumber}
            delete={this.deleteShortNumberHandler}
          />

          <DeleteNumberModal
            show={this.state.openPublicNumber}
            onHide={this.closePublicNumber}
            close={this.closePublicNumber}
            delete={this.deletePublicNumberHandler}
          />

          <AlarmNotiModal
            title={this.state.alarmCallAPITitle}
            show={this.state.openAlarmNoti}
            onHide={this.closeAlarmNoti}
            message={this.state.message}
          />
        </div>
      </div>
    );
    return (
      <div>
        <CallLogModal
          show={this.state.openAlarmLog}
          onHide={this.closeAlarmLog}
          error={this.state.error}
          items={this.state.items}
        />
        <div>{mainTable}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conferenceNumbers: state.conference.conferenceNumbers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddConferenceNumbers: conferenceNumbers =>
      dispatch({ type: 'ADD', payload: conferenceNumbers })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneList);
