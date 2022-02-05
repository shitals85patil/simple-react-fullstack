/* eslint-disable no-case-declarations */
import appConstant from '../constant/index';

const init = {
  company: [],
  office: [],
  isLoading: false

};
const company = (state = init, action) => {
  switch (action.type) {
    case appConstant.GET_COMPANY_REQUEST:
      return { ...state, isLoading: true };
    case appConstant.GET_COMPANY_DETAIL:
      return { ...state, company: action.payload, isLoading: false };
    case appConstant.GET_COMPANY_OFFICE:
      return { ...state, office: action.payload };
    case appConstant.UPDATE_HEAD:
      const companyDetail = [...state.company];
      const index = state.company.findIndex(s => s.company.id === action.payload.companyId);
      companyDetail[index] = action.payload.data;
      return { ...state, company };
    case appConstant.ADD_COMPANY:
      return {
        ...state,
        company: [...state.company,
          action.payload.data,
        ]
      };
    default:
      return { ...state };
  }
};
export default company;
