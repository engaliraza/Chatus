import Actiontypes from '../constant/constant'
const INITIAL_STATE = {
    posts: '',
    content:'',
    studentClass:'',
    studentGender:'',
    requiredTeacherSpecification:'',
    category:[]
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actiontypes.MAKEPOST:
       
        return ({
            ...state,
            posts:action.payload
        })
        case Actiontypes.DELETEPOST:
       
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.EDITAREA:
        
        return ({
            ...state,
            area:action.payload.event.target.value          
        })

        case Actiontypes.EDITCITY:
        
        return ({
            ...state,
            city:action.payload.event.target.value 
        })
        case Actiontypes.STUDENTGENDER:
       
        return ({
            ...state,
            studentGender:action.payload.event.target.value      
            
        })
        case Actiontypes.STUDENTCLASS:
        
        return ({
            ...state,
            class:action.payload.event.target.value     
        })
        case Actiontypes.REQUIREDTEACHERSPEC:
        
        return ({
            ...state,
            requiredTeacherSpecification:action.payload.event.target.value 
        })
        case Actiontypes.CATEGORY:
        
        return ({
            ...state,
            
        })
        default:
        return state;
    }
}