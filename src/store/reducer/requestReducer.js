import Actiontypes from '../constant/constant'
const INITIAL_STATE = {
    posts: '',
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actiontypes.MAKEREQUEST:
        return ({
            ...state,
            posts:action.payload
        })
        case Actiontypes.DELETEREQUEST:
        return ({
            ...state,
            user:action.payload
        })  
        case Actiontypes.CANCLEREQUEST:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.ACCEPTREQUEST:
        return ({
            ...state,
            user:action.payload
        })
        default:
        return state;

     
    }
}