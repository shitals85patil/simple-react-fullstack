/* eslint-disable no-shadow,no-debugger,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Modal, ModalBody, ModalHeader, ModalFooter, Button, Table, FormGroup, Input, Label
} from 'reactstrap';
import AddCompany from './addCompany';
import {
  getCompanyDetail, getCompanyOffices, updateHeadOffice
} from '../actions/index';
import './company.scss';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isChangeHead: false,
      cid: '',
      oid: '',
    };
  }

  componentDidMount() {
    const { getCompanyDetail } = this.props;
    getCompanyDetail();
  }


  selectOffice = (e) => {
    this.setState({
      oid: e.target.value
    });
  }

  updateHeadOffice = () => {
    const { cid, oid, isChangeHead } = this.state;
    const { updateHeadOffice } = this.props;
    updateHeadOffice(cid, Number(oid));
    this.setState({
      isChangeHead: !isChangeHead
    });
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  toggleHead = (cid) => {
    const { getCompanyOffices } = this.props;
    const { isChangeHead } = this.state;
    getCompanyOffices(cid);
    this.setState({
      cid,
      isChangeHead: !isChangeHead
    });
  }

  render() {
    const { isOpen, isChangeHead } = this.state;
    const { company = [], office = [], isLoading = false } = this.props;
    return (
      <div className="home-wrap" id="home-wrap">
        <div className="company-management-header">
          <h3>React App for Company Management</h3>
          <Button color="primary" onClick={this.toggle}>Add</Button>
        </div>
        { !isLoading ? (
          <Table className="company-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Street</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Monthly Rent</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                company.map(c => (
                  <tr key={c.id}>
                    <td>{c.company.name}</td>
                    <td>{c.street}</td>
                    <td>{c.city}</td>
                    <td>{c.postalCode}</td>
                    <td>{c.monthlyRent}</td>
                    <td>
                      <Button color="warning" onClick={() => this.toggleHead(c.companyId)}>
                          Edit Head Office
                      </Button>
                    </td>
                  </tr>
                ))
            }

            </tbody>
          </Table>
        ) : <h2>Loading....</h2>}
        <AddCompany isOpen={isOpen} toggle={this.toggle} />
        <Modal isOpen={isChangeHead} toggle={this.toggleHead}>
          <ModalHeader toggle={this.toggleHead}>Update Head Office</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleSelect">Select new office location</Label>
              <Input type="select" name="select" id="exampleSelect" onChange={this.selectOffice}>
                {
                  office.map(c => (
                    <option selected={c.isHeadquarter} value={c.id} key={c.id}>{c.city}</option>
                  ))
                }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateHeadOffice}>Save</Button>
            {' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company.company,
  office: state.company.office,
  isLoading: state.company.isLoading,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getCompanyDetail, getCompanyOffices, updateHeadOffice
}, dispatch);

Company.defaultProps = {
  isLoading: PropTypes.bool,
  company: PropTypes.array,
  office: PropTypes.array,
  getCompanyDetail: PropTypes.func,
  updateHeadOffice: PropTypes.func,
  getCompanyOffices: PropTypes.func,
};

Company.propTypes = {
  isLoading: PropTypes.bool,
  company: PropTypes.array,
  office: PropTypes.array,
  getCompanyDetail: PropTypes.func,
  updateHeadOffice: PropTypes.func,
  getCompanyOffices: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
