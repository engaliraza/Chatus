import Actiontypes from '../constant/constant'
const INITIAL_STATE = {
    newsfeed: '',
    user:'',
    password:'',
    email:'',
    phone:'',
    audio:true
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actiontypes.PROFILE:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.CHANGESETTING:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.NEWSFEED:
        return ({
            ...state,
            newsfeed:action.payload
        })
        case Actiontypes.CHANGEPASSWORD:
        return ({
            ...state,
            password:action.payload
        })
        case Actiontypes.CHANGEPICTURE:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.CHANGESLIDER:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.STATS:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.VIEWSETTINGS:
        return ({
            ...state,
            user:action.payload
        })
        case Actiontypes.CHANGEPHONENUMBER:
        return ({
            ...state,
            phone:action.payload
        })
        case Actiontypes.CHANGEEMAIL:
        return ({
            ...state,
            email:action.payload
        })
        case Actiontypes.CHANGEAUDIO:
        return(
            {
                ...state,
                audio:action.payload
            }
        )

        default: 
                return state
    }
}