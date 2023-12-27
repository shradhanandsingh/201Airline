import { FAILREQUEST, GETUSERLIST, MAKEREQUEST } from "../action/ActionType";
const initialState = {
  loading:true,
  userlist:[],
  userobj:{},
  errmessage:''
}

export const Reducer = (state=initialState, action)=>{
  switch(action.type){
    case MAKEREQUEST:
      return{
        ...state,
        loading:true
      }
    case FAILREQUEST:
      return{
        ...state,
        loading:false,
        errmessage:action.payload
      }
    case GETUSERLIST:
      return{
        ...state,
        userlist:action.payload,
        errmessage:'',
        userobj:{}
      }
    default: return state
  }
}