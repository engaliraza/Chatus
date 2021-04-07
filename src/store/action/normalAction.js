import axios from 'axios';
import ActionTypes  from'../constant/constant';
export function login(value) {
    console.log(value.email +" "+value.password )
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/login',
    withCredentials:true,
    method:'post',
    data:value
})
    .then((data)=>{
        dispatch({type:ActionTypes.LOGIN,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.LOGIN,payload:{error:'could not proceed the request'}});
    })
}
}
export function signup(value) {
    console.log(value)
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/signup',
    withCredentials:true,
    data:value,
    method:'post'})
    .then((data)=>{
        console.log(data)
        dispatch({
            type:ActionTypes.SIGNUP,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.SIGNUP,payload:{error:'Could not proceed the request'}});
    })
}
}
export function email() {
    return dispatch=>{
        console.log('out of axios')
axios({
    url:'/email',
    withCredentials:true,
    method:'get'})
    .then((data)=>{
        console.log(data)
        dispatch({
            type:ActionTypes.SIGNUP,
            payload:data.data})
        console.log(data)
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.SIGNUP,payload:{error:'Could not proceed the request'}});
    })
}
}