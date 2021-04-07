import { combineReducers } from "redux";
import normalReducer from './normalReducer';
import apiReducer from './apiReducer';
import VideoReducer from './video-reducer';
import AudioReducer from './audio-reducer';
export default combineReducers({
    normalReducer ,
    apiReducer,
    VideoReducer,
    AudioReducer
})