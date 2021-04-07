import Actiontypes from '../constant/constant'
const INITIAL_STATE = {
    user: '',    
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
            case Actiontypes.LOGIN:
            return ({
                ...state,
                user:action.payload
            })
          
            case Actiontypes.SIGNUP:
            return ({
                ...state,
                user:action.payload
            }) 
            case Actiontypes.EMAIL:
            return ({
                ...state,
                user:action.payload
            })        
        default:
            return state
    }
}