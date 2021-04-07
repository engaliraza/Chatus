import axios from 'axios';
import ActionTypes  from'../constant/constant';
export function makeRequest() {
    return dispatch=>{
            console.log('out of axios')
    axios({
        url:'/makerequest',
        withCredentials:true,
        method:'post'
    })
        .then((data)=>{
            dispatch({
                type:ActionTypes.MAKEREQUEST,
                payload:data.data
            })
           
        })  
        .catch((err)=>{
        dispatch({type:ActionTypes.MAKEREQUEST,payload:{error:'Could not proceed the request'}});
        })
    }
}
export function removeRequest() {
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/deleterequest',
    withCredentials:true,
    method:'post'})
    .then((data)=>{
        console.log(data)
        dispatch({
            type:ActionTypes.DELETEREQUEST,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.DELETEREQUEST,payload:{error:'could not proceed with the request'}});
    })
}
}        
export function cancleRequest() {
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/canclerequest',
    withCredentials:true,
    method:'post'})
    .then((data)=>{
        console.log(data)
        dispatch({
            type:ActionTypes.CANCLEREQUEST,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.CANCLEREQUEST,payload:{error:'Could not proceed with the request'}});
    })
}
}
export function acceptRequest() {
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/acceptRequest',
    withCredentials:true,
    method:'post'})
    .then((data)=>{
        console.log(data)
        dispatch({
            type:ActionTypes.CANCLEREQUEST,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.CANCLEREQUEST,payload:{error:'Could not proceed with the request'}});
    })
}
}        