import {CHANGEAUDIO} from '../constant/constant'
const setAudio = (state = true, action) => (action.type === CHANGEAUDIO ? action.audio : state);
export default setAudio;
