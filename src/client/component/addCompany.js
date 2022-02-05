/* eslint-disable no-shadow,react/no-unescaped-entities */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import { getCompanyDetail, addOfficeDetail } from '../actions/index';
import './addCompany.scss';

class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      officeDetail: [{
        street: '', postalCode: '', city: '', monthlyRent: '', isHeadquarter: false
      }],
    };
  }

  componentWillMount() {
    const { getCompanyDetail } = this.props;
    getCompanyDetail();
  }

    handleChangeName = (e) => {
      const { company } = this.state;
      company[e.target.name] = e.target.value;
      this.setState({
        company
      });
    }

    handleChangeOffice = ({ target: { name, value } }, i) => {
      const { officeDetail } = this.state;
      officeDetail[i][name] = value;
      this.setState({
        officeDetail
      });
    }

    addOffice = () => {
      const { officeDetail } = this.state;
      officeDetail.push({
        street: '', postalCode: '', city: '', monthlyRent: '', isHeadquarter: false
      });
      this.setState({
        officeDetail
      });
    }

    removeOffice = (index) => {
      const { officeDetail } = this.state;
      officeDetail.splice(index, 1);
      this.setState({
        officeDetail
      });
    }

    save = () => {
      const { officeDetail, company } = this.state;
      const { addOfficeDetail, toggle } = this.props;
      const req = { company, offices: officeDetail };
      addOfficeDetail(req);
      toggle();
      this.setState({
        company: {},
        officeDetail: [{
          street: '', postalCode: '', city: '', monthlyRent: '', isHeadquarter: false
        }]
      });
    }

    render() {
      const { isOpen = false, toggle } = this.props;
      const { officeDetail = [] } = this.state;
      return (
        <div className="add-form">
          <Modal isOpen={isOpen} toggle={toggle} className="add-modal modal-lg">
            <ModalHeader toggle={this.toggle}>Add Company Detail with it's offices</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <div className="input-wrap">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Company Name"
                      onChange={this.handleChangeName}
                    />
                    <Button color="primary" onClick={this.addOffice}>Add Office</Button>
                  </div>
                </FormGroup>

                {
                  officeDetail.map((f, i) => (
                    <div key={f.id}>
                      <FormGroup>
                        <Label>Street</Label>
                        <Input
                          type="text"
                          name="street"
                          value={officeDetail[i].street}
                          placeholder="Street Name"
                          onChange={(e) => { this.handleChangeOffice(e, i); }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Postal Code</Label>
                        <Input
                          type="text"
                          name="postalCode"
                          value={officeDetail[i].postalCode}
                          placeholder="Postal Code"
                          onChange={(e) => { this.handleChangeOffice(e, i); }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>City</Label>
                        <Input
                          type="text"
                          name="city"
                          value={officeDetail[i].city}
                          placeholder="City"
                          onChange={(e) => { this.handleChangeOffice(e, i); }}
                        />
                      </FormGroup>
                      <FormGroup className="head-office">
                        <Label>Head Office</Label>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="isHeadquarter"
                              value
                              onChange={(e) => { this.handleChangeOffice(e, i); }}
                              checked={officeDetail[i].isHeadquarter}
                            />
                            {' '}
                                          Yes
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="isHeadquarter"
                              value={false}
                              onChange={(e) => { this.handleChangeOffice(e, i); }}
                              checked={!officeDetail[i].isHeadquarter}
                            />
                            {' '}
                                          No
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      <FormGroup>
                        <Label>Monthly Rent</Label>
                        <Input
                          type="text"
                          name="monthlyRent"
                          value={officeDetail[i].monthlyRent}
                          placeholder="Monthly Rent"
                          onChange={(e) => { this.handleChangeOffice(e, i); }}
                        />
                      </FormGroup>
                      <hr />
                      <div className="remove-btn">
                        {
                              officeDetail.length > 1 && (
                              <Button onClick={() => {
                                this.removeOffice(i);
                              }}
                              >
                                Remove Office
                              </Button>
                              )
                          }
                      </div>
                    </div>
                  ))
                }
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.save}>Add</Button>
              {' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  products: state,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getCompanyDetail,
  addOfficeDetail
}, dispatch);

AddCompany.defaultProps = {
  getCompanyDetail: PropTypes.func,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  addOfficeDetail: PropTypes.func,
};

AddCompany.propTypes = {
  getCompanyDetail: PropTypes.func,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  addOfficeDetail: PropTypes.func,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCompany));
