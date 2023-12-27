//import axios from "axios";
import { FAILREQUEST, GETUSERLIST, GETUSEROBJ, MAKEREQUEST, UPDATEUSER } from "./ActionType";
import { getPassengerId, getPassengerSeat, updateList } from "../../../service/api";

export const makeRequest=()=>{
    return{
        type:MAKEREQUEST
    }
}

export const failRequest=(err)=>{
    return{
        type:FAILREQUEST,
        payload:err
    }
}

export const getUSERLIST =(data)=>{
    return{
        type: GETUSERLIST,
        payload: data
    }
}
export const updateUser=()=>{
    return{
        type:UPDATEUSER
    }
}
export const getUserObj=(data)=>{
    return{
        type:GETUSEROBJ,
        payload:data
    }
}

export const FetchUserList=()=>{
    return (dispatch)=>{
        dispatch(makeRequest);
        getPassengerSeat().then(res=>{
            const userlist = res.data;
            dispatch(getUSERLIST(userlist))
        }).catch(err=>{
            dispatch(failRequest(err.mesage))
        })
    }
}

export const FunctionUpdateUser=(id,data)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        updateList(id, data).then(res=>{
            dispatch(updateUser());
           // toast.success('User Updated successfully.')
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}
export const FetchUserObj=(id)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        getPassengerId(id).then(res=>{
            const userlist=res.data;
            dispatch(getUserObj(userlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}
