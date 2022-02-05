import axios from 'axios';
import appConstant from '../constant/index';

export const getCompanyDetail = () => (dispatch) => {
  dispatch({ type: appConstant.GET_COMPANY_REQUEST });
  return axios('/api/company').then(res => dispatch({ type: appConstant.GET_COMPANY_DETAIL, payload: res.data })).catch(err => console.log('err1', err));
};

export const getCompanyOffices = cid => (dispatch) => {
  axios(`/api/offices/${cid}`).then(res => dispatch({ type: appConstant.GET_COMPANY_OFFICE, payload: res.data })).catch(err => console.log('err1', err));
};

export const updateHeadOffice = (cid, oid) => (dispatch) => {
  axios.put(`/api/company/${cid}/${oid}`).then((res) => {
    dispatch({ type: appConstant.UPDATE_HEAD, payload: { companyId: cid, data: res.data } });
  }).catch(err => console.log('err1', err));
};

export const addOfficeDetail = data => (dispatch) => {
  axios.post('/api/company', data).then((res) => {
    dispatch({ type: appConstant.ADD_COMPANY, payload: res });
  }).catch(err => console.log('err1', err));
};
