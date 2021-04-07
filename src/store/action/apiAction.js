import axios from 'axios';
import ActionTypes  from'../constant/constant';
import History from '../../History'

export function giveStats(){
    return dispatch=>{

        axios({
            withCredentials:true,
            method:'post',
            url:"/getStats"
        })
        .then(data=>{
            dispatch({
                type:ActionTypes.STATS,
                payload:data.data.stats 
            })  
        })
        .catch((err)=>{
            dispatch({type:ActionTypes.PROFILE,payload:{error:'Could not proceed with the request'}});
        })
    }
}
export function aRoom(room){
    return dispatch=>{
        dispatch({
            type:ActionTypes.ADDROOM,
            payload:room
        })
    }

}
export function changeAudio(bool){
    return dispatch=>{
        dispatch({
            type:ActionTypes.CHANGEAUDIO,
            payload:bool
        })
    }
}
export function changeVideo(bool){
    return dispatch=>{
        dispatch({
            type:ActionTypes.CHANGEVIDEO,
            payload:bool
        })
    }
}
export function changeStats(){
    return dispatch=>{

        axios({
            withCredentials:true,
            method:'post',
            url:"/getStats"
        })
        .then(data=>{
            dispatch({
                type:ActionTypes.STATS,
                payload:data.data.stats 
            })  
        })
        .catch((err)=>{
            dispatch({type:ActionTypes.PROFILE,payload:{error:'Could not proceed with the request'}});
        })
    }
}
export function Profiles(param) {

  return dispatch=>{

axios({
    url:'/users',
    withCredentials:true,
    method:'get',
    params:{
        user:param
    }
})
    .then((data)=>{
            dispatch({
                type:ActionTypes.PROFILE,
                payload:data.data
            })       
    })  
    .catch((err)=>{
    dispatch({type:ActionTypes.PROFILE,payload:{error:err.message}});
    })
}
}

export function checkStatus(){
    return dispatch=>{
        axios({
            url:'/checkAuth',
            withCredentials:true,
            method:'get', 
        }).then((data)=>{
            console.log(data.data)
            if(data.data.user){
                if(!data.data.user.phoneAuth)
                History.push('/phone')
                else if(!data.data.user.form_filed)
                History.push('/form')
                else if(!data.data.user.fileAuth)
                History.push('/files')
                else if(data.data.user.fileAuth)
                History.push('/'+data.data.user.username)
                    
                }
            })
    }
}

export function viewSetting() {
    return dispatch=>{
            console.log('out of axios')
    axios({
        url:'/viewSetting',
        withCredentials:true,
        method:'get'
    })
        .then((data)=>{
          
            

            dispatch({
                type:ActionTypes.VIEWSETTINGS,
                payload:data.data
            })
           
        })  
        .catch((err)=>{
        dispatch({type:ActionTypes.VIEWSETTINGS,payload:{error:'could not proceed the request'}});
        })
    }
    }
    export function changeSettings(value) {
        return dispatch=>{
                console.log('out of axios')
        axios({
            url:'/postSettings',
            withCredentials:true,
            method:'post',
            data:value
        })
            .then((data)=>{
                dispatch({
                    type:ActionTypes.VIEWSETTINGS,
                    payload:data.data
                })
               
            })  
            .catch((err)=>{
            dispatch({type:ActionTypes.CHANGESETTING,payload:{error:'could not proceed the request'}});
            })
        }
        }
        
        export function changePassword(value) {
            return dispatch=>{
            axios({
                url:'/changePassword',
                withCredentials:true,
                method:'post',
                data:value
            })
                .then((data)=>{
                    console.log(data.data)
                    dispatch({
                        type:ActionTypes.VIEWSETTINGS,
                        payload:data.data
                    })
                   
                })  
                .catch((err)=>{
                dispatch({type:ActionTypes.PROFILE,payload:{error:'could not proceed the request'}});
                })
            }
            }
            export function changeEmail(value) {
                return dispatch=>{
                        console.log('out of axios')
                axios({
                    url:'/changeEmail',
                    withCredentials:true,
                    method:'post',
                    data:value
                })
                    .then((data)=>{
                        dispatch({
                            type:ActionTypes.VIEWSETTINGS,
                            payload:data.data
                        })
                       
                    })  
                    .catch((err)=>{
                    dispatch({type:ActionTypes.VIEWSETTINGS,payload:{error:'could not proceed the request'}});
                    })
                }
                }
                export function changePhoneNumber(value) {
                    return dispatch=>{
                            console.log('out of axios')
                    axios({
                        url:'/getPhone',
                        withCredentials:true,
                        method:'get',
                    })
                        .then((data)=>{
                            if(data.data.phone===value.oldPhone){
                                
                            }

                            dispatch({
                                type:ActionTypes.VIEWSETTINGS,
                                payload:data.data
                            })
                           
                        })  
                        .catch((err)=>{
                        dispatch({type:ActionTypes.PROFILE,payload:{error:'could not proceed the request'}});
                        })
                    }
                    }
        
                export function changePicture(value) {
                    return dispatch=>{
                            console.log('out of axios')
                    axios({
                        url:'/photo',
                        withCredentials:true,
                        method:'post',
                        data:value
                    })
                        .then((data)=>{
                            dispatch({
                                type:ActionTypes.NEWSFEED,
                                payload:data.data
                            })
                           
                        })  
                        .catch((err)=>{
                        dispatch({type:ActionTypes.NEWSFEED,payload:{error:'could not proceed the request'}});
                        })
                    }
                    }
         